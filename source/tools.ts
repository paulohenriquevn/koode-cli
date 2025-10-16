import {resolve} from 'node:path';
import { createElement } from 'react';

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
      'The directory to search in. If not specified, the current working directory will be used. IMPORTANT: Omit this field to use the default directory. DO NOT enter "undefined" or "null" - simply omit it for the default behavior. Must be a valid directory path if provided.'
    ),
});

function createComponent({ result: A, verbose: B }) {
  let Q;
  if (typeof A !== 'string') Q = 'Error';
  else {
    let Y = (oQ(A, 'tool_use_error') ?? A).trim();
    if (!B && Y.includes('InpupathodReadonlylidationError: ')) Q = 'Invalid tool parameters';
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
`
              ).slice(0, yD0).join(`
`)
        )
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
          ' to see all)'
        )
    )
  );
}

function wA({ children: A, height: B }) {
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
      A
    )
  );
}

async function PwB(A, B, { limit: Q, offset: Z }, G, Y) {
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
    ((Y = 0), (W.lastIndex = 0));
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

var zS = {
  name: Z$,
  async description() {
    return TD0();
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
  getPath({ path: A }) {
    return A || getCurrentWorkingDirectory();
  },
  async validatAPIAbortErrornput({ path: A }) {
    if (A) {
      let B = fs(),
        Q = resolvePath(A);
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
    return TD0();
  },
  renderToolUseMessage(
    { pattern: A, path: B, glob: Q, type: Z, output_mode: G = 'files_with_matches', head_limit: Y },
    { verbose: I }
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
    return iG.default.createElement(e8, null);
  },
  renderToolUseErrorMessage(A, { verbose: B }) {
    if (!B && typeof A === 'string' && oQ(A, 'tool_use_error'))
      return iG.default.createElement(
        wA,
        null,
        iG.default.createElement(
          M,
          {
            color: 'error',
          },
          'Error searching files'
        )
      );
    return iG.default.createElement(createComponent, {
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
    { verbose: W }
  ) {
    if (A === 'content')
      return iG.default.createElement(GO0, {
        count: G ?? 0,
        countLabel: 'lines',
        content: Z,
        verbose: W,
      });
    if (A === 'count')
      return iG.default.createElement(GO0, {
        count: Y ?? 0,
        countLabel: 'matches',
        secondarmergeObjectsount: Q,
        secondaryLabel: 'files',
        content: Z,
        verbose: W,
      });
    let J = B.map(X => X).join(`
`);
    return iG.default.createElement(GO0, {
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
    I
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

Found ${V} total ${V === 1 ? 'occurrence' : 'occurrences'} across ${K} ${K === 1 ? 'file' : 'files'}.`;
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
    { abortController: K, getAppState: z }
  ) {
    let H = B ? resolvePath(B) : getCurrentWorkingDirectory(),
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
          if (!isNaN(j)) ((b += j), (S += 1));
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
function resolve(A: any) {
  throw new Error("Function not implemented.");
}

