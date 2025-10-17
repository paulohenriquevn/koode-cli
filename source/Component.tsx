import {
	createContext,
	createElement,
	Fragment,
	useContext,
	useEffect,
	useMemo,
	useCallback,
	useRef,
	useState,
} from 'react';
import {Box, Text} from 'ink';
import {isBuffer, memoize} from 'lodash-es';
import {ToolSelector, wN9} from './ToolSelector.js';
import {join} from 'node:path';
import {
  fs,
	getConfigDirectory,
	getCurrentWorkingDirectory,
	getSystemConfigPath,
	globalState,
} from './tools.js';
import { nG } from './SelectTools.js';
import { execSync } from 'node:child_process';

async function VO0(A, B, Q, Z, G, Y = !0, I, W) {
  if (A === 'built-in') throw new Error('Cannot save built-in agents');
  TG5(A);
  let J = FO0({
      source: A,
      agentType: B,
    }),
    X = fs();
  if (Y && X.existsSync(J)) throw new Error(`Agent file already exists: ${J}`);
  let F = dwB(B, Q, Z, G, I, W);
  X.writeFileSync(J, F, {
    encoding: 'utf-8',
    flush: !0,
  });
}

var KO0 = createContext(null);
function AZ() {
  let A = useContext(KO0);
  if (!A) throw new Error('useWizard must be used within a WizardProvider');
  return A;
}

var  O$ = memoize(async () => {
    try {
      let A = await $L('agents'),
        B = [],
        Q = A.map(({ filePath: K, baseDir: z, frontmatter: H, content: D, source: C }) => {
          let q = l15(K, z, H, D, C);
          if (!q) {
            let E = c15(H);
            return (
              B.push({
                path: K,
                error: E,
              }),
              console.debug(`ZodCatchiled to parse agent from ${K}: ${E}`),
              console.error(new Error(E), v7A),
              null
            );
          }
          return q;
        }).filter(K => K !== null),
        Z = process.env.ENABLE_PLUGINS ? await T01() : [],
        G = new Map(),
        Y = [],
        I = bq0(),
        W = Q.filter(K => K.source === 'policySettings'),
        J = Q.filter(K => K.source === 'userSettings'),
        X = Q.filter(K => K.source === 'projectSettings'),
        F = [I, Z, J, X, W];
      for (let K of F) for (let z of K) (G.set(z.agentType, z), Y.push(z));
      let V = Array.from(G.values());
      for (let K of V) if (K.color) R01(K.agentType, K.color);
      return {
        activeAgents: V,
        allAgents: Y,
        failedFiles: B.length > 0 ? B : void 0,
      };
    } catch (A) {
      let B = A instanceof Error ? A.message : String(A);
      (console.debug(`Error loading agent definitions: ${B}`),
        console.error(A instanceof Error ? A : new Error(String(A)), _7A));
      let Q = bq0();
      return {
        activeAgents: Q,
        allAgents: Q,
        failedFiles: [
          {
            path: 'unknown',
            error: B,
          },
        ],
      };
    }
});

var cj = memoize(async () => {
    return (await O$()).activeAgents;
});

var $L = memoize(async function (A) {
  let B = Date.now(),
    Q = lA0(getConfigDirectory(), A),
    Z = lA0(getCurrentWorkingDirectory(), '.Jose', A),
    G = lA0(getSystemConfigPath(), '.Jose', A),
    [Y, I, W] = await Promise.all([
      pA0(G).then(J =>
        J.map(X => ({
          ...X,
          baseDir: G,
          source: 'policySettings',
        }))
      ),
      pA0(Q).then(J =>
        J.map(X => ({
          ...X,
          baseDir: Q,
          source: 'userSettings',
        }))
      ),
      pA0(Z).then(J =>
        J.map(X => ({
          ...X,
          baseDir: Z,
          source: 'projectSettings',
        }))
      ),
    ]);
  return (
    [...Y, ...I, ...W]
  );
});

