import {homedir} from 'node:os';
import {basename, delimiter, relative, resolve, sep} from 'node:path';
import {createElement, Fragment} from 'react';
import { isBuffer, memoize } from 'lodash-es';
import { ChildProcess, execFile } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import {join} from 'node:path';
import { spawn } from 'spawn-rx';
import { SIGTERM } from 'node:constants';
import { createReadStream, createWriteStream } from 'node:fs';
import CombinedStream from 'combined-stream';

var bashMaxOutputLengthZodReadonlylidator = {
	name: 'BASH_MAX_OUTPUT_LENGTH',
	default: 30000,
	validate: value => {
		if (!value)
			return {
				effective: 30000,
				status: 'valid',
			};
		let parsedZodReadonlylue = parseInt(value, 10);
		if (isNaN(parsedZodReadonlylue) || parsedZodReadonlylue <= 0)
			return {
				effective: 30000,
				status: 'invalid',
				message: `Invalid value "${value}" (using default: 30000)`,
			};
		if (parsedZodReadonlylue > 150000)
			return {
				effective: 150000,
				status: 'capped',
				message: `Capped from ${parsedZodReadonlylue} to 150000`,
			};
		return {
			effective: parsedZodReadonlylue,
			status: 'valid',
		};
	},
};

var joseCodeMaxOutputTokensZodReadonlylidator = {
	name: 'Jose_CODE_MAX_OUTPUT_TOKENS',
	default: 32000,
	validate: value => {
		if (!value)
			return {
				effective: 32000,
				status: 'valid',
			};
		let parsedZodReadonlylue = parseInt(value, 10);
		if (isNaN(parsedZodReadonlylue) || parsedZodReadonlylue <= 0)
			return {
				effective: 32000,
				status: 'invalid',
				message: `Invalid value "${value}" (using default: 32000)`,
			};
		if (parsedZodReadonlylue > 32000)
			return {
				effective: 32000,
				status: 'capped',
				message: `Capped from ${parsedZodReadonlylue} to 32000`,
			};
		return {
			effective: parsedZodReadonlylue,
			status: 'valid',
		};
	},
};

function createInitialGlobalState() {
	return {
		originalCwd: process.cwd(),
		totalCostUSD: 0,
		totalAPIDuration: 0,
		totalAPIDurationWithoutRetries: 0,
		totalToolDuration: 0,
		startTime: Date.now(),
		lastInteractionTime: Date.now(),
		totalLinesAdded: 0,
		totalLinesRemoved: 0,
		hasUnknownModelCost: !1,
		cwd: process.cwd(),
		modelUsage: {},
		mainLoopModelOverride: void 0,
		maxRateLimitFallbackActive: !1,
		initialMainLoopModel: null,
		modelStrings: null,
		isNonInteractiveSession: !0,
		isInteractive: !1,
		clientType: 'cli',
		sessionIngressToken: void 0,
		oauthTokenFromFd: void 0,
		apiKeyFromFd: void 0,
		flagSettingsPath: void 0,
		meter: null,
		sessionCounter: null,
		locCounter: null,
		prCounter: null,
		commitCounter: null,
		costCounter: null,
		tokenCounter: null,
		codeEditToolDecisionCounter: null,
		activeTimeCounter: null,
		sessionId: crypto.randomUUID(),
		loggerProvider: null,
		eventLogger: null,
		agentColorMap: new Map(),
		agentColorIndex: 0,
		envZodReadonlyrZodReadonlylidators: [
			bashMaxOutputLengthZodReadonlylidator,
			joseCodeMaxOutputTokensZodReadonlylidator,
		],
		lastAPIRequest: null,
		inMemoryErrorLog: [],
	};
}
var globalState = createInitialGlobalState();

var XG5 = h.strictObject({
	pattern: h.string().describe('The glob pattern to match files against'),
	path: h
		.string()
		.optional()
		.describe(
			'The directory to search in. If not specified, the current working directory will be used. IMPORTANT: Omit this field to use the default directory. DO NOT enter "undefined" or "null" - simply omit it for the default behavior. Must be a valid directory path if provided.',
		),
});

const fs = () => {
	try {
		const nodeFs = fsModule;
		const process = globalThis.process;
		// Return fs with enhanced mkdirSync that handles EEXIST gracefully plus cwd method
		return new Proxy(nodeFs, {
			get(target, prop) {
				if (prop === 'mkdirSync') {
					return (path, options) => {
						try {
							return target.mkdirSync(path, {recursive: true, ...options});
						} catch (err) {
							if (err.code === 'EEXIST') {
								// Directory already exists, ignore the error
								return;
							}
							throw err;
						}
					};
				}
				if (prop === 'cwd') {
					// Add cwd method from process.cwd - from original code usage
					return () => process.cwd();
				}
				if (prop === 'readdirSync') {
					// Enhanced readdirSync that returns Dirent objects with isFile method
					return (path, options) => {
						const results = target.readdirSync(path, {
							withFileTypes: true,
							...options,
						});
						return results;
					};
				}
				if (prop === 'isDirEmptySync') {
					// Check if directory is empty
					return path => {
						try {
							if (!target.existsSync(path)) return true;
							const stats = target.statSync(path);
							if (!stats.isDirectory()) return false;
							const files = target.readdirSync(path);
							return files.length === 0;
						} catch (err) {
							return false;
						}
					};
				}
				return target[prop];
			},
		});
	} catch (e) {
		// Fallback for Node.js fs module (should always be available)
		const fs = fsModule;
		return fs;
	}
};

function createComponent({result: A, verbose: B}) {
	let Q;
	if (typeof A !== 'string') Q = 'Error';
	else {
		let Y = (oQ(A, 'tool_use_error') ?? A).trim();
		if (!B && Y.includes('InpupathodReadonlylidationError: '))
			Q = 'Invalid tool parameters';
		else if (Y.startsWith('Error: ')) Q = Y;
		else Q = `Error: ${Y}`;
	}
	let Z =
		Q.split(`
`).length - yD0;
	return Oj.createElement(
		wA,
		null,
		Oj.createElement(
			y,
			{
				flexDirection: 'column',
			},
			Oj.createElement(
				M,
				{
					color: 'error',
				},
				hk1(
					B
						? Q
						: Q.split(
								`
`,
						  ).slice(0, yD0).join(`
`),
				),
			),
			!B &&
				Q.split(`
`).length > yD0 &&
				Oj.createElement(
					M,
					{
						dimColor: !0,
					},
					'… +',
					Z,
					' ',
					Z === 1 ? 'line' : 'lines',
					' (',
					styler.bold('ctrl+o'),
					' to see all)',
				),
		),
	);
}

function wA({children: A, height: B}) {
	if (gTA.useContext(uTA)) return A;
	return Jq.createElement(
		Pj9,
		null,
		Jq.createElement(
			y,
			{
				flexDirection: 'row',
				height: B,
				overflowY: 'hidden',
			},
			Jq.createElement(M, null, '  ', '⎿  '),
			A,
		),
	);
}

function g11(A, B, Q) {
	if (typeof A.getPath !== 'function')
		return {
			behavior: 'ask',
			message: `Jose requested permissions to use ${A.name}, but you haven't granted it yet.`,
		};
	let Z = A.getPath(B),
		G = checkEditPermissions(A, B, Q);
	if (G.behavior === 'allow') return G;
	let Y = yj(Z, Q, 'read', 'deny');
	if (Y)
		return {
			behavior: 'deny',
			message: `Permission to read ${Z} has been denied.`,
			decisionReason: {
				type: 'rule',
				rule: Y,
			},
		};
	let I = yj(Z, Q, 'read', 'ask');
	if (I)
		return {
			behavior: 'ask',
			message: `Jose requested permissions to read from ${Z}, but you haven't granted it yet.`,
			decisionReason: {
				type: 'rule',
				rule: I,
			},
		};
	if (sq(Z, Q))
		return {
			behavior: 'allow',
			updatedInput: B,
			decisionReason: {
				type: 'mode',
				mode: 'default',
			},
		};
	let W = resolvePath(Z),
		J = rqB(rq(getOriginalWorkingDirectory()), 'bash-outputs', getSessionId());
	if (W.startsWith(J))
		return {
			behavior: 'allow',
			updatedInput: B,
			decisionReason: {
				type: 'other',
				reason:
					'Bash output files from current session are allowed for reading',
			},
		};
	let X = rqB(getConfigDirectory(), 'session-memory');
	if (W.startsWith(X))
		return {
			behavior: 'allow',
			updatedInput: B,
			decisionReason: {
				type: 'other',
				reason: 'Session memory files are allowed for reading',
			},
		};
	let F = yj(Z, Q, 'read', 'allow');
	if (F)
		return {
			behavior: 'allow',
			updatedInput: B,
			decisionReason: {
				type: 'rule',
				rule: F,
			},
		};
	return {
		behavior: 'ask',
		message: `Jose requested permissions to read from ${Z}, but you haven't granted it yet.`,
		suggestions: generateRuleSuggestions(Z, 'read', Q),
	};
}

function ah1(A) {
	let B = BEB(A, 'read', 'deny'),
		Q = new Map();
	for (let [G, Y] of B.entries()) Q.set(G, Array.from(Y.keys()));
	let Z = w9().ignorePatterns;
	if (Z && Z.length > 0)
		for (let G of Z) {
			let {relativePattern: Y, root: I} = AEB(G, 'projectSettings'),
				W = Q.get(I);
			if (W === void 0) (W = [Y]), Q.set(I, W);
			else W.push(Y);
		}
	return Q;
}

function nh1(A, B) {
	let Q = new Set(A.get(null) ?? []);
	for (let [Z, G] of A.entries()) {
		if (Z === null) continue;
		for (let Y of G) {
			let I = nY5({
				patternRoot: Z,
				pattern: Y,
				rootPath: B,
			});
			if (I) Q.add(I);
		}
	}
	return Array.from(Q);
}

class FilePathResolver extends FileExplorer {
	matches = new Set();
	constructor(A, B, Q) {
		super(A, B, Q);
	}
	matchEmit(A) {
		this.matches.add(A);
	}
	async walk() {
		if (this.signal?.aborted) throw this.signal.reason;
		if (this.path.isUnknown()) await this.path.lstat();
		return (
			await new Promise((A, B) => {
				this.walkCB(this.path, this.patterns, () => {
					if (this.signal?.aborted) B(this.signal.reason);
					else A(this.matches);
				});
			}),
			this.matches
		);
	}
	walkSync() {
		if (this.signal?.aborted) throw this.signal.reason;
		if (this.path.isUnknown()) this.path.lstatSync();
		return (
			this.walkCBSync(this.path, this.patterns, () => {
				if (this.signal?.aborted) throw this.signal.reason;
			}),
			this.matches
		);
	}
}
class FileStreamWalker extends FileExplorer {
	results;
	constructor(A, B, Q) {
		super(A, B, Q);
		(this.results = new DuplexStream({
			signal: this.signal,
			objectMode: !0,
		})),
			this.results.on('drain', () => this.resume()),
			this.results.on('resume', () => this.resume());
	}
	matchEmit(A) {
		if ((this.results.write(A), !this.results.flowing)) this.pause();
	}
	stream() {
		let A = this.path;
		if (A.isUnknown())
			A.lstat().then(() => {
				this.walkCB(A, this.patterns, () => this.results.end());
			});
		else this.walkCB(A, this.patterns, () => this.results.end());
		return this.results;
	}
	streamSync() {
		if (this.path.isUnknown()) this.path.lstatSync();
		return (
			this.walkCBSync(this.path, this.patterns, () => this.results.end()),
			this.results
		);
	}
}

