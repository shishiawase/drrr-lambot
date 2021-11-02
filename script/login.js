const bot = new Telegraf("2064104833:AAFMFd17IPxlIGPxSPLtCDaJO--zdy359nI");
let drrr = {};
let bans = [];
let bansArray = [];
let usersArray = [];
let checkhost = false;
let roomsList = {};
let roomsArray = [];
let roomsText = "";
let whitelist = {
	stat: false, // По умолчанию выключен
	mode: "",
	users: []
};
const chars = {
  "_": "\\_",
  "*": "\\*",
  "[": "\\[",
  "`": "\\`"
};
const reChar = new RegExp("_|\\*|\\[|`", "gi");

let Buttons = {
    Mod: {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "Kick⚠", callback_data: "kick" },
                    { text: "Ban⛔", callback_data: "ban" },
                    { text: "Report🚫", callback_data: "report" }
                ],
                [
                    { text: "Unban⭕", callback_data: "unban" },
                    { text: "Whitelist📜", callback_data: "whitelist" },
                ],
                [
                    { text: "Отмена❌", callback_data: "cancel" }
                ]
            ]
        }
    },
    RoomSet: {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "Название🔁", callback_data: "title" },
                    { text: "Описание", callback_data: "desc" }
                ],
                [
                    { text: "Смена власти👑", callback_data: "chown" },
                    { text: "Инфа о комнатеℹ", callback_data: "roomInfo" }
                ],
                [
                    { text: "Выйти из комнаты🚪", callback_data: "leave" }
                ],
                [
                    { text: "Отмена❌", callback_data: "cancel" }
                ]
            ]
        }
    },
    Msg: {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "@", callback_data: "tap" },
                    { text: "ЛС📩", callback_data: "dm" }
                ],
                [
                    { text: "Отмена❌", callback_data: "cancel" }
                ]
            ]
        }
    },
    Users: {
        reply_markup: {}
    },
    RoomList: {
        reply_markup: {}
    },
    YesNo: {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "Да✅", callback_data: "yes" },
                    { text: "Нет❌", callback_data: "no" }
                ]
            ]
        }
    },
    Whitelist: {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "Кик⚠", callback_data: "kick" },
                    { text: "Бан⛔", callback_data: "ban" },
                    { text: "Репорт🚫", callback_data: "report" }
                ]
            ]
        }
    },
    Bans: {
        reply_markup: {}
    },
    Device: {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "📱", callback_data: "phone" },
                    { text: "📟", callback_data: "labtop" },
                    { text: "💻", callback_data: "pc" },
                ],
                [
                    { text: "📺", callback_data: "tv" },
                    { text: "🤖", callback_data: "bot" }
                ]
            ]
        }
    }
};

bansCheck = () => {
    users = []; temp = []; num = 0;

    if (bans.length) then {
        bans.forEach((user) => {
            if (num !== 3) then {
                num++;
                temp.push({ text: user, callback_data: user });
            }
            else {
                users.push(temp);
                temp = []; num = 0;
                num++;
                temp.push({ text: user, callback_data: user });
            }
        });
        users.push(temp);
        users.push([{ text: "Назад🔙", callback_data: "back" }]);

        bansArray = users;
    }
}

hostCheck = () => {
    check = false;

    drrr.getLounge(() => {
        room = drrr.rooms.find((room) => {
            room.users.find((user) => {
                user.name === drrr.profile.name
            })
        });

        if (room.host.name === drrr.profile.name) then {
            checkhost = true;
        }
        else {
            checkhost = false;
        }
    })
}

roomUsers = () => {
    users = []; temp = []; num = 0;

    drrr.getLoc(() => {
        drrr.users.forEach((user) => {
            if (user.name !== drrr.profile.name) then {
                // Максимум 3 кнопки, если больше 3, то выводит в новую строку
                if (num !== 3) then {
                    num++;
                    temp.push({ text: user.name, callback_data: user.name });
                }
                else {
                    users.push(temp);
                    temp = []; num = 0;
                    num++;
                    temp.push({ text: user.name, callback_data: user.name });
                }
            }
        });
        users.push(temp);
        users.push([{ text: "Назад🔙", callback_data: "back" }]);
        // Возвращает всех пользователей в виде кнопок
        usersArray = users;
    })
}

