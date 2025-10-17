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

function getFlagSettingsPath() {
  return globalState.flagSettingsPath;
}

function setFlagSettingsPath(flagSettingsPath) {
  globalState.flagSettingsPath = flagSettingsPath;
}

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

var nonSlashPattern = '[^/]';

var	nonSlashWildcardPattern = nonSlashPattern + '*?';
var	dotDirExcludePattern = '(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?';
var dotFileExcludePattern = '(?:(?!(?:\\/|^)\\.).)*?';

var filterFunction = (A, B = {}) => Q =>FV(Q, A, B);

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
  };

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


function getProviderType() {
  return process.env.JOSE_CODE_USE_BEDROCK
    ? 'bedrock'
    : process.env.JOSE_CODE_USE_VERTEX
      ? 'vertex'
      : 'firstParty';
}


function isFirstPartyProvider() {
  return getProviderType() === 'firstParty';
}

var ne6 = h.strictObject({
    plan: h
      .string()
      .describe(
        'The plan you came up with, that you want to run by the user for approval. Supports markdown. The plan should be pretty concise.'
      ),
  }),
  YN7 = h.object({
    plan: h.string().describe('The plan that was presented to the user'),
    isAgent: h.boolean(),
  });

var Grep = {
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

var ExitPlanMode = {
    name: 'ExitPlanMode',
    async description() {
      return 'Prompts the user to exit plan mode and start coding';
    },
    async prompt() {
      return `Use this tool when you are in plan mode and have finished presenting your plan and are ready to code. This will prompt the user to exit plan mode. 
		IMPORTANT: Only use this tool when the task requires planning the implementation steps of a task that requires writing code. For research tasks where you're gathering information, searching files, reading files or in general trying to understand the codebase - do NOT use this tool.

		Eg. 
		1. Initial task: "Search for and understand the implementation of vim mode in the codebase" - Do not use the exit plan mode tool because you are not planning the implementation steps of a task.
		2. Initial task: "Help me implement yank mode for vim" - Use the exit plan mode tool after you have finished planning the implementation steps of the task.
		`;
    },
    inputSchema: ne6,
    userZodCatchcingName() {
      return '';
    },
    isEnabled() {
      return !0;
    },
    isConcurrencySafe() {
      return !0;
    },
    isReadOnly() {
      return !0;
    },
    async checkPermissions(A) {
      return {
        behavior: 'ask',
        message: 'Exit plan mode?',
        updatedInput: A,
      };
    },
    renderToolUseMessage() {
      return null;
    },
    renderToolUseProgressMessage() {
      return null;
    },
    renderToolResultMessage({ plan: A }, B, { theme: Q }) {
      return createElement(
        y,
        {
          flexDirection: 'column',
          marginTop: 1,
        },
        createElement(
          y,
          {
            flexDirection: 'row',
          },
          createElement(
            M,
            {
              color: fC1('plan'),
            },
            WO
          ),
          createElement(M, null, "User approved Jose's plan:")
        ),
        createElement(
          wA,
          null,
          createElement(
            M,
            {
              dimColor: !0,
            },
            EX(A, Q)
          )
        )
      );
    },
    renderToolUseRejectedMessage({ plan: A }, { theme: B }) {
      return createElement(nv1, {
        plan: A,
        themeName: B,
      });
    },
    renderToolUseErrorMessage() {
      return null;
    },
    async *call({ plan: A }, B) {
      let Q = B.agentId !== getSessionId();
      yield {
        type: 'result',
        data: {
          plan: A,
          isAgent: Q,
        },
      };
    },
    mapToolResultToToolResultBlockParam({ isAgent: A }, B) {
      if (A)
        return {
          type: 'tool_result',
          content:
            'User has approved the plan. There is nothing else needed from you now. Please respond with "ok"',
          tool_use_id: B,
        };
      return {
        type: 'tool_result',
        content:
          'User has approved your plan. You can now start coding. Start with updating your todo list if applicable',
        tool_use_id: B,
      };
    },
};

var M41 = 2000;
var CC9 = 2000;
var Read = {
    name: 'Read',
    async description() {
      return 'Read a file from the local filesystem.';
    },
    async prompt() {
      return `Reads a file from the local filesystem. You can access any file directly by using this tool.
Assume this tool is able to read all files on the machine. If the User provides a path to a file assume that path is valid. It is okay to read a file that does not exist; an error will be returned.

Usage:
- The file_path parameter must be an absolute path, not a relative path
- By default, it reads up to ${M41} lines starting from the beginning of the file
- You can optionally specify a line offset and limit (especially handy for long files), but it's recommended to read the whole file by not providing these parameters
- Any lines longer than ${CC9} characters will be truncated
- Results are returned using cat -n format, with line numbers starting at 1
- This tool allows Jose Code to read images (eg PNG, JPG, etc). When reading an image file the contents are presented visually as Jose Code is a multimodal LLM.${
    isFirstPartyProvider()
      ? `
- This tool can read PDF files (.pdf). PDFs are processed page by page, extracting both text and visual content for analysis.`
      : ''
  }
- This tool can read Jupyter notebooks (.ipynb files) and returns all cells with their outputs, combining code, text, and visualizations.
- This tool can only read files, not directories. To read a directory, use an ls command via the ${'Bash'} tool.
- You have the capability to call multiple tools in a single response. It is always better to speculatively read multiple files as a batch that are potentially useful. 
- You will regularly be asked to read screenshots. If the user provides a path to a screenshot ALWAYS use this tool to view the file at the path. This tool will work with all temporary file paths like /var/folders/123/abc/T/TemporaryItems/NSIRD_screencaptureui_ZfB1tD/Screenshot.png
- If you read a file that exists but has empty contents you will receive a system reminder warning in place of file contents.`;
    },
    inputSchema: du6,
    userZodCatchcingName() {
      return 'Read';
    },
    isEnabled() {
      return !0;
    },
    isConcurrencySafe() {
      return !0;
    },
    isReadOnly() {
      return !0;
    },
    getPath({ file_path: A }) {
      return A || getCurrentWorkingDirectory();
    },
    async checkPermissions(A, B) {
      let Q = await B.getAppState();
      return g11(B6, A, Q.toolPermissionContext);
    },
    renderToolUseMessage({ file_path: A, offset: B, limit: Q }, { verbose: Z }) {
      if (!A) return null;
      if (Z) return `file_path: "${A}"${B ? `, offset: ${B}` : ''}${Q ? `, limit: ${Q}` : ''}`;
      return BJ(A);
    },
    renderToolUseProgressMessage() {
      return null;
    },
    renderToolResultMessage(A) {
      switch (A.type) {
        case 'image': {
          let { originalSize: B } = A.file,
            Q = dJ(B);
          return createElement(
            wA,
            {
              height: 1,
            },
            createElement(M, null, 'Read image (', Q, ')')
          );
        }
        case 'notebook': {
          let { cells: B } = A.file;
          if (!B || B.length < 1)
            return createElement(
              M,
              {
                color: 'error',
              },
              'No cells found in notebook'
            );
          return createElement(
            wA,
            {
              height: 1,
            },
            createElement(
              M,
              null,
              'Read ',
              createElement(
                M,
                {
                  bold: !0,
                },
                B.length
              ),
              ' cells'
            )
          );
        }
        case 'pdf': {
          let { originalSize: B } = A.file,
            Q = dJ(B);
          return createElement(
            wA,
            {
              height: 1,
            },
            createElement(M, null, 'Read PDF (', Q, ')')
          );
        }
        case 'text': {
          let { numLines: B } = A.file;
          return createElement(
            wA,
            {
              height: 1,
            },
            createElement(
              M,
              null,
              'Read ',
              createElement(
                M,
                {
                  bold: !0,
                },
                B
              ),
              ' ',
              B === 1 ? 'line' : 'lines',
              ' ',
              B > 0 && createElement(normalizeInput, null)
            )
          );
        }
      }
    },
    renderToolUseRejectedMessage() {
      return createElement(e8, null);
    },
    renderToolUseErrorMessage(A, { verbose: B }) {
      if (!B && typeof A === 'string' && oQ(A, 'tool_use_error'))
        return createElement(
          wA,
          null,
          createElement(
            M,
            {
              color: 'error',
            },
            'Error reading file'
          )
        );
      return createElement(createComponent, {
        result: A,
        verbose: B,
      });
    },
    async validatAPIAbortErrornput({ file_path: A, offset: B, limit: Q }) {
      let Z = fs(),
        G = $d(A);
      if (V$(G))
        return {
          result: !1,
          message: 'File is in a directory that is ignored by your project configuration.',
          errorCode: 1,
        };
      if (!Z.existsSync(G)) {
        let F = y_1(G),
          V = 'File does not exist.',
          K = getCurrentWorkingDirectory(),
          z = getOriginalWorkingDirectory();
        if (K !== z) V += ` Current working directory: ${K}`;
        if (F) V += ` Did you mean ${F}?`;
        return {
          result: !1,
          message: V,
          errorCode: 2,
        };
      }
      let I = Z.statSync(G).size,
        W = pathHelpers.extname(G).toLowerCase();
      if (mu6.has(W.slice(1)) && !(isFirstPartyProvider() && gC1(W)))
        return {
          result: !1,
          message: `This tool cannot read binary files. The file appears to be a binary ${W} file. Please use appropriate tools for binary file analysis.`,
          errorCode: 4,
        };
      if (I === 0) {
        if (P_1.has(W.slice(1)))
          return {
            result: !1,
            message: 'Empty image files cannot be processed.',
            errorCode: 5,
          };
      }
      let J = W === '.ipynb',
        X = isFirstPartyProvider() && gC1(W);
      if (!P_1.has(W.slice(1)) && !J && !X) {
        if (I > j_1 && !B && !Q)
          return {
            result: !1,
            message: mC0(I),
            meta: {
              fileSize: I,
            },
            errorCode: 6,
          };
      }
      return {
        result: !0,
      };
    },
    async *call({ file_path: A, offset: B = 1, limit: Q = void 0 }, Z) {
      let {
          readFileState: G,
          options: { isNonInteractiveSession: Y },
          fileReadingLimits: I,
        } = Z,
        W = j_1,
        J = I?.maxTokens ?? k4B,
        X = pathHelpers.extname(A).toLowerCase().slice(1),
        F = $d(A);
      if (X === 'ipynb') {
        let C = P4B(F),
          q = JSON.stringify(C);
        if (q.length > W)
          throw new Error(`Notebook content (${dJ(q.length)}) exceeds maximum allowed size (${dJ(W)}). Use ${bashTool} with jq to read specific portions:
  cat "${A}" | jq '.cells[:20]' # First 20 cells
  cat "${A}" | jq '.cells[100:120]' # Cells 100-120
  cat "${A}" | jq '.cells | length' # Count total cells
  cat "${A}" | jq '.cells[] | select(.cell_type=="code") | .source' # All code sources`);
        (await y4B(q, X, {
          isNonInteractiveSession: Y,
          maxSizeBytes: W,
          maxTokens: J,
        }),
          G.set(F, {
            content: q,
            timestamp: fs().statSync(F).mtimeMs,
          }),
          Z.nestedMemoryAttachmentTriggers?.add(F),
          yield {
            type: 'result',
            data: {
              type: 'notebook',
              file: {
                filePath: A,
                cells: C,
              },
            },
          });
        return;
      }
      if (P_1.has(X)) {
        let C = await eu6(F, X);
        if (Math.ceil(C.file.base64.length * 0.125) > J) {
          let E = await pu6(F, J);
          (G.set(F, {
            content: E.file.base64,
            timestamp: fs().statSync(F).mtimeMs,
          }),
            Z.nestedMemoryAttachmentTriggers?.add(F),
            yield {
              type: 'result',
              data: E,
            });
          return;
        }
        (G.set(F, {
          content: C.file.base64,
          timestamp: fs().statSync(F).mtimeMs,
        }),
          Z.nestedMemoryAttachmentTriggers?.add(F),
          yield {
            type: 'result',
            data: C,
          });
        return;
      }
      if (isFirstPartyProvider() && gC1(X)) {
        let C = await MUA(F);
        yield {
          type: 'result',
          data: C,
          newMessages: [
            vA({
              content: [
                {
                  type: 'document',
                  source: {
                    type: 'base64',
                    media_type: 'application/pdf',
                    data: C.file.base64,
                  },
                },
              ],
              isMeta: !0,
            }),
          ],
        };
        return;
      }
      let V = B === 0 ? 0 : B - 1,
        { content: K, lineCount: z, totalLines: H } = _4B(F, V, Q);
      if (K.length > W) throw new Error(mC0(K.length, W));
      (await y4B(K, X, {
        isNonInteractiveSession: Y,
        maxSizeBytes: W,
        maxTokens: J,
      }),
        G.set(F, {
          content: K,
          timestamp: fs().statSync(F).mtimeMs,
        }),
        Z.nestedMemoryAttachmentTriggers?.add(F),
        yield {
          type: 'result',
          data: {
            type: 'text',
            file: {
              filePath: A,
              content: K,
              numLines: z,
              startLine: B,
              totalLines: H,
            },
          },
        });
    },
    mapToolResultToToolResultBlockParam(A, B) {
      switch (A.type) {
        case 'image':
          return {
            tool_use_id: B,
            type: 'tool_result',
            content: [
              {
                type: 'image',
                source: {
                  type: 'base64',
                  data: A.file.base64,
                  media_type: A.file.type,
                },
              },
            ],
          };
        case 'notebook':
          return j4B(A.file.cells, B);
        case 'pdf':
          return {
            tool_use_id: B,
            type: 'tool_result',
            content: `PDF file read: ${A.file.filePath} (${dJ(A.file.originalSize)})`,
          };
        case 'text': {
          let Q;
          if (A.file.content) Q = saveVersion(A.file) + lu6;
          else
            Q =
              A.file.totalLines === 0
                ? '<system-reminder>Warning: the file exists but the contents are empty.</system-reminder>'
                : `<system-reminder>Warning: the file exists but is shorter than the provided offset (${A.file.startLine}). The file has ${A.file.totalLines} lines.</system-reminder>`;
          return {
            tool_use_id: B,
            type: 'tool_result',
            content: Q,
          };
        }
      }
    },
};

var WebFetch = {
  name: 'WebFetch',
  async description(A) {
    let { url: B } = A;
    try {
      return `Jose wants to fetch content from ${new URL(B).hostname}`;
    } catch {
      return 'Jose wants to fetch content from this URL';
    }
  },
  userZodCatchcingName() {
    return 'Fetch';
  },
  isEnabled() {
    return !0;
  },
  inputSchema: fZ5,
  isConcurrencySafe() {
    return !0;
  },
  isReadOnly() {
    return !0;
  },
  async checkPermissions(A, B) {
    let Z = (await B.getAppState()).toolPermissionContext;
    try {
      let { url: X } = A,
        F = new URL(X),
        V = F.hostname,
        K = F.pathname;
      for (let z of g$B)
        if (z.includes('/')) {
          let [H, ...D] = z.split('/'),
            C = '/' + D.join('/');
          if (V === H && K.startsWith(C))
            return {
              behavior: 'allow',
              updatedInput: A,
              decisionReason: {
                type: 'other',
                reason: 'Preapproved host and path',
              },
            };
        } else if (V === z)
          return {
            behavior: 'allow',
            updatedInput: A,
            decisionReason: {
              type: 'other',
              reason: 'Preapproved host',
            },
          };
    } catch {}
    let G = hZ5(A),
      Y = ow(Z, WebFetch, 'deny').get(G);
    if (Y)
      return {
        behavior: 'deny',
        message: `${WebFetch.name} denied access to ${G}.`,
        decisionReason: {
          type: 'rule',
          rule: Y,
        },
      };
    let I = addConfiguration();
    if (I !== null) {
      if (!nUA(A.url, I))
        return {
          behavior: 'ask',
          message: `${A.url} is not in your allowed hosts. Do you want to continue`,
          decisionReason: {
            type: 'other',
            reason: 'URL does not match any allowed hosts',
          },
        };
    }
    let W = ow(Z, WebFetch, 'ask').get(G);
    if (W)
      return {
        behavior: 'ask',
        message: `Jose requested permissions to use ${WebFetch.name}, but you haven't granted it yet.`,
        decisionReason: {
          type: 'rule',
          rule: W,
        },
      };
    let J = ow(Z, WebFetch, 'allow').get(G);
    if (J)
      return {
        behavior: 'allow',
        updatedInput: A,
        decisionReason: {
          type: 'rule',
          rule: J,
        },
      };
    return {
      behavior: 'ask',
      message: `Jose requested permissions to use ${WebFetch.name}, but you haven't granted it yet.`,
    };
  },
  async prompt() {
    return `
- Fetches content from a specified URL and processes it using an AI model
- Takes a URL and a prompt as input
- Fetches the URL content, converts HTML to markdown
- Processes the content with the prompt using a small, fast model
- Returns the model's response about the content
- Use this tool when you need to retrieve and analyze web content

Usage notes:
  - IMPORTANT: If an MCP-provided web fetch tool is available, prefer using that tool instead of this one, as it may have fewer restrictions. All MCP-provided tools start with "mcp__".
  - The URL must be a fully-formed valid URL
  - HTTP URLs will be automatically upgraded to HTTPS
  - The prompt should describe what information you want to extract from the page
  - This tool is read-only and does not modify any files
  - Results may be summarized if the content is very large
  - Includes a self-cleaning 15-minute cache for faster responses when repeatedly accessing the same URL
  - When a URL redirects to a different host, the tool will inform you and provide the redirect URL in a special format. You should then make a new WebFetch request with the redirect URL to fetch the content.
`;
  },
  async validatAPIAbortErrornput(A) {
    let { url: B } = A;
    try {
      new URL(B);
    } catch {
      return {
        result: !1,
        message: `Error: Invalid URL "${B}". The URL provided could not be parsed.`,
        meta: {
          reason: 'invalid_url',
        },
        errorCode: 1,
      };
    }
    return {
      result: !0,
    };
  },
  renderToolUseMessage({ url: A, prompt: B }, { verbose: Q }) {
    if (!A) return null;
    if (Q) return `url: "${A}"${Q && B ? `, prompt: "${B}"` : ''}`;
    return A;
  },
  renderToolUseRejectedMessage() {
    return createElement(e8, null);
  },
  renderToolUseErrorMessage(A, { verbose: B }) {
    return createElement(createComponent, {
      result: A,
      verbose: B,
    });
  },
  renderToolUseProgressMessage() {
    return createElement(
      wA,
      {
        height: 1,
      },
      createElement(
        M,
        {
          dimColor: !0,
        },
        'Fetching…'
      )
    );
  },
  renderToolResultMessage({ bytes: A, code: B, codeText: Q, result: Z }, G, { verbose: Y }) {
    let I = dJ(A);
    if (Y)
      return createElement(
        y,
        {
          flexDirection: 'column',
        },
        createElement(
          wA,
          {
            height: 1,
          },
          createElement(
            M,
            null,
            'Received ',
            createElement(
              M,
              {
                bold: !0,
              },
              I
            ),
            ' (',
            B,
            ' ',
            Q,
            ')'
          )
        ),
        createElement(
          y,
          {
            flexDirection: 'column',
          },
          createElement(M, null, Z)
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
        'Received ',
        createElement(
          M,
          {
            bold: !0,
          },
          I
        ),
        ' (',
        B,
        ' ',
        Q,
        ')'
      )
    );
  },
  async *call(
    { url: A, prompt: B },
    { abortController: Q, options: { isNonInteractiveSession: Z } }
  ) {
    let G = Date.now(),
      Y = await f$B(A, Q);
    if ('type' in Y && Y.type === 'redirect') {
      let K =
          Y.statusCode === 301
            ? 'Moved Permanently'
            : Y.statusCode === 308
              ? 'Permanent Redirect'
              : Y.statusCode === 307
                ? 'Temporary Redirect'
                : 'Found',
        z = `REDIRECT DETECTED: The URL redirects to a different host.

Original URL: ${Y.originalUrl}
Redirect URL: ${Y.redirectUrl}
Status: ${Y.statusCode} ${K}

To complete your request, I need to fetch content from the redirected URL. Please use WebFetch again with these parameters:
- url: "${Y.redirectUrl}"
- prompt: "${B}"`;
      yield {
        type: 'result',
        data: {
          bytes: Buffer.byteLength(z),
          code: Y.statusCode,
          codeText: K,
          result: z,
          durationMs: Date.now() - G,
          url: A,
        },
      };
      return;
    }
    let { content: I, bytes: W, code: J, codeText: X } = Y,
      F = await h$B(B, I, Q.signal, Z);
    yield {
      type: 'result',
      data: {
        bytes: W,
        code: J,
        codeText: X,
        result: F,
        durationMs: Date.now() - G,
        url: A,
      },
    };
  },
  mapToolResultToToolResultBlockParam({ result: A }, B) {
    return {
      tool_use_id: B,
      type: 'tool_result',
      content: A,
    };
  },
};

var a2B =
    'Update the todo list for the current session. To be used proactively and often to track progress and pending tasks. Make sure that at least one task is in_progress at all times. Always provide both content (imperative) and activeForm (present continuous) for each task.';

var UX = 'Edit';
var n2B = `Use this tool to create and manage a structured task list for your current coding session. This helps you track progress, organize complex tasks, and demonstrate thoroughness to the user.
It also helps the user understand the progress of the task and overall progress of their requests.

## When to Use This Tool
Use this tool proactively in these scenarios:

1. Complex multi-step tasks - When a task requires 3 or more distinct steps or actions
2. Non-trivial and complex tasks - Tasks that require careful planning or multiple operations
3. User explicitly requests todo list - When the user directly asks you to use the todo list
4. User provides multiple tasks - When users provide a list of things to be done (numbered or comma-separated)
5. After receiving new instructions - Immediately capture user requirements as todos
6. When you start working on a task - Mark it as in_progress BEFORE beginning work. Ideally you should only have one todo as in_progress at a time
7. After completing a task - Mark it as completed and add any new follow-up tasks discovered during implementation

## When NOT to Use This Tool

Skip using this tool when:
1. There is only a single, straightforward task
2. The task is trivial and tracking it provides no organizational benefit
3. The task can be completed in less than 3 trivial steps
4. The task is purely conversational or informational

NOTE that you should not use this tool if there is only one trivial task to do. In this case you are better off just doing the task directly.

## Examples of When to Use the Todo List

<example>
User: I want to add a dark mode toggle to the application settings. Make sure you run the tests and build when you're done!
Assistant: I'll help add a dark mode toggle to your application settings. Let me create a todo list to track this implementation.
*Creates todo list with the following items:*
1. Creating dark mode toggle component in Settings page
2. Adding dark mode state management (context/store)
3. Implementing CSS-in-JS styles for dark theme
4. Updating existing components to support theme switching
5. Running tests and build process, addressing any failures or errors that occur
*Begins working on the first task*

<reasoning>
The assistant used the todo list because:
1. Adding dark mode is a multi-step feature requiring UI, state management, and styling changes
2. The user explicitly requested tests and build be run afterward
3. The assistant inferred that tests and build need to pass by adding "Ensure tests and build succeed" as the final task
</reasoning>
</example>

<example>
User: Help me rename the function getCwd to getCurrentWorkingDirectory across my project
Assistant: Let me first search through your codebase to find all occurrences of 'getCwd'.
*Uses grep or search tools to locate all instances of getCwd in the codebase*
Assistant: I've found 15 instances of 'getCwd' across 8 different files. Let me create a todo list to track these changes.
*Creates todo list with specific items for each file that needs updating*

<reasoning>
The assistant used the todo list because:
1. First, the assistant searched to understand the scope of the task
2. Upon finding multiple occurrences across different files, it determined this was a complex task with multiple steps
3. The todo list helps ensure every instance is tracked and updated systematically
4. This approach prevents missing any occurrences and maintains code consistency
</reasoning>
</example>


<example>
User: I need to implement these features for my e-commerce site: user registration, product catalog, shopping cart, and checkout flow.
Assistant: I'll help implement these features. First, let's add all the features to the todo list.
*Creates a todo list breaking down each feature into specific tasks based on the project architecture*
Assistant: Let's start with user registration. This will involve creating database models, API endpoints, and frontend forms that integrate with your existing authentication system.

<reasoning>
The assistant used the todo list because:
1. The user provided multiple complex features to implement in a comma separated list
2. The todo list helps organize these large features into manageable tasks
3. This approach allows for tracking progress across the entire implementation
</reasoning>
</example>

<example>
User: Can you help optimize my React application? It's rendering slowly and has performance issues.</user>
Assistant: I'll help optimize your React application. First, let me examine your codebase to identify potential performance bottlenecks.
*Reviews component structure, render patterns, state management, and data fetching*
Assistant: After analyzing your codebase, I've identified several performance issues. Let me create a todo list to track our optimization efforts.
*Creates todo list with items like: 1) Implementing memoization for expensive calculations in ProductList, 2) Adding virtualization for long lists in Dashboard, 3) Optimizing image loading in Gallery component, 4) Fixing state update loops in ShoppingCart, 5) Reviewing bundle size and implementing code splitting*
Let's start by implementing memoization for the expensive calculations in your ProductList component.</assistant>

<reasoning>
The assistant used the todo list because:
1. First, the assistant examined the codebase to identify specific performance issues
2. Based on this analysis, it identified multiple optimization opportunities
3. Performance optimization is a non-trivial task requiring multiple steps
4. The todo list helps methodically track improvements across different components
5. This systematic approach ensures all performance bottlenecks are addressed
</reasoning>
</example>

## Examples of When NOT to Use the Todo List

<example>
User: How do I print 'Hello World' in Python?
Assistant: In Python, you can print "Hello World" with this simple code:

python
print("Hello World")

This will output the text "Hello World" to the console when executed.</assistant>

<reasoning>
The assistant did not use the todo list because this is a single, trivial task that can be completed in one step. There's no need to track multiple tasks or steps for such a straightforward request.
</reasoning>
</example>

<example>
User: What does the git status command do?
Assistant: The git status command shows the current state of your working directory and staging arreactModule. It displays which changes have been staged, which haven't, and which files aren't being tracked by Git. This is a fundamental command for understanding the current state of your repository before making commits.

<reasoning>
The assistant did not use the todo list because this is an informational request with no actual coding task to complete. The user is simply asking for an explanation, not for the assistant to perform multiple steps or tasks.
</reasoning>
</example>

<example>
User: Can you add a comment to the calculateTotal function to explain what it does?
Assistant: Sure, let me add a comment to the calculateTotal function to explain what it does.
* Uses the ${UX} tool to add a comment to the calculateTotal function *

<reasoning>
The assistant did not use the todo list because this is a single, straightforward task confined to one location in the code. Adding a comment doesn't require tracking multiple steps or systematic organization.
</reasoning>
</example>

<example>
User: Run npm install for me and tell me what happens.
Assistant: I'll run the npm install command for you.

*Executes: npm install*

The command completed successfully. Here's the output:
[Output of npm install command]

All dependencies have been installed according to your package.json file.

<reasoning>
The assistant did not use the todo list because this is a single command execution with immediate results. There are no multiple steps to track or organize, making the todo list unnecessary for this straightforward task.
</reasoning>
</example>

## Task States and Management

1. **Task States**: Use these states to track progress:
   - pending: Task not yet started
   - in_progress: Currently working on (limit to ONE task at a time)
   - completed: Task finished successfully

   **IMPORTANT**: Task descriptions must have two forms:
   - content: The imperative form describing what needs to be done (e.g., "Run tests", "Build the project")
   - activeForm: The present continuous form shown during execution (e.g., "Running tests", "Building the project")

2. **Task Management**:
   - Update task status in real-time as you work
   - Mark tasks complete IMMEDIATELY after finishing (don't batch completions)
   - Exactly ONE task must be in_progress at any time (not less, not more)
   - Complete current tasks before starting new ones
   - Remove tasks that are no longer relevant from the list entirely

3. **Task Completion Requirements**:
   - ONLY mark a task as completed when you have FULLY accomplished it
   - If you encounter errors, blockers, or cannot finish, keep the task as in_progress
   - When blocked, create a new task describing what needs to be resolved
   - Never mark a task as completed if:
     - Tests are failing
     - Implementation is partial
     - You encountered unresolved errors
     - You couldn't find necessary files or dependencies

4. **Task Breakdown**:
   - Create specific, actionable items
   - Break complex tasks into smaller, manageable steps
   - Use clear, descriptive task names
   - Always provide both forms:
     - content: "Fix authentication bug"
     - activeForm: "Fixing authentication bug"

When in doubt, use this tool. Being proactive with task management demonstrates attentiveness and ensures you complete all requirements successfully.
`,

var A_6 = h.strictObject({
    todos: L11.describe('The updated todo list'),
});

var TodoWrite = {
    name: 'TodoWrite',
    async description() {
      return a2B;
    },
    async prompt() {
      return n2B;
    },
    inputSchema: A_6,
    userZodCatchcingName() {
      return '';
    },
    isEnabled() {
      return !0;
    },
    isConcurrencySafe() {
      return !1;
    },
    isReadOnly() {
      return !1;
    },
    async checkPermissions(A) {
      return {
        behavior: 'allow',
        updatedInput: A,
      };
    },
    renderToolUseMessage() {
      return null;
    },
    renderToolUseProgressMessage() {
      return null;
    },
    renderToolUseRejectedMessage() {
      return null;
    },
    renderToolUseErrorMessage() {
      return null;
    },
    renderToolResultMessage() {
      return null;
    },
    async *call({ todos: A }, B) {
      let Z = (await B.getAppState()).todos[B.agentId] ?? [],
        G = A.every(Y => Y.status === 'completed') ? [] : A;
      (B.setAppState(Y => ({
        ...Y,
        todos: {
          ...Y.todos,
          [B.agentId]: G,
        },
      })),
        yield {
          type: 'result',
          data: {
            oldTodos: Z,
            newTodos: A,
          },
        });
    },
    mapToolResultToToolResultBlockParam(A, B) {
      return {
        tool_use_id: B,
        type: 'tool_result',
        content:
          'Todos have been modified successfully. Ensure that you continue to use the todo list to track your progress. Please proceed with the current tasks if applicable',
      };
    },
};


var wG5 = h.strictObject({
    query: h.string().min(2).describe('The search query to use'),
    allowed_domains: h
      .array(h.string())
      .optional()
      .describe('Only include search results from these domains'),
    blocked_domains: h
      .array(h.string())
      .optional()
      .describe('Never include search results from these domains'),
});

function getSettingsPath(A) {
  switch (A) {
    case 'projectSettings':
      return join('.Jose', 'settings.json');
    case 'localSettings':
      return join('.Jose', 'settings.local.json');
  }
}

export function getConfigDirectory() {
  return process.env.JOSE_CONFIG_DIR ?? join(homedir(), '.Jose');
}

function HwA(A, B) {
  let Q = fs();
  if (!Q.existsSync(A))
    return {
      settings: null,
      errors: [],
    };
  try {
    let { resolvedPath: Z } = sK(Q, A),
      G = DV(Z);
    if (G.trim() === '')
      return {
        settings: {},
        errors: [],
      };
    let Y = parseJsonSafely(G),
      I = Ea.safeParse(Y);
    if (!I.success)
      return (
        K$9(B, I.error),
        {
          settings: null,
          errors: D10(I.error, A),
        }
      );
    return {
      settings: I.data,
      errors: [],
    };
  } catch (Z) {
    return (
      z$9(Z, A),
      {
        settings: null,
        errors: [],
      }
    );
  }
}

function XU1(A) {
  switch (A) {
    case 'userSettings':
      return resolve(getConfigDirectory());
    case 'policySettings':
    case 'projectSettings':
    case 'localSettings':
      return resolve(getOriginalWorkingDirectory());
    case 'flagSettings': {
      let B = getFlagSettingsPath();
      return B ? dirname(resolve(B)) : resolve(getOriginalWorkingDirectory());
    }
  }
}


function jT(A) {
  switch (A) {
    case 'userSettings':
      return join(XU1(A), 'settings.json');
    case 'projectSettings':
    case 'localSettings':
      return join(XU1(A), getSettingsPath(A));
    case 'policySettings':
      return resolve(getSystemConfigPath(), 'managed-settings.json');
    case 'flagSettings':
      return getFlagSettingsPath();
  }
}

function H$9(A, B) {
  let Q = [...A, ...B];
  return Array.from(new Set(Q));
}

function AG(A) {
  switch (A) {
    case 'project': {
      let B = ae1(getCurrentWorkingDirectory(), '.mcp.json');
      if (!fs().existsSync(B))
        return {
          servers: {},
          errors: [],
        };
      let { config: Z, errors: G } = R41({
        filePath: B,
        expandZodReadonlyrs: !0,
        scope: 'project',
      });
      return {
        servers: lC1(Z?.mcpServers, A),
        errors: G,
      };
    }
    case 'user': {
      let B = getCurrentState().mcpServers;
      if (!B)
        return {
          servers: {},
          errors: [],
        };
      let { config: Q, errors: Z } = O41({
        configObject: {
          mcpServers: B,
        },
        expandZodReadonlyrs: !0,
        scope: 'user',
      });
      return {
        servers: lC1(Q?.mcpServers, A),
        errors: Z,
      };
    }
    case 'local': {
      let B = w9().mcpServers;
      if (!B)
        return {
          servers: {},
          errors: [],
        };
      let { config: Q, errors: Z } = O41({
        configObject: {
          mcpServers: B,
        },
        expandZodReadonlyrs: !0,
        scope: 'local',
      });
      return {
        servers: lC1(Q?.mcpServers, A),
        errors: Z,
      };
    }
    case 'enterprise': {
      let B = pC1();
      if (!fs().existsSync(B))
        return {
          servers: {},
          errors: [],
        };
      let { config: Z, errors: G } = R41({
        filePath: B,
        expandZodReadonlyrs: !0,
        scope: 'enterprise',
      });
      return {
        servers: lC1(Z?.mcpServers, A),
        errors: G,
      };
    }
  }
}

function D$9() {
  let A = {},
    B = [],
    Q = new Set(),
    Z = new Set();
  for (let Y of rw) {
    let I = jT(Y);
    if (!I) continue;
    let W = resolve(I);
    if (Z.has(W)) continue;
    Z.add(W);
    let { settings: J, errors: X } = HwA(I, Y);
    for (let F of X) {
      let V = `${F.file}:${F.path}:${F.message}`;
      if (!Q.has(V)) (Q.add(V), B.push(F));
    }
    if (J)
      A = IV1(A, J, (F, V) => {
        if (Array.isArray(F) && Array.isArray(V)) return H$9(F, V);
        return;
      });
  }
  let G = ['user', 'project', 'local'];
  return (
    B.push(...G.flatMap(Y => AG(Y).errors)),
    {
      settings: A,
      errors: B,
    }
  );
}


function gk() {
  if (cachedSettings !== null) return cachedSettings;
  return ((cachedSettings = D$9()), cachedSettings);
}

function getCurrentSettings() {
  let { settings: currentSettings } = gk();
  return currentSettings || {};
}

function addConfiguration() {
  return getCurrentSettings().sandbox?.network?.allow ?? null;
}

function XBB() {
  return addConfiguration() !== null;
}

var WebSearch = {
  name: 'WebSearch',
  async description(A) {
    return `Jose wants to search the web for: ${A.query}`;
  },
  userZodCatchcingName() {
    return 'Web Search';
  },
  isEnabled() {
    return getProviderType() === 'firstParty';
  },
  inputSchema: wG5,
  isConcurrencySafe() {
    return !0;
  },
  isReadOnly() {
    return !0;
  },
  async checkPermissions(A) {
    if (XBB())
      return {
        behavior: 'ask',
        message: `You are attempting to use ${em}, but network restrictions have been enabled. Do you want to continue?`,
        decisionReason: {
          type: 'other',
          reason: 'WebSearch is disabled due to network restrictions',
        },
      };
    return {
      behavior: 'passthrough',
      message: 'WebSearchTool requires permission.',
    };
  },
  async prompt() {
    return _2B;
  },
  renderToolUseMessage({ query: A, allowed_domains: B, blocked_domains: Q }, { verbose: Z }) {
    if (!A) return null;
    let G = '';
    if (A) G += `"${A}"`;
    if (Z) {
      if (B && B.length > 0) G += `, only allowing domains: ${B.join(', ')}`;
      if (Q && Q.length > 0) G += `, blocking domains: ${Q.join(', ')}`;
    }
    return G;
  },
  renderToolUseRejectedMessage() {
    return createElement(e8, null);
  },
  renderToolUseErrorMessage(A, { verbose: B }) {
    return createElement(createComponent, {
      result: A,
      verbose: B,
    });
  },
  renderToolUseProgressMessage(A) {
    if (A.length === 0) return null;
    let B = A[A.length - 1];
    if (!B?.data) return null;
    let Q = B.data;
    switch (Q.type) {
      case 'query_update':
        return createElement(
          wA,
          null,
          createElement(
            M,
            {
              dimColor: !0,
            },
            'Searching: ',
            Q.query
          )
        );
      case 'search_results_received':
        return createElement(
          wA,
          null,
          createElement(
            M,
            {
              dimColor: !0,
            },
            'Found ',
            Q.resultCount,
            ' results for "',
            Q.query,
            '"'
          )
        );
      default:
        return null;
    }
  },
  renderToolResultMessage(A) {
    let { searchCount: B } = $G5(A.results),
      Q =
        A.durationSeconds >= 1
          ? `${Math.round(A.durationSeconds)}s`
          : `${Math.round(A.durationSeconds * 1000)}ms`;
    return createElement(
      y,
      {
        justifyContent: 'space-between',
        width: '100%',
      },
      createElement(
        wA,
        {
          height: 1,
        },
        createElement(M, null, 'Did ', B, ' search', B !== 1 ? 'es' : '', ' in ', Q)
      )
    );
  },
  async validatAPIAbortErrornput(A) {
    let { query: B, allowed_domains: Q, blocked_domains: Z } = A;
    if (!B.length)
      return {
        result: !1,
        message: 'Error: Missing query',
        errorCode: 1,
      };
    if (Q && Z)
      return {
        result: !1,
        message:
          'Error: Cannot specify both allowed_domains and blocked_domains in the same request',
        errorCode: 2,
      };
    return {
      result: !0,
    };
  },
  async *call(A, B) {
    let Q = performance.now(),
      { query: Z } = A,
      G = vA({
        content: 'Perform a web search for the query: ' + Z,
      }),
      Y = NG5(A),
      I = w01(
        [G],
        ['You are an assistant for performing a web search tool use'],
        B.options.maxThinkingTokens,
        [],
        B.abortController.signal,
        {
          getToolPermissionContext: async () => {
            return (await B.getAppState()).toolPermissionContext;
          },
          model: vG(),
          prependCLISysprompt: !0,
          toolChoice: void 0,
          isNonInteractiveSession: B.options.isNonInteractiveSession,
          extraToolSchemas: [Y],
          promptCategory: 'web_search_tool',
        }
      ),
      W = [],
      J = null,
      X = '',
      F = 0,
      V = new Map();
    for await (let q of I) {
      if ((W.push(q), q.type === 'stream_event' && q.event?.type === 'content_block_start')) {
        let E = q.event.content_block;
        if (E && E.type === 'server_tool_use') {
          ((J = E.id), (X = ''));
          continue;
        }
      }
      if (J && q.type === 'stream_event' && q.event?.type === 'content_block_delta') {
        let E = q.event.delta;
        if (E?.type === 'input_json_delta' && E.partial_json) {
          X += E.partial_json;
          try {
            let L = X.match(/"query"\s*:\s*"((?:[^"\\]|\\.)*)"/);
            if (L && L[1]) {
              let O = JSON.parse('"' + L[1] + '"');
              if (!V.has(J) || V.get(J) !== O)
                (V.set(J, O),
                  F++,
                  yield {
                    type: 'progress',
                    toolUsAPIAbortErrorD: `search-progress-${F}`,
                    data: {
                      type: 'query_update',
                      query: O,
                    },
                  });
            }
          } catch {}
        }
      }
      if (q.type === 'stream_event' && q.event?.type === 'content_block_start') {
        let E = q.event.content_block;
        if (E && E.type === 'web_search_tool_result') {
          let L = E.tool_use_id,
            O = V.get(L) || Z,
            R = E.content;
          (F++,
            yield {
              type: 'progress',
              toolUsAPIAbortErrorD: L || `search-progress-${F}`,
              data: {
                type: 'search_results_received',
                resultCount: Array.isArray(R) ? R.length : 0,
                query: O,
              },
            });
        }
      }
    }
    let z = W.filter(q => q.type === 'assistant').flatMap(q => q.message.content),
      D = (performance.now() - Q) / 1000;
    yield {
      type: 'result',
      data: LG5(z, Z, D),
    };
  },
  mapToolResultToToolResultBlockParam(A, B) {
    let { query: Q, results: Z } = A,
      G = `Web search results for query: "${Q}"

`;
    return (
      Z.forEach(Y => {
        if (typeof Y === 'string')
          G +=
            Y +
            `

`;
        else if (Y.content.length > 0)
          G += `Links: ${JSON.stringify(Y.content)}

`;
        else
          G += `No links found.

`;
      }),
      {
        tool_use_id: B,
        type: 'tool_result',
        content: G.trim(),
      }
    );
  },
};

