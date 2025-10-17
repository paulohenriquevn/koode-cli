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
import {
	fs,
} from './tools.js';
import {execSync} from 'node:child_process';


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
  return _TA.default.createElement(Mw1, {
    inputState: G,
    terminalFocus: Q,
    shimmerLevel: A.shimmerLevel,
    ...A,
  });
}