ruRoom = (type) => {
    rooms = []; temp = []; num = 0;
    // Тоже, что и сверху, только с комнатами
    drrr.getLounge(() => {
        if (type === "room") then {
            drrr.rooms.forEach((room) => {
                if (room.language === "ru-RU") then {
                    roomsList[room.name] = {
                        id: room.roomId
                    };

                    if (num !== 3) then {
                        num++;
                        temp.push({ text: room.name, callback_data: room.name });
                    }
                    else {
                        rooms.push(temp);
                        temp = []; num = 0;
                        num++;
                        temp.push({ text: room.name, callback_data: room.name });
                    }
                }
            });

            rooms.push(temp);
            rooms.push([{ text: "Отмена❌", callback_data: "cancel" }]);
            roomsArray = rooms;
        }
        else {
            let text = "";
            drrr.rooms.forEach((room) => {
                if (room.language === "ru-RU") then {
                    temp.push(room.host.name.replace(reChar, m => chars[m]) + (if (room.host.tripcode) then "`#" + room.host.tripcode.replace(reChar, m => chars[m]) + "`" else ""));

                    room.users.forEach((user) => {
                        if (user.tripcode) then {
                            rooms.push(user.name.replace(reChar, m => chars[m]) + "`#" + user.tripcode + "`");
                        }
                        else {
                            rooms.push(user.name.replace(reChar, m => chars[m]));
                        }
                    });

                    text = text + "*Название комнаты:*\n⤷ " + room.name.replace(reChar, m => chars[m]) + "\n*Хост:*\n⤷ " + temp[0] + "\n*Описание комнаты:*\n⤷ " + (if (room.description) then room.description.replace(reChar, m => chars[m]) else "Нет описания") + "\n*Пользователи:*\n⤷ " + rooms.join("\n⤷ ") + "\n\n";
                    rooms = [];
                    temp = [];
                }
            });
            roomsText = text;
        }
    })
}
const Kick = new Scenes.WizardScene(
    "kick",
    (ctx) => {
        if (checkhost !== true) then {
            ctx.reply("Вы не являетесь главным в этой комнате, для этой функции.");
            return ctx.scene.leave();
        }
        else {
            Buttons.Users.reply_markup.inline_keyboard = usersArray;

            ctx.reply("Выберите пользователя:", Buttons.Users);
            return ctx.wizard.next();
        }
    },
    (ctx) => {
        object = ctx.update.callback_query.data;
        msgId = ctx.update.callback_query.message.message_id;
        ctx.deleteMessage(msgId);

        if (object === "back") then {
            ctx.wizard.back();
        }
        else {
            drrr.kick(object, () => {
                ctx.reply("Пользователь " + object + " кикнут.");
                return ctx.scene.leave();
            })
        }
    }
);
const Ban = new Scenes.WizardScene(
    "ban",
    (ctx) => {
        if (checkhost !== true) then {
            ctx.reply("Вы не являетесь главным в этой комнате, для этой функции.");
            return ctx.scene.leave();
        }
        else {
            Buttons.Users.reply_markup.inline_keyboard = usersArray;

            ctx.reply("Выберите пользователя:", Buttons.Users);
            return ctx.wizard.next();
        }
    },
    (ctx) => {
        object = ctx.update.callback_query.data;
        msgId = ctx.update.callback_query.message.message_id;
        ctx.deleteMessage(msgId);

        if (object === "back") then {
            ctx.wizard.back();
        }
        else {
            drrr.ban(object, () => {
                bans.push(object);

                ctx.reply("Пользователь " + object + " забанен.");
                return ctx.scene.leave();
            })
        }
    }
);
const Report = new Scenes.WizardScene(
    "report",
    (ctx) => {
        if (checkhost !== true) then {
            ctx.reply("Вы не являетесь главным в этой комнате, для этой функции.");
            return ctx.scene.leave();
        }
        else {
            Buttons.Users.reply_markup.inline_keyboard = usersArray;

            ctx.reply("Выберите пользователя:", Buttons.Users);
            return ctx.wizard.next();
        }
    },
    (ctx) => {
        object = ctx.update.callback_query.data;
        msgId = ctx.update.callback_query.message.message_id;
        ctx.deleteMessage(msgId);

        if (object === "back") then {
            ctx.wizard.back();
        }
        else {
            drrr.report(object, () => {
                bans.push(object);
                ctx.reply("Пользователь " + object + " зарепорчен.");
                return ctx.scene.leave();
            })
        }
    }
);
const Unban = new Scenes.WizardScene(
    "unban",
    (ctx) => {
        if (checkhost !== true) then {
            ctx.reply("Вы не являетесь главным в этой комнате, для этой функции.");
            return ctx.scene.leave();
        }
        else {
            Buttons.Bans.reply_markup.inline_keyboard = bansArray;

            if (bans.length) then {
                ctx.reply("Выберите пользователя:", Buttons.Bans);
                return ctx.wizard.next();
            }
            else {
                ctx.reply("Вы никого не банили.");
                return ctx.scene.leave();
            }
        }
    },
    (ctx) => {
        object = ctx.update.callback_query.data;
        ctx.deleteMessage(ctx.update.callback_query.message.message_id);

        drrr.unban(object, () => {
            bans.find((user, ind) => {
                if (user === object) then {
                    bans.splice(ind, 1);
                }
            });

            ctx.reply("Пользователь " + ctx.message.text + " разбанен.");
            return ctx.scene.leave();
        })
    }
);
const Chown = new Scenes.WizardScene(
    "chown",
    (ctx) => {
        if (checkhost !== true) then {
            ctx.reply("Вы не являетесь главным в этой комнате, для этой функции.");
            return ctx.scene.leave();
        }
        else {
            Buttons.Users.reply_markup.inline_keyboard = usersArray;

            ctx.reply("Выберите пользователя:", Buttons.Users);
            return ctx.wizard.next();
        }
    },
    (ctx) => {
        object = ctx.update.callback_query.data;
        msgId = ctx.update.callback_query.message.message_id;
        ctx.deleteMessage(msgId);

        if (object === "back") then {
            ctx.wizard.back();
        }
        else {
            drrr.handOver(object, () => {
                ctx.reply("Пользователь " + object + " стал хостом.");
                return ctx.scene.leave();
            })
        }
    }
);
const Title = new Scenes.WizardScene(
    "title",
    (ctx) => {
        if (checkhost !== true) then {
            ctx.reply("Вы не являетесь главным в этой комнате, для этой функции.");
            return ctx.scene.leave();
        }
        else {
            ctx.wizard.state.msg = { id: ctx.update.callback_query.message.message_id + 1 };

            ctx.reply("Введите название комнаты:");
            return ctx.wizard.next();
        }
    },
    (ctx) => {
        ctx.deleteMessage(ctx.wizard.state.msg.id);
        ctx.deleteMessage();

        drrr.title(ctx.message.text, () => {
            ctx.reply("Название комнаты изменено на:\n" + ctx.message.text);
            return ctx.scene.leave();
        })
    }
);
const Desc = new Scenes.WizardScene(
    "desc",
    (ctx) => {
        if (checkhost !== true) then {
            ctx.reply("Вы не являетесь главным в этой комнате, для этой функции.");
            return ctx.scene.leave();
        }
        else {
            ctx.wizard.state.msg = { id: ctx.update.callback_query.message.message_id + 1 };

            ctx.reply("Введите описание комнаты:");
            return ctx.wizard.next();
        }
    },
    (ctx) => {
        ctx.deleteMessage(ctx.wizard.state.msg.id);
        ctx.deleteMessage();

        drrr.descr(ctx.message.text, () => {
            ctx.reply("Описание комнаты изменено на:\n" + ctx.message.text);
            return ctx.scene.leave();
        })
    }
);
const RoomSet = new Scenes.WizardScene(
    "roomset",
    (ctx) => {
        drrr.getLoc(() => {
            if (drrr.room.roomId) then {
                hostCheck();
                roomUsers();
            }
        });

        ctx.wizard.state.msg = { id: ctx.message.message_id + 1 };
        ctx.deleteMessage();

        ctx.reply("Настройки комнаты:", Buttons.RoomSet);
        return ctx.wizard.next();
    },
    (ctx) => {
        object = ctx.update.callback_query.data;
        ctx.deleteMessage(ctx.wizard.state.msg.id);

        if (object === "cancel") then {
            return ctx.scene.leave();
        }
        else if (object === "title") then {
            return ctx.scene.enter("title");
        }
        else if (object === "desc") then {
            return ctx.scene.enter("desc");
        }
        else if (object === "chown") then {
            return ctx.scene.enter("chown");
        }
        else if (object === "roomInfo") then {
            users = [];
            hostname = "";

            drrr.getLoc(() => {
                drrr.users.forEach((user) => users.push(user.name.replace(reChar, m => chars[m]) + (if (user.tripcode) then "`#" + user.tripcode.replace(reChar, m => chars[m]) + "`" else "")));
            });

            drrr.getLounge(() => {
                drrr.rooms.find((room) => {
                    if (room.name === drrr.room.name) then {
                        hostname = room.host.name.replace(reChar, m => chars[m]) + (if (room.host.tripcode) then "`#" + room.host.tripcode.replace(reChar, m => chars[m]) + "`" else "");
                    }
                })
                ctx.reply("*Название комнаты:* " + drrr.room.name.replace(reChar, m => chars[m]) + "\n*Хост:* " + hostname + "\n*Описание комнаты:* " + (if (drrr.room.description) then drrr.room.description.replace(reChar, m => chars[m]) else "Нет описания") + "\n*Пользователи:*\n " + users.join("\n "), { parse_mode: "Markdown" });
                return ctx.scene.leave();
            });
        }
        else if (object === "leave") then {
            drrr.leave(() => {
                whitelist.stat = false;
                bans = [];
                ctx.reply("Вы вышли из комнаты.");
            });
            return ctx.scene.leave();
        }
    }
);
const Rooms = new Scenes.WizardScene(
    "rooms",
    (ctx) => {
        ctx.deleteMessage();

        ctx.reply(roomsText, { parse_mode: "Markdown" });
        return ctx.scene.leave();
    }
);
const RoomJoin = new Scenes.WizardScene(
    "joinroom",
    (ctx) => {
        ruRoom("room");
        ctx.deleteMessage();

        ctx.reply("Хотите войти по ID?", Buttons.YesNo);
        return ctx.wizard.next();
    },
    (ctx) => {
        Buttons.RoomList.reply_markup.inline_keyboard = roomsArray;
        object = ctx.update.callback_query.data;
        ctx.deleteMessage();

        if (object === "yes") then {
            ctx.reply("Введите ID комнаты:");
            return ctx.wizard.next();
        }
        else {
            ctx.reply("Выберите русскоязычную комнату(подробнее - rooms):", Buttons.RoomList);
            return ctx.wizard.next();
        }
    },
    (ctx) => {
        object = ctx.update.callback_query.data;
        ctx.deleteMessage();

        if (object === "cancel") then {
            return ctx.scene.leave();
        }
        else if (!ctx.message.text) then {
            drrr.join(roomsList[object].id, () => {
                ctx.reply("Вход в комнату " + object + " - выполнен.");
                roomsList = {};
                return ctx.scene.leave();
            });
        }
        else {
            ctx.deleteMessage(ctx.message.message_id - 1);

            drrr.join(ctx.message.text, () => {
                ctx.reply("Вход в комнату c ID " + ctx.message.text + " - выполнен.");
                roomsList = {};
                return ctx.scene.leave();
            });
        }
    }
);
const Mod = new Scenes.WizardScene(
    "mod",
    (ctx) => {
        drrr.getLoc(() => {
            if (drrr.room.roomId) then {
                bansCheck();
                hostCheck();
                roomUsers();
            }
        });

        ctx.wizard.state.msg = { id: ctx.message.message_id + 1 };
        ctx.deleteMessage();

        ctx.reply("Выберите действие:", Buttons.Mod);
        return ctx.wizard.next();
    },
    (ctx) => {
        object = ctx.update.callback_query.data;
        ctx.deleteMessage(ctx.wizard.state.msg.id);

        if (object === "cancel") then {
            return ctx.scene.leave();
        }
        else if (object === "kick") then {
            return ctx.scene.enter("kick");
        }
        else if (object === "ban") then {
            return ctx.scene.enter("ban");
        }
        else if (object === "report") then {
            return ctx.scene.enter("report");
        }
        else if (object === "unban") then {
            return ctx.scene.enter("unban");
        }
        else if (object === "whitelist") then {

            if (checkhost !== true) then {
                ctx.reply("Вы не являетесь главным в этой комнате, для этой функции.");
                return ctx.scene.leave();
            }
            else {

                if (whitelist.stat === false) then {
                    whitelist.stat = true;

                    drrr.getLoc(() => {
                        drrr.room.users.forEach((user) => {
                            if (user.tripcode) then {
                                whitelist.users.push(user.tripcode);
                            }
                            else {
                                whitelist.users.push(user.name);
                            }
                        });
                    })
                    ctx.wizard.state.msg = { id: ctx.update.callback_query.message.message_id + 1 };

                    ctx.reply("Выберите режим:", Buttons.Whitelist);
                    return ctx.wizard.next();
                }
                else {
                    whitelist.stat = false;
                    whitelist.users = [];

                    ctx.reply("Whitelist деактивирован.");
                    return ctx.scene.leave();
                }
            }
        }
    },
    (ctx) => {
        object = ctx.update.callback_query.data;
        ctx.deleteMessage(ctx.wizard.state.msg.id);

        if (object === "kick") then {
            whitelist.mode = "kick";
        }
        else if (object === "ban") then {
            whitelist.mode = "ban";
        }
        else {
            whitelist.mode = "report";
        }

        ctx.reply("Whitelist активирован.");
        return ctx.scene.leave();
    }
);
const BotLogin = new Scenes.WizardScene(
    "login",
	(ctx) => {
        ctx.wizard.state.msg = { id: ctx.message.message_id + 1 };
		ctx.wizard.state.user = {};
        ctx.deleteMessage();

		ctx.reply("Введите никнейм:");
		return ctx.wizard.next();
	},
	(ctx) => {
		ctx.wizard.state.user.name = ctx.message.text;
        ctx.deleteMessage();
		ctx.deleteMessage(ctx.wizard.state.msg.id);
        ctx.wizard.state.msg.id = ctx.message.message_id + 1;

		ctx.reply("Введите иконку:\nsaki-2x\ngaki-2x\ntanaka-2x\nkuromu-2x\nkakka\njunsui-2x\nzaika\nbakyura-2x\nkanra\ngg\neight\nkanra-2x\nsetton-2x\nzaika-2x\nzawa\nkyo-2x\nsetton\nsharo-2x\nya-2x\ntanaka\nrotchi-2x\nsan-2x\nbakyura");
        return ctx.wizard.next();
	},
	(ctx) => {
		ctx.wizard.state.user.icon = ctx.message.text;
        ctx.deleteMessage();
        ctx.deleteMessage(ctx.wizard.state.msg.id);
        ctx.wizard.state.msg.id = ctx.message.message_id + 1;

		ctx.reply("Выберите устройство:", Buttons.Device);
		return ctx.wizard.next();
	},
	(ctx) => {
		ctx.wizard.state.user.agent = ctx.update.callback_query.data;
		login = ctx.wizard.state.user;
        ctx.deleteMessage(ctx.wizard.state.msg.id);
        ctx.wizard.state.msg.id = ctx.update.callback_query.message.message_id + 2;

        drrr = new Bot(__this__, login.name, login.icon, "ru-RU", login.agent);
        drrr.login(() => {
            drrr.save();
            ctx.reply("Данные сохранены...");
            later 4000 {
                ruRoom("asd");
                ctx.deleteMessage(ctx.update.callback_query.message.message_id + 1);
				ctx.reply("Хотите посмотреть список комнат?", Buttons.YesNo);
				return ctx.wizard.next();
			}
		})
	},
	(ctx) => {
        object = ctx.update.callback_query.data;
        ctx.deleteMessage(ctx.wizard.state.msg.id);

		if (object === "yes") then {
            ctx.reply(roomsText, { parse_mode: "Markdown" });
			return ctx.scene.leave();
		}
		else if (object === "no") then {
            return ctx.scene.leave();
		}
	}
);
const CreateRoom = new Scenes.WizardScene(
	"createRoom",
	(ctx) => {
        ctx.deleteMessage();
		ctx.wizard.state.room = {};

        drrr.getLoc(() => {
            if (drrr.room.roomId) then {
                ctx.reply("Сначала выйдете из комнаты.");
                return ctx.scene.leave();
            }
            else {
                ctx.reply("Введите название комнаты:");
        		return ctx.wizard.next();
            }
        })
	},
	(ctx) => {
		ctx.wizard.state.room.name = ctx.message.text;
		ctx.deleteMessage(ctx.message.message_id - 1);
		ctx.deleteMessage();

		ctx.reply("Описание комнаты:");
		return ctx.wizard.next();
	},
	(ctx) => {
		ctx.wizard.state.room.desc = ctx.message.text;
		ctx.deleteMessage(ctx.message.message_id - 1);
		ctx.deleteMessage();

		ctx.reply("На сколько человек (от 2 - 20):");
		return ctx.wizard.next();
	},
	(ctx) => {
		ctx.wizard.state.room.limit = ctx.message.text;
		ctx.deleteMessage(ctx.message.message_id - 1);
		ctx.deleteMessage();

		ctx.reply("Включить музыку?", Buttons.YesNo);
		return ctx.wizard.next();
	},
	(ctx) => {
		object = ctx.update.callback_query.data;
		ctx.deleteMessage();

		if (object === "yes") then {
			ctx.wizard.state.room.music = true;

			ctx.reply("18+?", Buttons.YesNo);
			return ctx.wizard.next();
		}
		else {
			ctx.wizard.state.room.music = false;

			ctx.reply("18+?", Buttons.YesNo);
			return ctx.wizard.next();
		}
	},
	(ctx) => {
		object = ctx.update.callback_query.data;
		ctx.deleteMessage();

		if (object === "yes") then {
			ctx.wizard.state.room.age = true;

			ctx.reply("Скрытая комната?", Buttons.YesNo);
			return ctx.wizard.next();
		}
		else {
			ctx.wizard.state.room.age = false;

			ctx.reply("Скрытая комната?", Buttons.YesNo);
			return ctx.wizard.next();
		}
	},
	(ctx) => {
		object = ctx.update.callback_query.data;
		ctx.wizard.state.room.hidden = (if (object === "yes") then true else false);
		room = ctx.wizard.state.room;
		ctx.deleteMessage();

		drrr.create(room.name, room.desc, room.limit, "ru-RU", room.music, room.age, room.hidden, () => {
			drrr.getLoc(() => {
				ctx.reply("Комната создана: \n\nНазвание: " + room.name + "\nОписание: " + room.desc + "\nЛимит пользователей: " + room.limit + "\nМузыка: " + (if (room.music === true) then "Есть" else "Нет") + "\n18+: " + (if (room.age === true) then "Есть" else "Нет") + "\nВидимость: " + (if (room.hidden === true) then "Скрытая" else "Видна всем") + "\nID: " + drrr.room.roomId);
				return ctx.scene.leave();
			})
		})
	}
);
const Msg = new Scenes.WizardScene(
    "msg",
    (ctx) => {
        drrr.getLoc(() => {
            if (drrr.room.roomId) then {
                roomUsers();
            }
            else {
                ctx.reply("Для этого надо находиться в комнате.");
                ctx.scene.leave();
            }
        });

        ctx.wizard.state.msg = { id: ctx.message.message_id + 1 };
        ctx.deleteMessage();

        ctx.reply("Выберите действие:", Buttons.Msg);
        return ctx.wizard.next();
    },
    (ctx) => {
        object = ctx.update.callback_query.data;
        ctx.deleteMessage(ctx.wizard.state.msg.id);

        if (object === "cancel") then {
            return ctx.scene.leave();
        }
        else if (object === "tap") then {
            return ctx.scene.enter("tap");
        }
        else if (object === "dm") then {
            return ctx.scene.enter("dm");
        }
    }
);
const Tap = new Scenes.WizardScene(
    "tap",
    (ctx) => {
        ctx.wizard.state.user = {};
        Buttons.Users.reply_markup.inline_keyboard = usersArray;
        ctx.reply("Выберите пользователя:", Buttons.Users);
        return ctx.wizard.next();
    },
    (ctx) => {
        ctx.wizard.state.user.name = ctx.update.callback_query.data;
        ctx.deleteMessage(ctx.update.callback_query.message.message_id);
        ctx.wizard.state.msg = { id: ctx.update.callback_query.message.message_id + 1};

        ctx.reply("Введите сообщение(если есть ссылка, то вставьте в конце сообщения):");
        return ctx.wizard.next();
    },
    (ctx) => {
        link = (if (ctx.message.text.match("http|https")) then ctx.message.text.substring(ctx.message.text.search("http|https")) else "");
        name = ctx.wizard.state.user.name;
        ctx.deleteMessage(ctx.wizard.state.msg.id);
        ctx.deleteMessage();

        drrr.print("@" + name + " " + ctx.message.text, (if (link) then link else ""), () => {
            ctx.reply(drrr.profile.name + ": @" + name + " " + ctx.message.text + (if (link) then " [URL](" + link + ")" else ""));
            return ctx.scene.leave();
        })
    }
);
const Dm = new Scenes.WizardScene(
    "dm",
    (ctx) => {
        ctx.wizard.state.user = {};
        Buttons.Users.reply_markup.inline_keyboard = usersArray;

        ctx.reply("Выберите пользователя:", Buttons.Users);
        return ctx.wizard.next();
    },
    (ctx) => {
        ctx.wizard.state.user.name = ctx.update.callback_query.data;
        ctx.deleteMessage(ctx.update.callback_query.message.message_id);
        ctx.wizard.state.msg = { id: ctx.update.callback_query.message.message_id + 1};

        ctx.reply("Введите сообщение(если есть ссылка, то вставьте в конце сообщения):");
        return ctx.wizard.next();
    },
    (ctx) => {
        link = (if (ctx.message.text.match("http|https")) then ctx.message.text.substring(ctx.message.text.search("http|https")) else "");
        name = ctx.wizard.state.user.name;
        ctx.deleteMessage(ctx.wizard.state.msg.id);
        ctx.deleteMessage();

        drrr.dm(name, ctx.message.text, (if (link) then link else ""), () => {
            ctx.reply("Кому: " + name + "\n⤷ " + ctx.message.text + (if (link) then " [URL](" + link + ")" else ""));
            return ctx.scene.leave();
        });
    }
);