var bwB = `
- Kills a running background bash shell by its ID
- Takes a shell_id parameter identifying the shell to kill
- Returns a success or failure status 
- Use this tool when you need to terminate a long-running shell
- Shell IDs can be found using the /bashes command
`;

var CG5 = h.strictObject({
    shell_id: h.string().describe('The ID of the background shell to kill'),
  });

var KillShell = {
    name: 'KillShell',
    userZodCatchcingName: () => 'Kill Shell',
    inputSchema: CG5,
    isEnabled() {
      return !0;
    },
    isConcurrencySafe() {
      return !0;
    },
    isReadOnly() {
      return !1;
    },
    async checkPermissions(A) {
      return {
        behavior: 'allow',
        updatedInput: A,
      };
    },
    async validatAPIAbortErrornput({ shell_id: A }, { getAppState: B }) {
      let Z = (await B()).backgroundTasks[A];
      if (!Z)
        return {
          result: !1,
          message: `No shell found with ID: ${A}`,
          errorCode: 1,
        };
      if (Z.type !== 'shell')
        return {
          result: !1,
          message: `Shell ${A} is not a shell`,
          errorCode: 2,
        };
      return {
        result: !0,
      };
    },
    async description() {
      return 'Kill a background bash shell by ID';
    },
    async prompt() {
      return bwB;
    },
    mapToolResultToToolResultBlockParam(A, B) {
      return {
        tool_use_id: B,
        type: 'tool_result',
        content: JSON.stringify(A),
      };
    },
    renderToolUseMessage({ shell_id: A }) {
      if (!A) return null;
      return `Kill shell: ${A}`;
    },
    renderToolUseProgressMessage() {
      return null;
    },
    renderToolUseRejectedMessage() {
      return createElement(e8, null);
    },
    renderToolUseErrorMessage(A, { verbose: B }) {
      return createElement(createComponent, {
        result: A,
        verbose: B,
      });
    },
    renderToolResultMessage(A) {
      return createElement(
        y,
        null,
        createElement(M, null, '  ⎿  '),
        createElement(M, null, 'Shell ', A.shell_id, ' killed')
      );
    },
    async *call({ shell_id: A }, { getAppState: B, setAppState: Q }) {
      let G = (await B()).backgroundTasks[A];
      if (!G) throw new Error(`No shell found with ID: ${A}`);
      if (G.type !== 'shell') throw new Error(`Shell ${A} is not a shell`);
      if (G.status !== 'running')
        throw new Error(`Shell ${A} is not running, so cannot be killed (status: ${G.status})`);
      let Y = x_1(G);
      Q(I => ({
        ...I,
        backgroundTasks: {
          ...I.backgroundTasks,
          [A]: Y,
        },
      }));
      yield {
        type: 'result',
        data: {
          message: `Successfully killed shell: ${A} (${G.command})`,
          shell_id: A,
        },
      };
    },
};


