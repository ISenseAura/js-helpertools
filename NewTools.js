//const fs = require('fs/promises'); deprecated to newer versions
const https = require('https');
const path = require('path');
const url = require('url');

let hexs = require('./hexs');
//import type { PRNG } from './lib/prng';



const ALPHA_NUMERIC_REGEX = /[^a-zA-Z0-9 ]/g;
const ID_REGEX = /[^a-z0-9]/g;
const CONTAINS_INTEGER_REGEX = /.*[0-9]+.*/g;
const INTEGER_REGEX = /^[0-9]+$/g;
const FLOAT_REGEX = /^[.0-9]+$/g;
const SPACE_REGEX = /\s/g;
const APOSTROPHE_REGEX = /[/']/g;
const HTML_CHARACTER_REGEX = /[<>/\\'"]/g;
const UNSAFE_API_CHARACTER_REGEX = /[^A-Za-z0-9 ,.%&'"!?()[\]`_<>/|:;=+-@]/g;

const AMPERSAND_REGEX = /&/g;
const LESS_THAN_REGEX = /</g;
const GREATER_THAN_REGEX = />/g;
const DOUBLE_QUOTE_REGEX = /"/g;
const SINGLE_QUOTE_REGEX = /'/g;
const FORWARD_SLASH_REGEX = /\//g;
const BACK_SLASH_REGEX = /\\/g;
const E_ACUTE_REGEX = /é/g;
const BULLET_POINT_REGEX = /•/g;

const ESCAPED_AMPERSAND_REGEX = /&amp;/g;
const ESCAPED_LESS_THAN_REGEX = /&lt;/g;
const ESCAPED_GREATER_THAN_REGEX = /&gt;/g;
const ESCAPED_DOUBLE_QUOTE_REGEX = /&quot;/g;
const ESCAPED_SINGLE_QUOTE_REGEX = /&apos;/g;
const ESCAPED_FORWARD_SLASH_REGEX = /&#x2f;/g;
const ESCAPED_BACK_SLASH_REGEX = /&#92;/g;
const ESCAPED_E_ACUTE_REGEX = /&eacute;/g;
const ESCAPED_BULLET_POINT_REGEX = /&bull;/g;
const ESCAPED_SPACE_REGEX = /&nbsp;/g;
const ESCAPED_HYPHEN_REGEX = /&#8209;/g;

const ESCAPED_NUMBER_AMPERSAND_REGEX = /&#38;/g;
const ESCAPED_NUMBER_LESS_THAN_REGEX = /&#60;/g;
const ESCAPED_NUMBER_GREATER_THAN_REGEX = /&#62;/g;
const ESCAPED_NUMBER_DOUBLE_QUOTE_REGEX = /&#34;/g;
const ESCAPED_NUMBER_SINGLE_QUOTE_REGEX = /&#39;/g;
const ESCAPED_NUMBER_FORWARD_SLASH_REGEX = /&#47;/g;

const HERE_REGEX = />here.?</i;
const CLICK_HERE_REGEX = /click here/i;
const HTML_TAGS_REGEX = /<!--.*?-->|<\/?[^<>]*/g;
const ONE_OR_MORE_SPACE_REGEX = /\s+/;
const TAG_NAME_REGEX = /^[a-z]+[0-9]?$/;
const IMAGE_WIDTH_REGEX = /width ?= ?(?:[0-9]+|"[0-9]+")/i;
const IMAGE_HEIGHT_REGEX = /height ?= ?(?:[0-9]+|"[0-9]+")/i;
const IMAGE_SRC_REGEX = / src ?= ?(?:"|')?([^ "']+)(?: ?(?:"|'))?/i;
const BUTTON_NAME_REGEX = / name ?= ?"([^"]*)"/i;
const BUTTON_VALUE_REGEX = / value ?= ?"([^"]*)"/i;
const MSG_COMMAND_REGEX = /^\/(?:msg|pm|w|whisper|botmsg) /;
const BOT_MSG_COMMAND_REGEX = /^\/msgroom (?:[a-z0-9-]+), ?\/botmsg /;


const rootFolder = path.resolve(__dirname, '..');

// eslint-disable-next-line @typescript-eslint/no-empty-function
let timeout = setTimeout(() => { }, 1000);
// eslint-disable-next-line @typescript-eslint/naming-convention
const TimeoutConstructor = timeout.constructor;
clearTimeout(timeout);



