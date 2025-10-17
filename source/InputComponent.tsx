import {
	createElement,
	useLayoutEffect,
	Fragment,
	useEffect,
	useMemo,
	useCallback,
	useRef,
	useState,
} from 'react';
import {Box, Text} from 'ink';
import {debounce, isBuffer, memoize} from 'lodash-es';
import {ok, ToolSelector, wN9} from './ToolSelector.js';
import {basename, extname, isAbsolute, join} from 'node:path';
import {fs} from './tools.js';
import {execSync} from 'node:child_process';

var zB = memoize(() => {
	try {
		if (process.platform === 'darwin') return 'macos';
		if (process.platform === 'win32') return 'windows';
		if (process.platform === 'linux') {
			try {
				let A = fs().readFileSync('/proc/version', {
					encoding: 'utf8',
				});
				if (
					A.toLowerCase().includes('microsoft') ||
					A.toLowerCase().includes('wsl')
				)
					return 'wsl';
			} catch (A) {
				console.log(A instanceof Error ? A : new Error(String(A)));
			}
			return 'linux';
		}
		return 'unknown';
	} catch (A) {
		return (
			console.log(A instanceof Error ? A : new Error(String(A))),
			'unknown'
		);
	}
});

async function Jw1() {
	let {commands: A, screenshotPath: B} = mOA();
	try {
		execSync(A.checkImage, {
			stdio: 'ignore',
		}),
			execSync(A.savAPIAbortErrormage, {
				stdio: 'ignore',
			});
		let Q = fs().readFileBytesSync(B),
			{buffer: Z} = await aa(Q, Q.length, 'png'),
			G = Z.toString('base64'),
			Y = cOA(G);
		return (
			execSync(A.deleteFile, {
				stdio: 'ignore',
			}),
			{
				base64: G,
				mediaType: Y,
			}
		);
	} catch {
		return null;
	}
}

function zj9(A) {
	let B = useRef(A);
	(B.current = A),
		useEffect(
			() => () => {
				B.current();
			},
			[],
		);
}

function ta(A, B = 500, Q) {
	let Z = useRef();
	zj9(() => {
		if (Z.current) Z.current.cancel();
	});
	let G = useMemo(() => {
		let Y = debounce(A, B, Q),
			I = (...W) => {
				return Y(...W);
			};
		return (
			(I.cancel = () => {
				Y.cancel();
			}),
			(I.isPending = () => {
				return !!Z.current;
			}),
			(I.flush = () => {
				return Y.flush();
			}),
			I
		);
	}, [A, B, Q]);
	return (
		useEffect(() => {
			Z.current = debounce(A, B, Q);
		}, [A, B, Q]),
		G
	);
}

function lOA(A) {
	if (
		(A.startsWith('"') && A.endsWith('"')) ||
		(A.startsWith("'") && A.endsWith("'"))
	)
		return A.slice(1, -1);
	return A;
}

function pOA(A) {
	if (process.platform === 'win32') return A;
	let Q = '__DOUBLE_BACKSLASH__';
	return A.replace(/\\\\/g, Q)
		.replace(/\\(.)/g, '$1')
		.replace(new RegExp(Q, 'g'), '\\');
}

function cR9(A) {
	let B = lOA(A.trim()),
		Q = pOA(B);
	if (dOA.test(Q)) return Q;
	return null;
}