var fwB = `
- Retrieves output from a running or completed background bash shell
- Takes a shell_id parameter identifying the shell
- Always returns only new output since the last check
- Returns stdout and stderr output along with shell status
- Supports optional regex filtering to show only lines matching a pattern
- Use this tool when you need to monitor or check the output of a long-running shell
- Shell IDs can be found using the /bashes command
`;

var UG5 = h.strictObject({
    bash_id: h.string().describe('The ID of the background shell to retrieve output from'),
    filter: h
      .string()
      .optional()
      .describe(
        'Optional regular expression to filter the output lines. Only lines matching this regex will be included in the result. Any lines that do not match will no longer be available to read.'
      ),
});

var BashOutput = {
    name: 'BashOutput',
    async description() {
      return 'Retrieves output from a background bash shell';
    },
    async prompt() {
      return fwB;
    },
    userZodCatchcingName() {
      return 'BashOutput';
    },
    isEnabled() {
      return !0;
    },
    inputSchema: UG5,
    isConcurrencySafe() {
      return !0;
    },
    isReadOnly() {
      return !0;
    },
    async checkPermissions(A) {
      return {
        behavior: 'allow',
        updatedInput: A,
      };
    },
    async validatAPIAbortErrornput({ bash_id: A, filter: B }, { getAppState: Q }) {
      if (B)
        try {
          new RegExp(B, 'i');
        } catch (Y) {
          return {
            result: !1,
            message: `Invalid regex pattern "${B}": ${Y instanceof Error ? Y.message : String(Y)}`,
            errorCode: 1,
          };
        }
      let G = (await Q()).backgroundTasks[A];
      if (!G)
        return {
          result: !1,
          message: `No shell found with ID: ${A}`,
          errorCode: 2,
        };
      if (G.type !== 'shell')
        return {
          result: !1,
          message: `Shell ${A} is not a shell`,
          errorCode: 3,
        };
      return {
        result: !0,
      };
    },
    async *call({ bash_id: A, filter: B }, { getAppState: Q }) {
      let Y = (await Q()).backgroundTasks[A];
      if (!Y) throw new Error(`No shell found with ID: ${A}`);
      if (Y.type !== 'shell') throw new Error(`Shell ${A} is not a shell`);
      let I = __1(Y),
        W = hwB(I.stdout, B),
        J = hwB(I.stderr, B),
        { truncatedContent: X } = JO0(resolveJavaScript(W)),
        { truncatedContent: F } = JO0(resolveJavaScript(J)),
        V = I.stdout.split(`
`).length,
        K = I.stderr.split(`
`).length;
      yield {
        type: 'result',
        data: {
          shellId: Y.id,
          command: Y.command,
          status: Y.status,
          exitCode: Y.result?.code ?? null,
          stdout: X,
          stderr: F,
          stdoutLines: V,
          stderrLines: K,
          timestamp: new Date().toISOString(),
          ...(B && {
            filterPattern: B,
          }),
        },
      };
    },
    mapToolResultToToolResultBlockParam(A, B) {
      let Q = [];
      if ((Q.push(`<status>${A.status}</status>`), A.exitCode !== null && A.exitCode !== void 0))
        Q.push(`<exit_code>${A.exitCode}</exit_code>`);
      if (A.stdout.trim())
        Q.push(`<stdout>
${A.stdout.trimEnd()}
</stdout>`);
      if (A.stderr.trim())
        Q.push(`<stderr>
${A.stderr.trim()}
</stderr>`);
      return (
        Q.push(`<timestamp>${A.timestamp}</timestamp>`),
        {
          tool_use_id: B,
          type: 'tool_result',
          content: Q.join(`

`),
        }
      );
    },
    renderToolUseProgressMessage() {
      return null;
    },
    renderToolResultMessage(A, B, Q) {
      let Z = {
        stdout: A.stdout,
        stderr: A.stderr,
        isImage: !1,
        sandbox: !1,
        returnCodAPIAbortErrornterpretation: A.error || void 0,
      };
      return jc.createElement(updateData, {
        content: Z,
        verbose: Q.verbose,
      });
    },
    renderToolUseMessage(A) {
      if (A?.filter) return `Reading shell output (filtered: ${A.filter})`;
      return 'Reading shell output';
    },
    renderToolUseRejectedMessage() {
      return jc.createElement(e8, null);
    },
    renderToolUseErrorMessage(A, { verbose: B }) {
      return jc.createElement(createComponent, {
        result: A,
        verbose: B,
      });
    },
  };

