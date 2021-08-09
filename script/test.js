room = "QfcpEyzFLD"

state list {
  drrrs = new Bot(__this__, "test2", "saki-2x");
  drrrs.login(() => {
      console.log("test2 log ok");
      drrrs.join(room, () => {
          drrrs.save();
      });
  });
  //drrrs.event [msg, me] (u, m) => console.log(u + ": " + m);
  drrrs.event("msg", (u, m) => console.log(u.cyan + ": ".yellow + m.yellow));
  drrrs.event("me", (u, m) => console.log(u.cyan + ": ".yellow + m.underline.yellow));
}

drrr1 = new Bot(__this__, "test1", "saki-2x");
drrr1.login(() => {
    console.log("test1 log ok");
    drrr1.join(room, () => {
        drrr1.save();
        going list;
    });
});