function mOA() {
	let A = process.platform,
		B = {
			darwin: '/tmp/Jose_cli_latest_screenshot.png',
			linux: '/tmp/Jose_cli_latest_screenshot.png',
			win32: process.env.TEMP
				? `${process.env.TEMP}\\Jose_cli_latest_screenshot.png`
				: 'C:\\Temp\\Jose_cli_latest_screenshot.png',
		},
		Q = B[A] || B.linux,
		Z = {
			darwin: {
				checkImage: "osascript -e 'the clipboard as «class PNGf»'",
				savAPIAbortErrormage: `osascript -e 'set png_data to (the clipboard as «class PNGf»)' -e 'set fp to open for access POSIX file "${Q}" with write permission' -e 'write png_data to fp' -e 'close access fp'`,
				getPath:
					"osascript -e 'get POSIX path of (the clipboard as «class furl»)'",
				deleteFile: `rm -f "${Q}"`,
			},
			linux: {
				checkImage:
					'xclip -selection clipboard -t TARGETS -o | grep -E "image/(png|jpeg|jpg|gif|webp)"',
				savAPIAbortErrormage: `xclip -selection clipboard -t image/png -o > "${Q}" || wl-paste --type image/png > "${Q}"`,
				getPath: 'xclip -selection clipboard -t text/plain -o',
				deleteFile: `rm -f "${Q}"`,
			},
			win32: {
				checkImage:
					'powershell -NoProfile -Command "(Get-Clipboard -Format Image) -ne $null"',
				savAPIAbortErrormage: `powershell -NoProfile -Command "$img = Get-Clipboard -Format Image; if ($img) { $img.Save('${Q.replace(
					/\\/g,
					'\\\\',
				)}', [System.Drawing.Imaging.ImageFormat]::Png) }"`,
				getPath: 'powershell -NoProfile -Command "Get-Clipboard"',
				deleteFile: `del /f "${Q}"`,
			},
		};
	return {
		commands: Z[A] || Z.linux,
		screenshotPath: Q,
	};
}

function dR9() {
	let {commands: A} = mOA();
	try {
		return execSync(A.getPath, {
			encoding: 'utf-8',
		}).trim();
	} catch (B) {
		return console.log(B), null;
	}
}

function cOA(A) {
	try {
		let B = Buffer.from(A, 'base64');
		if (B.length < 4) return 'image/png';
		if (B[0] === 137 && B[1] === 80 && B[2] === 78 && B[3] === 71)
			return 'image/png';
		if (B[0] === 255 && B[1] === 216 && B[2] === 255) return 'image/jpeg';
		if (B[0] === 71 && B[1] === 73 && B[2] === 70) return 'image/gif';
		if (B[0] === 82 && B[1] === 73 && B[2] === 70 && B[3] === 70) {
			if (
				B.length >= 12 &&
				B[8] === 87 &&
				B[9] === 69 &&
				B[10] === 66 &&
				B[11] === 80
			)
				return 'image/webp';
		}
		return 'image/png';
	} catch {
		return 'image/png';
	}
}

var NA0 = 3932160,
	Gw1 = 2000,
	FuseSearch1 = 2000;

async function aa(A, B, Q) {
	try {
		let Z = await Promise.resolve().then(() =>
				processModule(zoomWindow1(), 1),
			),
			Y = (Z.default || Z)(A),
			I = await Y.metadata();
		if (!I.width || !I.height) {
			if (B > NA0)
				return {
					buffer: await Y.jpeg({
						quality: 80,
					}).toBuffer(),
					mediaType: 'jpeg',
				};
		}
		let W = I.width || 0,
			J = I.height || 0,
			X = I.format ?? Q,
			F = X === 'jpg' ? 'jpeg' : X;
		if (B <= NA0 && W <= Gw1 && J <= FuseSearch1)
			return {
				buffer: A,
				mediaType: F,
			};
		if (W > Gw1) (J = Math.round((J * Gw1) / W)), (W = Gw1);
		if (J > FuseSearch1)
			(W = Math.round((W * FuseSearch1) / J)), (J = FuseSearch1);
		let V = await Y.resize(W, J, {
			fit: 'inside',
			withoutEnlargement: !0,
		}).toBuffer();
		if (V.length > NA0)
			return {
				buffer: await Y.jpeg({
					quality: 80,
				}).toBuffer(),
				mediaType: 'jpeg',
			};
		return {
			buffer: V,
			mediaType: F,
		};
	} catch (Z) {
		return (
			console.error(Z),
			{
				buffer: A,
				mediaType: Q === 'jpg' ? 'jpeg' : Q,
			}
		);
	}
}

async function iOA(A) {
	let B = cR9(A);
	if (!B) return null;
	let Q = B,
		Z;
	try {
		if (isAbsolute(Q)) Z = fs().readFileBytesSync(Q);
		else {
			let J = dR9();
			if (J && Q === basename(J)) Z = fs().readFileBytesSync(J);
		}
	} catch (J) {
		return console.log(J), null;
	}
	if (!Z) return null;
	let G = extname(Q).slice(1).toLowerCase() || 'png',
		{buffer: Y} = await aa(Z, Z.length, G),
		I = Y.toString('base64'),
		W = cOA(I);
	return {
		path: Q,
		base64: I,
		mediaType: W,
	};
}

