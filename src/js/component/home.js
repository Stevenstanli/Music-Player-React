import React, { useState, useEffect, useRef } from "react";

//create your first component

export function Home() {
	const [playlist, setPlaylist] = useState([]);
	let audioPlayer = useRef();
	const [song, setSong] = useState(0);

	const backSong = () => {
		if (song > 0) {
			setSong(song - 1);
		} else {
			setSong(playlist.length - 1);
		}
		playSong();
	};

	const nextSong = () => {
		if (song === playlist.length - 1) {
			setSong(0);
		} else {
			setSong(song + 1);
		}
		playSong();
	};

	const playSong = () => {
		let url =
			"https://assets.breatheco.de/apis/sound/" + playlist[song].url;
		audioPlayer.current.src = url;
		audioPlayer.current.play();
	};

	const pauseSong = () => {
		audioPlayer.current.pause();
	};

	const choose = uniqueId => {
		setSong(uniqueId);
	};

	useEffect(() => {
		getPlayList();
	}, []);

	const getPlayList = () => {
		fetch("https://assets.breatheco.de/apis/sound/songs")
			.then(response => response.json())
			.then(data => setPlaylist(data));
	};

	return (
		<div className="text-center mt-5">
			<div className="container">
				<h1>Music Player</h1>
				<ol>
					{playlist.map((e, i) => {
						return (
							<li
								onClick={() => {
									choose(i);
								}}
								key={i}
								className={song === i ? "select" : ""}>
								{e.name}
							</li>
						);
					})}
				</ol>
				<div className="buttons">
					<button onClick={backSong}>
						<i className="fa fa-caret-left" />
					</button>
					<button onClick={playSong}>
						<i className="fa fa-play" aria-hidden="true" />
					</button>
					<button onClick={pauseSong}>
						<i className="fa fa-pause" aria-hidden="true" />
					</button>
					<button onClick={nextSong}>
						<i className="fa fa-caret-right" aria-hidden="true" />
					</button>
				</div>
			</div>
			<div>
				<audio ref={audioPlayer}></audio>
			</div>
		</div>
	);
}