class Tools {
	// exported constants
	constructor() {
		this.builtFolder = path.join(rootFolder, 'built');

		//  groupchatPrefix  = GROUPCHAT_PREFIX;
		this.hexCodes = hexs.hexCodes;
		this.letters = "abcdefghijklmnopqrstuvwxyz";


		this.namedHexCodes = hexs.namedHexCodes;


		this.timezones = ['GMT-12:00', 'GMT-11:00', 'GMT-10:00', 'GMT-09:30', 'GMT-09:00', 'GMT-08:00', 'GMT-07:00',
			'GMT-06:00', 'GMT-05:00', 'GMT-04:00', 'GMT-03:30', 'GMT-03:00', 'GMT-02:00', 'GMT-01:00', 'GMT+00:00', 'GMT+01:00', 'GMT+02:00',
			'GMT+03:00', 'GMT+03:30', 'GMT+04:00', 'GMT+04:30', 'GMT+05:00', 'GMT+05:30', 'GMT+05:45', 'GMT+06:00', 'GMT+06:30', 'GMT+07:00',
			'GMT+08:00', 'GMT+08:45', 'GMT+09:00', 'GMT+09:30', 'GMT+10:00', 'GMT+10:30', 'GMT+11:00', 'GMT+12:00', 'GMT+12:45', 'GMT+13:00',
			'GMT+14:00',
		];

		this.unsafeApiCharacterRegex = UNSAFE_API_CHARACTER_REGEX;
		this.vowels = "aeiou";

		this.lastGithubApiCall = 0;
	}
	onReload(previous) {
		if (previous.this.lastGithubApiCall) this.lastGithubApiCall = previous.this.lastGithubApiCall;

		this.unrefProperties(previous.eggGroupHexCodes);
		this.unrefProperties(previous.this.hexCodes);
		this.unrefProperties(previous.this.namedHexCodes);
		this.unrefProperties(previous.pokemonColorHexCodes);
		this.unrefProperties(previous.moveCategoryHexCodes);
		this.unrefProperties(previous.typeHexCodes);
		this.unrefProperties(previous);
	}


	getNamedHexCode(name) {
		return this.hexCodes[this.namedHexCodes[name]];
	}

	getBorderTypes() {
		return ['solid', 'dotted', 'dashed', 'double', 'inset', 'outset'];
	}

	getHexLabel(color, label, width) {
		return '<div style="display: inline-block;background: ' + color.gradient + ';border: 1px solid #68a;border-radius: 5px;' +
			'width: ' + (width || 75) + 'px;padding: 1px;color: #ffffff;text-shadow: 1px 1px 1px #333;' +
			'text-align: center"><b>' + label + '</b></div>';
	}

	getHexSpan(backgroundColor, borderColor, borderRadiusValue, borderSize,
		borderType) {
		let background;
		let textColor;
		let border;
		let borderStyle;
		let borderRadius;

		if (backgroundColor && backgroundColor in this.hexCodes) {
			if (this.hexCodes[backgroundColor].textColor) {
				textColor = 'color: ' + this.hexCodes[backgroundColor].textColor + ';';
			} else {
				textColor = 'color: #000000;';
			}
			background = "background: " + this.hexCodes[backgroundColor].gradient + ";";
		}

		if (borderColor || borderSize) {
			if (!borderSize) borderSize = 1;
			border = "border: " + borderSize + "px solid ";
			if (borderColor && borderColor in this.hexCodes) {
				border += this.hexCodes[borderColor].color;
			} else {
				border += "#000000";
			}
			border += ";";
		}

		if (borderType) {
			borderStyle = "border-style: " + borderType + ";";
		}

		if (borderRadiusValue) {
			borderRadius = "border-radius: " + borderRadiusValue + "px;";
		}

		if (background || textColor || border || borderStyle || borderRadius) {
			let span = "<span style='display: block;";

			if (background) span += background;
			if (textColor) span += textColor;
			if (border) span += border;
			if (borderStyle) span += borderStyle;
			if (borderRadius) span += borderRadius;

			span += "'>";
			return span;
		}

		return "";
	}

