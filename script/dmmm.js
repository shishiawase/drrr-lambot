start = () => {
  names = {};

  chunkString = (size, str) => {
    pos = 0; chunks = []
    while pos < str.length {
      len = str.substr(pos, size).lastIndexOf(" ")
      len = (if len > size - 30 then len else size)
      chunks.push(str.substr(pos, len))
      pos += len
    }
    return chunks
  }

  batch_print = (name, msg) => {
    delimiter = "." 
    buffer = ""; msgs = []
    msg.split(delimiter).forEach(ctx => {
      if ctx.length then
        chunkString(135, ctx + delimiter).forEach(chk => {
          if (buffer.length + chk.length) > 135
          then { msgs.push(buffer); buffer = chk }
          else { buffer = buffer + chk; }
        })
    })
    if(buffer.length) then msgs.push(buffer)
    msgs.reverse();
    msgs.forEach(m => drrr.dm(name, m))
  }

  event join (u) => {
    if !names[u] then
      names[u] = 1;
  }

  event [me, msg] (u) => {
    if names[u] < 3 then {
      drrr.kick(u);
			names[u]++;
    }
    else {
      drrr.ban(u);
      names[u]++
    }
  }

  event dm (u, m: "!stat") => {
    ok = []; easy = []; norm = []; hard = [];
  
    Object.entries(names).forEach((item) => {
      if item[1] == 2 then 
        easy.push(u);
      else if item[1] == 3 then
        norm.push(u);
      else if item[1] == 4 then
        hard.push(u);
      else ok.push(u);
    });
    
    batch_print(u, (if ok.length then ("Дворяне тишины: " + ok.join(", ")) else "") + (if easy.length then (".\nПростолюдины: " + easy.join(", ")) else "") + (if norm.length then (".\nВорчливые шлюхи: " + norm.join(", ")) else "") + (if hard.length then (".\nИзнасилованные князем: " + hard.join(", ") + ".") else "."));
  }
}

drrr = new Bot(__this__, "Князь Артем", "eight", "ru-RU", "Tv");
drrr.login(() => {
  drrr.create("Kingdom of DM", "Night | Только ЛС | Статистика - !stat (в ЛС хосту)", "13", "ru-RU", true, false, false, () => {
    start();
  })
})