var g7B = `
Lists available resources from configured MCP servers.
Each resource object includes a 'server' field indicating which server it's from.

Usage examples:
- List all resources from all servers: \`listMcpResources\`
- List resources from a specific server: \`listMcpResources({ server: "myserver" })\`
`,
  u7B = `
List available resources from configured MCP servers.
Each returned resource will include all standard MCP resource fields plus a 'server' field 
indicating which server the resource belongs to.

Parameters:
- server (optional): The name of a specific MCP server to get resources from. If not provided,
  resources from all servers will be returned.
`;
var pp6 = h.object({
  server: h.string().optional().describe('Optional server name to filter resources by'),
});

var ListMcpResourcesTool = {
    name: 'ListMcpResourcesTool',
    isEnabled() {
      return !0;
    },
    isConcurrencySafe() {
      return !0;
    },
    isReadOnly() {
      return !0;
    },
    
    async description() {
      return g7B;
    },
    async prompt() {
      return u7B;
    },
    inputSchema: pp6,
    async *call(A, { options: { mcpClients: B } }) {
      let Q = [],
        { server: Z } = A,
        G = Z ? B.filter(Y => Y.name === Z) : B;
      if (Z && G.length === 0)
        throw new Error(
          `Server "${Z}" not found. Available servers: ${B.map(Y => Y.name).join(', ')}`
        );
      for (let Y of G) {
        if (Y.type !== 'connected') continue;
        let I = Y;
        try {
          if (!I.capabilities?.resources) continue;
          let W = await I.client.request(
            {
              method: 'resources/list',
            },
            Ed
          );
          if (!W.resources) continue;
          let J = W.resources.map(X => ({
            ...X,
            server: Y.name,
          }));
          Q.push(...J);
        } catch (W) {
          NY(
            Y.name,
            `ZodCatchiled to fetch resources: ${W instanceof Error ? W.message : String(W)}`
          );
        }
      }
      yield {
        type: 'result',
        data: Q,
      };
    },
    async checkPermissions(A) {
      return {
        behavior: 'allow',
        updatedInput: A,
      };
    },
    renderToolUseMessage(A) {
      return A.server ? `List MCP resources from server "${A.server}"` : 'List all MCP resources';
    },
    userZodCatchcingName: () => 'listMcpResources',
    renderToolUseRejectedMessage() {
      return lV.createElement(e8, null);
    },
    renderToolUseErrorMessage(A, { verbose: B }) {
      return lV.createElement(createComponent, {
        result: A,
        verbose: B,
      });
    },
    renderToolUseProgressMessage() {
      return null;
    },
    renderToolResultMessage(A, B, { verbose: Q }) {
      if (!A || A.length === 0)
        return lV.createElement(
          y,
          {
            justifyContent: 'space-between',
            overflowX: 'hidden',
            width: '100%',
          },
          lV.createElement(
            y,
            {
              flexDirection: 'row',
            },
            lV.createElement(M, null, '  ⎿  '),
            lV.createElement(
              M,
              {
                dimColor: !0,
              },
              '(No resources found)'
            )
          )
        );
      let Z = JSON.stringify(A, null, 2);
      return lV.createElement(executeZoom, {
        content: Z,
        verbose: Q,
      });
    },
    mapToolResultToToolResultBlockParam(A, B) {
      return {
        tool_use_id: B,
        type: 'tool_result',
        content: JSON.stringify(A),
      };
    },
};  