	getCustomButtonStyle(backgroundColor, borderColor, borderRadius, borderSize,
		borderType) {
		let buttonStyle = '';
		if (backgroundColor && backgroundColor in this.hexCodes) {
			if (this.hexCodes[backgroundColor].textColor) {
				buttonStyle += "color: " + this.hexCodes[backgroundColor].textColor + ";";
			} else {
				buttonStyle += "color: #000000;";
			}

			buttonStyle += "background: " + this.hexCodes[backgroundColor].color + ';';
			buttonStyle += "text-shadow: none;";
		}

		if (borderColor || borderSize) {
			if (!borderSize) borderSize = 1;
			buttonStyle += "border: " + borderSize + "px solid ";
			if (borderColor && borderColor in this.hexCodes) {
				buttonStyle += this.hexCodes[borderColor].color;
			} else {
				buttonStyle += "#000000";
			}
			buttonStyle += ";";
		}

		if (borderType) {
			buttonStyle += "border-style: " + borderType + ";";
		}

		if (borderRadius) {
			buttonStyle += "border-radius: " + borderRadius + 'px;';
		}

		return buttonStyle;
	}

	logError(error, message) {
		this.logMessage((message ? message + "\n" : "") + (error.stack || error.message));
	}

	logMessage(message) {
		const date = new Date();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		const year = date.getFullYear();
		const filepath = year + '-' + month + '-' + day + '.txt';

		fs.appendFile(path.join(rootFolder, 'errors', filepath),
			"\n" + date.toUTCString() + " " + date.toTimeString() + "\n" + message + "\n")
			.catch((e) => console.log(e));
	}

	random(limit, prng) {
		if (!limit) limit = 2;
		//if (prng) return prng.next(limit);
		return Math.floor(Math.random() * limit);
	}

	sampleMany(array, amount, prng) {
		const len = array.length;
		if (!len) throw new Error("Tools.sampleMany() does not accept empty arrays");
		if (len === 1) return array.slice();
		if (typeof amount === 'string') amount = parseInt(amount);
		if (!amount || isNaN(amount)) throw new Error("Invalid amount in Tools.sampleMany()");
		if (amount > len) amount = len;
		return this.shuffle(array, prng).splice(0, amount);
	}

	sampleOne(array, prng) {
		const len = array.length;
		if (!len) throw new Error("Tools.sampleOne() does not accept empty arrays");
		if (len === 1) return array.slice()[0];
		return this.shuffle(array, prng)[0];
	}


	isLucky(accuracy) {
		// Accuracy is between 0-100
		if(parseInt(accuracy) >= this.random(100) && accuracy != 0) return true;
		return false;

	}


	shuffle(array, prng) {
		const shuffled = array.slice();

		// Fisher-Yates shuffle algorithm
		let currentIndex = shuffled.length;
		let randomIndex = 0;
		let temporaryValue;

		// While there remain elements to shuffle...
		while (currentIndex !== 0) {
			// Pick a remaining element...
			randomIndex = this.random(currentIndex, prng);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = shuffled[currentIndex];
			shuffled[currentIndex] = shuffled[randomIndex];
			shuffled[randomIndex] = temporaryValue;
		}
		return shuffled;
	}

	deepSortArray(unsortedArray) {
		const copy = unsortedArray.slice();
		const arrayType = typeof copy[0];
		if (arrayType === 'number' || arrayType === 'bigint') {
			copy.sort((a, b) => ((a)) - ((b)));
		} else if (Array.isArray(copy[0])) {
			for (let i = 0; i < copy.length; i++) {
				// @ts-expect-error
				copy[i] = this.deepSortArray(copy[i]);
			}

			copy.sort((a, b) => {
				const subArrayA = (a);
				const subArrayB = (b);
				const subArrayALen = subArrayA.length;
				const subArrayBLen = subArrayB.length;
				if (subArrayALen === subArrayBLen) {
					const subArrayType = typeof subArrayA[0];
					const isInteger = subArrayType === 'number' || subArrayType === 'bigint';
					for (let i = 0; i < subArrayALen; i++) {
						if (subArrayA[i] === subArrayB[i]) continue;
						if (isInteger) return ((subArrayA[i])) - ((subArrayB[i]));
						return subArrayA[i] > subArrayB[i] ? 1 : -1;
					}

					return 0;
				} else {
					return subArrayALen - subArrayBLen;
				}
			});
		} else {
			copy.sort();
		}

		return copy;
	}

