Fluxo Detalhado José CLI: Terminal → Raw TTY Events

1. PROCESSO DE INICIALIZAÇÃO DO TERMINAL

A. Node.js Process Startup

# Comando do usuário

$ node jose-cli-code-original.tsx

# Node.js internals

1. Node.js V8 engine initialization
2. Event loop startup
3. TTY detection: process.stdout.isTTY, process.stdin.isTTY
4. Stream setup: stdin, stdout, stderr
5. Signal handlers registration

B. TTY Configuration Detection

// Environment detection (linha 2373)
terminal: detectTerminalType(),

function detectTerminalType() {
const { env } = process;

    // Terminal específicos
    if (env.TERM_PROGRAM === 'Apple_Terminal') return 'Apple_Terminal';
    if (env.TERM_PROGRAM === 'vscode') return 'VSCode';
    if (env.TERM_PROGRAM === 'iTerm.app') return 'iTerm2';
    if (env.WT_SESSION) return 'Windows_Terminal';

    // Generic terminals
    if (env.TERM === 'xterm-256color') return 'XTerm';
    if (env.TERM === 'screen') return 'Screen/Tmux';

    return 'Unknown';

}

2. STDIN/TTY SETUP PROCESS

A. Process Streams Initialization

// Node.js internal process setup
process.stdin.setEncoding('utf8');
process.stdin.setRawMode(false); // Initially buffered mode

// TTY capabilities check
const isInteractive = process.stdin.isTTY && process.stdout.isTTY;
const supportsColors = process.stdout.hasColors && process.stdout.hasColors();
const supportsUnicode = process.env.LANG && process.env.LANG.includes('UTF-8');

B. Ink Framework TTY Setup

// I5 = HN9 render system setup
let { stdin, setRawMode, internal_exitOnCtrlC, internal_eventEmitter } = ok();

// Ink's TTY context setup
const TTYContext = {
stdin: process.stdin,
internal_eventEmitter: new EventEmitter(),
setRawMode(enabled) {
if (process.stdin.isTTY) {
process.stdin.setRawMode(enabled);
}
},
isRawModeSupported: process.stdin.isTTY,
internal_exitOnCtrlC: true,
};

3. RAW MODE ACTIVATION

A. setRawMode(true) Process

// wN9 hook activation (linha 26897)
useEffect(() => {
if (B.isActive === false) return;

    return (
      Z(true), // ← setRawMode(true) CALLED HERE
      () => {
        Z(false); // Cleanup: setRawMode(false)
      }
    );

}, [B.isActive, Z]);

B. Raw Mode Effects

// Before Raw Mode (Line Buffered)
User types: "hello[Enter]"
Node receives: "hello\n" (when Enter pressed)

// After Raw Mode (Character by Character)
User types: "hello"
Node receives: "h", "e", "l", "l", "o" (individually)
User presses: "Enter"
Node receives: "\r" or "\n" (immediately)

4. TTY EVENT STREAM PROCESSING

A. Low-Level Event Capture

// Node.js streams level
process.stdin.on('data', (chunk) => {
// Raw buffer data from TTY
// chunk = Buffer or String depending on encoding
});

process.stdin.on('keypress', (str, key) => {
// Parsed key events (if keypress module loaded)
// key = { name: 'a', ctrl: false, meta: false, shift: false }
});

B. Ink's Event Processing

// Internal Ink event processing
let I = W => {
// Raw key processing
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
};

    // Character extraction
    let X = W.ctrl ? W.name : W.sequence;
    if (X === undefined) return;

    // Special key filtering
    if (W.name && kNA.includes(W.name)) X = '';

    // ANSI escape sequence processing
    if (X.startsWith('\x1B')) X = X.slice(1);

    // Shift detection
    if (X.length === 1 && typeof X[0] === 'string' && X[0].toUpperCase() === X[0]) {
      J.shift = true;
    }

};

5. ANSI ESCAPE SEQUENCE MAPPING

A. Special Keys Translation Table (linha 373-442)

var yNA = {
'OP': 'f1', 'OQ': 'f2', 'OR': 'f3', 'OS': 'f4',
'[11~': 'f1', '[12~': 'f2', '[13~': 'f3', '[14~': 'f4',
'[A': 'up', '[B': 'down', '[C': 'right', '[D': 'left',
'[E': 'clear', '[F': 'end', '[H': 'home',
'OA': 'up', 'OB': 'down', 'OC': 'right', 'OD': 'left',
'[1~': 'home', '[2~': 'insert', '[3~': 'delete', '[4~': 'end',
'[5~': 'pageup', '[6~': 'pagedown', '[7~': 'home', '[8~': 'end',
'[Z': 'tab',
};

B. Raw Sequence Examples