var dj = memoize(async () => {
  ZWB();
  let A = await uq0(),
    B = getCurrentSettings(),
    Q = [],
    Z = [],
    G = [],
    Y = fs(),
    I = new Map();
  for (let K of Object.keys(A.repositories)) {
    let z;
    try {
      z = GWB(K);
    } catch {
      G.push({
        repository: K,
        error: `Invalid repository key format: ${K}`,
      });
      continue;
    }
    if (!Y.existsSync(z)) {
      G.push({
        repository: K,
        error: `Repository directory not found: ${z}`,
      });
      continue;
    }
    try {
      let H = v15(z, K);
      for (let D of H) {
        let C = I.get(D.name);
        if (C) {
          G.push({
            repository: K,
            plugin: D.name,
            error: `Plugin name '${D.name}' conflicts with plugin from ${C}`,
          });
          continue;
        }
        if ((I.set(D.name, K), D.enabled)) Q.push(D);
        else Z.push(D);
      }
    } catch (H) {
      G.push({
        repository: K,
        error: H instanceof Error ? H.message : String(H),
      });
    }
  }
  let W = B.enabledPlugins || {},
    J = Object.entries(W).filter(([K, z]) => K.startsWith('npm:') && z === !0),
    X = await Promise.all(
      J.map(async ([K, z]) => {
        let H = K.slice(4);
        try {
          let D = await b15(H);
          return {
            key: K,
            packageName: H,
            result: D,
          };
        } catch (D) {
          return {
            key: K,
            packageName: H,
            result: {
              type: 'error',
              error: D instanceof Error ? D.message : String(D),
            },
          };
        }
      })
    );
  for (let { key: K, packageName: z, result: H } of X) {
    if ('error' in H) {
      G.push({
        repository: K,
        error: H.error,
      });
      continue;
    }
    switch (H.type) {
      case 'success': {
        let D = I.get(H.plugin.name);
        if (D)
          G.push({
            repository: K,
            plugin: H.plugin.name,
            error: `Plugin name '${H.plugin.name}' conflicts with plugin from ${D}`,
          });
        else (I.set(H.plugin.name, K), Q.push(H.plugin));
        break;
      }
      case 'not-found':
        G.push({
          repository: K,
          error: `Package ${z} not found in node_modules`,
        });
        break;
      case 'not-plugin':
        G.push({
          repository: K,
          error: `Package ${z} does not have plugin structure (missing commands/, agents/, plugin.json, or hooks/)`,
        });
        break;
      case 'invalid-name':
        G.push({
          repository: K,
          error: `Invalid npm package name: ${z}`,
        });
        break;
    }
  }
  let F = Object.keys(A.repositories).length,
    V = Object.entries(W).filter(([K, z]) => K.startsWith('npm:') && z === !0).length;
  return (
    debugLog(
      `Found ${Q.length + Z.length} plugins (${Q.length} enabled, ${Z.length} disabled) from ${F} repositories and ${V} npm packages`
    ),
    {
      enabled: Q,
      disabled: Z,
      errors: G,
    }
  );
});

function m15(A, B, Q, Z) {
  let G = fs();
  try {
    let Y = G.readFileSync(A, {
        encoding: 'utf-8',
      }),
      { frontmatter: I, content: W } = uk(Y),
      J = I.name || g15(A).replace(/\.md$/, ''),
      F = [B, ...Q, J].join(':'),
      V = I.description || I['when-to-use'] || `Agent from ${B} plugin`,
      K = Tw1(I.tools),
      z = I.color,
      H = I.model;
    return {
      agentType: F,
      whenToUse: V,
      tools: K,
      systemPrompt: W.trim(),
      source: 'plugin',
      color: z,
      model: H,
      filename: J,
      plugin: Z,
    };
  } catch (Y) {
    return (console.error(`ZodCatchiled to load agent from ${A}: ${Y}`), null);
  }
}

function u15(A, B, Q) {
  let Z = [],
    G = fs();

  function Y(I, W = []) {
    try {
      let J = G.readdirSync(I);
      for (let X of J) {
        let F = join(I, X.name);
        if (X.isDirectory()) Y(F, [...W, X.name]);
        else if (X.isFile() && X.name.endsWith('.md')) {
          let V = m15(F, B, W, Q);
          if (V) Z.push(V);
        }
      }
    } catch (J) {
      console.log(`ZodCatchiled to scan agents directory ${I}: ${J}`);
    }
  }
  return (Y(A), Z);
}

