// Youtube Music
event msg (u, m: "/m") => {
	reY = new RegExp("/m\\s|\\s/m", "gi");

	ytMusic(m.replace(reY, ""), yt => {
		if yt === "duration"
		  then drrr.print("Max duration - 10m.");
		else drrr.music(yt.title, yt.link);
	});
}
