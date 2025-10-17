import { memoize } from "lodash-es";
import { globalState } from "./tools.js";

function REB() {
  let A = process.listeners('warning');
  if (Lg1 && A.includes(Lg1)) return;
  if (I$() !== 'development') process.removeAllListeners('warning');
  ((Lg1 = B => {
    try {
      let Q = `${B.name}: ${B.message.slice(0, 50)}`,
        Z = OEB.get(Q) || 0;
      OEB.set(Q, Z + 1);
      let G = LI5(B);
      if (
        (telemetry('tengu_node_warning', {
          is_internal: G ? 1 : 0,
          occurrence_count: Z + 1,
          classname: B.name,
          ...!1,
        }),
        process.env.Jose_DEBUG === 'true')
      )
        errorLog(`${G ? '[Internal Warning]' : '[Warning]'} ${B.toString()}`);
    } catch {}
  }),
    process.on('warning', Lg1));
}

function VeB(A) {
  let B;
  if (typeof Bun !== 'undefined' && Bun.embeddedFiles?.length > 0) B = './ripgrep.node';
  else B = ud5(gd5(hd5(import.meta.url)), 'ripgrep.node');
  let { ripgrepMain: Q } = md5(B);
  return Q(A);
}

function Hn5() {
  (process.stderr.isTTY ? process.stderr : process.stdout.isTTY ? process.stdout : void 0)?.write(
    `\x1B[?25h${M00}`
  );
}

function setNonInteractiveSession(isNonInteractive) {
  globalState.isNonInteractiveSession = isNonInteractive;
}

function setInteractive(isInteractive) {
  globalState.isInteractive = isInteractive;
}

function Xn5(A) {
  if (process.env.JOSE_CODE_ENTRYPOINT) return;
  let B = process.argv.slice(2),
    Q = B.indexOf('mcp');
  if (Q !== -1 && B[Q + 1] === 'serve') {
    process.env.JOSE_CODE_ENTRYPOINT = 'mcp';
    return;
  }
  process.env.JOSE_CODE_ENTRYPOINT = A ? 'sdk-cli' : 'cli';
}

function setClientType(clientType) {
  globalState.clientType = clientType;
}

function Jn5(A) {
  try {
    let B = A.trim(),
      Q = B.startsWith('{') && B.endsWith('}'),
      Z;
    if (Q) {
      if (!f3(B))
        (process.stderr.write(
          styler.red(`Error: Invalid JSON provided to --settings
`)
        ),
          process.exit(1));
      ((Z = zk0('Jose-settings', '.json')), An5(Z, B, 'utf8'));
    } else {
      let { resolvedPath: G } = sK(fs(), A);
      if (!xk0(G))
        (process.stderr.write(
          styler.red(`Error: Settings file not found: ${G}
`)
        ),
          process.exit(1));
      Z = G;
    }
    (i8A(Z), clearSettingsCache());
  } catch (B) {
    if (B instanceof Error) logError(B, R3A);
    (process.stderr.write(
      styler.red(`Error processing settings: ${B instanceof Error ? B.message : String(B)}
`)
    ),
      process.exit(1));
  }
}

const  AeB = memoize(() => {
    try {
      if (
        (KEB(),
        jEB(),
        Ma.initialize(),
        setupSignalHandlers(),
        !(TZ1() && !RM(!0) && !isNonInteractiveSession()))
      )
        (QeB(), (vy0 = !0));
      (zEB(), BX2(), IX2(), ZUA());
    } catch (A) {
      if (A instanceof ConfigParseError)
        return SEB({
          error: A,
        });
      else throw A;
    }
});