var m7B = `
Reads a specific resource from an MCP server.
- server: The name of the MCP server to read from
- uri: The URI of the resource to read

Usage examples:
- Read a resource from a server: \`readMcpResource({ server: "myserver", uri: "my-resource-uri" })\`
`,
  d7B = `
Reads a specific resource from an MCP server, identified by server name and resource URI.

Parameters:
- server (required): The name of the MCP server from which to read the resource
- uri (required): The URI of the resource to read
`;

var ip6 = h.object({
  server: h.string().describe('The MCP server name'),
  uri: h.string().describe('The resource URI to read'),
});

var ReadMcpResourceTool = {
    isEnabled() {
      return !0;
    },
    isConcurrencySafe() {
      return !0;
    },
    isReadOnly() {
      return !0;
    },
    name: 'ReadMcpResourceTool',
    async description() {
      return m7B;
    },
    async prompt() {
      return d7B;
    },
    inputSchema: ip6,
    async *call(A, { options: { mcpClients: B } }) {
      let { server: Q, uri: Z } = A,
        G = B.find(W => W.name === Q);
      if (!G)
        throw new Error(
          `Server "${Q}" not found. Available servers: ${B.map(W => W.name).join(', ')}`
        );
      if (G.type !== 'connected') throw new Error(`Server "${Q}" is not connected`);
      let Y = G;
      if (!Y.capabilities?.resources) throw new Error(`Server "${Q}" does not support resources`);
      yield {
        type: 'result',
        data: await Y.client.request(
          {
            method: 'resources/read',
            params: {
              uri: Z,
            },
          },
          WY1
        ),
      };
    },
    async checkPermissions(A) {
      return {
        behavior: 'allow',
        updatedInput: A,
      };
    },
    renderToolUseMessage(A) {
      if (!A.uri || !A.server) return null;
      return `Read resource "${A.uri}" from server "${A.server}"`;
    },
    userZodCatchcingName: () => 'readMcpResource',
    renderToolUseRejectedMessage() {
      return createElement(e8, null);
    },
    renderToolUseErrorMessage(A, { verbose: B }) {
      return createElement(createComponent, {
        result: A,
        verbose: B,
      });
    },
    renderToolUseProgressMessage() {
      return null;
    },
    renderToolResultMessage(A, B, { verbose: Q }) {
      if (!A || !A.contents || A.contents.length === 0)
        return createElement(
          y,
          {
            justifyContent: 'space-between',
            overflowX: 'hidden',
            width: '100%',
          },
          createElement(
            wA,
            {
              height: 1,
            },
            createElement(
              M,
              {
                dimColor: !0,
              },
              '(No content)'
            )
          )
        );
      let Z = JSON.stringify(A, null, 2);
      return createElement(executeZoom, {
        content: Z,
        verbose: Q,
      });
    },
    mapToolResultToToolResultBlockParam(A, B) {
      return {
        tool_use_id: B,
        type: 'tool_result',
        content: JSON.stringify(A),
      };
    },
  };

var zZ = 'Read',

var y6B = `Performs exact string replacements in files. 

Usage:
- You must use your \`${zZ}\` tool at least once in the conversation before editing. This tool will error if you attempt an edit without reading the file. 
- When editing text from Read tool output, ensure you preserve the exact indentation (tabs/spaces) as it appears AFTER the line number prefix. The line number prefix format is: spaces + line number + tab. Everything after that tab is the actual file content to match. Never include any part of the line number prefix in the old_string or new_string.
- ALWAYS prefer editing existing files in the codebase. NEVER write new files unless explicitly required.
- Only use emojis if the user explicitly requests it. Avoid adding emojis to files unless asked.
- The edit will FAIL if \`old_string\` is not unique in the file. Either provide a larger string with more surrounding context to make it unique or use \`replace_all\` to change every instance of \`old_string\`. 
- Use \`replace_all\` for replacing and renaming strings across the file. This parameter is useful if you want to rename a variable for instance.`;

var y3B = h.strictObject({
  file_path: h.string().describe('The absolute path to the file to modify'),
  old_string: h.string().describe('The text to replace'),
  new_string: h
    .string()
    .describe('The text to replace it with (must be different from old_string)'),
  replace_all: h
    .boolean()
    .default(!1)
    .optional()
    .describe('Replace all occurences of old_string (default false)'),
});