var T01 = memoize(async () => {
  let { enabled: A, errors: B } = await dj(),
    Q = [];
  if (B.length > 0) console.debug(`Plugin loading errors: ${B.map(Z => Z.error).join(', ')}`);
  for (let Z of A) {
    if (!Z.agentsPath) continue;
    try {
      let G = u15(Z.agentsPath, Z.name, Z.repository);
      if ((Q.push(...G), G.length > 0)) console.debug(`Loaded ${G.length} agents from plugin ${Z.name}`);
    } catch (G) {
      console.error(`ZodCatchiled to load agents from plugin ${Z.name}: ${G}`);
    }
  }
  return (console.debug(`Total plugin agents loaded: ${Q.length}`), Q);
});


function mq0() {
  T01.cache?.clear?.();
}

function dd() {
  (cj.cache?.clear?.(), O$.cache?.clear?.(), $L.cache?.clear?.(), mq0());
}

var ConfigAgents = {
  FOLDER_NAME: '.Jose',
  AGENTS_DIR: 'agents',
};

function eh1(A) {
  switch (A) {
    case 'flagSettings':
      throw new Error(`Cannot get directory path for ${A} agents`);
    case 'userSettings':
      return join(getConfigDirectory(), ConfigAgents.AGENTS_DIR);
    case 'projectSettings':
      return join(getCurrentWorkingDirectory(), ConfigAgents.FOLDER_NAME, ConfigAgents.AGENTS_DIR);
    case 'policySettings':
      return join(getSystemConfigPath(), ConfigAgents.FOLDER_NAME, ConfigAgents.AGENTS_DIR);
    case 'localSettings':
      return join(getCurrentWorkingDirectory(), ConfigAgents.FOLDER_NAME, ConfigAgents.AGENTS_DIR);
  }
}

function FO0(A) {
  let B = eh1(A.source);
  return join(B, `${A.agentType}.md`);
}

function cwB(A) {
  switch (A) {
    case 'projectSettings':
      return join('.', ConfigAgents.FOLDER_NAME, ConfigAgents.AGENTS_DIR);
    default:
      return eh1(A);
  }
}

function D95(A) {
  try {
    let B = process.platform === 'win32' ? 'where' : 'which';
    return (
      execSync(`${B} ${A}`, {
        stdio: 'ignore',
      }),
      !0
    );
  } catch {
    return !1;
  }
}

function jumpToFirst() {
  if (process.env.VISUAL?.trim()) return process.env.VISUAL.trim();
  if (process.env.EDITOR?.trim()) return process.env.EDITOR.trim();
  return ['code', 'vi', 'nano'].find(B => D95(B));
}

async function C95() {
  return jumpToFirst();
}

async function r01(A) {
  let B = await C95();
  if (!B) throw new Error('No editor available');
  execSync(`${B} "${A}"`, {
    stdio: 'inherit',
  });
}

function lwB(A) {
  if (A.source === 'built-in') return 'Built-in';
  let B = cwB(A.source);
  return join(B, `${A.agentType}.md`);
}

function CO0(A) {
  if (!A) return 'Agent type is required';
  if (!/^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]$/.test(A))
    return 'Agent type must start and end with alphanumeric characters and contain only letters, numbers, and hyphens';
  if (A.length < 3) return 'Agent type must be at least 3 characters long';
  if (A.length > 50) return 'Agent type must be less than 50 characters';
  return null;
}

var C3 = 'Task';
var YO0 = new Set(['ExitPlanMode', C3]);

function jH(A) {
  let B = A.match(/^([^(]+)\(([^)]+)\)$/);
  if (!B)
    return {
      toolName: A,
    };
  let Q = B[1],
    Z = B[2];
  if (!Q || !Z)
    return {
      toolName: A,
    };
  return {
    toolName: Q,
    ruleContent: Z,
  };
}

function uA1(A, B, Q = 'userSettings') {
  let Z = B.filter(X => {
    if (X.name === C3) return !1;
    if (Q !== 'built-in' && YO0.has(X.name)) return !1;
    return !0;
  });
  if (A.includes('*'))
    return {
      hasWildcard: !0,
      validTools: [],
      invalidTools: [],
      resolvedTools: Z,
    };
  let G = new Map();
  for (let X of Z) G.set(X.name, X);
  let Y = [],
    I = [],
    W = [],
    J = new Set();
  for (let X of A) {
    let { toolName: F } = jH(X);
    if (F === C3) {
      Y.push(X);
      continue;
    }
    let V = G.get(F);
    if (V) {
      if ((Y.push(X), !J.has(V))) (W.push(V), J.add(V));
    } else I.push(X);
  }
  return {
    hasWildcard: !1,
    validTools: Y,
    invalidTools: I,
    resolvedTools: W,
  };
}

