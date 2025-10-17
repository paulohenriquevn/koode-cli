import {
	createElement,
  createContext,
  useContext,
} from 'react';
import {Box, Text} from 'ink';
import {debounce, isBuffer, memoize} from 'lodash-es';
import {ok, ToolSelector, wN9} from './ToolSelector.js';
import {basename, extname, isAbsolute, join} from 'node:path';
import {
	fs,
} from './tools.js';
import {execSync} from 'node:child_process';
import { InputComponent } from './InputComponent.js';

function qw1({
  value: A,
  onChange: B,
  onSubmit: Q,
  onExit: Z,
  onExitMessage: G,
  onMessage: Y,
  onHistoryUp: I,
  onHistoryDown: W,
  onHistoryReset: J,
  mask: X = '',
  multiline: F = !1,
  cursorChar: V,
  invert: K,
  columns: z,
  onImagePaste: H,
  disableCursorMovementForUpDownKeys: D = !1,
  externalOffset: C,
  onOffsetChange: q,
  inputFilter: E,
}) {
  let L = C,
    O = q,
    R = TextEditor.fromText(A, z, L),
    [P, k] = ETA.useState(null);

  function b() {
    if (!P) return;
    (clearTimeout(P), k(null), Y?.(!1));
  }
  let S = xT(
      F0 => {
        (b(), G?.(F0, 'Ctrl-C'));
      },
      () => Z?.(),
      () => {
        if (A) (B(''), O(0), J?.());
      }
    ),
    c = xT(
      F0 => {
        (b(), Y?.(!!A && F0, 'Press Escape again to clear'));
      },
      () => {
        if (A) {
          if (A.trim() !== '') hT(A);
          (B(''), O(0), J?.());
        }
      }
    );

  function u() {
    if (A.trim() !== '') (hT(A), J?.());
    return TextEditor.fromText('', z, 0);
  }
  let o = xT(
    F0 => {
      if (A !== '') return;
      G?.(F0, 'Ctrl-D');
    },
    () => {
      if (A !== '') return;
      Z?.();
    }
  );

  function m() {
    if ((b(), R.text === '')) return (o(), R);
    return R.del();
  }

  function j() {
    if (!H) return;
    Jw1().then(F0 => {
      if (F0) H(F0.base64, F0.mediaType);
      else {
        let U1 = `No image found in clipboard. Use ${og.displayText} to paste images.`;
        (Y?.(!0, U1),
          b(),
          k(
            setTimeout(() => {
              Y?.(!1);
            }, 4000)
          ));
      }
    });
  }
  let a = qTA([
      ['a', () => R.startOfLine()],
      ['b', () => R.left()],
      ['c', S],
      ['d', m],
      ['e', () => R.endOfLine()],
      ['f', () => R.right()],
      ['h', () => R.backspace()],
      ['k', () => R.deleteToLineEnd()],
      ['l', () => u()],
      ['n', () => s1()],
      ['p', () => P1()],
      ['u', () => R.deleteToLineStart()],
      ['w', () => R.deleteWordBefore()],
    ]),
    Q1 = qTA([
      ['b', () => R.prevWord()],
      ['f', () => R.nextWord()],
      ['d', () => R.deleteWordAfter()],
    ]);

  function J1(F0) {
    if (F && R.offset > 0 && R.text[R.offset - 1] === '\\')
      return (
        WRA(),
        R.backspace().insert(`
`)
      );
    if (F0.meta)
      return R.insert(`
`);
    Q?.(A);
  }

  function P1() {
    if (D) return (I?.(), R);
    let F0 = R.up();
    if (!F0.equals(R)) return F0;
    if (F) {
      let U1 = R.upLogicalLine();
      if (!U1.equals(R)) return U1;
    }
    return (I?.(), R);
  }

  function s1() {
    if (D) return (W?.(), R);
    let F0 = R.down();
    if (!F0.equals(R)) return F0;
    if (F) {
      let U1 = R.downLogicalLine();
      if (!U1.equals(R)) return U1;
    }
    return (W?.(), R);
  }

  function t1(F0) {
    switch (!0) {
      case F0.escape:
        return () => {
          return (c(), R);
        };
      case F0.leftArrow && (F0.ctrl || F0.meta || F0.fn):
        return () => R.prevWord();
      case F0.rightArrow && (F0.ctrl || F0.meta || F0.fn):
        return () => R.nextWord();
      case F0.backspace:
        return F0.meta ? () => R.deleteWordBefore() : () => R.backspace();
      case F0.delete:
        return F0.meta ? () => R.deleteToLineEnd() : () => R.del();
      case F0.ctrl:
        return a;
      case F0.home:
        return () => R.startOfLine();
      case F0.end:
        return () => R.endOfLine();
      case F0.pageDown:
        return () => R.endOfLine();
      case F0.pageUp:
        return () => R.startOfLine();
      case F0.meta:
        return Q1;
      case F0.return:
        return () => J1(F0);
      case F0.tab:
        return () => R;
      case F0.upArrow:
        return P1;
      case F0.downArrow:
        return s1;
      case F0.leftArrow:
        return () => R.left();
      case F0.rightArrow:
        return () => R.right();
      default:
        return function (U1) {
          switch (!0) {
            case U1 === '\x1B[H' || U1 === '\x1B[1~':
              return R.startOfLine();
            case U1 === '\x1B[F' || U1 === '\x1B[4~':
              return R.endOfLine();
            default:
              if (R.isAtStart() && wTA(U1))
                return R.insert(
                  oI(U1).replace(
                    /\r/g,
                    `
`
                  )
                ).left();
              return R.insert(
                oI(U1).replace(
                  /\r/g,
                  `
`
                )
              );
          }
        };
    }
  }

  function x0(F0, U1) {
    if (og.check(F0, U1) && H) {
      j();
      return;
    }
    let u1 = E ? E(F0, U1) : F0;
    if (u1 === '' && F0 !== '') return;
    if (!U1.backspace && !U1.delete && F0.includes('')) {
      let o1 = (F0.match(/\x7f/g) || []).length,
        K0 = R;
      for (let U0 = 0; U0 < o1; U0++) K0 = K0.backspace();
      if (!R.equals(K0)) {
        if (R.text !== K0.text) B(K0.text);
        O(K0.offset);
      }
      return;
    }
    let x1 = t1(U1)(u1);
    if (x1) {
      if (!R.equals(x1)) {
        if (R.text !== x1.text) B(x1.text);
        O(x1.offset);
      }
    }
  }
  return {
    onInput: x0,
    renderedZodReadonlylue: R.render(V, X, K),
    offset: L,
    setOffset: O,
  };
}

