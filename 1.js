let users = [];
let a = new Bot(__this__, "⠀", "gg", "ru-RU", "Phone");

magic = (num) => {
  num++;
  users = [];
  
  a.getLounge(() => {
    
    a.rooms.forEach((room) => room.users.forEach((user) => users.push(user.name)));
    
    a.create(users[Math.floor(Math.random() * users.length)], "", "1." + num, "ru-RU", false, false, false, (x) => {
      
      if x.message === "ok" then {
        a.leave(() => {
          magic(num);
        })
      }
      else {
        cmd.run("pm2 restart 1");
      }
      
    })
    
  })
}

a.login(() => {
  magic(0);
})