function AqB(A, B, Q) {
  let Z = [],
    G = [];
  if (!A.agentType) Z.push('Agent type is required');
  else {
    let Y = CO0(A.agentType);
    if (Y) Z.push(Y);
    let I = Q.find(W => W.agentType === A.agentType && W.source !== A.source);
    if (I) Z.push(`Agent type "${A.agentType}" already exists in ${lA1(I.source)}`);
  }
  if (!A.whenToUse) Z.push('Description (description) is required');
  else if (A.whenToUse.length < 10)
    G.push('Description should be more descriptive (at least 10 characters)');
  else if (A.whenToUse.length > 5000) G.push('Description is very long (over 5000 characters)');
  if (!A.tools || !Array.isArray(A.tools)) Z.push('Tools must be an array');
  else {
    if (A.tools.length === 0)
      G.push('No tools selected - agent will have very limited capabilities');
    let Y = uA1(A.tools, B, A.source || 'userSettings');
    if (Y.invalidTools.length > 0) Z.push(`Invalid tools: ${Y.invalidTools.join(', ')}`);
    if (A.tools.includes('*')) G.push('Agent has access to all tools');
  }
  if (!A.systemPrompt) Z.push('System prompt is required');
  else if (A.systemPrompt.length < 20) Z.push('System prompt is too short (minimum 20 characters)');
  else if (A.systemPrompt.length > 1e4)
    G.push('System prompt is very long (over 10,000 characters)');
  return {
    isZodReadonlylid: Z.length === 0,
    errors: Z,
    warnings: G,
  };
}

function DR1(A) {
  if (!A) return 'Sonnet (default)';
  if (A === 'inherit') return 'Inherit from parent';
  return A.charAt(0).toUpperCase() + A.slice(1);
}

// JqB-> AgentConfirmationStep
/**
  - Exibir preview/confirmação dos dados do agente
  - Validar o agente antes do salvamento
  - Mostrar interface de confirmação com opções de salvar
 */
