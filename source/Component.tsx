import {createElement, Fragment, useMemo, useState} from 'react';
import WUA from 'node:process';

import {ExitPlanMode, Tools} from './tools.js';

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
          (G.push(Q), B.set(Z.serveZodArrayame, G));
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


var wN9 = (A, B = {}) => {
    let { stdin: Q, setRawMode: Z, internal_exitOnCtrlC: G, internal_eventEmitter: Y } = ok();
    (f00.useEffect(() => {
      if (B.isActive === !1) return;
      return (
        Z(!0),
        () => {
          Z(!1);
        }
      );
    }, [B.isActive, Z]),
      f00.useEffect(() => {
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
          if (X.length === 1 && typeof X[0] === 'string' && X[0].toUpperCase() === X[0])
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
      }, [B.isActive, Q, G, A]));
  },
  r0 = wN9;

function Zg1({tools: A, initialTools: B, onComplete: Q, onCancel: Z}) {
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
		r0((S, c) => {
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
		createElement(
			y,
			{
				flexDirection: 'column',
				marginTop: 1,
			},
			createElement(
				M,
				{
					color: J === 0 ? 'suggestion' : void 0,
					bold: J === 0,
				},
				J === 0 ? `${e0.pointer} ` : '  ',
				'[ Continue ]',
			),
			createElement(
				M,
				{
					dimColor: !0,
				},
				'─'.repeat(40),
			),
			O.slice(1).map((S, c) => {
				let u = c + 1 === J,
					o = S.isToggle,
					m = S.isHeader;
				return createElement(
					Fragment,
					{
						key: S.id,
					},
					o &&
						createElement(
							M,
							{
								dimColor: !0,
							},
							'─'.repeat(40),
						),
					m &&
						c > 0 &&
						createElement(y, {
							marginTop: 1,
						}),
					createElement(
						M,
						{
							color: m ? void 0 : u ? 'suggestion' : void 0,
							dimColor: m,
							bold: o && u,
						},
						m ? '' : u ? `${e0.pointer} ` : '  ',
						o ? `[ ${S.label} ]` : S.label,
					),
				);
			}),
			createElement(
				y,
				{
					marginTop: 1,
					flexDirection: 'column',
				},
				createElement(
					M,
					{
						dimColor: !0,
					},
					H ? 'All tools selected' : `${z.size} of ${G.length} tools selected`,
				),
			),
		)
	);
}
