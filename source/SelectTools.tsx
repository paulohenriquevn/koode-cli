import {
	createContext,
	createElement,
	Fragment,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import {Box, Text} from 'ink';
import {ToolSelector, wN9} from './ToolSelector.js';
import { getConfigDirectory, getCurrentWorkingDirectory, globalState } from './tools.js';
import {join} from 'node:path';

function AZ() {
	let A = useContext(createContext(null));
	if (!A) throw new Error('useWizard must be used within a WizardProvider');
	return A;
}

var a00 = new Set();

function getSessionId() {
  return globalState.sessionId;
}

var nA1 = getCurrentWorkingDirectory();

function mW1() {
  return join(getConfigDirectory(), 'projects');
}

function rq(A) {
  return join(mW1(), A.replace(/[^a-zA-Z0-9]/g, '-'));
}

function RL0(A) {
  let B = rq(nA1);
  return join(B, `${A}.jsonl`);
}

function x$1() {
  return RL0(getSessionId());
}

function FL(A) {
  return {
    session_id: getSessionId(),
    transcript_path: x$1(),
    cwd: getCurrentWorkingDirectory(),
    permission_mode: A,
  };
}

var DEFAULT_TIMEOUT_MS = 60000;

async function n00(A, B, Q, Z = DEFAULT_TIMEOUT_MS) {
  let G = A.hook_event_name,
    Y = B ? `${G}:${B}` : G;
  if (getCurrentSettings().disableAllHooks)
    return (debugLog(`Skipping hooks for ${Y} due to 'disableAllHooks' setting`), []);
  let I = FLA(G, A).filter(F => F.type === 'command');
  if (I.length === 0) return [];
  if (Q?.aborted) return [];
  telemetry('tengu_run_hook', {
    hookName: Y,
    numCommands: I.length,
  });
  let W;
  try {
    W = JSON.stringify(A);
  } catch (F) {
    return (logError(F instanceof Error ? F : new Error(String(F)), QZA), []);
  }
  let J = I.map(async F => {
    let V,
      K,
      z = F.timeout ? F.timeout * 1000 : Z;
    if (Q) {
      let H = p00(Q, AbortSignal.timeout(z));
      ((V = H.signal), (K = H.cleanup));
    } else V = AbortSignal.timeout(z);
    try {
      let H = await i00(F, Y, W, V);
      if ((K?.(), H.aborted))
        return (
          debugLog(`${Y} [${F.command}] cancelled`),
          {
            command: F.command,
            succeeded: !1,
            output: 'Hook cancelled',
          }
        );
      debugLog(`${Y} [${F.command}] completed with status ${H.status}`);
      let { json: D, validationError: C } = JLA(H.stdout);
      if (C)
        throw (
          writeToStderr(
            `${styler.bold(Y)} [${F.command}] ${styler.yellow('Hook JSON output validation failed')}`
          ),
          new Error(C)
        );
      if (D && !$61(D)) {
        if ((debugLog(`Parsed JSON output from hook: ${JSON.stringify(D)}`), D.systemMessage))
          writeToStdout(D.systemMessage);
      }
      let q = H.status === 0 ? H.stdout || '' : H.stderr || '';
      return {
        command: F.command,
        succeeded: H.status === 0,
        output: q,
      };
    } catch (H) {
      K?.();
      let D = H instanceof Error ? H.message : String(H);
      return (
        errorLog(`${Y} [${F.command}] failed to run: ${D}`),
        {
          command: F.command,
          succeeded: !1,
          output: D,
        }
      );
    }
  });
  return await Promise.all(J);
}

async function _$1(A, B, Q = DEFAULT_TIMEOUT_MS) {
	let Z = {
		...FL(void 0),
		hook_event_name: 'SessionEnd',
		reason: A,
	};
	await n00(Z, A, B, Q);
}

async function exitProcess(A = 0, B = 'other') {
	(process.exitCode = A), _N9();
	try {
		await _$1(B);
	} catch {}
	try {
		let Q = (async () => {
			try {
				await Promise.all(Array.from(a00).map(Z => Z()));
			} catch {}
		})();
		await Promise.race([
			Q,
			new Promise((Z, G) =>
				setTimeout(() => G(new Error('Cleanup timeout')), 2000),
			),
		]),
			process.exit(A);
	} catch {
		process.exit(A);
	}
}

function xT(A, B, Q) {
	let Z = useRef(0),
		G = useRef();
	return () => {
		let Y = Date.now();
		if (Y - Z.current <= 800 && G.current) {
			if (G.current) clearTimeout(G.current), (G.current = void 0);
			B(), A(!1);
		} else Q?.(), A(!0), (G.current = setTimeout(() => A(!1), 800));
		Z.current = Y;
	};
}

function xT(A, B, Q) {
	let Z = useRef(0),
		G = useRef();
	return () => {
		let Y = Date.now();
		if (Y - Z.current <= 800 && G.current) {
			if (G.current) clearTimeout(G.current), (G.current = void 0);
			B(), A(!1);
		} else Q?.(), A(!0), (G.current = setTimeout(() => A(!1), 800));
		Z.current = Y;
	};
}

function Q2(A) {
	let [B, Q] = useState({
			pending: !1,
			keyName: null,
		}),
		Z = xT(
			Y =>
				Q({
					pending: Y,
					keyName: 'Ctrl-C',
				}),
			A
				? A
				: async () => {
						await exitProcess(0);
				  },
		),
		G = xT(
			Y =>
				Q({
					pending: Y,
					keyName: 'Ctrl-D',
				}),
			A
				? A
				: async () => {
						await exitProcess(0);
				  },
		);
	return (
		wN9((Y, I) => {
			if (I.ctrl && Y === 'c') Z();
			if (I.ctrl && Y === 'd') G();
		}),
		B
	);
}

function DO0({
	instructions: A = 'Press ↑↓ to navigate · Enter to select · Esc to go back',
}) {
	let B = Q2();
	return createElement(
		y,
		{
			marginLeft: 3,
		},
		createElement(
			M,
			{
				dimColor: !0,
			},
			B.pending ? `Press ${B.keyName} again to exit` : A,
		),
	);
}

function nG({
	title: A,
	titleColor: B = 'text',
	borderColor: Q = 'suggestion',
	children: Z,
	subtitle: G,
	footerText: Y,
}) {
	let {currentStepIndex: I, totalSteps: W, title: J, showStepCounter: X} = AZ();
	return createElement(
		Fragment,
		null,
		createElement(
			y,
			{
				borderStyle: 'round',
				borderColor: Q,
				flexDirection: 'column',
			},
			createElement(
				y,
				{
					flexDirection: 'column',
					paddingX: 1,
				},
				createElement(
					M,
					{
						bold: !0,
						color: B,
					},
					A || J || 'Wizard',
					X !== !1 && ` (${I + 1}/${W})`,
				),
				G &&
					createElement(
						M,
						{
							dimColor: !0,
						},
						G,
					),
			),
			createElement(
				y,
				{
					paddingX: 1,
					flexDirection: 'column',
				},
				Z,
			),
		),
		createElement(DO0, {
			instructions: Y,
		}),
	);
}

// YqB ->SelectTools
function SelectTools({tools: A}) {
	let {goNext: B, goBack: Q, updateWizardData: Z, wizardData: G} = AZ(),
		Y = W => {
			Z({
				selectedTools: W,
			}),
				B();
		},
		I = G.selectedTools || A.map(W => W.name);
	return createElement(
		nG,
		{
			subtitle: 'Select tools',
			footerText:
				'Press Enter to toggle selection · ↑↓ to navigate · Esc to go back',
		},
		createElement(ToolSelector, {
			tools: A,
			initialTools: I,
			onComplete: Y,
			onCancel: Q,
		}),
	);
}


export {SelectTools, DO0, nG};