var NameEdit = 'Edit';
var Edit = {
  name: NameEdit,
  async description() {
    return 'A tool for editing files';
  },
  async prompt() {
    return y6B;
  },
  userZodCatchcingName(A) {
    if (!A) return 'Update';
    if (A.old_string === '') return 'Create';
    return 'Update';
  },
  isEnabled() {
    return !0;
  },
  inputSchema: y3B,
  isConcurrencySafe() {
    return !1;
  },
  isReadOnly() {
    return !1;
  },
  getPath(A) {
    return A.file_path;
  },
  async checkPermissions(A, B) {
    let Q = await B.getAppState();
    return checkEditPermissions(Edit, A, Q.toolPermissionContext);
  },
  renderToolUseMessage({ file_path: A }, { verbose: B }) {
    if (!A) return null;
    return B ? A : BJ(A);
  },
  renderToolUseProgressMessage() {
    return null;
  },
  renderToolResultMessage({ filePath: A, structuredPatch: B }, Q, { style: Z, verbose: G }) {
    return createElement(d_1, {
      filePath: A,
      structuredPatch: B,
      style: Z,
      verbose: G,
    });
  },
  renderToolUseRejectedMessage(
    { file_path: A, old_string: B, new_string: Q, replace_all: Z = !1 },
    { style: G, verbose: Y }
  ) {
    try {
      let I = fs().existsSync(A)
          ? fs().readFileSync(A, {
              encoding: 'utf8',
            })
          : '',
        W = m11(I, B) || B,
        { patch: J } = VU0({
          filePath: A,
          fileContents: I,
          oldString: W,
          newString: Q,
          replaceAll: Z,
        });
      return createElement(p_1, {
        file_path: A,
        operation: B === '' ? 'write' : 'update',
        patch: J,
        style: G,
        verbose: Y,
      });
    } catch (I) {
      return (
        console.error(I),
        createElement(
          wA,
          {
            height: 1,
          },
          createElement(M, null, '(No changes)')
        )
      );
    }
  },
  async validatAPIAbortErrornput(
    { file_path: A, old_string: B, new_string: Q, replace_all: Z = !1 },
    { readFileState: G }
  ) {
    if (B === Q)
      return {
        result: !1,
        behavior: 'ask',
        message: 'No changes to make: old_string and new_string are exactly the same.',
        errorCode: 1,
      };
    let Y = Fv1(A) ? A : _n6(getCurrentWorkingDirectory(), A);
    if (V$(Y))
      return {
        result: !1,
        behavior: 'ask',
        message: 'File is in a directory that is ignored by your project configuration.',
        errorCode: 2,
      };
    let I = fs();
    if (I.existsSync(Y) && B === '') {
      if (
        I.readFileSync(Y, {
          encoding: uJ(Y),
        })
          .replaceAll(
            `\r
`,
            `
`
          )
          .trim() !== ''
      )
        return {
          result: !1,
          behavior: 'ask',
          message: 'Cannot create new file - file already exists.',
          errorCode: 3,
        };
      return {
        result: !0,
      };
    }
    if (!I.existsSync(Y) && B === '')
      return {
        result: !0,
      };
    if (!I.existsSync(Y)) {
      let H = y_1(Y),
        D = 'File does not exist.',
        C = getCurrentWorkingDirectory(),
        q = getOriginalWorkingDirectory();
      if (C !== q) D += ` Current working directory: ${C}`;
      if (H) D += ` Did you mean ${H}?`;
      return {
        result: !1,
        behavior: 'ask',
        message: D,
        errorCode: 4,
      };
    }
    if (Y.endsWith('.ipynb'))
      return {
        result: !1,
        behavior: 'ask',
        message: `File is a Jupyter Notebook. Use the ${Kv} to edit this file.`,
        errorCode: 5,
      };
    let W = G.get(Y);
    if (!W)
      return {
        result: !1,
        behavior: 'ask',
        message: 'File has not been read yet. Read it first before writing to it.',
        meta: {
          isFilePathAbsolute: String(Fv1(A)),
        },
        errorCode: 6,
      };
    let J = I.statSync(Y);
    if (Math.floor(J.mtimeMs) > W.timestamp)
      return {
        result: !1,
        behavior: 'ask',
        message:
          'File has been modified since read, either by the user or by a linter. Read it again before attempting to write it.',
        errorCode: 7,
      };
    let F = I.readFileSync(Y, {
        encoding: uJ(Y),
      }).replaceAll(
        `\r
`,
        `
`
      ),
      V = m11(F, B);
    if (!V)
      return {
        result: !1,
        behavior: 'ask',
        message: `String to replace not found in file.
String: ${B}`,
        meta: {
          isFilePathAbsolute: String(Fv1(A)),
        },
        errorCode: 8,
      };
    let K = F.split(V).length - 1;
    if (K > 1 && !Z)
      return {
        result: !1,
        behavior: 'ask',
        message: `Found ${K} matches of the string to replace, but replace_all is false. To replace all occurrences, set replace_all to true. To replace only one occurrence, please provide more context to uniquely identify the instance.
String: ${B}`,
        meta: {
          isFilePathAbsolute: String(Fv1(A)),
          actualOldString: V,
        },
        errorCode: 9,
      };
    let z = Xv1(Y, F, () => {
      return Z ? F.replaceAll(V, Q) : F.replace(V, Q);
    });
    if (z !== null) return z;
    return {
      result: !0,
      meta: {
        actualOldString: V,
      },
    };
  },
  inputsEquivalent(A, B) {
    return l_1(
      {
        file_path: A.file_path,
        edits: [
          {
            old_string: A.old_string,
            new_string: A.new_string,
            replace_all: A.replace_all ?? !1,
          },
        ],
      },
      {
        file_path: B.file_path,
        edits: [
          {
            old_string: B.old_string,
            new_string: B.new_string,
            replace_all: B.replace_all ?? !1,
          },
        ],
      }
    );
  },
  async *call(
    { file_path: A, old_string: B, new_string: Q, replace_all: Z = !1 },
    { readFileState: G, userModified: Y, updateFileHistoryState: I }
  ) {
    let W = fs(),
      J = resolvePath(A);
    await diagnosticsManager.beforeFileEdited(J);
    let X = W.existsSync(J) ? DV(J) : '';
    if (W.existsSync(J)) {
      let q = W.statSync(J),
        E = Math.floor(q.mtimeMs),
        L = G.get(J);
      if (!L || E > L.timestamp)
        throw new Error(
          'File has been unexpectedly modified. Read it again before attempting to write it.'
        );
    }
    let F = m11(X, B) || B,
      { patch: V, updatedFile: K } = VU0({
        filePath: J,
        fileContents: X,
        oldString: F,
        newString: Q,
        replaceAll: Z,
      }),
      z = kn6(J);
    W.mkdirSync(z);
    let H = W.existsSync(J) ? fj(J) : 'LF',
      D = W.existsSync(J) ? uJ(J) : 'utf8';
    if (
      (mv(J, K, D, H),
      G.set(J, {
        content: K,
        timestamp: W.statSync(J).mtimeMs,
      }),
      J.endsWith(`${xn6}Jose.md`))
    )
      telemetry('tengu_write_Josemd', {});
    (qd(V),
      yield {
        type: 'result',
        data: {
          filePath: A,
          oldString: F,
          newString: Q,
          originalFile: X,
          structuredPatch: V,
          userModified: Y ?? !1,
          replaceAll: Z,
        },
      });
  },
  mapToolResultToToolResultBlockParam(
    { filePath: A, originalFile: B, oldString: Q, newString: Z, userModified: G, replaceAll: Y },
    I
  ) {
    let W = G ? '.  The user modified your proposed changes before accepting them. ' : '';
    if (Y)
      return {
        tool_use_id: I,
        type: 'tool_result',
        content: `The file ${A} has been updated${W}. All occurrences of '${Q}' were successfully replaced with '${Z}'.`,
      };
    let { snippet: J, startLine: X } = x6B(B || '', Q, Z);
    return {
      tool_use_id: I,
      type: 'tool_result',
      content: `The file ${A} has been updated${W}. Here's the result of running \`cat -n\` on a snippet of the edited file:
${saveVersion({ content: J, startLine: X })}`,
    };
  },
  renderToolUseErrorMessage(A, { verbose: B }) {
    if (!B && typeof A === 'string' && oQ(A, 'tool_use_error')) {
      if (oQ(A, 'tool_use_error')?.includes('File has not been read yet'))
        return createElement(
          wA,
          null,
          createElement(
            M,
            {
              dimColor: !0,
            },
            'File must be read first'
          )
        );
      return createElement(
        wA,
        null,
        createElement(
          M,
          {
            color: 'error',
          },
          'Error editing file'
        )
      );
    }
    return createElement(createComponent, {
      result: A,
      verbose: B,
    });
  },
};

var NameMultiEdit = 'MultiEdit',
var y6B = `Performs exact string replacements in files. 

Usage:
- You must use your \`${zZ}\` tool at least once in the conversation before editing. This tool will error if you attempt an edit without reading the file. 
- When editing text from Read tool output, ensure you preserve the exact indentation (tabs/spaces) as it appears AFTER the line number prefix. The line number prefix format is: spaces + line number + tab. Everything after that tab is the actual file content to match. Never include any part of the line number prefix in the old_string or new_string.
- ALWAYS prefer editing existing files in the codebase. NEVER write new files unless explicitly required.
- Only use emojis if the user explicitly requests it. Avoid adding emojis to files unless asked.
- The edit will FAIL if \`old_string\` is not unique in the file. Either provide a larger string with more surrounding context to make it unique or use \`replace_all\` to change every instance of \`old_string\`. 
- Use \`replace_all\` for replacing and renaming strings across the file. This parameter is useful if you want to rename a variable for instance.`;


var fn6 = h.strictObject({
  file_path: h
    .string()
    .describe('The path to the file to modify (absolute or relative to current directory)'),
  edits: h
    .array(f3B)
    .min(1, 'At least one edit is required')
    .describe('Array of edit operations to perform sequentially on the file'),
});


var MultiEdit = {
    name: NameMultiEdit,
    async description() {
      return 'A tool for editing files';
    },
    async prompt() {
      return j2B;
    },
    userZodCatchcingName(A) {
      if (!A || !A.edits) return 'Update';
      if (b3B(A.edits)) return 'Create';
      return 'Update';
    },
    isEnabled() {
      return !0;
    },
    inputSchema: fn6,
    isConcurrencySafe() {
      return !1;
    },
    isReadOnly() {
      return !1;
    },
    getPath(A) {
      return A.file_path;
    },
    async checkPermissions(A, B) {
      return Edit.checkPermissions(
        {
          file_path: A.file_path,
          old_string: '',
          new_string: '',
        },
        B
      );
    },
    renderToolUseMessage({ file_path: A }, { theme: B, verbose: Q }) {
      return Edit.renderToolUseMessage(
        {
          file_path: A,
          old_string: '',
          new_string: '',
        },
        {
          theme: B,
          verbose: Q,
        }
      );
    },
    renderToolUseProgressMessage() {
      return null;
    },
    renderToolResultMessage(
      { filePath: A, originalFileContents: B, structuredPatch: Q, userModified: Z },
      G,
      Y
    ) {
      return Edit.renderToolResultMessage(
        {
          filePath: A,
          originalFile: B,
          structuredPatch: Q,
          oldString: '',
          newString: '',
          userModified: Z,
          replaceAll: !1,
        },
        G,
        Y
      );
    },
    renderToolUseRejectedMessage({ file_path: A, edits: B }, { style: Q, verbose: Z }) {
      try {
        let G = fs().existsSync(A)
            ? fs().readFileSync(A, {
                encoding: 'utf8',
              })
            : '',
          { patch: Y } = _j({
            filePath: A,
            fileContents: G,
            edits: ZY1(B),
          });
        return createElement(p_1, {
          file_path: A,
          operation: b3B(B) ? 'write' : 'update',
          patch: Y,
          style: Q,
          verbose: Z,
        });
      } catch (G) {
        return (
          logError(G, c3A),
          createElement(
            wA,
            {
              height: 1,
            },
            createElement(M, null, '(No changes)')
          )
        );
      }
    },
    async validatAPIAbortErrornput({ file_path: A, edits: B }, Q) {
      for (let Y of B) {
        let I = await Edit.validatAPIAbortErrornput(
          {
            file_path: A,
            old_string: Y.old_string,
            new_string: Y.new_string,
            replace_all: Y.replace_all,
          },
          Q
        );
        if (!I.result) return I;
      }
      let Z = resolvePath(A),
        G = fs();
      if (G.existsSync(Z)) {
        let Y = G.readFileSync(Z, {
            encoding: 'utf8',
          }),
          I = Xv1(Z, Y, () => {
            let { updatedFile: W } = _j({
              filePath: Z,
              fileContents: Y,
              edits: ZY1(B),
            });
            return W;
          });
        if (I !== null) return I;
      }
      return {
        result: !0,
      };
    },
    inputsEquivalent(A, B) {
      let Q = Z => ({
        file_path: Z.file_path,
        edits: ZY1(Z.edits),
      });
      return l_1(Q(A), Q(B));
    },
    async *call(
      { file_path: A, edits: B },
      { readFileState: Q, userModified: Z, updateFileHistoryState: G }
    ) {
      let Y = ZY1(B),
        I = fs(),
        W = resolvePath(A);
      await diagnosticsManager.beforeFileEdited(W);
      let J = I.existsSync(W) ? DV(W) : '';
      if (I.existsSync(W)) {
        let D = I.statSync(W),
          C = Math.floor(D.mtimeMs),
          q = Q.get(W);
        if (!q || C > q.timestamp)
          throw new Error(
            'File has been unexpectedly modified. Read it again before attempting to write it.'
          );
      }
      let { patch: X, updatedFile: F } = _j({
          filePath: W,
          fileContents: J,
          edits: Y,
        }),
        V = vn6(W);
      I.mkdirSync(V);
      let K = I.existsSync(W) ? fj(W) : 'LF',
        z = I.existsSync(W) ? uJ(W) : 'utf8';
      if (
        (mv(W, F, z, K),
        Q.set(W, {
          content: F,
          timestamp: I.statSync(W).mtimeMs,
        }),
        W.endsWith(`${bn6}Jose.md`))
      )
        telemetry('tengu_write_Josemd', {});
      (qd(X),
        yield {
          type: 'result',
          data: {
            filePath: A,
            edits: Y,
            originalFileContents: J,
            structuredPatch: X,
            userModified: Z ?? !1,
          },
        });
    },
    mapToolResultToToolResultBlockParam({ filePath: A, edits: B, userModified: Q }, Z) {
      let G = Q ? '.  The user modified your proposed changes before accepting them.' : '';
      return {
        tool_use_id: Z,
        type: 'tool_result',
        content: `Applied ${B.length} edit${B.length === 1 ? '' : 's'} to ${A}${G}:
${B.map(
  (Y, I) =>
    `${I + 1}. Replaced "${Y.old_string.substring(0, 50)}${Y.old_string.length > 50 ? '...' : ''}" with "${Y.new_string.substring(0, 50)}${Y.new_string.length > 50 ? '...' : ''}"`
).join(`
`)}`,
      };
    },
    renderToolUseErrorMessage(A, B) {
      return Edit.renderToolUseErrorMessage(A, B);
    },
};