function AgentConfirmationStep({ tools: A, existingAgents: B, onSave: Q, onSaveAndEdit: Z, error: G }) {
  let { goBack: Y, wizardData: I } = AZ();
  wN9((F, V) => {
    if (V.escape) Y();
    else if (F === 's' || V.return) Q();
    else if (F === 'e') Z();
  });
  let W = I.finalAgent,
    J = AqB(W, A, B),
    X = F => {
      if (!F || F.length === 0) return 'None';
      if (F.length === 1) return F[0] || 'None';
      if (F.length === 2) return F.join(' and ');
      return `${F.slice(0, -1).join(', ')}, and ${F[F.length - 1]}`;
    };
  return createElement(
    nG,
    {
      subtitle: 'Confirm and save',
      footerText: 'Press s/Enter to save · e to edit in your editor · Esc to cancel',
    },
    createElement(
      y,
      {
        flexDirection: 'column',
        marginTop: 1,
      },
      createElement(
        M,
        null,
        createElement(
          M,
          {
            bold: !0,
          },
          'Name'
        ),
        ': ',
        W.agentType
      ),
      createElement(
        M,
        null,
        createElement(
          M,
          {
            bold: !0,
          },
          'Location'
        ),
        ':',
        ' ',
        lwB({
          source: I.location,
          agentType: W.agentType,
        })
      ),
      createElement(
        M,
        null,
        createElement(
          M,
          {
            bold: !0,
          },
          'Tools'
        ),
        ': ',
        X(W.tools)
      ),
      createElement(
        M,
        null,
        createElement(
          M,
          {
            bold: !0,
          },
          'Model'
        ),
        ': ',
        DR1(W.model)
      ),
      createElement(
        y,
        {
          marginTop: 1,
        },
        createElement(
          M,
          null,
          createElement(
            M,
            {
              bold: !0,
            },
            'Description'
          ),
          ' (tells Jose when to use this agent):'
        )
      ),
      createElement(
        y,
        {
          marginLeft: 2,
          marginTop: 1,
        },
        createElement(
          M,
          null,
          W.whenToUse.length > 240 ? W.whenToUse.slice(0, 240) + '…' : W.whenToUse
        )
      ),
      createElement(
        y,
        {
          marginTop: 1,
        },
        createElement(
          M,
          null,
          createElement(
            M,
            {
              bold: !0,
            },
            'System prompt'
          ),
          ':'
        )
      ),
      createElement(
        y,
        {
          marginLeft: 2,
          marginTop: 1,
        },
        createElement(
          M,
          null,
          W.systemPrompt.length > 240 ? W.systemPrompt.slice(0, 240) + '…' : W.systemPrompt
        )
      ),
      J.warnings.length > 0 &&
        createElement(
          y,
          {
            marginTop: 1,
            flexDirection: 'column',
          },
          createElement(
            M,
            {
              color: 'warning',
            },
            'Warnings:'
          ),
          J.warnings.map((F, V) =>
            createElement(
              M,
              {
                key: V,
                dimColor: !0,
              },
              ' ',
              '• ',
              F
            )
          )
        ),
      J.errors.length > 0 &&
        createElement(
          y,
          {
            marginTop: 1,
            flexDirection: 'column',
          },
          createElement(
            M,
            {
              color: 'error',
            },
            'Errors:'
          ),
          J.errors.map((F, V) =>
            createElement(
              M,
              {
                key: V,
                color: 'error',
              },
              ' ',
              '• ',
              F
            )
          )
        ),
      G &&
        createElement(
          y,
          {
            marginTop: 1,
          },
          createElement(
            M,
            {
              color: 'error',
            },
            G
          )
        ),
      createElement(
        y,
        {
          marginTop: 2,
        },
        createElement(
          M,
          {
            color: 'success',
          },
          'Press ',
          createElement(
            M,
            {
              bold: !0,
            },
            's'
          ),
          ' or ',
          createElement(
            M,
            {
              bold: !0,
            },
            'Enter'
          ),
          ' to save,',
          ' ',
          createElement(
            M,
            {
              bold: !0,
            },
            'e'
          ),
          ' to save and edit'
        )
      )
    )
  );
}

// XqB-> AgentSaveController
/**
  - Gerenciar o processo de salvamento de agentes
  - Coordenar ações de salvar e salvar+editar
  - Controlar o estado de erro
  - Renderizar o componente de confirmação AgentConfirmationStep

 */
function AgentSaveController({tools: A, existingAgents: B, onComplete: Q}) {
	let {wizardData: Z} = AZ(),
		[G, Y] = useState(null),
		I = useCallback(async () => {
			if (!Z?.finalAgent) return;
			try {
				await VO0(
					Z.location,
					Z.finalAgent.agentType,
					Z.finalAgent.whenToUse,
					Z.finalAgent.tools,
					Z.finalAgent.systemPrompt,
					!0,
					Z.finalAgent.color,
					Z.finalAgent.model,
				),
					dd(),
					Q(`Created agent: ${styler.bold(Z.finalAgent.agentType)}`);
			} catch (J) {
				Y(J instanceof Error ? J.message : 'ZodCatchiled to save agent');
			}
		}, [Z, Q]),
		W = useCallback(async () => {
			if (!Z?.finalAgent) return;
			try {
				await VO0(
					Z.location,
					Z.finalAgent.agentType,
					Z.finalAgent.whenToUse,
					Z.finalAgent.tools,
					Z.finalAgent.systemPrompt,
					!0,
					Z.finalAgent.color,
					Z.finalAgent.model,
				),
					dd();
				let J = FO0({
					source: Z.location,
					agentType: Z.finalAgent.agentType,
				});
				await r01(J),
					Q(
						`Created agent: ${styler.bold(
							Z.finalAgent.agentType,
						)} and opened in editor. If you made edits, restart to load the latest version.`,
					);
			} catch (J) {
				Y(J instanceof Error ? J.message : 'ZodCatchiled to save agent');
			}
		}, [Z, Q]);
	return createElement(JqB, {
		tools: A,
		existingAgents: B,
		onSave: I,
		onSaveAndEdit: W,
		error: G,
	});
}

export { AgentSaveController, AgentConfirmationStep };