class WindowsPathScurry extends PathScurry {
	sep = '\\';
	constructor(A = process.cwd(), B = {}) {
		let {nocase: Q = !0} = B;
		super(A, Ut1, '\\', {
			...B,
			nocase: Q,
		});
		this.nocase = Q;
		for (let Z = this.cwd; Z; Z = Z.parent) Z.nocase = this.nocase;
	}
	parseRootPath(A) {
		return Ut1.parse(A).root.toUpperCase();
	}
	newRoot(A) {
		return new WindowsPathEntry(
			this.rootPath,
			iN,
			void 0,
			this.roots,
			this.nocase,
			this.childrenCache(),
			{
				fs: A,
			},
		);
	}
	isAbsolute(A) {
		return A.startsWith('/') || A.startsWith('\\') || /^[a-z]:(\/|\\)/i.test(A);
	}
}
class UnixPathScurry extends PathScurry {
	sep = '/';
	constructor(A = process.cwd(), B = {}) {
		let {nocase: Q = !1} = B;
		super(A, VY9, '/', {
			...B,
			nocase: Q,
		});
		this.nocase = Q;
	}
	parseRootPath(A) {
		return '/';
	}
	newRoot(A) {
		return new UnixPathEntry(
			this.rootPath,
			iN,
			void 0,
			this.roots,
			this.nocase,
			this.childrenCache(),
			{
				fs: A,
			},
		);
	}
	isAbsolute(A) {
		return A.startsWith('/');
	}
}
class MacPathScurry extends UnixPathScurry {
	constructor(A = process.cwd(), B = {}) {
		let {nocase: Q = !0} = B;
		super(A, {
			...B,
			nocase: Q,
		});
	}
}