const stage = new Scenes.Stage([
    BotLogin,
	CreateRoom,
	Kick,
	Ban,
	Report,
	Unban,
	Mod,
	RoomSet,
	RoomJoin,
	Title,
    Msg,
    Tap,
    Dm,
    Rooms,
    Desc,
    Chown
]);

bot.use(session());
bot.use(stage.middleware());
// Старт бота
bot.start((ctx) => {
    ctx.reply("Бот запущен.");
});
// Cлушаем
bot.command("login", (ctx) => ctx.scene.enter("login"))
bot.command("create", (ctx) => ctx.scene.enter("createRoom"))
bot.command("mod", (ctx) => ctx.scene.enter("mod"))
bot.command("roomset", (ctx) => ctx.scene.enter("roomset"))
bot.command("joinroom", (ctx) => ctx.scene.enter("joinroom"))
bot.command("msg", (ctx) => ctx.scene.enter("msg"))
bot.command("rooms", (ctx) => {
    ruRoom("inf");
    later 1000 ctx.scene.enter("rooms");
})
bot.command("cancel", (ctx) => {
    ctx.deleteMessage(ctx.message.message_id - 1);
    ctx.deleteMessage();
    return ctx.scene.leave(sceneType);
})
bot.on("text", ctx => {
    link = ctx.message.text.substring(ctx.message.text.search("http|https"));
    msg = ctx.message.text;

    drrr.print((if !msg.replace(link, "") then msg else msg.replace(link, "")), (if link.match("http|https") then link else ""));
})
bot.launch();