function pB(A, B, Q = 'foreground') {
  return Z => iq9(Z, A ? cEA(B)[A] : void 0, Q);
}

var themeContext = createContext({
  theme: null,
  setTheme: A => A,
  setPreviewTheme: A => A,
  savePreview: () => {},
  currentTheme: null,
});

function sB() {
  let { currentTheme: A, setTheme: B } = useContext(themeContext);
  return [A, B];
}

function _6(A) {
  let [B] = sB(),
    { isFocused: Q, filterFocusSequences: Z } = kTA(),
    G = qw1({
      value: A.value,
      onChange: A.onChange,
      onSubmit: A.onSubmit,
      onExit: A.onExit,
      onExitMessage: A.onExitMessage,
      onMessage: A.onMessage,
      onHistoryReset: A.onHistoryReset,
      onHistoryUp: A.onHistoryUp,
      onHistoryDown: A.onHistoryDown,
      focus: A.focus,
      mask: A.mask,
      multiline: A.multiline,
      cursorChar: A.showCursor ? ' ' : '',
      highlightPastedText: A.highlightPastedText,
      invert: Q ? styler.inverse : Y => Y,
      themeText: pB('text', B),
      columns: A.columns,
      onImagePaste: A.onImagePaste,
      disableCursorMovementForUpDownKeys: A.disableCursorMovementForUpDownKeys,
      externalOffset: A.cursorOffset,
      onOffsetChange: A.onChangeCursorOffset,
      inputFilter: Z,
    });
  return createElement(InputComponent, {
    inputState: G,
    terminalFocus: Q,
    shimmerLevel: A.shimmerLevel,
    ...A,
  });
}

export { _6 as InputConfigAdapter };