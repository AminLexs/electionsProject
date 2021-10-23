// Simple localization system
const locales = require('./stringsStore');

function localize(lang = 'ru', key) {
	return locales[lang][key] ? locales[lang][key] : locales[lang].nolocale;
}

module.exports = localize;
