event msg (u, m: "/m") => {
	reY = new RegExp("/m\\s|\\s/m", "gi");

	ytSearch(m.replace(reY, ""), yt => {
        console.log(yt);

		if yt === "duration"
		  then drrr.print("Max duration - 10m.");
		else drrr.music(yt.title, yt.link);
	});
}

room = "IQxJjQGsXN";
drrr = new Bot(__this__, "pl", "setton-2x");
drrr.login(() => {
	drrr.create("test audio *", ".night --> testing /m ytmusic <--", "5", "ru-RU", true, false, false, () => {
		console.log("create ok ok");
        console.log(drrr.room.roomId);
	})
})