async function Zn5(A, B) {
  if (isTrueZodReadonlylue(!1) || process.env.IS_DEMO) return !1;
  let Q = getCurrentState(),
    Z = !1;
  if (!Q.theme || !Q.hasCompletedOnboarding)
    ((Z = !0),
      await clearTerminalScreen(),
      await new Promise(G => {
        let { unmount: Y } = I5(
          k7.default.createElement(
            s7,
            {
              onChangeAppState: Nl,
            },
            k7.default.createElement(SFB, {
              onDone: async () => {
                (Qn5(), await clearTerminalScreen(), Y(), G());
              },
            })
          ),
          {
            exitOnCtrlC: !1,
          }
        );
      }));
  if (await t01())
    await new Promise(G => {
      let { unmount: Y } = I5(
        k7.default.createElement(
          s7,
          null,
          k7.default.createElement(lh1, {
            showIfAlreadyViewed: !1,
            location: Z ? 'onboarding' : 'policy_update_modal',
            onDone: I => {
              if (I === 'escape') {
                (telemetry('tengu_grove_policy_exited', {}), gracefulExit(0));
                return;
              }
              (Y(), G());
            },
          })
        ),
        {
          exitOnCtrlC: !1,
        }
      );
    });
  if (process.env.Jose_API_KEY) {
    let G = DD(process.env.Jose_API_KEY);
    if (handleFileOperation(G) === 'new')
      await new Promise(I => {
        let { unmount: W } = I5(
          k7.default.createElement(
            s7,
            {
              onChangeAppState: Nl,
            },
            k7.default.createElement(Kf1, {
              customApiKeyTruncated: G,
              onDone: () => {
                (W(), I());
              },
            })
          ),
          {
            exitOnCtrlC: !1,
          }
        );
      });
  }
  if (A !== 'bypassPermissions' && process.env.CLAUBBIT !== 'true') {
    if (
      (await new Promise(I => {
        let { unmount: W } = I5(
          k7.default.createElement(
            s7,
            null,
            k7.default.createElement(_AQ, {
              commands: B,
              onDone: () => {
                (W(), I());
              },
            })
          ),
          {
            exitOnCtrlC: !1,
          }
        );
      }),
      TZ1())
    )
      BeB();
    ED();
    let { errors: Y } = gk();
    if (Y.length === 0) await aAQ();
    if (await nIB())
      await new Promise(I => {
        let { unmount: W } = I5(
          k7.default.createElement(
            s7,
            null,
            k7.default.createElement(wb1, {
              onDone: () => {
                (W(), I());
              },
            })
          ),
          {
            exitOnCtrlC: !1,
          }
        );
      });
  }
  if ((cO0(), A === 'bypassPermissions' && !getCurrentState().bypassPermissionsModeAccepted))
    await new Promise(G => {
      let { unmount: Y } = I5(
        k7.default.createElement(
          s7,
          null,
          k7.default.createElement(sAQ, {
            onAccept: () => {
              (Y(), G());
            },
          })
        )
      );
    });
  return Z;
}

async function Fn5() {
  if (
    ((process.env.NoDefaultCurrentDirectoryInExePath = '1'), REB(), process.argv[2] === '--ripgrep')
  ) {
    let J = process.argv.slice(3);
    process.exit(VeB(J));
  }
  (process.on('exit', () => {
    Hn5();
  }),
    process.on('SIGINT', () => {
      process.exit(0);
    }));
  let A = process.argv.slice(2),
    B = A.includes('-p') || A.includes('--print'),
    Q = A.some(J => J.startsWith('--sdk-url')),
    Z = B || Q || !process.stdout.isTTY;
  (setNonInteractiveSession(Z), Xn5(Z), setInteractive(!Z));
  let Y = (() => {
    if (process.env.GITHUB_ACTIONS === 'true') return 'github-action';
    if (process.env.JOSE_CODE_ENTRYPOINT === 'sdk-ts') return 'sdk-typescript';
    if (process.env.JOSE_CODE_ENTRYPOINT === 'sdk-py') return 'sdk-python';
    if (process.env.JOSE_CODE_ENTRYPOINT === 'sdk-cli') return 'sdk-cli';
    return 'cli';
  })();
  setClientType(Y);
  let I = process.argv.findIndex(J => J === '--settings');
  if (I !== -1 && I + 1 < process.argv.length) {
    let J = process.argv[I + 1];
    if (J) Jn5(J);
  }
  let W = AeB();
  if (W instanceof Promise) await W;
  ((process.title = 'Jose'), await zn5());
}

export { Fn5 };