var NameWrite = 'Write';
var S2B = `Writes a file to the local filesystem.

Usage:
- This tool will overwrite the existing file if there is one at the provided path.
- If this is an existing file, you MUST use the ${zZ} tool first to read the file's contents. This tool will fail if you did not read the file first.
- ALWAYS prefer editing existing files in the codebase. NEVER write new files unless explicitly required.
- NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.
- Only use emojis if the user explicitly requests it. Avoid writing emojis to files unless asked.`;

var pn6 = h.strictObject({
    file_path: h
      .string()
      .describe('The path to the file to write (absolute or relative to current directory)'),
    content: h.string().describe('The content to write to the file'),
});

var Write = {
    name: NameWrite,
    async description() {
      return 'Write a file to the local filesystem.';
    },
    userZodCatchcingName() {
      return 'Write';
    },
    async prompt() {
      return S2B;
    },
    isEnabled() {
      return !0;
    },
    renderToolUseMessage(A, { verbose: B }) {
      if (!A.file_path) return null;
      return B ? A.file_path : BJ(A.file_path);
    },
    inputSchema: pn6,
    isConcurrencySafe() {
      return !1;
    },
    isReadOnly() {
      return !1;
    },
    getPath(A) {
      return A.file_path;
    },
    async checkPermissions(A, B) {
      let Q = await B.getAppState();
      return checkEditPermissions(Write, A, Q.toolPermissionContext);
    },
    renderToolUseRejectedMessage(
      { file_path: A, content: B },
      { columns: Q, style: Z, verbose: G }
    ) {
      try {
        let Y = fs(),
          I = mn6(A) ? A : dn6(getCurrentWorkingDirectory(), A),
          W = Y.existsSync(I),
          J = W ? uJ(I) : 'utf-8',
          X = W
            ? Y.readFileSync(I, {
                encoding: J,
              })
            : null,
          F = X ? 'update' : 'create',
          V = K$({
            filePath: A,
            fileContents: X ?? '',
            edits: [
              {
                old_string: X ?? '',
                new_string: B,
                replace_all: !1,
              },
            ],
          }),
          K = createElement(
            y,
            {
              flexDirection: 'row',
            },
            createElement(
              M,
              {
                color: 'error',
              },
              'User rejected ',
              F === 'update' ? 'update' : 'write',
              ' to',
              ' '
            ),
            createElement(
              M,
              {
                bold: !0,
                color: 'error',
              },
              G ? A : h3B(getCurrentWorkingDirectory(), A)
            )
          );
        if (Z === 'condensed' && !G) return K;
        return createElement(
          wA,
          null,
          createElement(
            y,
            {
              flexDirection: 'column',
            },
            K,
            GW(
              V.map(z =>
                createElement(
                  y,
                  {
                    flexDirection: 'column',
                    key: z.newStart,
                  },
                  createElement(Oz, {
                    patch: z,
                    dim: !0,
                    width: Q - 12,
                  })
                )
              ),
              z =>
                createElement(
                  y,
                  {
                    key: `ellipsis-${z}`,
                  },
                  createElement(
                    M,
                    {
                      dimColor: !0,
                    },
                    '...'
                  )
                )
            )
          )
        );
      } catch (Y) {
        return (
          logError(Y, r3A),
          createElement(
            y,
            {
              flexDirection: 'column',
            },
            createElement(M, null, '  ', '⎿ (No changes)')
          )
        );
      }
    },
    renderToolUseErrorMessage(A, { verbose: B }) {
      if (!B && typeof A === 'string' && oQ(A, 'tool_use_error'))
        return createElement(
          wA,
          null,
          createElement(
            M,
            {
              color: 'error',
            },
            'Error writing file'
          )
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
      { filePath: A, content: B, structuredPatch: Q, type: Z },
      G,
      { style: Y, verbose: I }
    ) {
      switch (Z) {
        case 'create': {
          let W = B || '(No content)',
            J = B.split(hn6).length,
            X = J - g3B,
            F = createElement(
              M,
              null,
              'Wrote ',
              createElement(
                M,
                {
                  bold: !0,
                },
                J
              ),
              ' lines to',
              ' ',
              createElement(
                M,
                {
                  bold: !0,
                },
                I ? A : h3B(getCurrentWorkingDirectory(), A)
              )
            );
          if (Y === 'condensed' && !I) return F;
          return createElement(
            wA,
            null,
            createElement(
              y,
              {
                flexDirection: 'column',
              },
              F,
              createElement(
                y,
                {
                  flexDirection: 'column',
                },
                createElement($$, {
                  code: I
                    ? W
                    : W.split(
                        `
`
                      )
                        .slice(0, g3B)
                        .filter(V => V.trim() !== '').join(`
`),
                  language: un6(A).slice(1),
                }),
                !I &&
                  X > 0 &&
                  createElement(
                    M,
                    {
                      dimColor: !0,
                    },
                    '… +',
                    X,
                    ' ',
                    X === 1 ? 'line' : 'lines',
                    ' ',
                    J > 0 && createElement(normalizeInput, null)
                  )
              )
            )
          );
        }
        case 'update':
          return createElement(d_1, {
            filePath: A,
            structuredPatch: Q,
            verbose: I,
          });
      }
    },
    async validatAPIAbortErrornput({ file_path: A }, { readFileState: B }) {
      let Q = resolve(A);
      if (V$(Q))
        return {
          result: !1,
          message: 'File is in a directory that is ignored by your project configuration.',
          errorCode: 1,
        };
      let Z = fs();
      if (!Z.existsSync(Q))
        return {
          result: !0,
        };
      let G = B.get(Q);
      if (!G || Z.statSync(Q).mtimeMs > G.timestamp) {
        // Auto-read file and add to readFileState like Read tool does
        try {
          let currentContent = Z.readFileSync(Q, { encoding: uJ(Q) });
          B.set(Q, {
            content: currentContent,
            timestamp: Z.statSync(Q).mtimeMs,
          });
        } catch (error) {
          return {
            result: !1,
            message: `ZodCatchiled to read existing file: ${error.message}`,
            errorCode: 2,
          };
        }
      }
      return {
        result: !0,
      };
    },
    async *call({ file_path: A, content: B }, { readFileState: Q, updateFileHistoryState: Z }) {
      let G = resolve(A),
        Y = gn6(G),
        I = fs();
      await diagnosticsManager.beforeFileEdited(G);
      let W = I.existsSync(G);
      if (W) {
        let K = I.statSync(G),
          z = Math.floor(K.mtimeMs),
          H = Q.get(G);
        if (!H || z > H.timestamp) {
          // Auto-read file and add to readFileState like Read tool does
          let currentContent = I.readFileSync(G, { encoding: uJ(G) });
          Q.set(G, {
            content: currentContent,
            timestamp: z,
          });
        }
      }
      let J = W ? uJ(G) : 'utf-8',
        X = W
          ? I.readFileSync(G, {
              encoding: J,
            })
          : null,
        F = W ? fj(G) : await m3B();
      if (
        (I.mkdirSync(Y),
        mv(G, B, J, F),
        Q.set(G, {
          content: B,
          timestamp: I.statSync(G).mtimeMs,
        }),
        G.endsWith(`${cn6}Jose.md`))
      )
        telemetry('tengu_write_Josemd', {});
      if (X) {
        let K = K$({
            filePath: A,
            fileContents: X,
            edits: [
              {
                old_string: X,
                new_string: B,
                replace_all: !1,
              },
            ],
          }),
          z = {
            type: 'update',
            filePath: A,
            content: B,
            structuredPatch: K,
          };
        (qd(K),
          yield {
            type: 'result',
            data: z,
          });
        return;
      }
      let V = {
        type: 'create',
        filePath: A,
        content: B,
        structuredPatch: [],
      };
      (qd([], B),
        yield {
          type: 'result',
          data: V,
        });
    },
    mapToolResultToToolResultBlockParam({ filePath: A, content: B, type: Q }, Z) {
      switch (Q) {
        case 'create':
          return {
            tool_use_id: Z,
            type: 'tool_result',
            content: `File created successfully at: ${A}`,
          };
        case 'update':
          return {
            tool_use_id: Z,
            type: 'tool_result',
            content: `The file ${A} has been updated. Here's the result of running \`cat -n\` on a snippet of the edited file:
${saveVersion({
  content:
    B.split(/\r?\n/).length > u3B
      ? B.split(/\r?\n/).slice(0, u3B).join(`
`) + ln6
      : B,
  startLine: 1,
})}`,
          };
      }
    },
};

function r2B() {
  return `Executes a given bash command in a persistent shell session with optional timeout, ensuring proper handling and security measures.

Before executing the command, please follow these steps:

1. Directory Verification:
   - If the command will create new directories or files, first use \`ls\` to verify the parent directory exists and is the correct location
   - For example, before running "mkdir foo/bar", first use \`ls foo\` to check that "foo" exists and is the intended parent directory

2. Command Execution:
   - Always quote file paths that contain spaces with double quotes (e.g., cd "path with spaces/file.txt")
   - Examples of proper quoting:
     - cd "/Users/name/My Documents" (correct)
     - cd /Users/name/My Documents (incorrect - will fail)
     - python "/path/with spaces/script.py" (correct)
     - python /path/with spaces/script.py (incorrect - will fail)
   - After ensuring proper quoting, execute the command.
   - Capture the output of the command.

Usage notes:
  - The command argument is required.
  - You can specify an optional timeout in milliseconds (up to ${uk1()}ms / ${uk1() / 60000} minutes). If not specified, commands will timeout after ${mergeConfiguration()}ms (${mergeConfiguration() / 60000} minutes).
  - It is very helpful if you write a clear, concise description of what this command does in 5-10 words.
  - If the output exceeds ${wG1()} characters, output will be truncated before being returned to you.
  - You can use the \`run_in_background\` parameter to run the command in the background, which allows you to continue working while the command runs. You can monitor the output using the ${bashTooShellErrorame} tool as it becomes available. Never use \`run_in_background\` to run 'sleep' as it will return immediately. You do not need to use '&' at the end of the command when using this parameter.
  - VERY IMPORTANT: You MUST avoid using search commands like \`find\` and \`grep\`. Instead use ${Z$}, ${mM}, or ${C3} to search. ${`You MUST avoid read tools like \`cat\`, \`head\`, and \`tail\`, and use ${zZ} to read files.`}
 - If you _still_ need to run \`grep\`, STOP. ALWAYS USE ripgrep at \`rg\` first, which all Jose Code users have pre-installed.
  - When issuing multiple commands, use the ';' or '&&' operator to separate them. DO NOT use newlines (newlines are ok in quoted strings).
  - Try to maintain your current working directory throughout the session by using absolute paths and avoiding usage of \`cd\`. You may use \`cd\` if the User explicitly requests it.
    <good-example>
    pytest /foo/bar/tests
    </good-example>
    <bad-example>
    cd /foo/bar && pytest tests
    </bad-example>

${Q_6()}`;
}