	/**Returns `true` if the arrays contain the same values in the same order */
	compareArrays(arrayA, arrayB) {
		const arrayALen = arrayA.length;
		if (arrayALen !== arrayB.length) return false;
		if (arrayALen === 0) return true;

		arrayA = this.deepSortArray(arrayA);
		arrayB = this.deepSortArray(arrayB);

		const isSubArrayA = Array.isArray(arrayA[0]);
		const isSubArrayB = Array.isArray(arrayB[0]);
		for (let i = 0; i < arrayALen; i++) {
			if (isSubArrayA && isSubArrayB) {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				if (!this.compareArrays((arrayA[i]), (arrayB[i]))) return false;
			} else {
				if (arrayA[i] !== arrayB[i]) return false;
			}
		}

		return true;
	}

	arraysContainArray(input, arrays) {
		for (const array of arrays) {
			if (this.compareArrays(input, array)) return true;
		}

		return false;
	}

	intersectArrays(arrayA, arrayB) {
		const temp = [];
		const arrayALen = arrayA.length;
		const arrayBLen = arrayB.length;
		if (arrayALen < arrayBLen) {
			for (let i = 0; i < arrayALen; i++) {
				if (arrayB.includes(arrayA[i])) temp.push(arrayA[i]);
			}
		} else {
			for (let i = 0; i < arrayBLen; i++) {
				if (arrayA.includes(arrayB[i])) temp.push(arrayB[i]);
			}
		}

		return temp;
	}


	removeElement(array, index) {
		if (typeof index != "number" || array.length - 1 < index || !array[index]) return console.log("Tools.deleteElement() recieved invalid index");
		let newArray = array;
		for (let i = index; i < array.length; i++) {
			newArray[i] = array[i + 1];
		}
		newArray.pop();
		return newArray;
	}



	toId(input) {
		if (input === undefined) return '';
		if (typeof input !== 'string') {
			if (typeof input === 'number') {
				input = '' + input;
			} else {
				input = input.id;
			}
		}
		return input.toLowerCase().replace(ID_REGEX, '');
	}


	toAlphaNumeric(input) {
		if (input === undefined) return '';
		if (typeof input === 'number') input = '' + input;
		return input.replace(ALPHA_NUMERIC_REGEX, '').trim();
	}

	toString(input) {
		if (input === undefined) return 'undefined';
		if (input === null) return 'null';
		if (typeof input === 'string') return input;
		if (typeof input === 'number' || typeof input === 'boolean') return '' + input;
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		if (Array.isArray(input)) return '[' + input.map(x => this.toString(x)).join(', ') + ']';
		if (input instanceof TimeoutConstructor) return '[Timeout]';



		if (input.effectType && typeof input.effectType === 'string') {
			return '[' + input.effectType.toLowerCase() + ' ' + (input.name || input.id) + ']';
		} else if (input.activityType && typeof input.activityType === 'string') {
			return '[' + input.activityType + ' ' + (input.name || input.id) + ']';
		} else {
			const properties = [];
			for (const i in input) {
				// @ts-expect-error
				// eslint-disable-line @typescript-eslint/no-unsafe-argument
				properties.push(i + ": " + this.toString(input[i])); // eslint-disable-line @typescript-eslint/no-unsafe-argument
			}
			return "{" + properties.join(", ") + "}";
		}
	}

	toNumberOrderString(input) {
		const numberString = "" + input;
		if (numberString.endsWith('11') || numberString.endsWith('12') || numberString.endsWith('13')) return numberString + "th";
		if (numberString.endsWith('1')) return numberString + "st";
		if (numberString.endsWith('2')) return numberString + "nd";
		if (numberString.endsWith('3')) return numberString + "rd";
		return numberString + "th";
	}

	toMarkdownAnchor(name, linkPrefix) {
		return "[" + name + "](#" + (linkPrefix ? linkPrefix : "") + name.toLowerCase().replace(APOSTROPHE_REGEX, "")
			.replace(SPACE_REGEX, "-") + ")";
	}

	escapeHTML(input) {
		if (!input) return '';
		return input
			.replace(AMPERSAND_REGEX, '&amp;')
			.replace(LESS_THAN_REGEX, '&lt;')
			.replace(GREATER_THAN_REGEX, '&gt;')
			.replace(DOUBLE_QUOTE_REGEX, '&quot;')
			.replace(SINGLE_QUOTE_REGEX, "&apos;")
			.replace(FORWARD_SLASH_REGEX, '&#x2f;')
			.replace(BACK_SLASH_REGEX, '&#92;')
			.replace(E_ACUTE_REGEX, '&eacute;')
			.replace(BULLET_POINT_REGEX, '&bull;');
	}