log2mkd = (type, e, room) => {

    e.user = e.user.replace(reChar, m => chars[m]);
	e.text = e.text.replace(reChar, m => chars[m]);

    if (type === "msg")
        then "*" + e.user + "*" + (if e.trip then ("`#" + e.trip + "`: ") else ": ") + e.text + (if e.url then " [URL](" + e.url + ")" else "");
    else if (type === "me")
        then "Действие | " + "*" + e.user + "*" + (if e.trip then ("`#" + e.trip + "`: _") else ": _") + e.text + "_" + (if e.url then " [URL](" + e.url + ")" else "");
    else if (type === "dm")
        then "ЛС | " + "*" + e.user + "*" + (if e.trip then ("`#" + e.trip + "`: ") else ": ") + e.text + (if e.url then " [URL](" + e.url + ")" else "");
    else if (type === "join")
        then "*" + e.user + "*" + (if e.trip then ("`#" + e.trip + "` в чате.") else " в чате.");
    else if (type === "leave")
        then "*" + e.user + "*" + (if e.trip then ("`#" + e.trip + "` покинул(а) чат.") else " покинул(а) чат.");
    else if (type === "new-host")
        then "*" + e.user + "*" + (if e.trip then ("`#" + e.trip + "` стал(a) новым хостом.") else " стал(a) новым хостом.");
    else if (type === "room-profile")
        then "Название комнаты изменено на *" + room.name + "*.";
    else if (type === "new-description")
        then "Описание комнаты изменено на *" + room.desc + "*.";
    else if (type === "music")
        then ("*" + e.user + "*" + (if e.trip then ("`#" + e.trip + "` поделился музыкой --- " + room.music.name + " [URL](" + room.music.url + ")") else " поделился музыкой --- " + room.music.name + " [URL](" + room.music.url + ")."));

}
// Отправка в телеграм
sendTg = (token, chat_id, type, e, roomLog) => {
	axios({
		"method": "POST",
		"url": "https://api.telegram.org/bot" + token + "/sendMessage",
		"headers": {
			"dataType": "json",
		},
		"data": {
			"chat_id": chat_id,
			"text": log2mkd(type, e, roomLog),
			"parse_mode": "Markdown",
			"disable_web_page_preview": false,
		}
	}).catch(err => {
		console.log("failed:", err.response.data);
	})
}
// Эвенты чата
event [msg, dm, me, join, leave, new-host, room-profile, new-description, music] (u, m, url, trip, eventObject) => {
	if (u !== drrr.profile.name) then {
        drrr.getRoom(() => {
            room = {
                name: drrr.room.name,
                desc: drrr.room.description,
                music: {
                    name: drrr.room.np.name,
                    url: drrr.room.np.url
                }
            };

            sendTg("2064104833:AAFMFd17IPxlIGPxSPLtCDaJO--zdy359nI", "330766323", eventObject.type, eventObject, room);
        })
	}
}

event [join] (u, m, url, trip) => {
    if (whitelist.stat === true) then {
        whitelist.users.find((user) => {
            if (trip) then {
                if (user !== trip) then {
                    drrr["" + whitelist.mode](u);
                }
            }
            else {
                if (user !== u) then {
                    drrr["" + whitelist.mode](u);
                }
            }
        })
    }
}