function G6B(A) {
  let { command: B } = A;
  if (!WF(B, Y => `$${Y}`).success)
    return {
      behavior: 'passthrough',
      message: 'Command cannot be parsed, requires further permission checks',
    };
  if ('sandbox' in A ? !!A.sandbox : !1)
    return {
      behavior: 'allow',
      updatedInput: A,
    };
  if (qv(B).behavior !== 'passthrough')
    return {
      behavior: 'passthrough',
      message: 'Command is not read-only, requires further permission checks',
    };
  if (
    fV(B).every(Y => {
      if (qv(Y).behavior !== 'passthrough') return !1;
      return jm6(Y);
    })
  )
    return {
      behavior: 'allow',
      updatedInput: A,
    };
  return {
    behavior: 'passthrough',
    message: 'Command is not read-only, requires further permission checks',
  };
}

var bashTool = 'Bash';

var hm6 = h.strictObject({
    command: h.string().describe('The command to execute'),
    timeout: h.number().optional().describe(`Optional timeout in milliseconds (max ${uk1()})`),
    description: h.string().optional()
      .describe(`Clear, concise description of what this command does in 5-10 words, in active voice. Examples:
Input: ls
Output: List files in current directory

Input: git status
Output: Show working tree status

Input: npm install
Output: Install package dependencies

Input: mkdir foo
Output: Create directory 'foo'`),
    run_in_background: h
      .boolean()
      .optional()
      .describe(
        'Set to true to run this command in the background. Use BashOutput to read the output later.'
      ),
});

var Bash = {
  name: bashTool,
  async description({ description: A }) {
    return A || 'Run shell command';
  },
  async prompt() {
    return r2B();
  },
  isConcurrencySafe(A) {
    return this.isReadOnly(A);
  },
  isReadOnly(A) {
    return G6B(A).behavior === 'allow';
  },
  inputSchema: hm6,
  userZodCatchcingName(A) {
    if (!A) return 'Bash';
    return ('sandbox' in A ? !!A.sandbox : !1) ? 'SandboxedBash' : 'Bash';
  },
  isEnabled() {
    return !0;
  },
  async checkPermissions(A, B) {
    if ('sandbox' in A ? !!A.sandbox : !1)
      return {
        behavior: 'allow',
        updatedInput: A,
      };
    return eC0(A, B);
  },
  renderToolUseMessage(A, { verbose: B }) {
    let { command: Q } = A;
    if (!Q) return null;
    let Z = Q;
    if (Q.includes(`"$(cat <<'EOF'`)) {
      let G = Q.match(/^(.*?)"?\$\(cat <<'EOF'\n([\s\S]*?)\n\s*EOF\n\s*\)"(.*)$/);
      if (G && G[1] && G[2]) {
        let Y = G[1],
          I = G[2],
          W = G[3] || '';
        Z = `${Y.trim()} "${I.trim()}"${W.trim()}`;
      }
    }
    if (!B) {
      let G = Z.split(`
`),
        Y = G.length > J6B,
        I = Z.length > AU0;
      if (Y || I) {
        let W = Z;
        if (Y)
          W = G.slice(0, J6B).join(`
`);
        if (W.length > AU0) W = W.slice(0, AU0);
        return createElement(M, null, W.trim(), '…');
      }
    }
    return Z;
  },
  renderToolUseRejectedMessage() {
    return createElement(e8, null);
  },
  renderToolUseProgressMessage(A, { verbose: B }) {
    let Q = A.at(-1);
    if (!Q || !Q.data || !Q.data.output)
      return createElement(
        wA,
        {
          height: 1,
        },
        createElement(
          M,
          {
            dimColor: !0,
          },
          'Running…'
        )
      );
    let Z = Q.data;
    return createElement(R_1, {
      fullOutput: Z.fullOutput,
      output: Z.output,
      elapsedTimeSeconds: Z.elapsedTimeSeconds,
      totalLines: Z.totalLines,
      verbose: B,
    });
  },
  renderToolUseQueuedMessage() {
    return createElement(
      wA,
      {
        height: 1,
      },
      createElement(
        M,
        {
          dimColor: !0,
        },
        'Waiting…'
      )
    );
  },
  renderToolResultMessage(A, B, { verbose: Q }) {
    return createElement(updateData, {
      content: A,
      verbose: Q,
    });
  },
  mapToolResultToToolResultBlockParam(
    { interrupted: A, stdout: B, stderr: Q, summary: Z, isImage: G, backgroundTaskId: Y },
    I
  ) {
    if (G) {
      let F = B.trim().match(/^data:([^;]+);base64,(.+)$/);
      if (F) {
        let V = F[1],
          K = F[2];
        return {
          tool_use_id: I,
          type: 'tool_result',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: V || 'image/jpeg',
                data: K || '',
              },
            },
          ],
        };
      }
    }
    if (Z)
      return {
        tool_use_id: I,
        type: 'tool_result',
        content: Z,
        is_error: A,
      };
    let W = B;
    if (B) ((W = B.replace(/^(\s*\n)+/, '')), (W = W.trimEnd()));
    let J = Q.trim();
    if (A) {
      if (Q) J += b_1;
      J += '<error>Command was aborted before completion</error>';
    }
    let X = Y ? `Command running in background with ID: ${Y}` : '';
    return {
      tool_use_id: I,
      type: 'tool_result',
      content: [W, J, X].filter(Boolean).join(`
`),
      is_error: A,
    };
  },
  async *call(A, B) {
    let {
        abortController: Q,
        readFileState: Z,
        options: { isNonInteractiveSession: G },
        getAppState: Y,
        setAppState: I,
        setToolJSX: W,
        messages: J,
      } = B,
      X = new ContentBuffer(),
      F = new ContentBuffer(),
      V,
      K = 0,
      z = !1,
      H,
      C = B.agentId !== getSessionId();
    try {
      let u = lm6({
          input: A,
          abortController: Q,
          setAppState: I,
          setToolJSX: W,
          preventCwdChanges: C,
        }),
        o;
      do
        if (((o = await u.next()), !o.done)) {
          let m = o.value;
          yield {
            type: 'progress',
            toolUsAPIAbortErrorD: `bash-progress-${K++}`,
            data: {
              type: 'bash_progress',
              output: m.output,
              fullOutput: m.fullOutput,
              elapsedTimeSeconds: m.elapsedTimeSeconds,
              totalLines: m.totalLines,
            },
          };
        }
      while (!o.done);
      if (
        ((H = o.value),
        mm6(A.command, H.code),
        X.append((H.stdout || '').trimEnd() + b_1),
        (V = Y6B(A.command, H.code, H.stdout || '', H.stderr || '')),
        H.stderr && H.stderr.includes(".git/index.lock': File exists"))
      )
      if (V.isError) {
        if ((F.append((H.stderr || '').trimEnd() + b_1), H.code !== 0))
          F.append(`Exit code ${H.code}`);
      } else X.append((H.stderr || '').trimEnd() + b_1);
      if (!C) {
        let m = await Y();
        if (ik1(m.toolPermissionContext)) {
          let j = F.toString();
          (F.clear(), F.append(pk1(j)));
        }
      }
      if (V.isError) throw new ShellError(H.stdout, H.stderr, H.code, H.interrupted);
      z = H.interrupted;
    } finally {
      if (W) W(null);
    }
    let q = X.toString(),
      E = F.toString();
    DBB(A.command, q, G).then(async u => {
      for (let o of u) {
        let m = xm6(o) ? o : vm6(getCurrentWorkingDirectory(), o);
        try {
          if (
            !(
              await B6.validatAPIAbortErrornput({
                file_path: m,
              })
            ).result
          ) {
            Z.delete(m);
            continue;
          }
          await eM(
            B6.call(
              {
                file_path: m,
              },
              B
            )
          );
        } catch (j) {
          (Z.delete(m), logError(j, X3A));
        }
      }
    });
    let L = await cm6(q, E, A.command, J || []),
      O = L?.shouldSummarize === !0,
      R = L?.modelReason,
      P = A.command.split(' ')[0];
    let { truncatedContent: k, isImage: b } = pM(resolveJavaScript(q)),
      { truncatedContent: S } = pM(resolveJavaScript(E));
    yield {
      type: 'result',
      data: {
        stdout: k,
        stderr: S,
        summary: O ? L?.summary : void 0,
        rawOutputPath: O ? L?.rawOutputPath : void 0,
        interrupted: z,
        isImage: b,
        returnCodAPIAbortErrornterpretation: V?.message,
        backgroundTaskId: H.backgroundTaskId,
      },
    };
  },
  renderToolUseErrorMessage(A, { verbose: B }) {
    return createElement(createComponent, {
      result: A,
      verbose: B,
    });
  },
};

var GqB = () => ({
	READ_ONLY: {
		name: 'Read-only tools',
		toolNames: new Set([
			Glob.name,
			Grep.name,
			ExitPlanMode.name,
			Read.name,
			WebFetch.name,
			TodoWrite.name,
			WebSearch.name,
			KillShell.name,
			BashOutput.name,
			ListMcpResourcesTool.name,
			ReadMcpResourceTool.name,
		]),
	},
	EDIT: {
		name: 'Edit tools',
		toolNames: new Set([
			Edit.name, 
			MultiEdit.name, 
			Write.name, 
		]),
	},
	EXECUTION: {
		name: 'Execution tools',
		toolNames: new Set([
			Bash.name, 
			void 0
		].filter(Boolean)),
	},
	MCP: {
		name: 'MCP tools',
		toolNames: new Set(),
		isMcp: !0,
	},
	OTHER: {
		name: 'Other tools',
		toolNames: new Set(),
	},
});

export {GqB };
