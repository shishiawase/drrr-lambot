const https = require('https')
const sharp = require('sharp')
const Catbox = require('catbox.moe')
const fs = require('fs')

cat = new Catbox.Catbox("");

exports.charZoo = {
	'🥚': {
		Type: '🥚',
		Name: 'Яйцо',
		Desc: 'Ты всего лишь хуй пойми чье яйцо, жди вылупления. с:',
		Skills: {
			Pass: {
				1: {
					Name: 'Попробуй выжить',
					Desc: 'Шанс в 10% умереть каждые 3 часа в течение 24 часов, пока не вылупишься. Good luck~'
				}
			}
		}
	},
	'💀': {
		Type: '💀',
		Name: 'Умерчик',
		Desc: 'Как бы печально это ни было, но ты мертв, но на этом ничего не заканчивается..)'
	},
	'🦒': {
		Type: '🦒',
		Name: 'Жираф',
		Desc: 'Самый длинный на районе, даже птицы боятся этого зверя, хоть он и травоядный, но ебнуть может.'
	},
	'🦓': {
		Type: '🦓',
		Name: 'Зебра',
		Desc: 'Мазохистическая натура зебры сделала из этого зверя пешеходный переход и по совместительству фут-фетешиста, каждый день ждет и надеется почувствовать на себе чьи-нибудь ноги, лапы..'
	},
	'🦌': {
		Type: '🦌',
		Name: 'Олень',
		Desc: 'Любитель дорог, губитель водителей. Любит свежий обдувающий ветерок от проезжавших машин и не прочь потереться об их же бампер на полной скорости.'
	},
	'🦘': {
		Type: '🦘',
		Name: 'Кенгуру',
		Desc: 'Лучше держаться от них подальше, они дерганные как спортсмены под допингом, в один момент ты смеешься с ними, а в другой тебя уже писдят боксеры. Ваше здоровье!'
	},
	'🦥': {
		Type: '🦥',
		Name: 'Ленивец',
		Desc: 'Ленивец слишком ленив для описания.'
	},
	'🦦': {
		Type: '🦦',
		Name: 'Выдра',
		Desc: 'Аквалангисты животного мира, если ты рыба знай, они доберутся до тебя.'
	},
	'🦝': {
		Type: '🦝',
		Name: 'Енот',
		Desc: 'Гильдия воров по сравнению с ними отдыхает, тащут все, что не так лежит, а если не тащат, то разбивают к хуям.'
	},
	'🐢': {
		Type: '🐢',
		Name: 'Черепаха',
		Desc: 'Никогда не доверяйте черепахе, когда она говорит, что медленная.. Стоит только сказать, что уронили чирик и вы будете шокированы скоростью ее реакции.'
	},
	'🐍': {
		Type: '🐍',
		Name: 'Змея',
		Desc: ''
	},
	'🦎': {
		Type: '🦎',
		Name: 'Ящерица',
		Desc: ''
	},
	'🐅': {
		Type: '🐅',
		Name: 'Тигр',
		Desc: ''
	},
	'🐆': {
		Type: '🐆',
		Name: 'Леопард',
		Desc: ''
	},
	'🐪': {
		Type: '🐪',
		Name: 'Верблюд',
		Desc: ''
	},
	'🦙': {
		Type: '🦙',
		Name: 'Лама',
		Desc: ''
	},
	'🐘': {
		Type: '🐘',
		Name: 'Слон',
		Desc: ''
	},
	'🦏': {
		Type: '🦏',
		Name: 'Носорог',
		Desc: ''
	},
	'🦛': {
		Type: '🦛',
		Name: 'Бегемот',
		Desc: ''
	},
	'🐐': {
		Type: '🐐',
		Name: 'Коза',
		Desc: ''
	},
	'🐏': {
		Type: '🐏',
		Name: 'Баран',
		Desc: ''
	},
	'🐑': {
		Type: '🐑',
		Name: 'Овца',
		Desc: ''
	},
	'🐎': {
		Type: '🐎',
		Name: 'Лошадь',
		Desc: ''
	},
	'🐃': {
		Type: '🐃',
		Name: 'Буйвол',
		Desc: ''
	},
	'🐂': {
		Type: '🐂',
		Name: 'Бык',
		Desc: ''
	},
	'🐄': {
		Type: '🐄',
		Name: 'Корова',
		Desc: ''
	},
	'🐖': {
		Type: '🐖',
		Name: 'Свинья',
		Desc: ''
	},
	'🦇': {
		Type: '🦇',
		Name: 'Летучая мышь',
		Desc: ''
	},
	'🐒': {
		Type: '🐒',
		Name: 'Обезьяна',
		Desc: ''
	},
	'🦍': {
		Type: '🦍',
		Name: 'Горилла',
		Desc: ''
	},
	'🦧': {
		Type: '🦧',
		Name: 'Орангутан',
		Desc: ''
	},
	'🐝': {
		Type: '🐝',
		Name: 'Пчела',
		Desc: ''
	},
	'🐛': {
		Type: '🐛',
		Name: 'Гусенница',
		Desc: ''
	},
	'🦋': {
		Type: '🦋',
		Name: 'Бабочка',
		Desc: ''
	},
	'🐌': {
		Type: '🐌',
		Name: 'Улитка',
		Desc: ''
	},
	'🐞': {
		Type: '🐞',
		Name: 'Божья коровка',
		Desc: ''
	},
	'🐜': {
		Type: '🐜',
		Name: 'Муравей',
		Desc: ''
	},
	'🦗': {
		Type: '🦗',
		Name: 'Крикет',
		Desc: ''
	},
	'🕷': {
		Type: '🕷',
		Name: 'Паук',
		Desc: ''
	},
	'🦂': {
		Type: '🦂',
		Name: 'Скорпион',
		Desc: ''
	},
	'🦟': {
		Type: '🦟',
		Name: 'Комар',
		Desc: ''
	},
	'🦁': {
		Type: '🦁',
		Name: 'Лев',
		Desc: ''
	},
	'🐨': {
		Type: '🐨',
		Name: 'Коала',
		Desc: ''
	},
	'🐼': {
		Type: '🐼',
		Name: 'Панда',
		Desc: ''
	},
	'🐻': {
		Type: '🐻',
		Name: 'Медведь',
		Desc: ''
	},
	'🐹': {
		Type: '🐹',
		Name: 'Хомяк',
		Desc: ''
	},
	'🐗': {
		Type: '🐗',
		Name: 'Кабан',
		Desc: ''
	},
	'🦊': {
		Type: '🦊',
		Name: 'Лиса',
		Desc: ''
	},
	'🐺': {
		Type: '🐺',
		Name: 'Волк',
		Desc: ''
	},
	'🐣': {
		Type: '🐣',
		Name: 'Вылупившийся цыпленок',
		Desc: ''
	},
	'🐥': {
		Type: '🐥',
		Name: 'Цыпленок',
		Desc: ''
	},
	'🐦': {
		Type: '🐦',
		Name: 'Птица',
		Desc: ''
	},
	'🐧': {
		Type: '🐧',
		Name: 'Пингвин',
		Desc: ''
	},
	'🐔': {
		Type: '🐔',
		Name: 'Курица',
		Desc: ''
	},
	'🐸': {
		Type: '🐸',
		Name: 'Лягушка',
		Desc: ''
	},
	'🐊': {
		Type: '🐊',
		Name: 'Крокодил',
		Desc: ''
	},
	'🐋': {
		Type: '🐋',
		Name: 'Кит',
		Desc: ''
	},
	'🦈': {
		Type: '🦈',
		Name: 'Акула',
		Desc: ''
	},
	'🐬': {
		Type: '🐬',
		Name: 'Дельфин',
		Desc: ''
	},
	'🐡': {
		Type: '🐡',
		Name: 'Иглобрюх',
		Desc: ''
	},
	'🐟': {
		Type: '🐟',
		Name: 'Обычная рыба',
		Desc: ''
	},
	'🐠': {
		Type: '🐠',
		Name: 'Тропическая рыба',
		Desc: ''
	},
	'🦪': {
		Type: '🦪',
		Name: 'Устрица',
		Desc: ''
	},
	'🦐': {
		Type: '🦐',
		Name: 'Креветка',
		Desc: ''
	},
	'🦀': {
		Type: '🦀',
		Name: 'Краб',
		Desc: ''
	},
	'🦞': {
		Type: '🦞',
		Name: 'Омар',
		Desc: ''
	},
	'🦑': {
		Type: '🦑',
		Name: 'Кальмар',
		Desc: ''
	},
	'🐙': {
		Type: '🐙',
		Name: 'Осьминог',
		Desc: ''
	},
	'🐓': {
		Type: '🐓',
		Name: 'Петух',
		Desc: ''
	},
	'🦃': {
		Type: '🦃',
		Name: 'Индюшка',
		Desc: ''
	},
	'🕊': {
		Type: '🕊',
		Name: 'Голубь',
		Desc: ''
	},
	'🦅': {
		Type: '🦅',
		Name: 'Орел',
		Desc: ''
	},
	'🦆': {
		Type: '🦆',
		Name: 'Утка',
		Desc: ''
	},
	'🦢': {
		Type: '🦢',
		Name: 'Лебедь',
		Desc: ''
	},
	'🦉': {
		Type: '🦉',
		Name: 'Сова',
		Desc: ''
	},
	'🦩': {
		Type: '🦩',
		Name: 'Фламинго',
		Desc: ''
	},
	'🦚': {
		Type: '🦚',
		Name: 'Павлин',
		Desc: ''
	},
	'🦜': {
		Type: '🦜',
		Name: 'Попугай',
		Desc: ''
	},
	'🐕': {
		Type: '🐕',
		Name: 'Собака',
		Desc: ''
	},
	'🐩': {
		Type: '🐩',
		Name: 'Пудель',
		Desc: ''
	},
	'🐈': {
		Type: '🐈',
		Name: 'Кошка',
		Desc: ''
	},
	'🐇': {
		Type: '🐇',
		Name: 'Кролик',
		Desc: ''
	},
	'🐀': {
		Type: '🐀',
		Name: 'Крыса',
		Desc: ''
	},
	'🐁': {
		Type: '🐁',
		Name: 'Мышь',
		Desc: ''
	},
	'🐿': {
		Type: '🐿',
		Name: 'Бурундук',
		Desc: ''
	},
	'🦨': {
		Type: '🦨',
		Name: 'Скунс',
		Desc: ''
	},
	'🦡': {
		Type: '🦡',
		Name: 'Барсук',
		Desc: ''
	},
	'🦔': {
		Type: '🦔',
		Name: 'Еж',
		Desc: ''
	}
};

exports.chanceDrop = (one, two) => {

	const items = [
		{
			bool: 0,
			dropChance: one
		},
		{
			boll: 1,
			dropChance: two
		}
	];

	lerp = (min, max, value) => ((1 - value) * min + value * max);
	total = items.reduce((accumulator, item) => (accumulator += item.dropChance), 0);
	const chance = lerp(0, total, Math.random());

	let current = 0;

	for (const item of items) {
		if (current <= chance && chance < current + item.dropChance) {
			return item.bool;
		}

		current += item.dropChance;
	}
};

exports.StickCon = (url, call) => {

	let file = fs.createWriteStream('file.webp');
  let request = https.get(url, (response) => {
    response.pipe(file);
		setTimeout(() => sharp('file.webp')
		  .resize({ width: 200 })
			.toFile('file.png', () => {
				sharp.cache(false);
				cat.upload('file.png').then(url => call(url)).catch(err => call("error"));
			}), 1000);
	});

}