User Action → Raw TTY Bytes → Processed Key
──────────────────────────────────────────────────────────
Press 'a' → 0x61 → { sequence: 'a', name: undefined }
Press 'A' (Shift+a) → 0x41 → { sequence: 'A', name: undefined, shift: true }
Press Ctrl+C → 0x03 → { sequence: '\x03', name: 'c', ctrl: true }
Press Enter → 0x0D or 0x0A → { sequence: '\r', name: 'return' }
Press Escape → 0x1B → { sequence: '\x1B', name: 'escape' }
Press Up Arrow → 0x1B5B41 (\x1B[A) → { sequence: '\x1B[A', name: 'up' }
Press F1 → 0x1B4F50 (\x1BOP) → { sequence: '\x1BOP', name: 'f1' }
Press Alt+a → 0x1B61 (\x1Ba) → { sequence: '\x1Ba', name: 'a', meta: true }

6. PLATFORM-SPECIFIC TTY DIFFERENCES

A. Terminal Detection & Behavior

// macOS Terminal specifics
if (process.env.TERM_PROGRAM === 'Apple_Terminal') {
// Apple Terminal sends different sequences
// Option key handling differs
// Unicode support variations
}

// Windows Terminal (WSL/PowerShell)
if (process.env.WT_SESSION) {
// Windows Console API differences
// Different ANSI support levels
// Clipboard integration variations
}

// VSCode Integrated Terminal
if (process.env.TERM_PROGRAM === 'vscode') {
// VSCode-specific keybindings
// Different paste behavior
// Focus handling differences
}

B. Encoding & Character Processing

// UTF-8 Character Handling
User types: "café"
Raw bytes: [0x63, 0x61, 0x66, 0xC3, 0xA9] // UTF-8 encoded
Processed: ['c', 'a', 'f', 'é'] // Decoded characters

// Multi-byte Sequence Processing
User types: "🚀" (rocket emoji)
Raw bytes: [0xF0, 0x9F, 0x9A, 0x80] // UTF-8 4-byte sequence
Processed: ['🚀'] // Single emoji character

// Combining Characters
User types: "é" (e + combining acute)
Raw bytes: [0x65, 0xCC, 0x81] // e + combining acute
Processed: ['é'] // Combined character

7. EVENT PROPAGATION CHAIN

A. Complete Flow: Hardware → Application

┌─────────────────────────────────────┐
│ Hardware Keyboard │ ← User presses key
├─────────────────────────────────────┤
│ OS Keyboard Driver │ ← Scancode → Virtual keycode
├─────────────────────────────────────┤
│ Terminal Emulator │ ← Keycode → ANSI sequences
├─────────────────────────────────────┤
│ Operating System │ ← Process stdin pipe
├─────────────────────────────────────┤
│ Node.js Runtime │ ← libuv event loop
├─────────────────────────────────────┤
│ TTY/Stream Layer │ ← Raw bytes → UTF-8 strings
├─────────────────────────────────────┤
│ Ink Event Processing │ ← String → Key objects
├─────────────────────────────────────┤
│ wN9/r0 Hook System │ ← Key objects → Filtered events
├─────────────────────────────────────┤
│ RTA Adapter │ ← Events → Chunked processing
├─────────────────────────────────────┤
│ Mw1 Input Handler │ ← Processed input → State
├─────────────────────────────────────┤
│ Application Logic (José) │ ← Final user input
└─────────────────────────────────────┘

B. Timing & Performance

// Typical latency breakdown
Hardware → OS: ~1-2ms
OS → Terminal: ~1-3ms
Terminal → Node.js: ~1-5ms
Node.js → Ink: ~0.5-1ms
Ink → wN9: ~0.1-0.5ms
wN9 → RTA: ~0.1-0.5ms
RTA → Mw1: ~0.1-0.5ms
Total Latency: ~4-12ms (under normal conditions)

8. RAW TTY EVENTS - FINAL LAYER

A. Node.js libuv Integration

// Node.js internal (libuv)
uv_tty_t* tty_handle;
uv_read_start((uv_stream_t*)tty_handle, on_alloc, on_read);

// on_read callback receives raw bytes
void on_read(uv_stream_t* stream, ssize_t nread, const uv_buf_t* buf) {
// buf->base contains raw TTY data
// nread contains number of bytes
// This data flows into Node.js JavaScript layer
}

B. Raw Event Examples

User Action: Types "hello" + Enter

Raw TTY Byte Stream:
0x68 0x65 0x6C 0x6C 0x6F 0x0D

Processed by Node.js:
{ data: "hello\r", encoding: "utf8" }

Processed by Ink:
[
{ sequence: "h", name: undefined },
{ sequence: "e", name: undefined },
{ sequence: "l", name: undefined },
{ sequence: "l", name: undefined },
{ sequence: "o", name: undefined },
{ sequence: "\r", name: "return" }
]

Final wN9 Events:
"h" → onInput("h", { /_ key data _/ })
"e" → onInput("e", { /_ key data _/ })
"l" → onInput("l", { /_ key data _/ })
"l" → onInput("l", { /_ key data _/ })
"o" → onInput("o", { /_ key data _/ })
"\r" → onInput("", { return: true })

Este fluxo detalhado mostra como o José CLI transforma eventos de hardware de baixo nível em interações de usuário de alto nível, mantendo responsividade e precisão através de múltiplas camadas de
processamento otimizado.