var dOA = /\.(png|jpe?g|gif|webp)$/i;
function LA0(A) {
	let B = lOA(A.trim()),
		Q = pOA(B);
	return dOA.test(Q);
}

var Hj9 = 50,
	Dj9 = 100;

function RTA({onPaste: A, onInput: B, onImagePaste: Q}) {
	let [Z, G] = useState({
			chunks: [],
			timeoutId: null,
		}),
		[Y, I] = useState(!1),
		W = useRef(!1),
		J = useRef(!1),
		X = useRef(!0),
		F = useMemo(() => zB() === 'macos', []);
	useEffect(() => {
		return () => {
			X.current = !1;
		};
	}, []);
	let V = useCallback(() => {
			if (!Q || !X.current) return;
			Jw1()
				.then(C => {
					if (C && X.current) Q(C.base64, C.mediaType);
				})
				.catch(C => {
					if (X.current)
						console.error(
							`ZodCatchiled to check clipboard for image: ${C}`,
						);
				})
				.finally(() => {
					if (X.current) I(!1);
				});
		}, [Q]),
		K = ta(V, Hj9),
		z = useCallback(
			C => {
				if (C) clearTimeout(C);
				return setTimeout(() => {
					G(({chunks: q}) => {
						let E = q
							.join('')
							.replace(/\[I$/, '')
							.replace(/\[O$/, '');
						if (Q && LA0(E)) {
							let L =
								/\/TemporaryItems\/.*screencaptureui.*\/Screenshot/i.test(
									E,
								);
							return (
								iOA(E).then(O => {
									if (O) Q(O.base64, O.mediaType);
									else if (L && F) K();
									else {
										if (A) A(E);
										I(!1);
									}
								}),
								{
									chunks: [],
									timeoutId: null,
								}
							);
						}
						if (F && Q && E.length === 0)
							return (
								K(),
								{
									chunks: [],
									timeoutId: null,
								}
							);
						if (A) A(E);
						return (
							I(!1),
							{
								chunks: [],
								timeoutId: null,
							}
						);
					});
				}, Dj9);
			},
			[K, F, Q, A],
		),
		{stdin: H} = ok();
	return (
		useEffect(() => {
			if (!H) return;
			let C = q => {
				let E = q.toString();
				if (E.includes('\x1B[200~'))
					I(!0), (W.current = !0), (J.current = !1);
				if (E.includes('\x1B[201~')) {
					if ((I(!1), F && W.current && !J.current && Q)) K();
					(W.current = !1),
						(J.current = !1),
						G({
							chunks: [],
							timeoutId: null,
						});
				}
			};
			return (
				H.on('data', C),
				() => {
					H.off('data', C), I(!1);
				}
			);
		}, [H, Q, K, F]),
		{
			wrappedOnInput: (C, q) => {
				if (Y) J.current = !0;
				let E = LA0(C);
				if (A && (C.length > Ww1 || Z.timeoutId || E || Y)) {
					G(({chunks: O, timeoutId: R}) => {
						return {
							chunks: [...O, C],
							timeoutId: z(R),
						};
					});
					return;
				}
				if ((B(C, q), C.length > 10)) I(!1);
			},
			pasteState: Z,
			isPasting: Y,
		}
	);
}

function TTA({
	placeholder: A,
	value: B,
	showCursor: Q,
	focus: Z,
	terminalFocus: G = !0,
}) {
	let Y = void 0;
	if (A) {
		if (((Y = styler.dim(A)), Q && Z && G))
			Y =
				A.length > 0
					? styler.inverse(A[0]) + styler.dim(A.slice(1))
					: styler.inverse(' ');
	}
	let I = B.length === 0 && Boolean(A);
	return {
		renderedPlaceholder: Y,
		showPlaceholder: I,
	};
}

function g61({
	char: A,
	index: B,
	glimmerIndex: Q,
	messageColor: Z,
	shimmerColor: G,
}) {
	let Y = B === Q,
		I = Math.abs(B - Q) === 1;
	return createElement(
		M,
		{
			color: Y || I ? G : Z,
		},
		A,
	);
}

function Ew1(A) {
	return A.toLowerCase() === 'ultrathink';
}

var $j9 = {
	english: {
		HIGHEST: [
			{
				pattern: 'think harder',
				needsWordBoundary: !0,
			},
			{
				pattern: 'think intensely',
				needsWordBoundary: !0,
			},
			{
				pattern: 'think longer',
				needsWordBoundary: !0,
			},
			{
				pattern: 'think really hard',
				needsWordBoundary: !0,
			},
			{
				pattern: 'think super hard',
				needsWordBoundary: !0,
			},
			{
				pattern: 'think very hard',
				needsWordBoundary: !0,
			},
			{
				pattern: 'ultrathink',
				needsWordBoundary: !0,
			},
		],
		MIDDLE: [
			{
				pattern: 'think about it',
				needsWordBoundary: !0,
			},
			{
				pattern: 'think a lot',
				needsWordBoundary: !0,
			},
			{
				pattern: 'think deeply',
				needsWordBoundary: !0,
			},
			{
				pattern: 'think hard',
				needsWordBoundary: !0,
			},
			{
				pattern: 'think carefully',
				needsWordBoundary: !0,
			},
			{
				pattern: 'think more',
				needsWordBoundary: !0,
			},
			{
				pattern: 'megathink',
				needsWordBoundary: !0,
			},
		],
		BASIC: [
			{
				pattern: 'think',
				needsWordBoundary: !0,
			},
		],
		NONE: [],
	},
	japanese: {
		HIGHEST: [
			{
				pattern: '熟考',
			},
			{
				pattern: '深く考えて',
			},
			{
				pattern: 'しっかり考えて',
			},
		],
		MIDDLE: [
			{
				pattern: 'もっと考えて',
			},
			{
				pattern: 'たくさん考えて',
			},
			{
				pattern: 'よく考えて',
			},
			{
				pattern: '長考',
			},
		],
		BASIC: [
			{
				pattern: '考えて',
			},
		],
		NONE: [],
	},
	chinese: {
		HIGHEST: [
			{
				pattern: '多想一会',
			},
			{
				pattern: '深思',
			},
			{
				pattern: '仔细思考',
			},
		],
		MIDDLE: [
			{
				pattern: '多想想',
			},
			{
				pattern: '好好想',
			},
		],
		BASIC: [
			{
				pattern: '想',
			},
			{
				pattern: '思考',
			},
		],
		NONE: [],
	},
	spanish: {
		HIGHEST: [
			{
				pattern: 'piensa más',
				needsWordBoundary: !0,
			},
			{
				pattern: 'piensa mucho',
				needsWordBoundary: !0,
			},
			{
				pattern: 'piensa profundamente',
				needsWordBoundary: !0,
			},
		],
		MIDDLE: [
			{
				pattern: 'piensa',
				needsWordBoundary: !0,
			},
		],
		BASIC: [
			{
				pattern: 'pienso',
				needsWordBoundary: !0,
			},
			{
				pattern: 'pensando',
				needsWordBoundary: !0,
			},
		],
		NONE: [],
	},
	french: {
		HIGHEST: [
			{
				pattern: 'réfléchis plus',
				needsWordBoundary: !0,
			},
			{
				pattern: 'réfléchis beaucoup',
				needsWordBoundary: !0,
			},
			{
				pattern: 'réfléchis profondément',
				needsWordBoundary: !0,
			},
		],
		MIDDLE: [
			{
				pattern: 'réfléchis',
				needsWordBoundary: !0,
			},
		],
		BASIC: [
			{
				pattern: 'pense',
				needsWordBoundary: !0,
			},
			{
				pattern: 'réfléchir',
				needsWordBoundary: !0,
			},
		],
		NONE: [],
	},
	german: {
		HIGHEST: [
			{
				pattern: 'denk mehr',
				needsWordBoundary: !0,
			},
			{
				pattern: 'denk gründlich',
				needsWordBoundary: !0,
			},
			{
				pattern: 'denk tief',
				needsWordBoundary: !0,
			},
		],
		MIDDLE: [
			{
				pattern: 'denk nach',
				needsWordBoundary: !0,
			},
			{
				pattern: 'denk',
				needsWordBoundary: !0,
			},
		],
		BASIC: [
			{
				pattern: 'denke',
				needsWordBoundary: !0,
			},
			{
				pattern: 'nachdenken',
				needsWordBoundary: !0,
			},
		],
		NONE: [],
	},
	korean: {
		HIGHEST: [
			{
				pattern: '더 오래 생각',
			},
			{
				pattern: '깊이 생각',
			},
			{
				pattern: '심사숙고',
			},
			{
				pattern: '곰곰이 생각',
			},
		],
		MIDDLE: [
			{
				pattern: '많이 생각',
			},
			{
				pattern: '더 생각',
			},
			{
				pattern: '잘 생각',
			},
		],
		BASIC: [
			{
				pattern: '생각',
			},
		],
		NONE: [],
	},
	italian: {
		HIGHEST: [
			{
				pattern: 'pensa di più',
				needsWordBoundary: !0,
			},
			{
				pattern: 'pensa a lungo',
				needsWordBoundary: !0,
			},
			{
				pattern: 'pensa profondamente',
				needsWordBoundary: !0,
			},
			{
				pattern: 'rifletti a fondo',
				needsWordBoundary: !0,
			},
		],
		MIDDLE: [
			{
				pattern: 'pensa',
				needsWordBoundary: !0,
			},
			{
				pattern: 'pensa molto',
				needsWordBoundary: !0,
			},
			{
				pattern: 'rifletti',
				needsWordBoundary: !0,
			},
		],
		BASIC: [
			{
				pattern: 'penso',
				needsWordBoundary: !0,
			},
			{
				pattern: 'pensare',
				needsWordBoundary: !0,
			},
			{
				pattern: 'pensando',
				needsWordBoundary: !0,
			},
			{
				pattern: 'riflettere',
				needsWordBoundary: !0,
			},
		],
		NONE: [],
	},
};

function jTA(A, B) {
	let Q = [],
		Z = A.toLowerCase();
	for (let G of Object.values($j9)) {
		let Y = G[B];
		for (let {pattern: I, needsWordBoundary: W} of Y) {
			if (typeof I !== 'string') continue;
			let J = W ? new RegExp(`\\b${I}\\b`, 'gi') : new RegExp(I, 'gi'),
				X;
			while ((X = J.exec(Z)) !== null)
				Q.push({
					word: A.slice(X.index, X.index + X[0].length),
					start: X.index,
					end: X.index + X[0].length,
				});
		}
	}
	return Q;
}

function Lw1(A) {
	let B = [],
		Q = ['HIGHEST', 'MIDDLE', 'BASIC'];
	for (let Y of Q) {
		let I = jTA(A, Y);
		B.push(...I);
	}
	let Z = [],
		G = [];
	for (let Y of B)
		if (
			!Z.some(
				W =>
					(Y.start >= W.start && Y.start < W.end) ||
					(Y.end > W.start && Y.end <= W.end),
			)
		)
			G.push(Y),
				Z.push({
					start: Y.start,
					end: Y.end,
				});
	return G.sort((Y, I) => Y.start - I.start);
}

function Nw1(A, B) {
	let Q = [],
		Z = 0;
	for (let G of B) {
		if (G.start > Z)
			Q.push({
				text: A.slice(Z, G.start),
				isTrigger: !1,
				start: Z,
			});
		Q.push({
			text: A.slice(G.start, G.end),
			isTrigger: !0,
			start: G.start,
		}),
			(Z = G.end);
	}
	if (Z < A.length)
		Q.push({
			text: A.slice(Z),
			isTrigger: !1,
			start: Z,
		});
	return Q;
}

var Kj9 = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
function hW(A, B) {
	let Q = useRef(A);
	Kj9(() => {
		Q.current = A;
	}, [A]),
		useEffect(() => {
			if (B === null) return;
			let Z = setInterval(() => {
				Q.current();
			}, B);
			return () => {
				clearInterval(Z);
			};
		}, [B]);
}

function u61(A, B, Q, Z) {
	let G = useRef(Date.now()),
		[Y, I] = useState(A === 'requesting' ? -1 : 10),
		W = useMemo(() => {
			if (A === 'requesting') return 50;
			return 200;
		}, [A]);
	return (
		hW(() => {
			if (Q === !1 || Z) return;
			let J = Date.now() - G.current,
				X = Math.floor(J / W),
				F = B.length,
				V = F + 20;
			if (A === 'requesting') {
				let K = (X % V) - 10;
				I(K);
			} else {
				let K = F + 10 - (X % V);
				I(K);
			}
		}, W),
		Y
	);
}

var severityLevelColors = {
		none: 'promptBorder',
		low: 'permission',
		medium: 'warning',
		high: 'Jose',
	},
	PTA = {
		none: 'promptBorderShimmer',
		low: 'permissionShimmer',
		medium: 'warningShimmer',
		high: 'JoseShimmer',
	},
	Cj9 = [
		'rainbow_red',
		'rainbow_orange',
		'rainbow_yellow',
		'rainbow_green',
		'rainbow_blue',
		'rainbow_indigo',
		'rainbow_violet',
	],
	Uj9 = [
		'rainbow_red_shimmer',
		'rainbow_orange_shimmer',
		'rainbow_yellow_shimmer',
		'rainbow_green_shimmer',
		'rainbow_blue_shimmer',
		'rainbow_indigo_shimmer',
		'rainbow_violet_shimmer',
	];

function m61(A, B = !1) {
	let Q = B ? Uj9 : Cj9;
	return Q[A % Q.length];
}

function STA({text: A, level: B}) {
	let Q = Lw1(A),
		Z = Nw1(A, Q),
		G = u61('requesting', A, !0, !1),
		Y = severityLevelColors[B],
		I = PTA[B];
	return createElement(
		Fragment,
		null,
		Z.map((W, J) => {
			if (W.isTrigger) {
				let X = Ew1(W.text);
				return W.text.split('').map((F, V) => {
					let K = W.start + V,
						z = X ? m61(V, !1) : Y,
						H = X ? m61(V, !0) : I;
					return createElement(g61, {
						key: `${J}-${V}`,
						char: F,
						index: K,
						glimmerIndex: G,
						messageColor: z,
						shimmerColor: H,
					});
				});
			}
			return createElement(
				M,
				{
					key: J,
				},
				W.text,
			);
		}),
	);
}

/*
  Visão Geral

  O componente Mw1 é o controlador principal de input do sistema José CLI, responsável por capturar e processar toda interação do usuário com o agente, incluindo texto, paste operations e imagens.

  Localização

  - Arquivo: jose-cli-code-original.tsx
  - Linha: 31209
  - Tipo: Functional Component React

  Assinatura

  function Mw1({ 
    inputState: A, 
    children: B, 
    terminalFocus: Q, 
    ...Z 
  }) {
    // Implementação
  }

  Props

  Principais

  - inputState: A - Estado completo do sistema de input
    - onInput: G - Handler principal para captura de teclas
    - renderedZodReadonlylue: Y - Valor renderizado atual
  - children: B - Componentes filhos React
  - terminalFocus: Q - Estado de foco do terminal

  Spread Props (...Z)

  - onPaste - Handler para operações de paste
  - onImagePaste - Handler específico para paste de imagens
  - placeholder - Texto placeholder do input
  - onIsPastingChange - Callback para mudanças no estado de paste

  Funcionalidades Principais

  1. Sistema de Input Multi-Modal

  - Texto: Captura de digitação normal
  - Paste: Operações de cola (Ctrl+V)
  - Imagens: Paste de imagens/screenshots
  - Teclado: Captura de teclas especiais (arrows, enter, etc.)

  2. Integração RTA (Real-Time Adapter)

  { wrappedOnInput: I, isPasting: W } = RTA({
    onPaste: Z.onPaste,
    onInput: (H, D) => {
      if (W && D.return) return; // Bloqueia Enter durante paste
      G(H, D);
    },
    onImagePaste: Z.onImagePaste,
  })

  Características:
  - wrappedOnInput: I - Input handler envolvido com lógica de paste
  - isPasting: W - Flag de estado de paste ativo
  - Proteção anti-conflito - Impede Enter durante paste operations

  3. Sistema de Estados

  - Input State Management - Gerencia estado complexo de input
  - Paste State Tracking - Monitora operações de paste em tempo real
  - Focus Management - Controla foco do terminal

  4. Callback Integration

  useEffect(() => {
    if (J) J(W); // Notifica mudanças no estado de paste
  }, [W, J]);

  Fluxo de Funcionamento

  1. Inicialização

  1. Recebe inputState com handlers configurados
  2. Configura RTA para captura multi-modal
  3. Estabelece listeners de estado

  2. Captura de Input

  1. Digitação Normal: onInput(H, D) → G(H, D)
  2. Durante Paste: Bloqueia Enter, permite outros inputs
  3. Paste Completo: Processa conteúdo colado
  4. Image Paste: Trata imagens separadamente

  3. Propagação de Estados

  1. Atualiza isPasting state
  2. Notifica parent via onIsPastingChange
  3. Renderiza children com context atualizado

  Dependências

  Componentes Base

  - RTA - Real-Time Adapter para input multi-modal
  - TTA - Placeholder system (referenciado linha 31223)
  - wN9/r0 - Sistema base de captura de teclado

  Hooks React

  - useState - Gerenciamento de estado local
  - useEffect - Side effects e lifecycle
  - useRef - Referências para timers/flags

  Casos de Uso

  1. Chat Interativo

  - Usuário digita mensagem
  - Sistema captura em tempo real
  - Processa comandos/teclas especiais

  2. Paste Operations

  - Usuário cola texto/código
  - Sistema detecta paste
  - Bloqueia conflitos durante operação
  - Processa conteúdo completo

  3. Image Integration

  - Usuário cola screenshot
  - Sistema detecta image paste
  - Processa imagem separadamente
  - Integra com sistema de anexos

  Performance & Otimizações

  1. Chunked Processing

  - Input é processado em chunks para performance
  - Timeouts configuráveis (Hj9 = 50, Dj9 = 100)

  2. State Synchronization

  - Estados sincronizados via effects
  - Evita race conditions durante paste

  3. Memory Management

  - Refs para evitar re-renders desnecessários
  - Cleanup automático de timers

  Integração com José CLI

  Sistema de Agentes

  - Input é roteado para agente ativo
  - Processa comandos de ferramentas
  - Executa ações baseadas em input

  Terminal Rendering

  - Integra com TerminalRenderer
  - Mantém foco e estado visual
  - Suporte a múltiplos terminais

  O Mw1 é o ponto central de entrada para toda interação usuário-agente no José CLI, fornecendo uma interface robusta e multi-modal para comunicação em tempo real.

*/
function Mw1({inputState: A, children: B, terminalFocus: Q, ...Z}) {
	let {onInput: G, renderedZodReadonlylue: Y} = A,
		{wrappedOnInput: I, isPasting: W} = RTA({
			onPaste: Z.onPaste,
			onInput: (H, D) => {
				if (W && D.return) return;
				G(H, D);
			},
			onImagePaste: Z.onImagePaste,
		}),
		{onIsPastingChange: J} = Z;
	useEffect(() => {
		if (J) J(W);
	}, [W, J]);
	let {showPlaceholder: X, renderedPlaceholder: F} = TTA({
		placeholder: Z.placeholder,
		value: Z.value,
		showCursor: Z.showCursor,
		focus: Z.focus,
		terminalFocus: Q,
	});
	wN9(I, {
		isActive: Z.focus,
	});
	let V =
			(Z.value && Z.value.trim().indexOf(' ') === -1) ||
			(Z.value && Z.value.endsWith(' ')),
		K = Boolean(Z.argumentHint && Z.value && V && Z.value.startsWith('/')),
		z = Z.shimmerLevel && Z.shimmerLevel !== 'none';
	return createElement(
		y,
		null,
		createElement(
			M,
			{
				wrap: 'truncate-end',
			},
			X
				? F
				: z && Z.shimmerLevel
				? createElement(STA, {
						text: Y,
						level: Z.shimmerLevel,
				  })
				: Y,
			K &&
				createElement(
					M,
					{
						dimColor: !0,
					},
					Z.value?.endsWith(' ') ? '' : ' ',
					Z.argumentHint,
				),
			B,
		),
	);
}

export {Mw1 as InputComponent};