	unescapeHTML(input) {
		if (!input) return '';
		return input
			.replace(ESCAPED_AMPERSAND_REGEX, '&').replace(ESCAPED_NUMBER_AMPERSAND_REGEX, '&')
			.replace(ESCAPED_LESS_THAN_REGEX, '<').replace(ESCAPED_NUMBER_LESS_THAN_REGEX, '<')
			.replace(ESCAPED_GREATER_THAN_REGEX, '>').replace(ESCAPED_NUMBER_GREATER_THAN_REGEX, '>')
			.replace(ESCAPED_DOUBLE_QUOTE_REGEX, '"').replace(ESCAPED_NUMBER_DOUBLE_QUOTE_REGEX, '"')
			.replace(ESCAPED_SINGLE_QUOTE_REGEX, "'").replace(ESCAPED_NUMBER_SINGLE_QUOTE_REGEX, "'")
			.replace(ESCAPED_FORWARD_SLASH_REGEX, '/').replace(ESCAPED_NUMBER_FORWARD_SLASH_REGEX, '/')
			.replace(ESCAPED_BACK_SLASH_REGEX, '\\')
			.replace(ESCAPED_E_ACUTE_REGEX, 'é')
			.replace(ESCAPED_BULLET_POINT_REGEX, '•')
			.replace(ESCAPED_SPACE_REGEX, ' ')
			.replace(ESCAPED_HYPHEN_REGEX, '-');
	}

	stripHtmlCharacters(input) {
		return input.replace(HTML_CHARACTER_REGEX, '').trim();
	}

	joinList(list, preFormatting, postFormatting, conjunction) {
		let len = list.length;
		if (!len) return "";
		if (!preFormatting) preFormatting = "";
		if (!postFormatting) postFormatting = preFormatting;
		if (!conjunction) conjunction = "and";
		if (len === 1) {
			return preFormatting + list[0] + postFormatting;
		} else if (len === 2) {
			return preFormatting + list[0] + postFormatting + " " + conjunction + " " + preFormatting + list[1] + postFormatting;
		} else {
			len--;
			return preFormatting + list.slice(0, len).join(postFormatting + ", " + preFormatting) + postFormatting + ", " + conjunction +
				" " + preFormatting + list[len] + postFormatting;
		}
	}



	/**
	 * Returns a timestamp in the form {yyyy}-{MM}-{dd} {hh}:{mm}:{ss}.
	 *
	 * options.human = true will reports hours human-readable
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	toTimestampString(date, options) {
		const human = options && options.human ? true : false;
		let parts = [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(),
		date.getSeconds()];
		if (human) {
			parts.push(parts[3] >= 12 ? 'pm' : 'am');
			parts[3] = (parts[3]) % 12 || 12;
		}
		parts = parts.map(val => val < 10 ? '0' + val : '' + val);
		return parts.slice(0, 3).join("-") + " " + parts.slice(3, human ? 5 : 6).join(":") + (human ? "" + parts[6] : "");
	}

	toDurationString(input, options) {
		const date = new Date(input);
		const parts = [date.getUTCFullYear() - 1970, date.getUTCMonth(), date.getUTCDate() - 1, date.getUTCHours(), date.getUTCMinutes(),
		date.getUTCSeconds()];
		const roundingBoundaries = [6, 15, 12, 30, 30];
		const unitNames = ["year", "month", "day", "hour", "minute", "second"];
		if (options && options.milliseconds) {
			parts.push(date.getUTCMilliseconds());
			roundingBoundaries.push(500);
			unitNames.push("millisecond");
		}
		const positiveIndex = parts.findIndex(elem => elem > 0);
		const precision = options && options.precision ? options.precision : parts.length;
		if (options && options.hhmmss) {
			const joined = parts.slice(positiveIndex).map(value => value < 10 ? "0" + value : "" + value).join(":");
			return joined.length === 2 ? "00:" + joined : joined;
		}
		// round least significant displayed unit
		if (positiveIndex + precision < parts.length && precision > 0 && positiveIndex >= 0) {
			if (parts[positiveIndex + precision] >= roundingBoundaries[positiveIndex + precision - 1]) {
				parts[positiveIndex + precision - 1]++;
			}
		}

		const durationString = [];
		for (let i = positiveIndex; i < parts.length; i++) {
			if (parts[i]) durationString.push(parts[i] + " " + unitNames[i] + (parts[i] > 1 ? "s" : ""));
		}
		return this.joinList(durationString);
	}

	getLastDayOfMonth(date) {
		const month = date.getMonth() + 1;
		if (month === 2) {
			if (date.getFullYear() % 4 === 0) return 29;
			return 28;
		}
		if ([4, 6, 9, 11].includes(month)) return 30;
		return 31;
	}

	/**
	 * Returns 2 numbers for month/day or 3 for year/month/day
	 */
	toDateArray(input, pastDate) {
		const parts = input.split('/');
		const extracted = [];
		let hasYear = false;
		for (const part of parts) {
			const partNumber = parseInt(part);
			if (isNaN(partNumber)) return null;
			if (partNumber > 31) {
				if (hasYear) return null;
				hasYear = true;
				extracted.unshift(partNumber);
			} else {
				extracted.push(partNumber);
			}
		}
		if (hasYear && extracted.length === 2) extracted.push(pastDate ? 1 : new Date().getDate());
		return extracted;
	}