class GlobProcessor {
	#root;
	#hasMagicCache;
	#processed;
	length;
	#children;
	#parent;
	#index;
	#negations;
	#finalized;
	#options;
	#strinMarkdownLexeralue = !0;
	constructor(A, B, Q, Z) {
		if (!hasItems(A)) throw new TypeError('empty pattern list');
		if (!isNotEmpty(B)) throw new TypeError('empty glob list');
		if (B.length !== A.length)
			throw new TypeError('mismatched pattern list and glob list lengths');
		if (((this.length = A.length), Q < 0 || Q >= this.length))
			throw new TypeError('index out of range');
		if (
			((this.#root = A),
			(this.#hasMagicCache = B),
			(this.#processed = Q),
			(this.#children = Z),
			this.#processed === 0)
		) {
			if (this.isUNC()) {
				let [G, Y, I, W, ...J] = this.#root,
					[X, F, V, K, ...z] = this.#hasMagicCache;
				if (J[0] === '') J.shift(), z.shift();
				let H = [G, Y, I, W, ''].join('/'),
					D = [X, F, V, K, ''].join('/');
				(this.#root = [H, ...J]),
					(this.#hasMagicCache = [D, ...z]),
					(this.length = this.#root.length);
			} else if (this.isDrive() || this.isAbsolute()) {
				let [G, ...Y] = this.#root,
					[I, ...W] = this.#hasMagicCache;
				if (Y[0] === '') Y.shift(), W.shift();
				let J = G + '/',
					X = I + '/';
				(this.#root = [J, ...Y]),
					(this.#hasMagicCache = [X, ...W]),
					(this.length = this.#root.length);
			}
		}
	}
	pattern() {
		return this.#root[this.#processed];
	}
	isString() {
		return typeof this.#root[this.#processed] === 'string';
	}
	isGlobstar() {
		return this.#root[this.#processed] === globstarSymbol;
	}
	isRegExp() {
		return this.#root[this.#processed] instanceof RegExp;
	}
	globString() {
		return (this.#index =
			this.#index ||
			(this.#processed === 0
				? this.isAbsolute()
					? this.#hasMagicCache[0] + this.#hasMagicCache.slice(1).join('/')
					: this.#hasMagicCache.join('/')
				: this.#hasMagicCache.slice(this.#processed).join('/')));
	}
	hasMore() {
		return this.length > this.#processed + 1;
	}
	rest() {
		if (this.#parent !== void 0) return this.#parent;
		if (!this.hasMore()) return (this.#parent = null);
		return (
			(this.#parent = new GlobProcessor(
				this.#root,
				this.#hasMagicCache,
				this.#processed + 1,
				this.#children,
			)),
			(this.#parent.#options = this.#options),
			(this.#parent.#finalized = this.#finalized),
			(this.#parent.#negations = this.#negations),
			this.#parent
		);
	}
	isUNC() {
		let A = this.#root;
		return this.#finalized !== void 0
			? this.#finalized
			: (this.#finalized =
					this.#children === 'win32' &&
					this.#processed === 0 &&
					A[0] === '' &&
					A[1] === '' &&
					typeof A[2] === 'string' &&
					!!A[2] &&
					typeof A[3] === 'string' &&
					!!A[3]);
	}
	isDrive() {
		let A = this.#root;
		return this.#negations !== void 0
			? this.#negations
			: (this.#negations =
					this.#children === 'win32' &&
					this.#processed === 0 &&
					this.length > 1 &&
					typeof A[0] === 'string' &&
					/^[a-z]:$/i.test(A[0]));
	}
	isAbsolute() {
		let A = this.#root;
		return this.#options !== void 0
			? this.#options
			: (this.#options =
					(A[0] === '' && A.length > 1) || this.isDrive() || this.isUNC());
	}
	root() {
		let A = this.#root[0];
		return typeof A === 'string' && this.isAbsolute() && this.#processed === 0
			? A
			: '';
	}
	checkFollowGlobstar() {
		return !(
			this.#processed === 0 ||
			!this.isGlobstar() ||
			!this.#strinMarkdownLexeralue
		);
	}
	markFollowGlobstar() {
		if (
			this.#processed === 0 ||
			!this.isGlobstar() ||
			!this.#strinMarkdownLexeralue
		)
			return !1;
		return (this.#strinMarkdownLexeralue = !1), !0;
	}
}

class GlobOptions {
	absolute;
	cwd;
	root;
	dot;
	dotRelative;
	follow;
	ignore;
	magicalBraces;
	mark;
	matchBase;
	maxDepth;
	nobrace;
	nocase;
	nodir;
	noext;
	noglobstar;
	pattern;
	platform;
	realpath;
	scurry;
	stat;
	signal;
	windowsPathsNoEscape;
	withFileTypes;
	includeChildMatches;
	opts;
	patterns;
	constructor(A, B) {
		if (!B) throw new TypeError('glob options required');
		if (
			((this.withFileTypes = !!B.withFileTypes),
			(this.signal = B.signal),
			(this.follow = !!B.follow),
			(this.dot = !!B.dot),
			(this.dotRelative = !!B.dotRelative),
			(this.nodir = !!B.nodir),
			(this.mark = !!B.mark),
			!B.cwd)
		)
			this.cwd = '';
		else if (B.cwd instanceof URL || B.cwd.startsWith('file://'))
			B.cwd = yY9(B.cwd);
		if (
			((this.cwd = B.cwd || ''),
			(this.root = B.root),
			(this.magicalBraces = !!B.magicalBraces),
			(this.nobrace = !!B.nobrace),
			(this.noext = !!B.noext),
			(this.realpath = !!B.realpath),
			(this.absolute = B.absolute),
			(this.includeChildMatches = B.includeChildMatches !== !1),
			(this.noglobstar = !!B.noglobstar),
			(this.matchBase = !!B.matchBase),
			(this.maxDepth = typeof B.maxDepth === 'number' ? B.maxDepth : 1 / 0),
			(this.stat = !!B.stat),
			(this.ignore = B.ignore),
			this.withFileTypes && this.absolute !== void 0)
		)
			throw new Error('cannot set absolute and withFileTypes:true');
		if (typeof A === 'string') A = [A];
		if (
			((this.windowsPathsNoEscape =
				!!B.windowsPathsNoEscape || B.allowWindowsEscape === !1),
			this.windowsPathsNoEscape)
		)
			A = A.map(W => W.replace(/\\/g, '/'));
		if (this.matchBase) {
			if (B.noglobstar) throw new TypeError('base matching requires globstar');
			A = A.map(W => (W.includes('/') ? W : `./**/${W}`));
		}
		if (
			((this.pattern = A),
			(this.platform = B.platform || kY9),
			(this.opts = {
				...B,
				platform: this.platform,
			}),
			B.scurry)
		) {
			if (
				((this.scurry = B.scurry),
				B.nocase !== void 0 && B.nocase !== B.scurry.nocase)
			)
				throw new Error('nocase option contradicts provided scurry option');
		} else {
			let W =
				B.platform === 'win32'
					? WindowsPathScurry
					: B.platform === 'darwin'
					? MacPathScurry
					: B.platform
					? UnixPathScurry
					: dIA;
			this.scurry = new W(this.cwd, {
				nocase: B.nocase,
				fs: B.fs,
			});
		}
		this.nocase = this.scurry.nocase;
		let Q = this.platform === 'darwin' || this.platform === 'win32',
			Z = {
				...B,
				dot: this.dot,
				matchBase: this.matchBase,
				nobrace: this.nobrace,
				nocase: this.nocase,
				nocaseMagicOnly: Q,
				nocomment: !0,
				noext: this.noext,
				nonegate: !0,
				optimizationLevel: 2,
				platform: this.platform,
				windowsPathsNoEscape: this.windowsPathsNoEscape,
				debug: !!this.opts.debug,
			},
			G = this.pattern.map(W => new MinimatchPattern(W, Z)),
			[Y, I] = G.reduce(
				(W, J) => {
					return W[0].push(...J.set), W[1].push(...J.globParts), W;
				},
				[[], []],
			);
		this.patterns = Y.map((W, J) => {
			let X = I[J];
			if (!X) throw new Error('invalid pattern object');
			return new GlobProcessor(W, X, 0, this.platform);
		});
	}
	async walk() {
		return [
			...(await new FilePathResolver(this.patterns, this.scurry.cwd, {
				...this.opts,
				maxDepth:
					this.maxDepth !== 1 / 0
						? this.maxDepth + this.scurry.cwd.depth()
						: 1 / 0,
				platform: this.platform,
				nocase: this.nocase,
				includeChildMatches: this.includeChildMatches,
			}).walk()),
		];
	}
	walkSync() {
		return [
			...new FilePathResolver(this.patterns, this.scurry.cwd, {
				...this.opts,
				maxDepth:
					this.maxDepth !== 1 / 0
						? this.maxDepth + this.scurry.cwd.depth()
						: 1 / 0,
				platform: this.platform,
				nocase: this.nocase,
				includeChildMatches: this.includeChildMatches,
			}).walkSync(),
		];
	}
	stream() {
		return new FileStreamWalker(this.patterns, this.scurry.cwd, {
			...this.opts,
			maxDepth:
				this.maxDepth !== 1 / 0
					? this.maxDepth + this.scurry.cwd.depth()
					: 1 / 0,
			platform: this.platform,
			nocase: this.nocase,
			includeChildMatches: this.includeChildMatches,
		}).stream();
	}
	streamSync() {
		return new FileStreamWalker(this.patterns, this.scurry.cwd, {
			...this.opts,
			maxDepth:
				this.maxDepth !== 1 / 0
					? this.maxDepth + this.scurry.cwd.depth()
					: 1 / 0,
			platform: this.platform,
			nocase: this.nocase,
			includeChildMatches: this.includeChildMatches,
		}).streamSync();
	}
	iterateSync() {
		return this.streamSync()[Symbol.iterator]();
	}
	[Symbol.iterator]() {
		return this.iterateSync();
	}
	iterate() {
		return this.stream()[Symbol.asyncIterator]();
	}
	[Symbol.asyncIterator]() {
		return this.iterate();
	}
}

var validatePattern = A => {
	if (typeof A !== 'string') throw new TypeError('invalid pattern');
	if (A.length > 65536) throw new TypeError('pattern is too long');
};

var minimatchFunction = (A, B, Q = {}) => {
	if ((validatePattern(B), !Q.nocomment && B.charAt(0) === '#')) return !1;
	return new MinimatchPattern(B, Q).match(A);
};

minimatchFunction.sep = lG9;
var globstarSymbol = Symbol('globstar **');
minimatchFunction.GLOBSTAR = globstarSymbol;
var nonSlashPattern = '[^/]',
	nonSlashWildcardPattern = nonSlashPattern + '*?',
	dotDirExcludePattern = '(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?',
	dotFileExcludePattern = '(?:(?!(?:\\/|^)\\.).)*?',
	filterFunction =
		(A, B = {}) =>
		Q =>
			FV(Q, A, B);
minimatchFunction.filter = filterFunction;
// MODERNIZED: Using spread operator instead of Object.assign for better performance
var mergeObjects = (A, B = {}) => ({...A, ...B}),
	defaultsFunction = A => {
		if (!A || typeof A !== 'object' || !Object.keys(A).length) return FV;
		let B = FV;
		return Object.assign((Z, G, Y = {}) => B(Z, G, mergeObjects(A, Y)), {
			Minimatch: class Z extends B.Minimatch {
				constructor(G, Y = {}) {
					super(G, mergeObjects(A, Y));
				}
				static defaults(G) {
					return B.defaults(mergeObjects(A, G)).Minimatch;
				}
			},
			AST: class Z extends B.AST {
				constructor(G, Y, I = {}) {
					super(G, Y, mergeObjects(A, I));
				}
				static fromGlob(G, Y = {}) {
					return B.AST.fromGlob(G, mergeObjects(A, Y));
				}
			},
			unescape: (Z, G = {}) => B.unescape(Z, mergeObjects(A, G)),
			escape: (Z, G = {}) => B.escape(Z, mergeObjects(A, G)),
			filter: (Z, G = {}) => B.filter(Z, mergeObjects(A, G)),
			defaults: Z => B.defaults(mergeObjects(A, Z)),
			makeRe: (Z, G = {}) => B.makeRe(Z, mergeObjects(A, G)),
			braceExpand: (Z, G = {}) => B.braceExpand(Z, mergeObjects(A, G)),
			match: (Z, G, Y = {}) => B.match(Z, G, mergeObjects(A, Y)),
			sep: B.sep,
			GLOBSTAR: globstarSymbol,
		});
	};
minimatchFunction.defaults = defaultsFunction;
var $IA = (A, B = {}) => {
	if ((validatePattern(A), B.nobrace || !/\{(?:(?!\{).)*\}/.test(A)))
		return [A];
	return httpParserWasm.default(A);
};
minimatchFunction.braceExpand = $IA;
var makeRegexFunction = (A, B = {}) => new MinimatchPattern(A, B).makeRe();
minimatchFunction.makeRe = makeRegexFunction;
var matchFunction = (A, B, Q = {}) => {
	let Z = new MinimatchPattern(B, Q);
	if (((A = A.filter(G => Z.match(G))), Z.options.nonull && !A.length))
		A.push(B);
	return A;
};
minimatchFunction.match = matchFunction;
var zIA = /[?*]|[+@!]\(.*?\)|\[|\]/,
	eG9 = A => A.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

class MinimatchPattern {
	options;
	set;
	pattern;
	windowsPathsNoEscape;
	nonegate;
	negate;
	comment;
	empty;
	preserveMultipleSlashes;
	partial;
	globSet;
	globParts;
	nocase;
	isWindows;
	platform;
	windowsNoMagicRoot;
	regexp;
	constructor(A, B = {}) {
		if (
			(validatePattern(A),
			(B = B || {}),
			(this.options = B),
			(this.pattern = A),
			(this.platform = B.platform || UIA),
			(this.isWindows = this.platform === 'win32'),
			(this.windowsPathsNoEscape =
				!!B.windowsPathsNoEscape || B.allowWindowsEscape === !1),
			this.windowsPathsNoEscape)
		)
			this.pattern = this.pattern.replace(/\\/g, '/');
		(this.preserveMultipleSlashes = !!B.preserveMultipleSlashes),
			(this.regexp = null),
			(this.negate = !1),
			(this.nonegate = !!B.nonegate),
			(this.comment = !1),
			(this.empty = !1),
			(this.partial = !!B.partial),
			(this.nocase = !!this.options.nocase),
			(this.windowsNoMagicRoot =
				B.windowsNoMagicRoot !== void 0
					? B.windowsNoMagicRoot
					: !!(this.isWindows && this.nocase)),
			(this.globSet = []),
			(this.globParts = []),
			(this.set = []),
			this.make();
	}
	hasMagic() {
		if (this.options.magicalBraces && this.set.length > 1) return !0;
		for (let A of this.set)
			for (let B of A) if (typeof B !== 'string') return !0;
		return !1;
	}
	debug(...A) {}
	make() {
		let A = this.pattern,
			B = this.options;
		if (!B.nocomment && A.charAt(0) === '#') {
			this.comment = !0;
			return;
		}
		if (!A) {
			this.empty = !0;
			return;
		}
		if (
			(this.parseNegate(),
			(this.globSet = [...new Set(this.braceExpand())]),
			B.debug)
		)
			this.debug = (...G) => console.error(...G);
		this.debug(this.pattern, this.globSet);
		let Q = this.globSet.map(G => this.slashSplit(G));
		(this.globParts = this.preprocess(Q)),
			this.debug(this.pattern, this.globParts);
		let Z = this.globParts.map((G, Y, I) => {
			if (this.isWindows && this.windowsNoMagicRoot) {
				let W =
						G[0] === '' &&
						G[1] === '' &&
						(G[2] === '?' || !zIA.test(G[2])) &&
						!zIA.test(G[3]),
					J = /^[a-z]:/i.test(G[0]);
				if (W) return [...G.slice(0, 4), ...G.slice(4).map(X => this.parse(X))];
				else if (J) return [G[0], ...G.slice(1).map(X => this.parse(X))];
			}
			return G.map(W => this.parse(W));
		});
		if (
			(this.debug(this.pattern, Z),
			(this.set = Z.filter(G => G.indexOf(!1) === -1)),
			this.isWindows)
		)
			for (let G = 0; G < this.set.length; G++) {
				let Y = this.set[G];
				if (
					Y[0] === '' &&
					Y[1] === '' &&
					this.globParts[G][2] === '?' &&
					typeof Y[3] === 'string' &&
					/^[a-z]:$/i.test(Y[3])
				)
					Y[2] = '?';
			}
		this.debug(this.pattern, this.set);
	}
	preprocess(A) {
		if (this.options.noglobstar) {
			for (let Q = 0; Q < A.length; Q++)
				for (let Z = 0; Z < A[Q].length; Z++)
					if (A[Q][Z] === '**') A[Q][Z] = '*';
		}
		let {optimizationLevel: B = 1} = this.options;
		if (B >= 2)
			(A = this.firstPhasePreProcess(A)), (A = this.secondPhasePreProcess(A));
		else if (B >= 1) A = this.levelOneOptimize(A);
		else A = this.adjascentGlobstarOptimize(A);
		return A;
	}
	adjascentGlobstarOptimize(A) {
		return A.map(B => {
			let Q = -1;
			while ((Q = B.indexOf('**', Q + 1)) !== -1) {
				let Z = Q;
				while (B[Z + 1] === '**') Z++;
				if (Z !== Q) B.splice(Q, Z - Q);
			}
			return B;
		});
	}
	levelOneOptimize(A) {
		return A.map(B => {
			return (
				(B = B.reduce((Q, Z) => {
					let G = Q[Q.length - 1];
					if (Z === '**' && G === '**') return Q;
					if (Z === '..') {
						if (G && G !== '..' && G !== '.' && G !== '**') return Q.pop(), Q;
					}
					return Q.push(Z), Q;
				}, [])),
				B.length === 0 ? [''] : B
			);
		});
	}
	levelTwoFileOptimize(A) {
		if (!Array.isArray(A)) A = this.slashSplit(A);
		let B = !1;
		do {
			if (((B = !1), !this.preserveMultipleSlashes)) {
				for (let Z = 1; Z < A.length - 1; Z++) {
					let G = A[Z];
					if (Z === 1 && G === '' && A[0] === '') continue;
					if (G === '.' || G === '') (B = !0), A.splice(Z, 1), Z--;
				}
				if (A[0] === '.' && A.length === 2 && (A[1] === '.' || A[1] === ''))
					(B = !0), A.pop();
			}
			let Q = 0;
			while ((Q = A.indexOf('..', Q + 1)) !== -1) {
				let Z = A[Q - 1];
				if (Z && Z !== '.' && Z !== '..' && Z !== '**')
					(B = !0), A.splice(Q - 1, 2), (Q -= 2);
			}
		} while (B);
		return A.length === 0 ? [''] : A;
	}
	firstPhasePreProcess(A) {
		let B = !1;
		do {
			B = !1;
			for (let Q of A) {
				let Z = -1;
				while ((Z = Q.indexOf('**', Z + 1)) !== -1) {
					let Y = Z;
					while (Q[Y + 1] === '**') Y++;
					if (Y > Z) Q.splice(Z + 1, Y - Z);
					let I = Q[Z + 1],
						W = Q[Z + 2],
						J = Q[Z + 3];
					if (I !== '..') continue;
					if (!W || W === '.' || W === '..' || !J || J === '.' || J === '..')
						continue;
					(B = !0), Q.splice(Z, 1);
					let X = Q.slice(0);
					(X[Z] = '**'), A.push(X), Z--;
				}
				if (!this.preserveMultipleSlashes) {
					for (let Y = 1; Y < Q.length - 1; Y++) {
						let I = Q[Y];
						if (Y === 1 && I === '' && Q[0] === '') continue;
						if (I === '.' || I === '') (B = !0), Q.splice(Y, 1), Y--;
					}
					if (Q[0] === '.' && Q.length === 2 && (Q[1] === '.' || Q[1] === ''))
						(B = !0), Q.pop();
				}
				let G = 0;
				while ((G = Q.indexOf('..', G + 1)) !== -1) {
					let Y = Q[G - 1];
					if (Y && Y !== '.' && Y !== '..' && Y !== '**') {
						B = !0;
						let W = G === 1 && Q[G + 1] === '**' ? ['.'] : [];
						if ((Q.splice(G - 1, 2, ...W), Q.length === 0)) Q.push('');
						G -= 2;
					}
				}
			}
		} while (B);
		return A;
	}
	secondPhasePreProcess(A) {
		for (let B = 0; B < A.length - 1; B++)
			for (let Q = B + 1; Q < A.length; Q++) {
				let Z = this.partsMatch(A[B], A[Q], !this.preserveMultipleSlashes);
				if (Z) {
					(A[B] = []), (A[Q] = Z);
					break;
				}
			}
		return A.filter(B => B.length);
	}
	partsMatch(A, B, Q = !1) {
		let Z = 0,
			G = 0,
			Y = [],
			I = '';
		while (Z < A.length && G < B.length)
			if (A[Z] === B[G]) Y.push(I === 'b' ? B[G] : A[Z]), Z++, G++;
			else if (Q && A[Z] === '**' && B[G] === A[Z + 1]) Y.push(A[Z]), Z++;
			else if (Q && B[G] === '**' && A[Z] === B[G + 1]) Y.push(B[G]), G++;
			else if (
				A[Z] === '*' &&
				B[G] &&
				(this.options.dot || !B[G].startsWith('.')) &&
				B[G] !== '**'
			) {
				if (I === 'b') return !1;
				(I = 'a'), Y.push(A[Z]), Z++, G++;
			} else if (
				B[G] === '*' &&
				A[Z] &&
				(this.options.dot || !A[Z].startsWith('.')) &&
				A[Z] !== '**'
			) {
				if (I === 'a') return !1;
				(I = 'b'), Y.push(B[G]), Z++, G++;
			} else return !1;
		return A.length === B.length && Y;
	}
	parseNegate() {
		if (this.nonegate) return;
		let A = this.pattern,
			B = !1,
			Q = 0;
		for (let Z = 0; Z < A.length && A.charAt(Z) === '!'; Z++) (B = !B), Q++;
		if (Q) this.pattern = A.slice(Q);
		this.negate = B;
	}
	matchOne(A, B, Q = !1) {
		let Z = this.options;
		if (this.isWindows) {
			let H = typeof A[0] === 'string' && /^[a-z]:$/i.test(A[0]),
				D =
					!H &&
					A[0] === '' &&
					A[1] === '' &&
					A[2] === '?' &&
					/^[a-z]:$/i.test(A[3]),
				C = typeof B[0] === 'string' && /^[a-z]:$/i.test(B[0]),
				q =
					!C &&
					B[0] === '' &&
					B[1] === '' &&
					B[2] === '?' &&
					typeof B[3] === 'string' &&
					/^[a-z]:$/i.test(B[3]),
				E = D ? 3 : H ? 0 : void 0,
				L = q ? 3 : C ? 0 : void 0;
			if (typeof E === 'number' && typeof L === 'number') {
				let [O, R] = [A[E], B[L]];
				if (O.toLowerCase() === R.toLowerCase()) {
					if (((B[L] = O), L > E)) B = B.slice(L);
					else if (E > L) A = A.slice(E);
				}
			}
		}
		let {optimizationLevel: G = 1} = this.options;
		if (G >= 2) A = this.levelTwoFileOptimize(A);
		this.debug('matchOne', this, {
			file: A,
			pattern: B,
		}),
			this.debug('matchOne', A.length, B.length);
		for (
			var Y = 0, I = 0, W = A.length, J = B.length;
			Y < W && I < J;
			Y++, I++
		) {
			this.debug('matchOne loop');
			var X = B[I],
				F = A[Y];
			if ((this.debug(B, X, F), X === !1)) return !1;
			if (X === globstarSymbol) {
				this.debug('GLOBSTAR', [B, X, F]);
				var V = Y,
					K = I + 1;
				if (K === J) {
					this.debug('** at the end');
					for (; Y < W; Y++)
						if (
							A[Y] === '.' ||
							A[Y] === '..' ||
							(!Z.dot && A[Y].charAt(0) === '.')
						)
							return !1;
					return !0;
				}
				while (V < W) {
					var z = A[V];
					if (
						(this.debug(
							`
globstar while`,
							A,
							V,
							B,
							K,
							z,
						),
						this.matchOne(A.slice(V), B.slice(K), Q))
					)
						return this.debug('globstar found match!', V, W, z), !0;
					else {
						if (z === '.' || z === '..' || (!Z.dot && z.charAt(0) === '.')) {
							this.debug('dot detected!', A, V, B, K);
							break;
						}
						this.debug('globstar swallow a segment, and continue'), V++;
					}
				}
				if (Q) {
					if (
						(this.debug(
							`
>>> no match, partial?`,
							A,
							V,
							B,
							K,
						),
						V === W)
					)
						return !0;
				}
				return !1;
			}
			let H;
			if (typeof X === 'string')
				(H = F === X), this.debug('string match', X, F, H);
			else (H = X.test(F)), this.debug('pattern match', X, F, H);
			if (!H) return !1;
		}
		if (Y === W && I === J) return !0;
		else if (Y === W) return Q;
		else if (I === J) return Y === W - 1 && A[Y] === '';
		else throw new Error('wtf?');
	}
	braceExpand() {
		return $IA(this.pattern, this.options);
	}
	parse(A) {
		validatePattern(A);
		let B = this.options;
		if (A === '**') return globstarSymbol;
		if (A === '') return '';
		let Q,
			Z = null;
		if ((Q = A.match(bG9))) Z = B.dot ? hG9 : fG9;
		else if ((Q = A.match(RG9)))
			Z = (B.nocase ? (B.dot ? SG9 : jG9) : B.dot ? PG9 : TG9)(Q[1]);
		else if ((Q = A.match(gG9)))
			Z = (B.nocase ? (B.dot ? mG9 : uG9) : B.dot ? dG9 : cG9)(Q);
		else if ((Q = A.match(yG9))) Z = B.dot ? _G9 : kG9;
		else if ((Q = A.match(xG9))) Z = vG9;
		let G = GlobPatternNode.fromGlob(A, this.options).toMMPattern();
		if (Z && typeof G === 'object')
			Reflect.defineProperty(G, 'test', {
				value: Z,
			});
		return G;
	}
	makeRe() {
		if (this.regexp || this.regexp === !1) return this.regexp;
		let A = this.set;
		if (!A.length) return (this.regexp = !1), this.regexp;
		let B = this.options,
			Q = B.noglobstar
				? nonSlashWildcardPattern
				: B.dot
				? dotDirExcludePattern
				: dotFileExcludePattern,
			Z = new Set(B.nocase ? ['i'] : []),
			G = A.map(W => {
				let J = W.map(X => {
					if (X instanceof RegExp) for (let F of X.flags.split('')) Z.add(F);
					return typeof X === 'string'
						? eG9(X)
						: X === globstarSymbol
						? globstarSymbol
						: X._src;
				});
				return (
					J.forEach((X, F) => {
						let V = J[F + 1],
							K = J[F - 1];
						if (X !== globstarSymbol || K === globstarSymbol) return;
						if (K === void 0)
							if (V !== void 0 && V !== globstarSymbol)
								J[F + 1] = '(?:\\/|' + Q + '\\/)?' + V;
							else J[F] = Q;
						else if (V === void 0) J[F - 1] = K + '(?:\\/|' + Q + ')?';
						else if (V !== globstarSymbol)
							(J[F - 1] = K + '(?:\\/|\\/' + Q + '\\/)' + V),
								(J[F + 1] = globstarSymbol);
					}),
					J.filter(X => X !== globstarSymbol).join('/')
				);
			}).join('|'),
			[Y, I] = A.length > 1 ? ['(?:', ')'] : ['', ''];
		if (((G = '^' + Y + G + I + '$'), this.negate)) G = '^(?!' + G + ').+$';
		try {
			this.regexp = new RegExp(G, [...Z].join(''));
		} catch (W) {
			this.regexp = !1;
		}
		return this.regexp;
	}
	slashSplit(A) {
		if (this.preserveMultipleSlashes) return A.split('/');
		else if (this.isWindows && /^\/\/[^\/]+/.test(A))
			return ['', ...A.split(/\/+/)];
		else return A.split(/\/+/);
	}
	match(A, B = this.partial) {
		if ((this.debug('match', A, this.pattern), this.comment)) return !1;
		if (this.empty) return A === '';
		if (A === '/' && B) return !0;
		let Q = this.options;
		if (this.isWindows) A = A.split('\\').join('/');
		let Z = this.slashSplit(A);
		this.debug(this.pattern, 'split', Z);
		let G = this.set;
		this.debug(this.pattern, 'set', G);
		let Y = Z[Z.length - 1];
		if (!Y) for (let I = Z.length - 2; !Y && I >= 0; I--) Y = Z[I];
		for (let I = 0; I < G.length; I++) {
			let W = G[I],
				J = Z;
			if (Q.matchBase && W.length === 1) J = [Y];
			if (this.matchOne(J, W, B)) {
				if (Q.flipNegate) return !0;
				return !this.negate;
			}
		}
		if (Q.flipNegate) return !1;
		return this.negate;
	}
	static defaults(A) {
		return minimatchFunction.defaults(A).Minimatch;
	}
}
minimatchFunction.AST = GlobPatternNode;
minimatchFunction.Minimatch = MinimatchPattern;
minimatchFunction.escape = kn;
minimatchFunction.unescape = mw;

var hasMagicPattern = (A, B = {}) => {
	if (!Array.isArray(A)) A = [A];
	for (let Q of A) if (new MinimatchPattern(Q, B).hasMagic()) return !0;
	return !1;
};

function streamGlobSync(A, B = {}) {
	return new GlobOptions(A, B).streamSync();
}

function streamGlobAsync(A, B = {}) {
	return new GlobOptions(A, B).stream();
}

function walkGlobSync(A, B = {}) {
	return new GlobOptions(A, B).walkSync();
}
async function walkGlobAsync(A, B = {}) {
	return new GlobOptions(A, B).walk();
}

function iD1(A, B = {}) {
	return new GlobOptions(A, B).iterateSync();
}

function aIA(A, B = {}) {
	return new GlobOptions(A, B).iterate();
}

var _Y9 = streamGlobSync,
	xY9 = Object.assign(streamGlobAsync, {
		sync: streamGlobSync,
	}),
	vY9 = iD1,
	bY9 = Object.assign(aIA, {
		sync: iD1,
	}),
	fY9 = Object.assign(walkGlobSync, {
		stream: streamGlobSync,
		iterate: iD1,
	});

var kn = (A, {windowsPathsNoEscape: B = !1} = {}) => {
	return B
		? A.replace(/[?*()[\]]/g, '[$&]')
		: A.replace(/[?*()[\]\\]/g, '\\$&');
};

var mw = (A, {windowsPathsNoEscape: B = !1} = {}) => {
	return B
		? A.replace(/\[([^\/\\])\]/g, '$1')
		: A.replace(/((?!\\).|^)\[([^\/\\])\]/g, '$1$2').replace(
				/\\([^\/])/g,
				'$1',
		  );
};

var lD1 = Object.assign(walkGlobAsync, {
	glob: walkGlobAsync,
	globSync: walkGlobSync,
	sync: fY9,
	globStream: streamGlobAsync,
	stream: xY9,
	globStreamSync: streamGlobSync,
	streamSync: _Y9,
	globIterate: aIA,
	iterate: bY9,
	globIterateSync: iD1,
	iterateSync: vY9,
	Glob: GlobOptions,
	hasMagic: hasMagicPattern,
	escape: kn,
	unescape: mw,
});
lD1.glob = lD1;

async function PwB(A, B, {limit: Q, offset: Z}, G, Y) {
	let I = nh1(ah1(Y), B),
		J = (
			await lD1([A], {
				cwd: B,
				nocase: !0,
				nodir: !0,
				signal: G,
				stat: !0,
				withFileTypes: !0,
				ignore: I,
			})
		).sort((F, V) => (F.mtimeMs ?? 0) - (V.mtimeMs ?? 0)),
		X = J.length > Z + Q;
	return {
		files: J.slice(Z, Z + Q).map(F => F.fullpath()),
		truncated: X,
	};
}

function oQ(A, B) {
	if (!A.trim() || !B.trim()) return null;
	let Q = B.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
		Z = new RegExp(`<${Q}(?:\\s+[^>]*)?>([\\s\\S]*?)<\\/${Q}>`, 'gi'),
		G,
		Y = 0,
		I = 0,
		W = new RegExp(`<${Q}(?:\\s+[^>]*?)?>`, 'gi'),
		J = new RegExp(`<\\/${Q}>`, 'gi');
	while ((G = Z.exec(A)) !== null) {
		let X = G[1],
			F = A.slice(I, G.index);
		(Y = 0), (W.lastIndex = 0);
		while (W.exec(F) !== null) Y++;
		J.lastIndex = 0;
		while (J.exec(F) !== null) Y--;
		if (Y === 0 && X) return X;
		I = G.index + G[0].length;
	}
	return null;
}

function getOriginalWorkingDirectory() {
	return globalState.originalCwd;
}

function getInternalCurrentDirectory() {
	return globalState.cwd;
}

function getCurrentDirectoryPath() {
	return getInternalCurrentDirectory();
}

function getCurrentWorkingDirectory() {
	try {
		return getCurrentDirectoryPath();
	} catch {
		return getOriginalWorkingDirectory();
	}
}

function oY5(A) {
	let B = A ? resolve(A) : void 0,
		Q = B ? relative(getCurrentWorkingDirectory(), B) : void 0;
	return {
		absolutePath: B,
		relativePath: Q,
	};
}

function BJ(A) {
	let {relativePath: B} = oY5(A);
	if (B && !B.startsWith('..')) return B;
	let Q = homedir();
	if (A.startsWith(Q + sep)) return '~' + A.slice(Q.length);
	return A;
}

var JG5 = h.strictObject({
    pattern: h.string().describe('The regular expression pattern to search for in file contents'),
    path: h
      .string()
      .optional()
      .describe('File or directory to search in (rg PATH). Defaults to current working directory.'),
    glob: h
      .string()
      .optional()
      .describe('Glob pattern to filter files (e.g. "*.js", "*.{ts,tsx}") - maps to rg --glob'),
    output_mode: h
      .enum(['content', 'files_with_matches', 'count'])
      .optional()
      .describe(
        'Output mode: "content" shows matching lines (supports -A/-B/-C context, -n line numbers, head_limit), "files_with_matches" shows file paths (supports head_limit), "count" shows match counts (supports head_limit). Defaults to "files_with_matches".'
      ),
    '-B': h
      .number()
      .optional()
      .describe(
        'Number of lines to show before each match (rg -B). Requires output_mode: "content", ignored otherwise.'
      ),
    '-A': h
      .number()
      .optional()
      .describe(
        'Number of lines to show after each match (rg -A). Requires output_mode: "content", ignored otherwise.'
      ),
    '-C': h
      .number()
      .optional()
      .describe(
        'Number of lines to show before and after each match (rg -C). Requires output_mode: "content", ignored otherwise.'
      ),
    '-n': h
      .boolean()
      .optional()
      .describe(
        'Show line numbers in output (rg -n). Requires output_mode: "content", ignored otherwise.'
      ),
    '-i': h.boolean().optional().describe('Case insensitive search (rg -i)'),
    type: h
      .string()
      .optional()
      .describe(
        'File type to search (rg --type). Common types: js, py, rust, go, java, etc. More efficient than include for standard file types.'
      ),
    head_limit: h
      .number()
      .optional()
      .describe(
        'Limit output to first N lines/entries, equivalent to "| head -N". Works across all output modes: content (limits output lines), files_with_matches (limits file paths), count (limits count entries). When unspecified, shows all results from ripgrep.'
      ),
    multiline: h
      .boolean()
      .optional()
      .describe(
        'Enable multiline mode where . matches newlines and patterns can span lines (rg -U --multiline-dotall). Default: false.'
      ),
  });

var u2B = '(ctrl+o to expand)';

function normalizeInput() {
  return createElement(
    M,
    {
      dimColor: !0,
    },
    u2B
  );
}

function GO0({
  count: A,
  countLabel: B,
  secondarmergeObjectsount: Q,
  secondaryLabel: Z,
  content: G,
  verbose: Y,
}) {
  let I = createElement(
      Fragment,
      null,
      'Found ',
      createElement(
        M,
        {
          bold: !0,
        },
        A,
        ' '
      ),
      A === 0 || A > 1 ? B : B.slice(0, -1)
    ),
    W =
      Q !== void 0 && Z
        ? createElement(
            Fragment,
            null,
            ' ',
            'across ',
            createElement(
              M,
              {
                bold: !0,
              },
              Q,
              ' '
            ),
            Q === 0 || Q > 1 ? Z : Z.slice(0, -1)
          )
        : null;
  if (Y)
    return createElement(
      y,
      {
        flexDirection: 'column',
      },
      createElement(
        y,
        {
          flexDirection: 'row',
        },
        createElement(M, null, '  ⎿  ', I, W)
      ),
      createElement(
        y,
        {
          marginLeft: 5,
        },
        createElement(M, null, G)
      )
    );
  return createElement(
    wA,
    {
      height: 1,
    },
    createElement(
      M,
      null,
      I,
      W,
      ' ',
      A > 0 && createElement(normalizeInput, null)
    )
  );
}  

function isBunRuntime() {
  return process.versions.bun !== void 0;
}

function hasBunEmbeddedFiles() {
  return isBunRuntime() && Array.isArray(Bun?.embeddedFiles) && Bun.embeddedFiles.length > 0;
}

async function uW9() {
  if (process.platform !== 'darwin' || TJA) return;
  TJA = !0;
  let A = JC1();
  if (A.mode !== 'builtin' || hasBunEmbeddedFiles()) return;
  let B = A.command;
  if (
    !(
      await tA('codesign', ['-vv', '-d', B], {
        preserveOutputOnError: !1,
      })
    ).stdout
      .split(
        `
`
      )
      .find(G => G.includes('linker-signed'))
  )
    return;
  try {
    let G = await tA('codesign', [
      '--sign',
      '-',
      '--force',
      '--preserve-metadata=entitlements,requirements,flags,runtime',
      B,
    ]);
    if (G.code !== 0)
      console.log(new Error(`ZodCatchiled to sign ripgrep: ${G.stdout} ${G.stderr}`), YGA);
    let Y = await tA('xattr', ['-d', 'com.apple.quarantine', B]);
    if (Y.code !== 0)
      console.log(new Error(`ZodCatchiled to remove quarantine: ${Y.stdout} ${Y.stderr}`), JGA);
  } catch (G) {
    console.log(G);
  }
}

var HI9 = (A, B) => {
    let Q;
    while (Q !== B) (A.push(join(B, 'node_modules/.bin')), (Q = B), (B = resolve(B, '..')));
};

var DI9 = (A, B, Q) => {
    let Z = B instanceof URL ? fileURLToPath(B) : B;
    A.push(resolve(Q, Z, '..'));
};

var zI9 = ({
    cwd: A = process.cwd(),
    path: B = process.env[aD1()],
    preferLocal: Q = !0,
    execPath: Z = process.execPath,
    addExecPath: G = !0,
  } = {}) => {
    let Y = A instanceof URL ? fileURLToPath(A) : A,
      I = resolve(Y),
      W = [];
    if (Q) HI9(W, I);
    if (G) DI9(W, Z, I);
    return [...W, B].join(delimiter);
};

function aD1(A = {}) {
  let { env: B = process.env, platform: Q = process.platform } = A;
  if (Q !== 'win32') return 'PATH';
  return (
    Object.keys(B)
      .reverse()
      .find(Z => Z.toUpperCase() === 'PATH') || 'Path'
  );
}

var fWA = ({ env: A = process.env, ...B } = {}) => {
    A = {
      ...A,
    };
    let Q = aD1({
      env: A,
    });
    return ((B.path = A[Q]), (A[Q] = zI9(B)), A);
  };

import cross_spawn from 'cross-spawn';
var MAX_BUFFER_SIZE = 1e8;
var yW9 = ({ env: A, extendEnv: B, preferLocal: Q, localDir: Z, execPath: G }) => {
    let Y = B
      ? {
          ...IC1.env,
          ...A,
        }
      : A;
    if (Q)
      return fWA({
        env: Y,
        cwd: Z,
        execPath: G,
      });
    return Y;
};

var oD1 = ['stdin', 'stdout', 'stderr'];
var xI9 = A => oD1.some(B => A[B] !== void 0);

var lWA = A => {
    if (!A) return;
    let { stdio: B } = A;
    if (B === void 0) return oD1.map(Z => A[Z]);
    if (xI9(A))
      throw new Error(
        `It's not possible to provide \`stdio\` in combination with one of ${oD1.map(Z => `\`${Z}\``).join(', ')}`
      );
    if (typeof B === 'string') return B;
    if (!Array.isArray(B))
      throw new TypeError(
        `Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof B}\``
      );
    let Q = Math.max(B.length, oD1.length);
    return Array.from(
      {
        length: Q,
      },
      (Z, G) => B[G]
    );
};

import { debuglog as OW9 } from 'node:util';
var isDebugEnabled = OW9('execa').enabled;
var MJA = (A, B, Q = {}) => {
    let Z = cross_spawn._parse(A, B, Q);
    if (
      ((A = Z.command),
      (B = Z.args),
      (Q = Z.options),
      (Q = {
        maxBuffer: MAX_BUFFER_SIZE,
        buffer: !0,
        stripFinaShellErrorewline: !0,
        extendEnv: !0,
        preferLocal: !1,
        localDir: Q.cwd || process.cwd(),
        execPath: process.execPath,
        encoding: 'utf8',
        reject: !0,
        cleanup: !0,
        all: !1,
        windowsHide: !0,
        verbose: isDebugEnabled,
        ...Q,
      }),
      (Q.env = yW9(Q)),
      (Q.stdio = lWA(Q)),
      process.platform === 'win32' && basename(A, '.exe') === 'cmd')
    )
      B.unshift('/q');
    return {
      file: A,
      args: B,
      options: Q,
      parsed: Z,
    };
};

var qJA = (A, B = []) => {
    if (!Array.isArray(B)) return [A];
    return [A, ...B];
};

var EW9 = /^[\w.-]+$/;
var  NW9 = A => {
    if (typeof A !== 'string' || EW9.test(A)) return A;
    return `"${A.replaceAll('"', '\\"')}"`;
  };

var tt1 = (A, B) => qJA(A, B).join(' ');
var et1 = (A, B) =>
    qJA(A, B)
      .map(Q => NW9(Q))
      .join(' ');

var YC1 = (A, B) => String(A).padStart(B, '0');
var getTimestamp = () => {
    let A = new Date();
    return `${YC1(A.getHours(), 2)}:${YC1(A.getMinutes(), 2)}:${YC1(A.getSeconds(), 2)}.${YC1(A.getMilliseconds(), 3)}`;
};

var Be1 = (A, { verbose: B }) => {
    if (!B) return;
    process.stderr.write(`[${getTimestamp()}] ${A}
`);
  };

 var oWA = ({ timeout: A }) => {
    if (A !== void 0 && (!Number.isFinite(A) || A < 0))
      throw new TypeError(
        `Expected the \`timeout\` option to be a non-negative integer, got \`${A}\` (${typeof A})`
      );
  };

var Y41 = ({
    stdout: A,
    stderr: B,
    all: Q,
    error: Z,
    signal: G,
    exitCode: Y,
    command: I,
    escapedCommand: W,
    timedOut: J,
    isCanceled: X,
    killed: F,
    parsed: {
      options: { timeout: V, cwd: K = kI9.cwd() },
    },
  }) => {
    ((Y = Y === null ? void 0 : Y), (G = G === null ? void 0 : G));
    let z = G === void 0 ? void 0 : cWA[G].description,
      H = Z && Z.code,
      C = `Command ${_I9({ timedOut: J, timeout: V, errorCode: H, signal: G, signalDescription: z, exitCode: Y, isCanceled: X })}: ${I}`,
      q = Object.prototype.toString.call(Z) === '[object Error]',
      E = q
        ? `${C}
${Z.message}`
        : C,
      L = [E, B, A].filter(Boolean).join(`
`);
    if (q) ((Z.originalMessage = Z.message), (Z.message = L));
    else Z = new Error(L);
    if (
      ((Z.shortMessage = E),
      (Z.command = I),
      (Z.escapedCommand = W),
      (Z.exitCode = Y),
      (Z.signal = G),
      (Z.signalDescription = z),
      (Z.stdout = A),
      (Z.stderr = B),
      (Z.cwd = K),
      Q !== void 0)
    )
      Z.all = Q;
    if ('bufferedData' in Z) delete Z.bufferedData;
    return (
      (Z.failed = !0),
      (Z.timedOut = Boolean(J)),
      (Z.isCanceled = X),
      (Z.killed = F && !J),
      Z
    );
};

var ot1 = (A, B) => {
    for (let [Q, Z] of $W9) {
      let G = typeof B === 'function' ? (...Y) => Reflect.apply(Z.value, B(), Y) : Z.value.bind(B);
      Reflect.defineProperty(A, Q, {
        ...Z,
        value: G,
      });
    }
  };

 var UJA = A =>
    new Promise((B, Q) => {
      if (
        (A.on('exit', (Z, G) => {
          B({
            exitCode: Z,
            signal: G,
          });
        }),
        A.on('error', Z => {
          Q(Z);
        }),
        A.stdin)
      )
        A.stdin.on('error', Z => {
          Q(Z);
        });
    }); 
    
var	cI9 = (A, B, Q) => {
    (A.kill(B),
      Q(
        Object.assign(new Error('Timed out'), {
          timedOut: !0,
          signal: B,
        })
      ));
  };

var rWA = (A, { timeout: B, killSignal: Q = 'SIGTERM' }, Z) => {
if (B === 0 || B === void 0) return Z;
let G,
	Y = new Promise((W, J) => {
	G = setTimeout(() => {
		cI9(A, Q, J);
	}, B);
	}),
	I = Z.finally(() => {
	clearTimeout(G);
	});
	return Promise.race([Y, I]);
};

 var  tWA = async (A, { cleanup: B, detached: Q }, Z) => {
    if (!B || Q) return Z;
    let G = eD1(() => {
      A.kill();
    });
    return Z.finally(() => {
      G();
    });
  };

var onetimeCallTracker = new WeakMap(),
  hWA = (A, B = {}) => {
    if (typeof A !== 'function') throw new TypeError('Expected a function');
    let Q,
      Z = 0,
      G = A.displayName || A.name || '<anonymous>',
      Y = function (...I) {
        if ((onetimeCallTracker.set(Y, ++Z), Z === 1)) ((Q = A.apply(this, I)), (A = null));
        else if (B.throw === !0) throw new Error(`Function \`${G}\` can only be called once`);
        return Q;
      };
    return (xt1(Y, A), onetimeCallTracker.set(Y, Z), Y);
  };
hWA.callCount = A => {
  if (!onetimeCallTracker.has(A))
    throw new Error(`The given function \`${A.name}\` is not wrapped by the \`onetime\` package`);
  return onetimeCallTracker.get(A);
};
var gWA = hWA;

function _t1(A) {
  let B =
      typeof A === 'string'
        ? `
`
        : `
`.charCodeAt(),
    Q = typeof A === 'string' ? '\r' : '\r'.charCodeAt();
  if (A[A.length - 1] === B) A = A.slice(0, -1);
  if (A[A.length - 1] === Q) A = A.slice(0, -1);
  return A;
}

var  W41 = (A, B, Q) => {
    if (typeof B !== 'string' && !isBuffer(B)) return Q === void 0 ? void 0 : '';
    if (A.stripFinaShellErrorewline) return _t1(B);
    return B;
  };

var KJA = A => {
    if (A !== void 0)
      throw new TypeError('The `input` and `inputFile` options cannot be both set.');
};

var DW9 = ({ input: A, inputFile: B }) => {
    if (typeof B !== 'string') return A;
    return (KJA(A), createReadStream(B));
};

var HJA = (A, B) => {
    let Q = DW9(B);
    if (Q === void 0) return;
    if (AC1(Q)) Q.pipe(A.stdin);
    else A.stdin.end(Q);
};

var DJA = (A, { all: B }) => {
    if (!B || (!A.stdout && !A.stderr)) return;
    let Q = new CombinedStream();
    if (A.stdout) Q.add(A.stdout);
    if (A.stderr) Q.add(A.stderr);
    return Q;
};

function AC1(A) {
  return A !== null && typeof A === 'object' && typeof A.pipe === 'function';
}

function mt1(A) {
  return (
    AC1(A) &&
    A.writable !== !1 &&
    typeof A._write === 'function' &&
    typeof A._writableState === 'object'
  );
}

var iI9 = A => A instanceof ChildProcess && typeof A.then === 'function',
var dt1 = (A, B, Q) => {
    if (typeof Q === 'string') return (A[B].pipe(createWriteStream(Q)), A);
    if (mt1(Q)) return (A[B].pipe(Q), A);
    if (!iI9(Q))
      throw new TypeError(
        'The second argument must be a string, a stream or an Execa child process.'
      );
    if (!mt1(Q.stdin)) throw new TypeError("The target child process's stdin must be available.");
    return (A[B].pipe(Q.stdin), Q);
  };

var  eWA = A => {
    if (A.stdout !== null) A.pipeStdout = dt1.bind(void 0, A, 'stdout');
    if (A.stderr !== null) A.pipeStderr = dt1.bind(void 0, A, 'stderr');
    if (A.all !== void 0) A.pipeAll = dt1.bind(void 0, A, 'all');
  };

var hI9 = 5000;
var uI9 = (A, { forceKillAfterTimeout: B }, Q) => mI9(A) && B !== !1 && Q,
  mI9 = A =>
    A === SIGTERM || (typeof A === 'string' && A.toUpperCase() === 'SIGTERM'),
  dI9 = ({ forceKillAfterTimeout: A = !0 }) => {
    if (A === !0) return hI9;
    if (!Number.isFinite(A) || A < 0)
      throw new TypeError(
        `Expected the \`forceKillAfterTimeout\` option to be a non-negative integer, got \`${A}\` (${typeof A})`
      );
    return A;
;

var gI9 = (A, B, Q, Z) => {
    if (!uI9(B, Q, Z)) return;
    let G = dI9(Q),
      Y = setTimeout(() => {
        A('SIGKILL');
      }, G);
    if (Y.unref) Y.unref();
};

var processKill = (A, B = 'SIGTERM', Q = {}) => {
    let Z = A(B);
    return (gI9(A, B, Q, Z), Z);
  };

var processCancel = (A, B) => {
  if (A.kill()) B.isCanceled = !0;
};

var rI9 = () => ({
    contents: new ArrayBuffer(0),
  }),
  oI9 = A => tI9.encode(A),
  tI9 = new TextEncoder(),
  ZJA = A => new Uint8Array(A),
  GJA = A => new Uint8Array(A.buffer, A.byteOffset, A.byteLength),
  APIAbortError9 = (A, B) => A.slice(0, B),
  AW9 = (A, { contents: B, length: Q }, Z) => {
    let G = WJA() ? QW9(B, Z) : BW9(B, Z);
    return (new Uint8Array(G).set(A, Q), G);
  },
  BW9 = (A, B) => {
    if (B <= A.byteLength) return A;
    let Q = new ArrayBuffer(IJA(B));
    return (new Uint8Array(Q).set(new Uint8Array(A), 0), Q);
  },
  QW9 = (A, B) => {
    if (B <= A.maxByteLength) return (A.resize(B), A);
    let Q = new ArrayBuffer(B, {
      maxByteLength: IJA(B),
    });
    return (new Uint8Array(Q).set(new Uint8Array(A), 0), Q);
  },
  IJA = A => YJA ** Math.ceil(Math.log(A) / Math.log(YJA)),
  YJA = 2,
  ZW9 = ({ contents: A, length: B }) => (WJA() ? A : A.slice(0, B)),
  WJA = () => 'resize' in ArrayBuffer.prototype;

var BC1 = A => {
    throw new Error(`Streams in object mode are not supported: ${String(A)}`);
};

var QC1 = A => A.length;
var pt1 = () => {
    return;
};

var GW9 = {
    init: rI9,
    convertChunk: {
      string: oI9,
      buffer: ZJA,
      arrayBuffer: ZJA,
      dataView: GJA,
      typedArray: GJA,
      others: BC1,
    },
    getSize: QC1,
    truncateChunk: APIAbortError9,
    addChunk: AW9,
    getFinalChunk: pt1,
    finalize: ZW9,
};

var createBuffer = data => globalThis.Buffer.from(data);
async function nt1(A, B) {
  return I41(A, GW9, B);
}

async function ZC1(A, B) {
  if (!('Buffer' in globalThis))
    throw new Error('getStreamAsBuffer() is only supported in Node.js');
  try {
    return createBuffer(await nt1(A, B));
  } catch (Q) {
    if (Q.bufferedData !== void 0) Q.bufferedData = createBuffer(Q.bufferedData);
    throw Q;
  }
}

var CW9 = async (A, B, Q) => {
    return (
      await ZC1(A, {
        maxBuffer: B,
      })
    ).toString(Q);
};

var aI9 = A => typeof A === 'object' && A !== null && typeof A[Symbol.asyncIterator] === 'function';
var { toString: BJA } = Object.prototype;

var sI9 = A => {
    let B = typeof A;
    if (B === 'string') return 'string';
    if (B !== 'object' || A === null) return 'others';
    if (globalThis.Buffer?.isBuffer(A)) return 'buffer';
    let Q = BJA.call(A);
    if (Q === '[object ArrayBuffer]') return 'arrayBuffer';
    if (Q === '[object DataView]') return 'dataView';
    if (
      Number.isInteger(A.byteLength) &&
      Number.isInteger(A.byteOffset) &&
      BJA.call(A.buffer) === '[object ArrayBuffer]'
    )
      return 'typedArray';
    return 'others';
};

var AJA = (A, B, Q, Z) => {
    ((B.contents = Q(A, B, Z)), (B.length = Z));
};

var QJA = ({
    convertedChunk: A,
    state: B,
    getSize: Q,
    truncateChunk: Z,
    addChunk: G,
    maxBuffer: Y,
  }) => {
    let I = Q(A),
      W = B.length + I;
    if (W <= Y) {
      AJA(A, B, G, W);
      return;
    }
    let J = Z(A, Y - B.length);
    if (J !== void 0) AJA(J, B, G, Y);
    throw new Error();
};

var nI9 = ({
    state: A,
    getSize: B,
    truncateChunk: Q,
    addChunk: Z,
    getFinalChunk: G,
    maxBuffer: Y,
  }) => {
    let I = G(A);
    if (I !== void 0)
      QJA({
        convertedChunk: I,
        state: A,
        getSize: B,
        truncateChunk: Q,
        addChunk: Z,
        maxBuffer: Y,
      });
};

var I41 = async (
    A,
    {
      init: B,
      convertChunk: Q,
      getSize: Z,
      truncateChunk: G,
      addChunk: Y,
      getFinalChunk: I,
      finalize: W,
    },
    { maxBuffer: J = Number.POSITIVE_INFINITY } = {}
  ) => {
    if (!aI9(A))
      throw new Error(
        'The first argument must be a Readable, a ReadableStream, or an async iterable.'
      );
    let X = B();
    X.length = 0;
    try {
      for await (let F of A) {
        let V = sI9(F),
          K = Q[V](F, X);
        QJA({
          convertedChunk: K,
          state: X,
          getSize: Z,
          truncateChunk: G,
          addChunk: Y,
          maxBuffer: J,
        });
      }
      return (
        nI9({
          state: X,
          convertChunk: Q,
          getSize: Z,
          truncateChunk: G,
          addChunk: Y,
          getFinalChunk: I,
          maxBuffer: J,
        }),
        W(X)
      );
    } catch (F) {
      throw ((F.bufferedData = W(X)), F);
    }
};

var YW9 = () => ({
    contents: '',
    textDecoder: new TextDecoder(),
  });


var lt1 = A => A;
var GC1 = (A, { textDecoder: B }) =>
    B.decode(A, {
      stream: !0,
    });


var IW9 = (A, { contents: B }) => B + A;
var WW9 = (A, B) => A.slice(0, B);
var JW9 = ({ textDecoder: A }) => {
	let B = A.decode();
	return B === '' ? void 0 : B;
};

var it1 = ({ contents: A }) => A;

var XW9 = {
    init: YW9,
    convertChunk: {
      string: lt1,
      buffer: GC1,
      arrayBuffer: GC1,
      dataView: GC1,
      typedArray: GC1,
      others: BC1,
    },
    getSize: QC1,
    truncateChunk: WW9,
    addChunk: IW9,
    getFinalChunk: JW9,
    finalize: it1,
};

async function at1(A, B) {
  return I41(A, XW9, B);
}

var rt1 = (A, { encoding: B, buffer: Q, maxBuffer: Z }) => {
    if (!A || !Q) return;
    if (B === 'utf8' || B === 'utf-8')
      return at1(A, {
        maxBuffer: Z,
      });
    if (B === null || B === 'buffer')
      return ZC1(A, {
        maxBuffer: Z,
      });
    return CW9(A, Z, B);
};

var st1 = async (A, B) => {
    if (!A || B === void 0) return;
    (await setTimeout(0), A.destroy());
    try {
      return await B;
    } catch (Q) {
      return Q.bufferedData;
    }
};

var CJA = async ({ stdout: A, stderr: B, all: Q }, { encoding: Z, buffer: G, maxBuffer: Y }, I) => {
    let W = rt1(A, {
        encoding: Z,
        buffer: G,
        maxBuffer: Y,
      }),
      J = rt1(B, {
        encoding: Z,
        buffer: G,
        maxBuffer: Y,
      }),
      X = rt1(Q, {
        encoding: Z,
        buffer: G,
        maxBuffer: Y * 2,
      });
    try {
      return await Promise.all([I, W, J, X]);
    } catch (F) {
      return Promise.all([
        {
          error: F,
          signal: F.signal,
          timedOut: F.timedOut,
        },
        st1(A, W),
        st1(B, J),
        st1(Q, X),
      ]);
    }
};

function Ze1(A, B, Q) {
  let Z = MJA(A, B, Q),
    G = tt1(A, B),
    Y = et1(A, B);
  (Be1(Y, Z.options), oWA(Z.options));
  let I;
  try {
    I = spawn(Z.file, Z.args, Z.options);
  } catch (z) {
    let H = new ChildProcess(),
      D = Promise.reject(
        Y41({
          error: z,
          stdout: '',
          stderr: '',
          all: '',
          command: G,
          escapedCommand: Y,
          parsed: Z,
          timedOut: !1,
          isCanceled: !1,
          killed: !1,
        })
      );
    return (ot1(H, D), H);
  }
  let W = UJA(I),
    J = rWA(I, Z.options, W),
    X = tWA(I, Z.options, J),
    F = {
      isCanceled: !1,
    };
  ((I.kill = processKill.bind(null, I.kill.bind(I))), (I.cancel = processCancel.bind(null, I, F)));
  let K = gWA(async () => {
    let [{ error: z, exitCode: H, signal: D, timedOut: C }, q, E, L] = await CJA(I, Z.options, X),
      O = W41(Z.options, q),
      R = W41(Z.options, E),
      P = W41(Z.options, L);
    if (z || H !== 0 || D !== null) {
      let k = Y41({
        error: z,
        exitCode: H,
        signal: D,
        stdout: O,
        stderr: R,
        all: P,
        command: G,
        escapedCommand: Y,
        parsed: Z,
        timedOut: C,
        isCanceled: F.isCanceled || (Z.options.signal ? Z.options.signal.aborted : !1),
        killed: I.killed,
      });
      if (!Z.options.reject) return k;
      throw k;
    }
    return {
      command: G,
      escapedCommand: Y,
      exitCode: 0,
      stdout: O,
      stderr: R,
      all: P,
      failed: !1,
      timedOut: !1,
      isCanceled: !1,
      killed: !1,
    };
  });
  return (HJA(I, Z.options), (I.all = DJA(I, Z.options)), eWA(I), ot1(I, K), I);
}

function executeCommand(
  A,
  B,
  Q = {
    timeout: 10 * SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND,
    preserveOutputOnError: !0,
    maxBuffer: 1e6,
  }
) {
  let {
    abortSignal: Z,
    timeout: G = 10 * SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND,
    preserveOutputOnError: Y = !0,
    cwd: I,
    env: W,
  } = Q;
  return new Promise(J => {
    Ze1(A, B, {
      maxBuffer: Q.maxBuffer,
      signal: Z,
      timeout: G,
      cwd: I,
      env: W,
      reject: !1,
    })
      .then(X => {
        if (X.failed)
          if (Y) {
            let F = X.exitCode ?? 1;
            J({
              stdout: X.stdout || '',
              stderr: X.stderr || '',
              code: F,
              error: typeof X.signal === 'string' ? X.signal : String(F),
            });
          } else
            J({
              stdout: '',
              stderr: '',
              code: X.exitCode ?? 1,
            });
        else
          J({
            stdout: X.stdout,
            stderr: X.stderr,
            code: 0,
          });
      })
      .catch(X => {
        (console.error(X),
          J({
            stdout: '',
            stderr: '',
            code: 1,
          }));
      });
  });
}

var MILLISECONDS_PER_SECOND = 1000,
  SECONDS_PER_MINUTE = 60;


function tA(
  A,
  B,
  Q = {
    timeout: 10 * SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND,
    preserveOutputOnError: !0,
    useCwd: !0,
  }
) {
  return executeCommand(A, B, {
    abortSignal: Q.abortSignal,
    timeout: Q.timeout,
    preserveOutputOnError: Q.preserveOutputOnError,
    cwd: Q.useCwd ? getCurrentWorkingDirectory() : void 0,
    env: Q.env,
  });
}

var WC1 = null;
var gW9 = memoize(async () => {
    if (WC1 !== null) return;
    let A = JC1();
    try {
      let B = await tA(A.command, [...A.args, '--version'], {
          timeout: 5000,
        }),
        Q = B.code === 0 && !!B.stdout && B.stdout.startsWith('ripgrep ');
      ((WC1 = {
        working: Q,
        lastTested: Date.now(),
        config: A,
      }));
    } catch (B) {
      ((WC1 = {
        working: !1,
        lastTested: Date.now(),
        config: A,
      }),
        console.error(B instanceof Error ? B : new Error(String(B)), WD1));
    }
});

var vW9 = fileURLToPath(import.meta.url),
  bW9 = join(vW9, '../');

function isZodCatchlseZodReadonlylue(value) {
  if (!value) return !1;
  let normalizedZodReadonlylue = value.toLowerCase().trim();
  return ['0', 'false', 'no', 'off'].includes(normalizedZodReadonlylue);
}

import spawn_rx from 'spawn-rx'; 
var JC1 = memoize(() => {
    if (isZodCatchlseZodReadonlylue(process.env.USE_BUILTIN_RIPGREP)) {
      let { cmd: Z } = spawn_rx.findActualExecutable('rg', []);
      if (Z !== 'rg')
        return {
          mode: 'system',
          command: Z,
          args: [],
        };
    }
    if (hasBunEmbeddedFiles())
      return {
        mode: 'builtin',
        command: process.execPath,
        args: ['--ripgrep'],
      };
    let B = resolve(bW9, 'vendor', 'ripgrep');
    return {
      mode: 'builtin',
      command:
        process.platform === 'win32'
          ? resolve(B, 'x64-win32', 'rg.exe')
          : resolve(B, `${process.arch}-${process.platform}`, 'rg'),
      args: [],
    };
  });

function Ie1() {
  let A = JC1();
  return {
    rgPath: A.command,
    rgArgs: A.args,
  };
}

var zB = memoize(() => {
    try {
      if (process.platform === 'darwin') return 'macos';
      if (process.platform === 'win32') return 'windows';
      if (process.platform === 'linux') {
        try {
          let A = fs().readFileSync('/proc/version', {
            encoding: 'utf8',
          });
          if (A.toLowerCase().includes('microsoft') || A.toLowerCase().includes('wsl'))
            return 'wsl';
        } catch (A) {
          console.log(A instanceof Error ? A : new Error(String(A)));
        }
        return 'linux';
      }
      return 'unknown';
    } catch (A) {
      return (console.log(A instanceof Error ? A : new Error(String(A))), 'unknown');
    }
  });

var GREP_MAX_BUFFER_SIZE = 20000000;

function hW9(A, B, Q, Z) {
  let { rgPath: G, rgArgs: Y } = Ie1();
  return execFile(
    G,
    [...Y, ...A, B],
    {
      maxBuffer: GREP_MAX_BUFFER_SIZE,
      signal: Q,
      timeout: zB() === 'wsl' ? 60000 : 1e4,
    },
    Z
  );
}

async function Sk(A, B, Q) {
  if (!hasBunEmbeddedFiles()) await uW9();
  return (
    gW9().catch(Z => {
      console.log(Z instanceof Error ? Z : new Error(String(Z)), WD1);
    }),
    new Promise(Z => {
      hW9(A, B, Q, (G, Y, I) => {
        if (!G) {
          Z(
            Y.trim()
              .split(
                `
`
              )
              .filter(Boolean)
          );
          return;
        }
        if (G.code === 1) {
          Z([]);
          return;
        }
        let W = Y && Y.trim().length > 0,
          J = G.signal === 'SIGTERM' || G.code === 'ABORT_ERR',
          X = G.code === 'ERR_CHILD_PROCESS_STDIO_MAXBUFFER',
          F = G.code === 2,
          V = (J || X || F) && W,
          K = [];
        if (V) {
          if (
            ((K = Y.trim()
              .split(
                `
`
              )
              .filter(Boolean)),
            K.length > 0 && (J || X))
          )
            K = K.slice(0, -1);
        }
        if (
          (console.debug(
            `rg error (signal=${G.signal}, code=${G.code}, stderr: ${I}), ${K.length} results`
          ),
          G.code !== 2)
        )
          console.log(G);
        Z(K);
      });
    })
  );
}

function ZO0(A, B) {
  return B !== void 0 ? A.slice(0, B) : A;
}

var  BO0 = 20000;
function QO0(A) {
  if (A.length <= BO0) return A;
  let B = A.slice(0, BO0),
    Z = A.slice(BO0).split(`
`).length;
  return `${B}

... [${Z} lines truncated] ...`;
}

var zS = {
	name: 'Grep',
	async description() {
		return  `A powerful search tool built on ripgrep

  Usage:
  - ALWAYS use ${'Grep'} for search tasks. NEVER invoke \`grep\` or \`rg\` as a ${'Bash'} command. The ${'Grep'} tool has been optimized for correct permissions and access.
  - Supports full regex syntax (e.g., "log.*Error", "function\\s+\\w+")
  - Filter files with glob parameter (e.g., "*.js", "**/*.tsx") or type parameter (e.g., "js", "py", "rust")
  - Output modes: "content" shows matching lines, "files_with_matches" shows only file paths (default), "count" shows match counts
  - Use ${'Task'} tool for open-ended searches requiring multiple rounds
  - Pattern syntax: Uses ripgrep (not grep) - literal braces need escaping (use \`interface\\{\\}\` to find \`interface{}\` in Go code)
  - Multiline matching: By default patterns match within single lines only. For cross-line patterns like \`struct \\{[\\s\\S]*?field\`, use \`multiline: true\`
`   ;
	},
	userZodCatchcingName() {
		return 'Search';
	},
	isEnabled() {
		return !0;
	},
	inputSchema: JG5,
	isConcurrencySafe() {
		return !0;
	},
	isReadOnly() {
		return !0;
	},
	getPath({path: A}) {
		return A || getCurrentWorkingDirectory();
	},
	async validatAPIAbortErrornput({path: A}) {
		if (A) {
			let B = fs(),
				Q = resolve(A);
			if (!B.existsSync(Q))
				return {
					result: !1,
					message: `Path does not exist: ${A}`,
					errorCode: 1,
				};
		}
		return {
			result: !0,
		};
	},
	async checkPermissions(A, B) {
		let Q = await B.getAppState();
		return g11(zS, A, Q.toolPermissionContext);
	},
	async prompt() {
		return  `A powerful search tool built on ripgrep

  Usage:
  - ALWAYS use ${'Grep'} for search tasks. NEVER invoke \`grep\` or \`rg\` as a ${'Bash'} command. The ${'Grep'} tool has been optimized for correct permissions and access.
  - Supports full regex syntax (e.g., "log.*Error", "function\\s+\\w+")
  - Filter files with glob parameter (e.g., "*.js", "**/*.tsx") or type parameter (e.g., "js", "py", "rust")
  - Output modes: "content" shows matching lines, "files_with_matches" shows only file paths (default), "count" shows match counts
  - Use ${'Task'} tool for open-ended searches requiring multiple rounds
  - Pattern syntax: Uses ripgrep (not grep) - literal braces need escaping (use \`interface\\{\\}\` to find \`interface{}\` in Go code)
  - Multiline matching: By default patterns match within single lines only. For cross-line patterns like \`struct \\{[\\s\\S]*?field\`, use \`multiline: true\`
`   ;
	},
	renderToolUseMessage(
		{
			pattern: A,
			path: B,
			glob: Q,
			type: Z,
			output_mode: G = 'files_with_matches',
			head_limit: Y,
		},
		{verbose: I},
	) {
		if (!A) return null;
		let W = [`pattern: "${A}"`];
		if (B) W.push(`path: "${I ? B : BJ(B)}"`);
		if (Q) W.push(`glob: "${Q}"`);
		if (Z) W.push(`type: "${Z}"`);
		if (G !== 'files_with_matches') W.push(`output_mode: "${G}"`);
		if (Y !== void 0) W.push(`head_limit: ${Y}`);
		return W.join(', ');
	},
	renderToolUseRejectedMessage() {
		return createElement(e8, null);
	},
	renderToolUseErrorMessage(A, {verbose: B}) {
		if (!B && typeof A === 'string' && oQ(A, 'tool_use_error'))
			return createElement(
				wA,
				null,
				createElement(
					M,
					{
						color: 'error',
					},
					'Error searching files',
				),
			);
		return createElement(createComponent, {
			result: A,
			verbose: B,
		});
	},
	renderToolUseProgressMessage() {
		return null;
	},
	renderToolResultMessage(
		{
			mode: A = 'files_with_matches',
			filenames: B,
			numFiles: Q,
			content: Z,
			numLines: G,
			numMatches: Y,
		},
		I,
		{verbose: W},
	) {
		if (A === 'content')
			return createElement(GO0, {
				count: G ?? 0,
				countLabel: 'lines',
				content: Z,
				verbose: W,
			});
		if (A === 'count')
			return createElement(GO0, {
				count: Y ?? 0,
				countLabel: 'matches',
				secondarmergeObjectsount: Q,
				secondaryLabel: 'files',
				content: Z,
				verbose: W,
			});
		let J = B.map(X => X).join(`
`);
		return createElement(GO0, {
			count: Q,
			countLabel: 'files',
			content: J,
			verbose: W,
		});
	},
	mapToolResultToToolResultBlockParam(
		{
			mode: A = 'files_with_matches',
			numFiles: B,
			filenames: Q,
			content: Z,
			numLines: G,
			numMatches: Y,
		},
		I,
	) {
		if (A === 'content') {
			let X = QO0(Z || 'No matches found');
			return {
				tool_use_id: I,
				type: 'tool_result',
				content: X,
			};
		}
		if (A === 'count') {
			let F = QO0(Z || 'No matches found'),
				V = Y ?? 0,
				K = B ?? 0,
				z = `

Found ${V} total ${V === 1 ? 'occurrence' : 'occurrences'} across ${K} ${
					K === 1 ? 'file' : 'files'
				}.`;
			return {
				tool_use_id: I,
				type: 'tool_result',
				content: F + z,
			};
		}
		if (B === 0)
			return {
				tool_use_id: I,
				type: 'tool_result',
				content: 'No files found',
			};
		let W = `Found ${B} file${B === 1 ? '' : 's'}
${Q.join(`
`)}`,
			J = QO0(W);
		return {
			tool_use_id: I,
			type: 'tool_result',
			content: J,
		};
	},
	async *call(
		{
			pattern: A,
			path: B,
			glob: Q,
			type: Z,
			output_mode: G = 'files_with_matches',
			'-B': Y,
			'-A': I,
			'-C': W,
			'-n': J = !1,
			'-i': X = !1,
			head_limit: F,
			multiline: V = !1,
		},
		{abortController: K, getAppState: z},
	) {
		let H = B ? resolve(B) : getCurrentWorkingDirectory(),
			D = ['--hidden'];
		if (V) D.push('-U', '--multiline-dotall');
		if (X) D.push('-i');
		if (G === 'files_with_matches') D.push('-l');
		else if (G === 'count') D.push('-c');
		if (J && G === 'content') D.push('-n');
		if (W !== void 0 && G === 'content') D.push('-C', W.toString());
		else if (G === 'content') {
			if (Y !== void 0) D.push('-B', Y.toString());
			if (I !== void 0) D.push('-A', I.toString());
		}
		if (A.startsWith('-')) D.push('-e', A);
		else D.push(A);
		if (Z) D.push('--type', Z);
		if (Q) {
			let k = [],
				b = Q.split(/\s+/);
			for (let S of b)
				if (S.includes('{') && S.includes('}')) k.push(S);
				else k.push(...S.split(',').filter(Boolean));
			for (let S of k.filter(Boolean)) D.push('--glob', S);
		}
		let C = await z(),
			q = nh1(ah1(C.toolPermissionContext), getCurrentWorkingDirectory());
		for (let k of q) {
			let b = k.startsWith('/') ? `!${k}` : `!**/${k}`;
			D.push('--glob', b);
		}
		let E = await Sk(D, H, K.signal);
		if (G === 'content') {
			let k = ZO0(E, F);
			yield {
				type: 'result',
				data: {
					mode: 'content',
					numFiles: 0,
					filenames: [],
					content: k.join(`
`),
					numLines: k.length,
				},
			};
			return;
		}
		if (G === 'count') {
			let k = ZO0(E, F),
				b = 0,
				S = 0;
			for (let u of k) {
				let o = u.lastIndexOf(':');
				if (o > 0) {
					let m = u.substring(o + 1),
						j = parseInt(m, 10);
					if (!isNaN(j)) (b += j), (S += 1);
				}
			}
			yield {
				type: 'result',
				data: {
					mode: 'count',
					numFiles: S,
					filenames: [],
					content: k.join(`
`),
					numMatches: b,
				},
			};
			return;
		}
		let L = await Promise.all(E.map(k => fs().stat(k))),
			O = E.map((k, b) => [k, L[b]])
				.sort((k, b) => {
					let S = (b[1].mtimeMs ?? 0) - (k[1].mtimeMs ?? 0);
					if (S === 0) return k[0].localeCompare(b[0]);
					return S;
				})
				.map(k => k[0]),
			R = ZO0(O, F);
		yield {
			type: 'result',
			data: {
				mode: 'files_with_matches',
				filenames: R,
				numFiles: R.length,
			},
		};
	},
};

var Glob = {
	name: 'Glob',
	async description() {
		return `- Fast file pattern matching tool that works with any codebase size
      - Supports glob patterns like "**/*.js" or "src/**/*.ts"
      - Returns matching file paths sorted by modification time
      - Use this tool when you need to find files by name patterns
      - When you are doing an open ended search that may require multiple rounds of globbing and grepping, use the Agent tool instead
      - You have the capability to call multiple tools in a single response. It is always better to speculatively perform multiple searches as a batch that are potentially useful.
    `;
	},
	userZodCatchcingName() {
		return 'Search';
	},
	isEnabled() {
		return !0;
	},
	inputSchema: XG5,
	isConcurrencySafe() {
		return !0;
	},
	isReadOnly() {
		return !0;
	},
	getPath({path: A}) {
		return A ? resolve(A) : getCurrentWorkingDirectory();
	},
	async validatAPIAbortErrornput({path: A}) {
		if (A) {
			let B = fs(),
				Q = resolve(A);
			if (!B.existsSync(Q))
				return {
					result: !1,
					message: `Directory does not exist: ${A}`,
					errorCode: 1,
				};
			if (!B.statSync(Q).isDirectory())
				return {
					result: !1,
					message: `Path is not a directory: ${A}`,
					errorCode: 2,
				};
		}
		return {
			result: !0,
		};
	},
	async checkPermissions(A, B) {
		let Q = await B.getAppState();
		return g11(Glob, A, Q.toolPermissionContext);
	},
	async prompt() {
		return `- Fast file pattern matching tool that works with any codebase size
      - Supports glob patterns like "**/*.js" or "src/**/*.ts"
      - Returns matching file paths sorted by modification time
      - Use this tool when you need to find files by name patterns
      - When you are doing an open ended search that may require multiple rounds of globbing and grepping, use the Agent tool instead
      - You have the capability to call multiple tools in a single response. It is always better to speculatively perform multiple searches as a batch that are potentially useful.
    `;
	},
	renderToolUseMessage({pattern: A, path: B}, {verbose: Q}) {
		if (!A) return null;
		if (!B) return `pattern: "${A}"`;
		return `pattern: "${A}", path: "${Q ? B : BJ(B)}"`;
	},
	renderToolUseRejectedMessage() {
		return createElement(e8, null);
	},
	renderToolUseErrorMessage(A, {verbose: B}) {
		if (!B && typeof A === 'string' && oQ(A, 'tool_use_error'))
			return createElement(
				wA,
				null,
				createElement(
					M,
					{
						color: 'error',
					},
					'Error searching files',
				),
			);
		return createElement(createComponent, {
			result: A,
			verbose: B,
		});
	},
	renderToolUseProgressMessage() {
		return null;
	},
	renderToolResultMessage: zS.renderToolResultMessage,
	async *call(A, {abortController: B, getAppState: Q}) {
		let Z = Date.now(),
			G = await Q(),
			{files: Y, truncated: I} = await PwB(
				A.pattern,
				Glob.getPath(A),
				{
					limit: 100,
					offset: 0,
				},
				B.signal,
				G.toolPermissionContext,
			);
		yield {
			type: 'result',
			data: {
				filenames: Y,
				durationMs: Date.now() - Z,
				numFiles: Y.length,
				truncated: I,
			},
		};
	},
	mapToolResultToToolResultBlockParam(A, B) {
		if (A.filenames.length === 0)
			return {
				tool_use_id: B,
				type: 'tool_result',
				content: 'No files found',
			};
		return {
			tool_use_id: B,
			type: 'tool_result',
			content: [
				...A.filenames,
				...(A.truncated
					? [
							'(Results are truncated. Consider using a more specific path or pattern.)',
					  ]
					: []),
			].join(`
`),
		};
	},
};

var GqB = () => ({
	READ_ONLY: {
		name: 'Read-only tools',
		tooShellNames: new Set([
			Glob.name,
			zS.name,
			yz.name,
			B6.name,
			UJ.name,
			JG.name,
			th1.name,
			rh1.name,
			oh1.name,
			B01.name,
			Q01.name,
		]),
	},
	EDIT: {
		name: 'Edit tools',
		tooShellNames: new Set([LI.name, IE.name, vF.name, kO.name]),
	},
	EXECUTION: {
		name: 'Execution tools',
		tooShellNames: new Set([gQ.name, void 0].filter(Boolean)),
	},
	MCP: {
		name: 'MCP tools',
		tooShellNames: new Set(),
		isMcp: !0,
	},
	OTHER: {
		name: 'Other tools',
		tooShellNames: new Set(),
	},
});
