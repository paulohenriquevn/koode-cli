import React, {
	createContext,
	createElement,
	Fragment,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import {Box, Text} from 'ink';
import WUA from 'node:process';
import {EventEmitter as EventEmitter} from 'node:events';
import react_reconciler from 'react-reconciler'; // PwA - React Reconcil
import {ExitPlanMode, Tools} from './tools.js';
import {join} from 'node:path';

var Task = 'Task';

var YO0 = new Set([ExitPlanMode.name, Task]);
var gwB = A => A.filter(B => !YO0.has(B.name));

function oe1(A) {
	return A.name?.startsWith('mcp__') || A.isMcp === !0;
}

function ue1() {
	let {env: A} = WUA,
		{TERM: B, TERM_PROGRAM: Q} = A;
	if (WUA.platform !== 'win32') return B !== 'linux';
	return (
		Boolean(A.WT_SESSION) ||
		Boolean(A.TERMINUS_SUBLIME) ||
		A.ConEmuTask === '{cmd::Cmder}' ||
		Q === 'Terminus-Sublime' ||
		Q === 'vscode' ||
		B === 'xterm-256color' ||
		B === 'alacritty' ||
		B === 'rxvt-unicode' ||
		B === 'rxvt-unicode-256color' ||
		A.TERMINAL_EMULATOR === 'JetBrains-JediTerm'
	);
}

var unicodeCharacters = {
	circleQuestionMark: '(?)',
	questionMarkPrefix: '(?)',
	square: '█',
	squareDarkShade: '▓',
	squareMediumShade: '▒',
	squareLightShade: '░',
	squareTop: '▀',
	squareBottom: '▄',
	squareLeft: '▌',
	squareRight: '▐',
	squareCenter: '■',
	bullet: '●',
	dot: '․',
	ellipsis: '…',
	pointerSmall: '›',
	triangleUp: '▲',
	triangleUpSmall: '▴',
	triangleDown: '▼',
	triangleDownSmall: '▾',
	triangleLeftSmall: '◂',
	triangleRightSmall: '▸',
	home: '⌂',
	heart: '♥',
	musicNote: '♪',
	musicNoteBeamed: '♫',
	arrowUp: '↑',
	arrowDown: '↓',
	arrowLeft: '←',
	arrowRight: '→',
	arrowLeftRight: '↔',
	arrowUpDown: '↕',
	almostEqual: '≈',
	notEqual: '≠',
	lessOrEqual: '≤',
	greaterOrEqual: '≥',
	identical: '≡',
	infinity: '∞',
	subscrippathero: '₀',
	subscriptOne: '₁',
	subscriptTwo: '₂',
	subscriptThree: '₃',
	subscriptFour: '₄',
	subscriptFive: '₅',
	subscriptSix: '₆',
	subscriptSeven: '₇',
	subscriptEight: '₈',
	subscriptNine: '₉',
	oneHalf: '½',
	oneThird: '⅓',
	oneQuarter: '¼',
	oneFifth: '⅕',
	oneSixth: '⅙',
	oneEighth: '⅛',
	twoThirds: '⅔',
	twoFifths: '⅖',
	threeQuarters: '¾',
	threeFifths: '⅗',
	threeEighths: '⅜',
	fourFifths: '⅘',
	fiveSixths: '⅚',
	fiveEighths: '⅝',
	sevenEighths: '⅞',
	line: '─',
	lineBold: '━',
	lineDouble: '═',
	lineDashed0: '┄',
	lineDashed1: '┅',
	lineDashed2: '┈',
	lineDashed3: '┉',
	lineDashed4: '╌',
	lineDashed5: '╍',
	lineDashed6: '╴',
	lineDashed7: '╶',
	lineDashed8: '╸',
	lineDashed9: '╺',
	lineDashed10: '╼',
	lineDashed11: '╾',
	lineDashed12: '−',
	lineDashed13: '–',
	lineDashed14: '‐',
	lineDashed15: '⁃',
	lineVertical: '│',
	lineVerticalBold: '┃',
	lineVerticalDouble: '║',
	lineVerticalDashed0: '┆',
	lineVerticalDashed1: '┇',
	lineVerticalDashed2: '┊',
	lineVerticalDashed3: '┋',
	lineVerticalDashed4: '╎',
	lineVerticalDashed5: '╏',
	lineVerticalDashed6: '╵',
	lineVerticalDashed7: '╷',
	lineVerticalDashed8: '╹',
	lineVerticalDashed9: '╻',
	lineVerticalDashed10: '╽',
	lineVerticalDashed11: '╿',
	lineDownLeft: '┐',
	lineDownLeftArc: '╮',
	lineDownBoldLeftBold: '┓',
	lineDownBoldLeft: '┒',
	lineDownLeftBold: '┑',
	lineDownDoubleLeftDouble: '╗',
	lineDownDoubleLeft: '╖',
	lineDownLeftDouble: '╕',
	lineDownRight: '┌',
	lineDownRightArc: '╭',
	lineDownBoldRightBold: '┏',
	lineDownBoldRight: '┎',
	lineDownRightBold: '┍',
	lineDownDoubleRightDouble: '╔',
	lineDownDoubleRight: '╓',
	lineDownRightDouble: '╒',
	lineUpLeft: '┘',
	lineUpLeftArc: '╯',
	lineUpBoldLeftBold: '┛',
	lineUpBoldLeft: '┚',
	lineUpLeftBold: '┙',
	lineUpDoubleLeftDouble: '╝',
	lineUpDoubleLeft: '╜',
	lineUpLeftDouble: '╛',
	lineUpRight: '└',
	lineUpRightArc: '╰',
	lineUpBoldRightBold: '┗',
	lineUpBoldRight: '┖',
	lineUpRightBold: '┕',
	lineUpDoubleRightDouble: '╚',
	lineUpDoubleRight: '╙',
	lineUpRightDouble: '╘',
	lineUpDownLeft: '┤',
	lineUpBoldDownBoldLeftBold: '┫',
	lineUpBoldDownBoldLeft: '┨',
	lineUpDownLeftBold: '┥',
	lineUpBoldDownLeftBold: '┩',
	lineUpDownBoldLeftBold: '┪',
	lineUpDownBoldLeft: '┧',
	lineUpBoldDownLeft: '┦',
	lineUpDoubleDownDoubleLeftDouble: '╣',
	lineUpDoubleDownDoubleLeft: '╢',
	lineUpDownLeftDouble: '╡',
	lineUpDownRight: '├',
	lineUpBoldDownBoldRightBold: '┣',
	lineUpBoldDownBoldRight: '┠',
	lineUpDownRightBold: '┝',
	lineUpBoldDownRightBold: '┡',
	lineUpDownBoldRightBold: '┢',
	lineUpDownBoldRight: '┟',
	lineUpBoldDownRight: '┞',
	lineUpDoubleDownDoubleRightDouble: '╠',
	lineUpDoubleDownDoubleRight: '╟',
	lineUpDownRightDouble: '╞',
	lineDownLeftRight: '┬',
	lineDownBoldLeftBoldRightBold: '┳',
	lineDownLeftBoldRightBold: '┯',
	lineDownBoldLeftRight: '┰',
	lineDownBoldLeftBoldRight: '┱',
	lineDownBoldLeftRightBold: '┲',
	lineDownLeftRightBold: '┮',
	lineDownLeftBoldRight: '┭',
	lineDownDoubleLeftDoubleRightDouble: '╦',
	lineDownDoubleLeftRight: '╥',
	lineDownLeftDoubleRightDouble: '╤',
	lineUpLeftRight: '┴',
	lineUpBoldLeftBoldRightBold: '┻',
	lineUpLeftBoldRightBold: '┷',
	lineUpBoldLeftRight: '┸',
	lineUpBoldLeftBoldRight: '┹',
	lineUpBoldLeftRightBold: '┺',
	lineUpLeftRightBold: '┶',
	lineUpLeftBoldRight: '┵',
	lineUpDoubleLeftDoubleRightDouble: '╩',
	lineUpDoubleLeftRight: '╨',
	lineUpLeftDoubleRightDouble: '╧',
	lineUpDownLeftRight: '┼',
	lineUpBoldDownBoldLeftBoldRightBold: '╋',
	lineUpDownBoldLeftBoldRightBold: '╈',
	lineUpBoldDownLeftBoldRightBold: '╇',
	lineUpBoldDownBoldLeftRightBold: '╊',
	lineUpBoldDownBoldLeftBoldRight: '╉',
	lineUpBoldDownLeftRight: '╀',
	lineUpDownBoldLeftRight: '╁',
	lineUpDownLeftBoldRight: '┽',
	lineUpDownLeftRightBold: '┾',
	lineUpBoldDownBoldLeftRight: '╂',
	lineUpDownLeftBoldRightBold: '┿',
	lineUpBoldDownLeftBoldRight: '╃',
	lineUpBoldDownLeftRightBold: '╄',
	lineUpDownBoldLeftBoldRight: '╅',
	lineUpDownBoldLeftRightBold: '╆',
	lineUpDoubleDownDoubleLeftDoubleRightDouble: '╬',
	lineUpDoubleDownDoubleLeftRight: '╫',
	lineUpDownLeftDoubleRightDouble: '╪',
	lineCross: '╳',
	lineBackslash: '╲',
	lineSlash: '╱',
};

var XUA = {
	tick: '✔',
	info: 'ℹ',
	warning: '⚠',
	cross: '✘',
	squareSmall: '◻',
	squareSmallFilled: '◼',
	circle: '◯',
	circleFilled: '◉',
	circleDotted: '◌',
	circleDouble: '◎',
	circleCircle: 'ⓞ',
	circleCross: 'ⓧ',
	circlePipe: 'Ⓘ',
	radioOn: '◉',
	radioOff: '◯',
	checkboxOn: '☒',
	checkboxOff: '☐',
	checkboxCircleOn: 'ⓧ',
	checkboxCircleOff: 'Ⓘ',
	pointer: '❯',
	triangleUpOutline: '△',
	triangleLeft: '◀',
	triangleRight: '▶',
	lozenge: '◆',
	lozengeOutline: '◇',
	hamburger: '☰',
	smiley: '㋡',
	mustache: '෴',
	star: '★',
	play: '▶',
	nodejs: '⬢',
	oneSeventh: '⅐',
	oneNinth: '⅑',
	oneTenth: '⅒',
};

var GD9 = {
	tick: '√',
	info: 'i',
	warning: '‼',
	cross: '×',
	squareSmall: '□',
	squareSmallFilled: '■',
	circle: '( )',
	circleFilled: '(*)',
	circleDotted: '( )',
	circleDouble: '( )',
	circleCircle: '(○)',
	circleCross: '(×)',
	circlePipe: '(│)',
	radioOn: '(*)',
	radioOff: '( )',
	checkboxOn: '[×]',
	checkboxOff: '[ ]',
	checkboxCircleOn: '(×)',
	checkboxCircleOff: '( )',
	pointer: '>',
	triangleUpOutline: '∆',
	triangleLeft: '◄',
	triangleRight: '►',
	lozenge: '♦',
	lozengeOutline: '◊',
	hamburger: '≡',
	smiley: '☺',
	mustache: '┌─┐',
	star: '✶',
	play: '►',
	nodejs: '♦',
	oneSeventh: '1/7',
	oneNinth: '1/9',
	oneTenth: '1/10',
};

var YD9 = {
	...unicodeCharacters,
	...XUA,
};

var ID9 = {
	...unicodeCharacters,
	...GD9,
};

var WD9 = ue1();
var JD9 = WD9 ? YD9 : ID9;
var e0 = JD9;

function jG5(A) {
	let B = new Map();
	return (
		A.forEach(Q => {
			if (oe1(Q)) {
				let Z = hk(Q.name);
				if (Z?.serveZodArrayame) {
					let G = B.get(Z.serveZodArrayame) || [];
					G.push(Q), B.set(Z.serveZodArrayame, G);
				}
			}
		}),
		Array.from(B.entries())
			.map(([Q, Z]) => ({
				serveZodArrayame: Q,
				tools: Z,
			}))
			.sort((Q, Z) => Q.serveZodArrayame.localeCompare(Z.serveZodArrayame))
	);
}

function hk(A) {
	let B = A.split('__'),
		[Q, Z, ...G] = B;
	if (Q !== 'mcp' || !Z) return null;
	let Y = G.length > 0 ? G.join('__') : void 0;
	return {
		serveZodArrayame: Z,
		tooShellErrorame: Y,
	};
}

var XNA = createContext({
	stdin: process.stdin,
	internal_eventEmitter: new EventEmitter(),
	setRawMode() {},
	isRawModeSupported: !1,
	internal_exitOnCtrlC: !0,
});

var U$1 = XNA;
var $N9 = () => useContext(U$1),
	ok = $N9;

var yNA = {
	OP: 'f1',
	OQ: 'f2',
	OR: 'f3',
	OS: 'f4',
	'[11~': 'f1',
	'[12~': 'f2',
	'[13~': 'f3',
	'[14~': 'f4',
	'[[A': 'f1',
	'[[B': 'f2',
	'[[C': 'f3',
	'[[D': 'f4',
	'[[E': 'f5',
	'[15~': 'f5',
	'[17~': 'f6',
	'[18~': 'f7',
	'[19~': 'f8',
	'[20~': 'f9',
	'[21~': 'f10',
	'[23~': 'f11',
	'[24~': 'f12',
	'[A': 'up',
	'[B': 'down',
	'[C': 'right',
	'[D': 'left',
	'[E': 'clear',
	'[F': 'end',
	'[H': 'home',
	OA: 'up',
	OB: 'down',
	OC: 'right',
	OD: 'left',
	OE: 'clear',
	OF: 'end',
	OH: 'home',
	'[1~': 'home',
	'[2~': 'insert',
	'[3~': 'delete',
	'[4~': 'end',
	'[5~': 'pageup',
	'[6~': 'pagedown',
	'[[5~': 'pageup',
	'[[6~': 'pagedown',
	'[7~': 'home',
	'[8~': 'end',
	'[a': 'up',
	'[b': 'down',
	'[c': 'right',
	'[d': 'left',
	'[e': 'clear',
	'[2$': 'insert',
	'[3$': 'delete',
	'[5$': 'pageup',
	'[6$': 'pagedown',
	'[7$': 'home',
	'[8$': 'end',
	Oa: 'up',
	Ob: 'down',
	Oc: 'right',
	Od: 'left',
	Oe: 'clear',
	'[2^': 'insert',
	'[3^': 'delete',
	'[5^': 'pageup',
	'[6^': 'pagedown',
	'[7^': 'home',
	'[8^': 'end',
	'[Z': 'tab',
};

var kNA = [...Object.values(yNA), 'backspace'];

import emojiRegex from 'emoji-regex';
var emojiRegexInstance = emojiRegex();

function m10({ onlyFirst: A = !1 } = {}) {
  let Q = [
    '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?(?:\\u0007|\\u001B\\u005C|\\u009C))',
    '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))',
  ].join('|');
  return new RegExp(Q, A ? void 0 : 'g');
}
var m$9 = m10();

function oI(A) {
  if (typeof A !== 'string') throw new TypeError(`Expected a \`string\`, got \`${typeof A}\``);
  return A.replace(m$9, '');
}

var c$9 = new Intl.Segmenter(),
  l$9 = /^\p{Default_Ignorable_Code_Point}$/u;

  function isAmbiguousWidth(A) {
  return (
    A === 161 ||
    A === 164 ||
    A === 167 ||
    A === 168 ||
    A === 170 ||
    A === 173 ||
    A === 174 ||
    (A >= 176 && A <= 180) ||
    (A >= 182 && A <= 186) ||
    (A >= 188 && A <= 191) ||
    A === 198 ||
    A === 208 ||
    A === 215 ||
    A === 216 ||
    (A >= 222 && A <= 225) ||
    A === 230 ||
    (A >= 232 && A <= 234) ||
    A === 236 ||
    A === 237 ||
    A === 240 ||
    A === 242 ||
    A === 243 ||
    (A >= 247 && A <= 250) ||
    A === 252 ||
    A === 254 ||
    A === 257 ||
    A === 273 ||
    A === 275 ||
    A === 283 ||
    A === 294 ||
    A === 295 ||
    A === 299 ||
    (A >= 305 && A <= 307) ||
    A === 312 ||
    (A >= 319 && A <= 322) ||
    A === 324 ||
    (A >= 328 && A <= 331) ||
    A === 333 ||
    A === 338 ||
    A === 339 ||
    A === 358 ||
    A === 359 ||
    A === 363 ||
    A === 462 ||
    A === 464 ||
    A === 466 ||
    A === 468 ||
    A === 470 ||
    A === 472 ||
    A === 474 ||
    A === 476 ||
    A === 593 ||
    A === 609 ||
    A === 708 ||
    A === 711 ||
    (A >= 713 && A <= 715) ||
    A === 717 ||
    A === 720 ||
    (A >= 728 && A <= 731) ||
    A === 733 ||
    A === 735 ||
    (A >= 768 && A <= 879) ||
    (A >= 913 && A <= 929) ||
    (A >= 931 && A <= 937) ||
    (A >= 945 && A <= 961) ||
    (A >= 963 && A <= 969) ||
    A === 1025 ||
    (A >= 1040 && A <= 1103) ||
    A === 1105 ||
    A === 8208 ||
    (A >= 8211 && A <= 8214) ||
    A === 8216 ||
    A === 8217 ||
    A === 8220 ||
    A === 8221 ||
    (A >= 8224 && A <= 8226) ||
    (A >= 8228 && A <= 8231) ||
    A === 8240 ||
    A === 8242 ||
    A === 8243 ||
    A === 8245 ||
    A === 8251 ||
    A === 8254 ||
    A === 8308 ||
    A === 8319 ||
    (A >= 8321 && A <= 8324) ||
    A === 8364 ||
    A === 8451 ||
    A === 8453 ||
    A === 8457 ||
    A === 8467 ||
    A === 8470 ||
    A === 8481 ||
    A === 8482 ||
    A === 8486 ||
    A === 8491 ||
    A === 8531 ||
    A === 8532 ||
    (A >= 8539 && A <= 8542) ||
    (A >= 8544 && A <= 8555) ||
    (A >= 8560 && A <= 8569) ||
    A === 8585 ||
    (A >= 8592 && A <= 8601) ||
    A === 8632 ||
    A === 8633 ||
    A === 8658 ||
    A === 8660 ||
    A === 8679 ||
    A === 8704 ||
    A === 8706 ||
    A === 8707 ||
    A === 8711 ||
    A === 8712 ||
    A === 8715 ||
    A === 8719 ||
    A === 8721 ||
    A === 8725 ||
    A === 8730 ||
    (A >= 8733 && A <= 8736) ||
    A === 8739 ||
    A === 8741 ||
    (A >= 8743 && A <= 8748) ||
    A === 8750 ||
    (A >= 8756 && A <= 8759) ||
    A === 8764 ||
    A === 8765 ||
    A === 8776 ||
    A === 8780 ||
    A === 8786 ||
    A === 8800 ||
    A === 8801 ||
    (A >= 8804 && A <= 8807) ||
    A === 8810 ||
    A === 8811 ||
    A === 8814 ||
    A === 8815 ||
    A === 8834 ||
    A === 8835 ||
    A === 8838 ||
    A === 8839 ||
    A === 8853 ||
    A === 8857 ||
    A === 8869 ||
    A === 8895 ||
    A === 8978 ||
    (A >= 9312 && A <= 9449) ||
    (A >= 9451 && A <= 9547) ||
    (A >= 9552 && A <= 9587) ||
    (A >= 9600 && A <= 9615) ||
    (A >= 9618 && A <= 9621) ||
    A === 9632 ||
    A === 9633 ||
    (A >= 9635 && A <= 9641) ||
    A === 9650 ||
    A === 9651 ||
    A === 9654 ||
    A === 9655 ||
    A === 9660 ||
    A === 9661 ||
    A === 9664 ||
    A === 9665 ||
    (A >= 9670 && A <= 9672) ||
    A === 9675 ||
    (A >= 9678 && A <= 9681) ||
    (A >= 9698 && A <= 9701) ||
    A === 9711 ||
    A === 9733 ||
    A === 9734 ||
    A === 9737 ||
    A === 9742 ||
    A === 9743 ||
    A === 9756 ||
    A === 9758 ||
    A === 9792 ||
    A === 9794 ||
    A === 9824 ||
    A === 9825 ||
    (A >= 9827 && A <= 9829) ||
    (A >= 9831 && A <= 9834) ||
    A === 9836 ||
    A === 9837 ||
    A === 9839 ||
    A === 9886 ||
    A === 9887 ||
    A === 9919 ||
    (A >= 9926 && A <= 9933) ||
    (A >= 9935 && A <= 9939) ||
    (A >= 9941 && A <= 9953) ||
    A === 9955 ||
    A === 9960 ||
    A === 9961 ||
    (A >= 9963 && A <= 9969) ||
    A === 9972 ||
    (A >= 9974 && A <= 9977) ||
    A === 9979 ||
    A === 9980 ||
    A === 9982 ||
    A === 9983 ||
    A === 10045 ||
    (A >= 10102 && A <= 10111) ||
    (A >= 11094 && A <= 11097) ||
    (A >= 12872 && A <= 12879) ||
    (A >= 57344 && A <= 63743) ||
    (A >= 65024 && A <= 65039) ||
    A === 65533 ||
    (A >= 127232 && A <= 127242) ||
    (A >= 127248 && A <= 127277) ||
    (A >= 127280 && A <= 127337) ||
    (A >= 127344 && A <= 127373) ||
    A === 127375 ||
    A === 127376 ||
    (A >= 127387 && A <= 127404) ||
    (A >= 917760 && A <= 917999) ||
    (A >= 983040 && A <= 1048573) ||
    (A >= 1048576 && A <= 1114109)
  );
}

function KqA(A) {
  return (
    (A >= 4352 && A <= 4447) ||
    A === 8986 ||
    A === 8987 ||
    A === 9001 ||
    A === 9002 ||
    (A >= 9193 && A <= 9196) ||
    A === 9200 ||
    A === 9203 ||
    A === 9725 ||
    A === 9726 ||
    A === 9748 ||
    A === 9749 ||
    (A >= 9776 && A <= 9783) ||
    (A >= 9800 && A <= 9811) ||
    A === 9855 ||
    (A >= 9866 && A <= 9871) ||
    A === 9875 ||
    A === 9889 ||
    A === 9898 ||
    A === 9899 ||
    A === 9917 ||
    A === 9918 ||
    A === 9924 ||
    A === 9925 ||
    A === 9934 ||
    A === 9940 ||
    A === 9962 ||
    A === 9970 ||
    A === 9971 ||
    A === 9973 ||
    A === 9978 ||
    A === 9981 ||
    A === 9989 ||
    A === 9994 ||
    A === 9995 ||
    A === 10024 ||
    A === 10060 ||
    A === 10062 ||
    (A >= 10067 && A <= 10069) ||
    A === 10071 ||
    (A >= 10133 && A <= 10135) ||
    A === 10160 ||
    A === 10175 ||
    A === 11035 ||
    A === 11036 ||
    A === 11088 ||
    A === 11093 ||
    (A >= 11904 && A <= 11929) ||
    (A >= 11931 && A <= 12019) ||
    (A >= 12032 && A <= 12245) ||
    (A >= 12272 && A <= 12287) ||
    (A >= 12289 && A <= 12350) ||
    (A >= 12353 && A <= 12438) ||
    (A >= 12441 && A <= 12543) ||
    (A >= 12549 && A <= 12591) ||
    (A >= 12593 && A <= 12686) ||
    (A >= 12688 && A <= 12773) ||
    (A >= 12783 && A <= 12830) ||
    (A >= 12832 && A <= 12871) ||
    (A >= 12880 && A <= 42124) ||
    (A >= 42128 && A <= 42182) ||
    (A >= 43360 && A <= 43388) ||
    (A >= 44032 && A <= 55203) ||
    (A >= 63744 && A <= 64255) ||
    (A >= 65040 && A <= 65049) ||
    (A >= 65072 && A <= 65106) ||
    (A >= 65108 && A <= 65126) ||
    (A >= 65128 && A <= 65131) ||
    (A >= 94176 && A <= 94180) ||
    A === 94192 ||
    A === 94193 ||
    (A >= 94208 && A <= 100343) ||
    (A >= 100352 && A <= 101589) ||
    (A >= 101631 && A <= 101640) ||
    (A >= 110576 && A <= 110579) ||
    (A >= 110581 && A <= 110587) ||
    A === 110589 ||
    A === 110590 ||
    (A >= 110592 && A <= 110882) ||
    A === 110898 ||
    (A >= 110928 && A <= 110930) ||
    A === 110933 ||
    (A >= 110948 && A <= 110951) ||
    (A >= 110960 && A <= 111355) ||
    (A >= 119552 && A <= 119638) ||
    (A >= 119648 && A <= 119670) ||
    A === 126980 ||
    A === 127183 ||
    A === 127374 ||
    (A >= 127377 && A <= 127386) ||
    (A >= 127488 && A <= 127490) ||
    (A >= 127504 && A <= 127547) ||
    (A >= 127552 && A <= 127560) ||
    A === 127568 ||
    A === 127569 ||
    (A >= 127584 && A <= 127589) ||
    (A >= 127744 && A <= 127776) ||
    (A >= 127789 && A <= 127797) ||
    (A >= 127799 && A <= 127868) ||
    (A >= 127870 && A <= 127891) ||
    (A >= 127904 && A <= 127946) ||
    (A >= 127951 && A <= 127955) ||
    (A >= 127968 && A <= 127984) ||
    A === 127988 ||
    (A >= 127992 && A <= 128062) ||
    A === 128064 ||
    (A >= 128066 && A <= 128252) ||
    (A >= 128255 && A <= 128317) ||
    (A >= 128331 && A <= 128334) ||
    (A >= 128336 && A <= 128359) ||
    A === 128378 ||
    A === 128405 ||
    A === 128406 ||
    A === 128420 ||
    (A >= 128507 && A <= 128591) ||
    (A >= 128640 && A <= 128709) ||
    A === 128716 ||
    (A >= 128720 && A <= 128722) ||
    (A >= 128725 && A <= 128727) ||
    (A >= 128732 && A <= 128735) ||
    A === 128747 ||
    A === 128748 ||
    (A >= 128756 && A <= 128764) ||
    (A >= 128992 && A <= 129003) ||
    A === 129008 ||
    (A >= 129292 && A <= 129338) ||
    (A >= 129340 && A <= 129349) ||
    (A >= 129351 && A <= 129535) ||
    (A >= 129648 && A <= 129660) ||
    (A >= 129664 && A <= 129673) ||
    (A >= 129679 && A <= 129734) ||
    (A >= 129742 && A <= 129756) ||
    (A >= 129759 && A <= 129769) ||
    (A >= 129776 && A <= 129784) ||
    (A >= 131072 && A <= 196605) ||
    (A >= 196608 && A <= 262141)
  );
}

function VqA(A) {
  return A === 12288 || (A >= 65281 && A <= 65376) || (A >= 65504 && A <= 65510);
}

function d$9(A) {
  if (!Number.isSafeInteger(A)) throw new TypeError(`Expected a code point, got \`${typeof A}\`.`);
}

function dU1(A, { ambiguousAsWide: B = !1 } = {}) {
  if ((d$9(A), VqA(A) || KqA(A) || (B && isAmbiguousWidth(A)))) return 2;
  return 1;
}

function getStringWidth(A, B = {}) {
  if (typeof A !== 'string' || A.length === 0) return 0;
  let { ambiguousIZodNeverarrow: Q = !0, countAnsiEscapeCodes: Z = !1 } = B;
  if (!Z) A = oI(A);
  if (A.length === 0) return 0;
  let G = 0,
    Y = {
      ambiguousAsWide: !Q,
    };
  for (let { segment: I } of c$9.segment(A)) {
    let W = I.codePointAt(0);
    if (W <= 31 || (W >= 127 && W <= 159)) continue;
    if ((W >= 8203 && W <= 8207) || W === 65279) continue;
    if (
      (W >= 768 && W <= 879) ||
      (W >= 6832 && W <= 6911) ||
      (W >= 7616 && W <= 7679) ||
      (W >= 8400 && W <= 8447) ||
      (W >= 65056 && W <= 65071)
    )
      continue;
    if (W >= 55296 && W <= 57343) continue;
    if (W >= 65024 && W <= 65039) continue;
    if (l$9.test(I)) continue;
    if (emojiRegexInstance.default().test(I)) {
      G += 2;
      continue;
    }
    G += dU1(W, Y);
  }
  return G;
}

function getMaxStringWidth(A) {
  let B = 0;
  for (let Q of A.split(`
`))
    B = Math.max(B, getStringWidth(Q));
  return B;
}

var CqA = {},
  p$9 = A => {
    if (A.length === 0)
      return {
        width: 0,
        height: 0,
      };
    let B = CqA[A];
    if (B) return B;
    let Q = getMaxStringWidth(A),
      Z = A.split(`
`).length;
    return (
      (CqA[A] = {
        width: Q,
        height: Z,
      }),
      {
        width: Q,
        height: Z,
      }
    );
  },
  d10 = p$9;

function normalizeTextLines(A, B, Q) {
  return String(A)
    .normalize()
    .replaceAll(
      `\r
`,
      `
`
    )
    .split(
      `
`
    )
    .map(Z => Aw9(Z, B, Q)).join(`
`);
}

var RqA = {},
  Qw9 = (A, B, Q) => {
    let Z = A + String(B) + String(Q),
      G = RqA[Z];
    if (G) return G;
    let Y = A;
    if (Q === 'wrap')
      Y = normalizeTextLines(A, B, {
        trim: !1,
        hard: !0,
      });
    else if (Q === 'wrap-trim')
      Y = normalizeTextLines(A, B, {
        trim: !0,
        hard: !0,
      });
    if (Q.startsWith('truncate')) {
      let I = 'end';
      if (Q === 'truncate-middle') I = 'middle';
      if (Q === 'truncate-start') I = 'start';
      Y = p10(A, B, {
        position: I,
      });
    }
    return ((RqA[Z] = Y), Y);
  },
  pk = Qw9;

var zoomWindow9 = function (A, B) {
    let Q = A.nodeName === '#text' ? A.nodeValue : nU1(A),
      Z = d10(Q);
    if (Z.width <= B) return Z;
    if (Z.width >= 1 && B > 0 && B < 1) return Z;
    let G = A.style?.textWrap ?? 'wrap',
      Y = pk(Q, B, G);
    return d10(Y);
};

var aU1 = A => {
    let B = {
      nodeName: A,
      style: {},
      attributes: {},
      childNodes: [],
      parentNode: void 0,
      yogaNode: A === 'ink-virtual-text' ? void 0 : yogaLayoutEngine.Node.create(),
    };
    if (A === 'ink-text') B.yogaNode?.setMeasureFunc(zoomWindow9.bind(null, B));
    return B;
};

var jqA = A => {
    if (!A?.parentNode) return;
    return A.yogaNode ?? jqA(A.parentNode);
};

var rU1 = A => {
    jqA(A)?.markDirty();
}

var B61 = (A, B) => {
    if (typeof B !== 'string') B = String(B);
    ((A.nodeValue = B), rU1(A));
};

const n10 = (A, B, Q) => {
    A.attributes[B] = Q;
}

var PqA = A => {
    let B = {
      nodeName: '#text',
      nodeValue: A,
      yogaNode: void 0,
      parentNode: void 0,
      style: {},
    };
    return (B61(B, A), B);
};

var n10 = (A, B, Q) => {
    A.attributes[B] = Q;
};

var a10 = (A, B) => {
    A.style = B;
}

var yogaConstants = {},
  $U1 = (yogaConstants.ALIGN_AUTO = 0),
  n41 = (yogaConstants.ALIGN_FLEX_START = 1),
  a41 = (yogaConstants.ALIGN_CENTER = 2),
  s41 = (yogaConstants.ALIGN_FLEX_END = 3),
  wU1 = (yogaConstants.ALIGN_STRETCH = 4),
  Ra = (yogaConstants.DISPLAY_FLEX = 0),
  dk = (yogaConstants.DISPLAY_NONE = 1),
  ZL = (yogaConstants.EDGE_LEFT = 0),
  ck = (yogaConstants.EDGE_TOP = 1),
  GL = (yogaConstants.EDGE_RIGHT = 2),
  lk = (yogaConstants.EDGE_BOTTOM = 3),
  qU1 = (yogaConstants.EDGE_START = 4),
  EU1 = (yogaConstants.EDGE_END = 5),
  r41 = (yogaConstants.EDGE_HORIZONTAL = 6),
  o41 = (yogaConstants.EDGE_VERTICAL = 7),
  t41 = (yogaConstants.EDGE_ALL = 8),
  NU1 = (yogaConstants.FLEX_DIRECTION_COLUMN = 0),
  LU1 = (yogaConstants.FLEX_DIRECTION_COLUMN_REVERSE = 1),
  MU1 = (yogaConstants.FLEX_DIRECTION_ROW = 2),
  OU1 = (yogaConstants.FLEX_DIRECTION_ROW_REVERSE = 3),
  RU1 = (yogaConstants.GUTTER_COLUMN = 0),
  TU1 = (yogaConstants.GUTTER_ROW = 1),
  PU1 = (yogaConstants.GUTTER_ALL = 2),
  jU1 = (yogaConstants.JUSTIFY_FLEX_START = 0),
  SU1 = (yogaConstants.JUSTIFY_CENTER = 1),
  yU1 = (yogaConstants.JUSTIFY_FLEX_END = 2),
  kU1 = (yogaConstants.JUSTIFY_SPACE_BETWEEN = 3),
  _U1 = (yogaConstants.JUSTIFY_SPACE_AROUND = 4),
  xU1 = (yogaConstants.JUSTIFY_SPACE_EVENLY = 5),
  vU1 = (yogaConstants.POSITION_TYPE_RELATIVE = 1),
  bU1 = (yogaConstants.POSITION_TYPE_ABSOLUTE = 2),
  fU1 = (yogaConstants.WRAP_NO_WRAP = 0),
  hU1 = (yogaConstants.WRAP_WRAP = 1),
  gU1 = (yogaConstants.WRAP_WRAP_REVERSE = 2);

var FuseSearch9 = (A, B) => {
    if ('position' in B) A.setPositionType(B.position === 'absolute' ? bU1 : vU1);
  },
  Iw9 = (A, B) => {
    if ('margin' in B) A.setMargin(t41, B.margin ?? 0);
    if ('marginX' in B) A.setMargin(r41, B.marginX ?? 0);
    if ('marginY' in B) A.setMargin(o41, B.marginY ?? 0);
    if ('marginLeft' in B) A.setMargin(qU1, B.marginLeft || 0);
    if ('marginRight' in B) A.setMargin(EU1, B.marginRight || 0);
    if ('marginTop' in B) A.setMargin(ck, B.marginTop || 0);
    if ('marginBottom' in B) A.setMargin(lk, B.marginBottom || 0);
  },
  Ww9 = (A, B) => {
    if ('padding' in B) A.setPadding(t41, B.padding ?? 0);
    if ('paddingX' in B) A.setPadding(r41, B.paddingX ?? 0);
    if ('paddingY' in B) A.setPadding(o41, B.paddingY ?? 0);
    if ('paddingLeft' in B) A.setPadding(ZL, B.paddingLeft || 0);
    if ('paddingRight' in B) A.setPadding(GL, B.paddingRight || 0);
    if ('paddingTop' in B) A.setPadding(ck, B.paddingTop || 0);
    if ('paddingBottom' in B) A.setPadding(lk, B.paddingBottom || 0);
  },
  Jw9 = (A, B) => {
    if ('flexGrow' in B) A.setFlexGrow(B.flexGrow ?? 0);
    if ('flexShrink' in B) A.setFlexShrink(typeof B.flexShrink === 'number' ? B.flexShrink : 1);
    if ('flexWrap' in B) {
      if (B.flexWrap === 'nowrap') A.setFlexWrap(fU1);
      if (B.flexWrap === 'wrap') A.setFlexWrap(hU1);
      if (B.flexWrap === 'wrap-reverse') A.setFlexWrap(gU1);
    }
    if ('flexDirection' in B) {
      if (B.flexDirection === 'row') A.setFlexDirection(MU1);
      if (B.flexDirection === 'row-reverse') A.setFlexDirection(OU1);
      if (B.flexDirection === 'column') A.setFlexDirection(NU1);
      if (B.flexDirection === 'column-reverse') A.setFlexDirection(LU1);
    }
    if ('flexBasis' in B)
      if (typeof B.flexBasis === 'number') A.setFlexBasis(B.flexBasis);
      else if (typeof B.flexBasis === 'string')
        A.setFlexBasisPercent(Number.parseInt(B.flexBasis, 10));
      else A.setFlexBasis(Number.NaN);
    if ('alignItems' in B) {
      if (B.alignItems === 'stretch' || !B.alignItems) A.setAlignItems(wU1);
      if (B.alignItems === 'flex-start') A.setAlignItems(n41);
      if (B.alignItems === 'center') A.setAlignItems(a41);
      if (B.alignItems === 'flex-end') A.setAlignItems(s41);
    }
    if ('alignSelf' in B) {
      if (B.alignSelf === 'auto' || !B.alignSelf) A.setAlignSelf($U1);
      if (B.alignSelf === 'flex-start') A.setAlignSelf(n41);
      if (B.alignSelf === 'center') A.setAlignSelf(a41);
      if (B.alignSelf === 'flex-end') A.setAlignSelf(s41);
    }
    if ('justifyContent' in B) {
      if (B.justifyContent === 'flex-start' || !B.justifyContent) A.setJustifyContent(jU1);
      if (B.justifyContent === 'center') A.setJustifyContent(SU1);
      if (B.justifyContent === 'flex-end') A.setJustifyContent(yU1);
      if (B.justifyContent === 'space-between') A.setJustifyContent(kU1);
      if (B.justifyContent === 'space-around') A.setJustifyContent(_U1);
      if (B.justifyContent === 'space-evenly') A.setJustifyContent(xU1);
    }
  },
  Xw9 = (A, B) => {
    if ('width' in B)
      if (typeof B.width === 'number') A.setWidth(B.width);
      else if (typeof B.width === 'string') A.setWidthPercent(Number.parseInt(B.width, 10));
      else A.setWidthAuto();
    if ('height' in B)
      if (typeof B.height === 'number') A.setHeight(B.height);
      else if (typeof B.height === 'string') A.setHeightPercent(Number.parseInt(B.height, 10));
      else A.setHeightAuto();
    if ('minWidth' in B)
      if (typeof B.minWidth === 'string') A.setMinWidthPercent(Number.parseInt(B.minWidth, 10));
      else A.setMinWidth(B.minWidth ?? 0);
    if ('minHeight' in B)
      if (typeof B.minHeight === 'string') A.setMinHeightPercent(Number.parseInt(B.minHeight, 10));
      else A.setMinHeight(B.minHeight ?? 0);
  },
  Fw9 = (A, B) => {
    if ('display' in B) A.setDisplay(B.display === 'flex' ? Ra : dk);
  },
  Vw9 = (A, B) => {
    if ('borderStyle' in B) {
      let Q = B.borderStyle ? 1 : 0;
      if (B.borderTop !== !1) A.setBorder(ck, Q);
      if (B.borderBottom !== !1) A.setBorder(lk, Q);
      if (B.borderLeft !== !1) A.setBorder(ZL, Q);
      if (B.borderRight !== !1) A.setBorder(GL, Q);
    }
  },
  Kw9 = (A, B) => {
    if ('gap' in B) A.setGap(PU1, B.gap ?? 0);
    if ('columnGap' in B) A.setGap(RU1, B.columnGap ?? 0);
    if ('rowGap' in B) A.setGap(TU1, B.rowGap ?? 0);
  },
  zw9 = (A, B = {}) => {
    (FuseSearch9(A, B),
      Iw9(A, B),
      Ww9(A, B),
      Jw9(A, B),
      Xw9(A, B),
      Fw9(A, B),
      Vw9(A, B),
      Kw9(A, B));
  },
  s10 = zw9;


var A61 = (A, B) => {
	if (B.yogaNode) B.parentNode?.yogaNode?.removeChild(B.yogaNode);
	B.parentNode = void 0;
	let Q = A.childNodes.indexOf(B);
	if (Q >= 0) A.childNodes.splice(Q, 1);
	if (A.nodeName === 'ink-text' || A.nodeName === 'ink-virtual-text') rU1(A);
}

var fEA = A => {
    (A?.unsetMeasureFunc(), A?.freeRecursive());
}


var bEA = (A, B) => {
    if (A === B) return;
    if (!A) return B;
    let Q = {},
      Z = !1;
    for (let G of Object.keys(A)) if (B ? !Object.hasOwn(B, G) : !0) ((Q[G] = void 0), (Z = !0));
    if (B) {
      for (let G of Object.keys(B)) if (B[G] !== A[G]) ((Q[G] = B[G]), (Z = !0));
    }
    return Z ? Q : void 0;
}


var sU1 = (A, B) => {
    if (B.parentNode) A61(B.parentNode, B);
    if (((B.parentNode = A), A.childNodes.push(B), B.yogaNode))
      A.yogaNode?.insertChild(B.yogaNode, A.yogaNode.getChildCount());
    if (A.nodeName === 'ink-text' || A.nodeName === 'ink-virtual-text') rU1(A);
}

var i10 = (A, B, Q) => {
    if (B.parentNode) A61(B.parentNode, B);
    B.parentNode = A;
    let Z = A.childNodes.indexOf(Q);
    if (Z >= 0) {
      if ((A.childNodes.splice(Z, 0, B), B.yogaNode)) A.yogaNode?.insertChild(B.yogaNode, Z);
      return;
    }
    if ((A.childNodes.push(B), B.yogaNode))
      A.yogaNode?.insertChild(B.yogaNode, A.yogaNode.getChildCount());
    if (A.nodeName === 'ink-text' || A.nodeName === 'ink-virtual-text') rU1(A);
}

var A61 = (A, B) => {
    if (B.yogaNode) B.parentNode?.yogaNode?.removeChild(B.yogaNode);
    B.parentNode = void 0;
    let Q = A.childNodes.indexOf(B);
    if (Q >= 0) A.childNodes.splice(Q, 1);
    if (A.nodeName === 'ink-text' || A.nodeName === 'ink-virtual-text') rU1(A);
}

var ug = react_reconciler.default({
	getRootHostContext: () => ({
		isInsideText: !1,
	}),
	prepareForCommit: () => null,
	preparePortalMount: () => null,
	clearContainer: () => !1,
	resetAfterCommit(A) {
		if (typeof A.onComputeLayout === 'function') A.onComputeLayout();
		if (A.isStaticDirty) {
			if (((A.isStaticDirty = !1), typeof A.onImmediateRender === 'function'))
				A.onImmediateRender();
			return;
		}
		if (typeof A.onRender === 'function') A.onRender();
	},
	getChildHostContext(A, B) {
		let Q = A.isInsideText,
			Z = B === 'ink-text' || B === 'ink-virtual-text';
		if (Q === Z) return A;
		return {
			isInsideText: Z,
		};
	},
	shouldSetTextContent: () => !1,
	createInstance(A, B, Q, Z) {
		if (Z.isInsideText && A === 'ink-box')
			throw new Error('<Box> can’t be nested inside <Text> component');
		let G = A === 'ink-text' && Z.isInsideText ? 'ink-virtual-text' : A,
			Y = aU1(G);
		for (let [I, W] of Object.entries(B)) {
			if (I === 'children') continue;
			if (I === 'style') {
				if ((a10(Y, W), Y.yogaNode)) s10(Y.yogaNode, W);
				continue;
			}
			if (I === 'internal_transform') {
				Y.internal_transform = W;
				continue;
			}
			if (I === 'internal_static') {
				Y.internal_static = !0;
				continue;
			}
			n10(Y, I, W);
		}
		return Y;
	},
	createTextInstance(A, B, Q) {
		if (!Q.isInsideText)
			throw new Error(
				`Text string "${A}" must be rendered inside <Text> component`,
			);
		return PqA(A);
	},
	resetTextContent() {},
	hideTextInstance(A) {
		B61(A, '');
	},
	unhideTextInstance(A, B) {
		B61(A, B);
	},
	getPublicInstance: A => A,
	hideInstance(A) {
		A.yogaNode?.setDisplay(dk);
	},
	unhideInstance(A) {
		A.yogaNode?.setDisplay(Ra);
	},
	appendInitialChild: sU1,
	appendChild: sU1,
	insertBefore: i10,
	finalizeInitialChildren(A, B, Q, Z) {
		if (A.internal_static) (Z.isStaticDirty = !0), (Z.staticNode = A);
		return !1;
	},
	isPrimaryRenderer: !0,
	supportsMutation: !0,
	supportsPersistence: !1,
	supportsHydration: !1,
	scheduleTimeout: setTimeout,
	cancelTimeout: clearTimeout,
	noTimeout: -1,
	getCurrentEventPriority: () => u10,
	beforeActiveInstanceBlur() {},
	afterActiveInstanceBlur() {},
	detachDeletedInstance() {},
	getInstanceFromNode: () => null,
	prepareScopeUpdate() {},
	getInstanceFromScope: () => null,
	appendChildToContainer: sU1,
	insertInContainerBefore: i10,
	removeChildFromContainer(A, B) {
		A61(A, B), fEA(B.yogaNode);
	},
	prepareUpdate(A, B, Q, Z, G) {
		if (A.internal_static) G.isStaticDirty = !0;
		let Y = bEA(Q, Z),
			I = bEA(Q.style, Z.style);
		if (!Y && !I) return null;
		return {
			props: Y,
			style: I,
		};
	},
	commitUpdate(A, B) {
		let {props: Q, style: Z} = B;
		if (Q)
			for (let [G, Y] of Object.entries(Q)) {
				if (G === 'style') {
					a10(A, Y);
					continue;
				}
				if (G === 'internal_transform') {
					A.internal_transform = Y;
					continue;
				}
				if (G === 'internal_static') {
					A.internal_static = !0;
					continue;
				}
				n10(A, G, Y);
			}
		if (Z && A.yogaNode) s10(A.yogaNode, Z);
	},
	commitTextUpdate(A, B, Q) {
		B61(A, Q);
	},
	removeChild(A, B) {
		A61(A, B), fEA(B.yogaNode);
	},
});

var wN9 = (A, B = {}) => {
	let {
		stdin: Q,
		setRawMode: Z,
		internal_exitOnCtrlC: G,
		internal_eventEmitter: Y,
	} = ok();
	useEffect(() => {
		if (B.isActive === !1) return;
		return (
			Z(!0),
			() => {
				Z(!1);
			}
		);
	}, [B.isActive, Z]),
		useEffect(() => {
			if (B.isActive === !1) return;
			let I = W => {
				let J = {
						upArrow: W.name === 'up',
						downArrow: W.name === 'down',
						leftArrow: W.name === 'left',
						rightArrow: W.name === 'right',
						pageDown: W.name === 'pagedown',
						pageUp: W.name === 'pageup',
						home: W.name === 'home',
						end: W.name === 'end',
						return: W.name === 'return',
						escape: W.name === 'escape',
						fn: W.fn,
						ctrl: W.ctrl,
						shift: W.shift,
						tab: W.name === 'tab',
						backspace: W.name === 'backspace',
						delete: W.name === 'delete',
						meta: W.meta || W.name === 'escape' || W.option,
					},
					X = W.ctrl ? W.name : W.sequence;
				if (X === void 0) return;
				if (W.name && kNA.includes(W.name)) X = '';
				if (X.startsWith('\x1B')) X = X.slice(1);
				if (
					X.length === 1 &&
					typeof X[0] === 'string' &&
					X[0].toUpperCase() === X[0]
				)
					J.shift = !0;
				if (!(X === 'c' && J.ctrl) || !G)
					ug.batchedUpdates(() => {
						A(X, J);
					});
			};
			return (
				Y?.on('input', I),
				() => {
					Y?.removeListener('input', I);
				}
			);
		}, [B.isActive, Q, G, A]);
};

//# Zg1 -> ToolSelector
/**
 *   Propósito:
  Interface interativa principal para seleção de ferramentas em agentes CLI.

  Props:
  - tools: A - Array de todas as ferramentas disponíveis
  - initialTools: B - Ferramentas pré-selecionadas (array ou ['*'])
  - onComplete: Q - Callback com ferramentas selecionadas finais
  - onCancel: Z - Callback para cancelar operação

  Estado Interno:
  - I, W - Ferramentas atualmente selecionadas
  - J, X - Índice da opção destacada no menu
  - F, V - Modo avançado (mostra ferramentas individuais)

  Funcionalidades Principais:

  1. Filtragem e Categorização

  - Remove ferramentas protegidas via gwB()
  - Agrupa ferramentas por categorias:
    - readOnly - Ferramentas de leitura
    - edit - Ferramentas de edição
    - execution - Ferramentas de execução
    - mcp - Ferramentas MCP (Model Context Protocol)
    - other - Outras ferramentas

  2. Interface de Seleção

  - Navegação por teclado: Setas ↑↓ para navegar
  - Seleção: Enter para alternar seleção
  - Cancelamento: Esc para cancelar ou voltar ao inicial
  - Modo avançado: Toggle para mostrar/ocultar opções detalhadas

  3. Opções de Menu

  - [ Continue ] - Confirma seleção atual
  - ☐/☑ All tools - Seleciona/deseleciona todas
  - ☐/☑ [Categoria] - Seleção por grupo
  - Show/Hide advanced options - Toggle modo avançado

  4. Modo Avançado

  - Servidores MCP: Agrupamento por servidor
  - Ferramentas individuais: Lista completa com checkboxes
  - Headers visuais: Separação clara entre seções

  5. Feedback Visual

  - Indicadores: ❯ para item ativo, ☐☑ para checkboxes
  - Separadores: Linhas ─ entre seções
  - Contador: "X of Y tools selected"
  - Cores: Destaque para item selecionado

  Estrutura de Interface:
  [ Continue ]
  ────────────────
  ☐ All tools
  ☐ Read-only tools
  ☐ Edit tools
  ☐ Execution tools
  ☐ MCP tools
  ☐ Other tools
  ────────────────
  [ Show advanced options ]

  5 of 20 tools selected

  Integração:
  - Usa hook wN9() para captura de teclado
  - Integra com sistema de categorização Tools()
  - Suporte completo a servidores MCP
  - Renderização com componentes Ink (Box, Text)

  O ToolSelector é o motor principal da seleção de ferramentas, oferecendo interface rica e navegação intuitiva para configuração granular de agentes.

 */
function ToolSelector({tools: A, initialTools: B, onComplete: Q, onCancel: Z}) {
	let G = useMemo(() => gwB(A), [A]),
		Y = B.includes('*') ? G.map(S => S.name) : B,
		[I, W] = useState(Y),
		[J, X] = useState(0),
		[F, V] = useState(!1),
		K = useMemo(() => {
			let S = new Set(G.map(c => c.name));
			return I.filter(c => S.has(c));
		}, [I, G]),
		z = new Set(K),
		H = K.length === G.length && G.length > 0,
		D = S => {
			if (!S) return;
			W(c => (c.includes(S) ? c.filter(u => u !== S) : [...c, S]));
		},
		C = (S, c) => {
			W(u => {
				if (c) {
					let o = S.filter(m => !u.includes(m));
					return [...u, ...o];
				} else return u.filter(o => !S.includes(o));
			});
		},
		q = () => {
			let S = G.map(o => o.name),
				u = K.length === S.length && S.every(o => K.includes(o)) ? ['*'] : K;
			Q(u);
		},
		E = useMemo(() => {
			let S = Tools(),
				c = {
					readOnly: [],
					edit: [],
					execution: [],
					mcp: [],
					other: [],
				};
			return (
				G.forEach(u => {
					if (oe1(u)) c.mcp.push(u);
					else if (S.READ_ONLY.toolNames.has(u.name)) c.readOnly.push(u);
					else if (S.EDIT.toolNames.has(u.name)) c.edit.push(u);
					else if (S.EXECUTION.toolNames.has(u.name)) c.execution.push(u);
					else if (u.name !== Task) c.other.push(u);
				}),
				c
			);
		}, [G]),
		L = S => {
			let u = S.filter(o => z.has(o.name)).length < S.length;
			return () => {
				let o = S.map(m => m.name);
				C(o, u);
			};
		},
		O = [];
	O.push({
		id: 'continue',
		label: 'Continue',
		action: q,
		isContinue: !0,
	}),
		O.push({
			id: 'bucket-all',
			label: `${H ? e0.checkboxOn : e0.checkboxOff} All tools`,
			action: () => {
				let S = G.map(c => c.name);
				C(S, !H);
			},
		});
	let R = Tools();
	[
		{
			id: 'bucket-readonly',
			name: R.READ_ONLY.name,
			tools: E.readOnly,
		},
		{
			id: 'bucket-edit',
			name: R.EDIT.name,
			tools: E.edit,
		},
		{
			id: 'bucket-execution',
			name: R.EXECUTION.name,
			tools: E.execution,
		},
		{
			id: 'bucket-mcp',
			name: R.MCP.name,
			tools: E.mcp,
		},
		{
			id: 'bucket-other',
			name: R.OTHER.name,
			tools: E.other,
		},
	].forEach(({id: S, name: c, tools: u}) => {
		if (u.length === 0) return;
		let m = u.filter(j => z.has(j.name)).length === u.length;
		O.push({
			id: S,
			label: `${m ? e0.checkboxOn : e0.checkboxOff} ${c}`,
			action: L(u),
		});
	});
	let k = O.length;
	O.push({
		id: 'toggle-individual',
		label: F ? 'Hide advanced options' : 'Show advanced options',
		action: () => {
			if ((V(!F), F && J > k)) X(k);
		},
		isToggle: !0,
	});
	let b = useMemo(() => jG5(G), [G]);
	if (F) {
		if (b.length > 0)
			O.push({
				id: 'mcp-servers-header',
				label: 'MCP Servers:',
				action: () => {},
				isHeader: !0,
			}),
				b.forEach(({serveZodArrayame: S, tools: c}) => {
					let o = c.filter(m => z.has(m.name)).length === c.length;
					O.push({
						id: `mcp-server-${S}`,
						label: `${o ? e0.checkboxOn : e0.checkboxOff} ${S} (${
							c.length
						} tool${c.length === 1 ? '' : 's'})`,
						action: () => {
							let m = c.map(j => j.name);
							C(m, !o);
						},
					});
				}),
				O.push({
					id: 'tools-header',
					label: 'Individual Tools:',
					action: () => {},
					isHeader: !0,
				});
		G.forEach(S => {
			let c = S.name;
			if (S.name.startsWith('mcp__')) {
				let u = hk(S.name);
				c = u ? `${u.tooShellErrorame} (${u.serveZodArrayame})` : S.name;
			}
			O.push({
				id: `tool-${S.name}`,
				label: `${z.has(S.name) ? e0.checkboxOn : e0.checkboxOff} ${c}`,
				action: () => D(S.name),
			});
		});
	}
	return (
		wN9((S, c) => {
			if (c.return) {
				let u = O[J];
				if (u && !u.isHeader) u.action();
			} else if (c.escape)
				if (Z) Z();
				else Q(B);
			else if (c.upArrow) {
				let u = J - 1;
				while (u > 0 && O[u]?.isHeader) u--;
				X(Math.max(0, u));
			} else if (c.downArrow) {
				let u = J + 1;
				while (u < O.length - 1 && O[u]?.isHeader) u++;
				X(Math.min(O.length - 1, u));
			}
		}),
		<Box flexDirection="column" marginTop={1}>
			<Text
				color={J === 0 ? 'suggestion' : undefined}
				bold={J === 0}
			>
				{J === 0 ? `${e0.pointer} ` : '  '}
				[ Continue ]
			</Text>
			<Text dimColor={true}>
				{'─'.repeat(40)}
			</Text>
			{O.slice(1).map((S, c) => {
				let u = c + 1 === J,
					o = S.isToggle,
					m = S.isHeader;
				return (
					<Fragment key={S.id}>
						{o && (
							<Text dimColor={true}>
								{'─'.repeat(40)}
							</Text>
						)}
						{m && c > 0 && (
							<Box marginTop={1} />
						)}
						<Text
							color={m ? undefined : u ? 'suggestion' : undefined}
							dimColor={m}
							bold={o && u}
						>
							{m ? '' : u ? `${e0.pointer} ` : '  '}
							{o ? `[ ${S.label} ]` : S.label}
						</Text>
					</Fragment>
				);
			})}
			<Box marginTop={1} flexDirection="column">
				<Text dimColor={true}>
					{H ? 'All tools selected' : `${z.size} of ${G.length} tools selected`}
				</Text>
			</Box>
		</Box>
	);
}

export  { ToolSelector, wN9, ok };