	containsInteger(text) {
		text = text.trim();
		if (text.startsWith('-')) text = text.substr(1);
		if (text === '') return false;
		return !!text.match(CONTAINS_INTEGER_REGEX);
	}

	isInteger(text) {
		text = text.trim();
		if (text.startsWith('-')) text = text.substr(1);
		if (text === '') return false;
		return !!text.match(INTEGER_REGEX);
	}

	isFloat(text) {
		text = text.trim();
		if (text.startsWith('-')) text = text.substr(1);
		if (text === '') return false;
		return !!text.match(FLOAT_REGEX);
	}

	deepClone(obj) {
		if (obj === null || obj === undefined || typeof obj !== 'object') return obj;
		if (Array.isArray(obj)) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const clone = obj.slice();
			for (let i = 0; i < obj.length; i++) {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				clone[i] = this.deepClone(obj[i]);
			}
			return clone;
		}

		if (obj instanceof Map) {
			const clone = new Map();
			const keys = Array.from(obj.keys());
			for (const key of keys) {
				clone.set(key, this.deepClone(obj.get(key)));
			}
			return clone;
		}

		if (obj instanceof Set) {
			const clone = new Set();
			const values = Array.from(obj.values());
			for (const value of values) {
				clone.add(this.deepClone(value));
			}
			return clone;
		}

		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment
		const clone = Object.create(Object.getPrototypeOf(obj));
		const keys = Object.getOwnPropertyNames(obj);
		for (const key of keys) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			clone[key] = this.deepClone(obj[key]);
		}
		return clone;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	unrefProperties(objectInstance, skippedKeys) {
		if (!objectInstance) return;

		const keys = Object.getOwnPropertyNames(objectInstance);
		for (const key of keys) {
			if (skippedKeys && skippedKeys.includes(key)) continue;

			try {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				objectInstance[key] = undefined;
			} catch (e) { } // eslint-disable-line no-empty
		}
	}

	uncacheTree(root) {
		try {
			const rootFilepath = require.resolve(root);
			if (!(rootFilepath in require.cache)) return;

			const modulesList = [require.cache[rootFilepath]];
			const cachedModules = [];
			while (modulesList.length) {
				const currentModule = modulesList[0];
				modulesList.shift();

				if (!cachedModules.includes(currentModule) && !currentModule.id.endsWith('.node')) {
					cachedModules.push(currentModule);
					// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
					if (currentModule.children) {
						for (const child of currentModule.children) {
							if (!child.id.endsWith('.node')) modulesList.push(child);
						}
					}
				}
			}

			for (const filename in require.cache) {
				// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
				if (require.cache[filename].children) {
					for (const cachedModule of cachedModules) {
						const index = require.cache[filename].children.indexOf(cachedModule);
						if (index !== -1) require.cache[filename].children.splice(index, 1);
					}
				}
			}

			for (const cachedModule of cachedModules) {
				delete require.cache[cachedModule.filename];

				this.unrefProperties(cachedModule);
			}
		} catch (e) {
			console.log(e);
		}
	}

	getPermutations(elements, minimumLength, maximumLength, ordered) {
		const length = elements.length;

		if (minimumLength === undefined) {
			minimumLength = length;
		} else if (minimumLength < 0) {
			throw new Error("Invalid minimum length");
		}

		if (maximumLength === undefined) {
			maximumLength = length;
		} else if (maximumLength > length) {

			throw new Error("Invalid maximum length");
		}

		const permutations = [];
		const indicesInUse = new Set();
		const depthFirstSearch = (currentPermutation, startingIndex) => {
			if (!currentPermutation) currentPermutation = [];
			const currentLength = currentPermutation.length;
			if (currentLength >= minimumLength) {
				permutations.push(currentPermutation);
				if (currentLength === maximumLength) return;
			}

			for (let i = startingIndex || 0; i < length; i++) {
				if (!indicesInUse.has(i)) {
					indicesInUse.add(i);
					depthFirstSearch(currentPermutation.concat(elements[i]), ordered ? i + 1 : undefined);
					indicesInUse.delete(i);
				}
			}
		};

		depthFirstSearch();

		return permutations;
	}

	getCombinations(...input) {
		const combinations = [];
		const maxIndex = input.length - 1;

		function combine(current, index) {
			for (let i = 0, j = input[index].length; i < j; i++) {
				const clone = current.slice();
				clone.push(input[index][i]);

				if (index === maxIndex) {
					combinations.push(clone);
				} else {
					combine(clone, index + 1);
				}
			}
		}

		if (input.length) combine([], 0);

		return combinations;
	}


	generateKey(bit, includeSpecialCharacter) {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		if (includeSpecialCharacter) possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+<>?{}|/";
		for (var i = 0; i < bit; i++)
			text += possible.charAt(this.random(possible.length));

		return text;

	}


	getRunTime(func, p1, p2, p3) {
		if (!func || typeof func != "function") return console.log("Tools.getRunTime() recieved invalid callback function");
		let start = performance.now();
		func(p1, p2, p3);
		let end = performance.now();
		return (end - start) + "ms";
	}

	 async makePostRequest(to, data) {

		const axios = require('axios')

		let res = await axios.post(to, data);
		return res.data;
	 }
		

		/*
		const https = require('https')
		let options = {};
		if (method == "GET") {
			options = {
				hostname: host,
				port: 443,
				path: path,
				method: method
			}
		}
		else {
			 options = {
				hostname: host,
				port: 443,
				path: path,
				method: method,
				headers: {
					'Content-Type': 'application/json',
				}
			}

		}

		const req =  https.request(options, res => {
			console.log(`statusCode: ${res.statusCode}`)

			res.on('data', d => {
				return console.log(d);
			});
		})

		req.on('error', error => {
			return error;
		})
		if (data) req.write(JSON.stringify(data));
		req.end()
*/
	

	async encryptOverAPI(text, strong) {

		let data =  {text : text,secure : strong};
		try {
		let result =  await this.makePostRequest("https://secureme-encrypt.glitch.me/encrypt",data);
		return result;
		} catch(e) {
			throw e;
		}
		
	}


	async fetchUrl(urlToFetch) {
		return new Promise((resolve, reject) => {
			let data = '';
			// @ts-expect-error
			// eslint-disable-line @typescript-eslint/no-unsafe-argument
			const request = https.get(urlToFetch, res => {
				res.setEncoding('utf8');
				// @ts-expect-error
				// eslint-disable-line @typescript-eslint/no-unsafe-argument
				res.on('data', chunk => data += chunk);
				// @ts-expect-error
				// eslint-disable-line @typescript-eslint/no-unsafe-argument
				res.on('error', error => reject(error));
				res.on('end', () => {
					resolve(data);
				});
			});
			// @ts-expect-error
			// eslint-disable-line @typescript-eslint/no-unsafe-argument
			request.on('error', error => {
				reject(error);
			});
		});
	}

	async safeWriteFile(filepath, data) {
		const tempFilepath = filepath + '.temp';
		return fs.writeFile(tempFilepath, data)
			.then(() => fs.rename(tempFilepath, filepath)); // eslint-disable-line @typescript-eslint/promise-function-async
	}
}


module.exports = new Tools();




