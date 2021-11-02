let users = [];
let a = new Bot(__this__, "⠀", "gg", "ru-RU", "Phone");

magic = (num) => {
  num++;
  users = [];
  
  a.getLounge((x) => {
    if !x.message.match("Not Logined") then {
      a.rooms.forEach((room) => room.users.forEach((user) => users.push(user.name)));
    
      a.create(users[Math.floor(Math.random() * users.length)], "", "2." + num, "ru-RU", false, false, false, () => {
        a.leave(() => magic(num));
      })
    }
    else {
      a.login(() => magic(num));
    }
  })
}

a.login(() => {
  magic(0);
})
