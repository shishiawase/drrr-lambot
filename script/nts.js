drrr = new Bot();
ag = ["Phone", "Tv", "Desktop", "Tablet"];
ics = ["saki-2x", "gaki-2x", "tanaka-2x", "kuromu-2x", "kakka", "junsui-2x", "zaika", "bakyura-2x", "kanra", "gg", "eight", "kanra-2x", "setton-2x", "zaika-2x", "zawa", "kyo-2x", "setton", "sharo-2x", "ya-2x", "tanaka", "rotchi-2x", "san-2x", "bakyura"];
idik = "";
tripnick = [];
checks = {
  nfound: true,
  ffree: true,
  ffull: true
};

names = call => {
  feetch("https://hulipitomoya.github.io/other")
    .then(resp => resp.json())
    .then(call);
}

roomspa = (nama, type) => {
  later 1000{
    room = drrr.rooms.find(
        room => room.users.find(
          user => user[type] == nama))
      if room.roomId == false
      then{
      if checks.nfound == false
      then{
        later 1000 * 10 drrr.getLounge(() => {
          checkId();
        });
      }
      else {
        console.log("User not found. Research every 10 sec...".red);
        checks.nfound = false;
        checks.ffree = true;
        later 1000 * 10 drrr.getLounge(() => {
          checkId();
        });
      }
    };
    else if room.total < room.limit
    then{
      if checks.ffree == false
      then{
        idik = room.roomId
          checks.ffull = true;
        all();
      };
      else {
        idik = room.roomId
          console.log("User found and room is free. Room id: ".green + colors.cyan(idik));
        checks.nfound = true;
        checks.ffree = false;
        checks.ffull = true;
        all();
      }
    };
    else {
      if checks.ffull == false
      then{
        later 1000 * 5 drrr.getLounge(() => {
          checkId();
        });
      }
      else {
        console.log("User found, but room is full. Waiting...".yellow);
        checks.ffull = false;
        drrr.getLounge(() => {
          later 1000 * 5 checkId();
        });
      };
    }
  }
}

checkId = () => {
  if tripnick == true
  then roomspa(trip, "tripcode");
  else
    roomspa(nick, "name");
}

newLog = () => {
  names(x => {
    drrr = new Bot(__this__, x.names[Math.floor(Math.random() * x.names.length)], ics[Math.floor(Math.random() * ics.length)], "en-US", ag[Math.floor(Math.random() * ag.length)]);
    drrr.login(() => {
      console.log("New login...".yellow);
      checkId();
    });
  })
}

all = () => {
  prom = first(secondary);
}

first = (call) => {
  drrr.join("" + idik);
  later 1500{
    drrr.getLoc(() => {
      if drrr.info.room.roomId == ("" + idik)
      then{
        console.log(colors.cyan(drrr.profile.name) + " join the room.".green);
        call();
      }
      else {
        console.log("Whitelist enabled :c".red);
        later 60000 * 2 newLog();
      }
    });
  }
}

secondary = () => {
  newLog();
}

nono = () => {
  if trip.length > 0
  then{
    console.log("Started trip spam".yellow);
    tripnick = true;
    later 2000 newLog();
  }
  else if nick.length > 0
  then{
    console.log("Started nick spam".yellow);
    tripnick = false;
    later 2000 newLog();
  }
  else
    later 1000 * 3 nono();
}

console.log("Pls enter trip = \"tripcode\" or nick = \"nick\" :".yellow);
nono();
