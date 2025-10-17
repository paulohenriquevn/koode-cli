Mapeamento Completo do Fluxo José CLI - Terminal → Input do Usuário

  1. INICIALIZAÇÃO DO SISTEMA (Entry Point)

  A. Execução Direct Script

  node jose-cli-code-original.tsx

  B. Entry Point Detection (linha 122519-122534)

  if (import.meta.url === `file://${process.argv[1]}`) {
    console.log('🚀 José CLI v1.0.115 - Sistema Completo Carregado');
    try {
      Fn5(); // ← PONTO DE ENTRADA PRINCIPAL
    } catch (error) {
      console.error('José CLI Error:', error.message);
      process.exit(1);
    }
  }

  2. FUNÇÃO PRINCIPAL Fn5() (linha 121216)

  A. Environment Setup

  async function Fn5() {
    // 1. Configuração de ambiente
    process.env.NoDefaultCurrentDirectoryInExePath = '1';
    REB(); // Setup de warnings

    // 2. Detecção de modo
    let A = process.argv.slice(2);
    let B = A.includes('-p') || A.includes('--print');
    let Q = A.some(J => J.startsWith('--sdk-url'));
    let Z = B || Q || !process.stdout.isTTY;

    // 3. Configuração de sessão
    setNonInteractiveSession(Z);
    Xn5(Z); // Set entrypoint
    setInteractive(!Z);
  }

  B. Signal Handlers

  process.on('exit', () => {
    Hn5(); // Cleanup cursor
  });
  process.on('SIGINT', () => {
    process.exit(0);
  });

  3. RENDERIZAÇÃO PRINCIPAL

  A. Sistema de Renderização I5 (linha 26804)

  I5 = HN9 // ← Sistema de renderização Ink principal

  B. Render Call Pattern

  let { unmount: G } = I5(
    k7.default.createElement(ComponentePrincipal, props),
    {
      exitOnCtrlC: true,
    }
  );

  4. SETUP DE COMPONENTES REACT

  A. Component Tree Structure

  s7 (Theme Provider)
  ├── ComponentePrincipal
  │   ├── Mw1 (Input Handler)
  │   │   ├── InputConfigAdapter (_6)
  │   │   │   ├── qw1 (Input State)
  │   │   │   └── RTA (Real-Time Adapter)
  │   │   └── Child Components
  │   └── Other UI Components

  5. SISTEMA DE INPUT - CAMADAS

  A. Camada 1: InputConfigAdapter (_6)

  function _6(A) {
    // 1. Hook de tema
    let [B] = sB();

    // 2. Hook de foco
    let { isFocused: Q, filterFocusSequences: Z } = kTA();

    // 3. Configuração completa
    let G = qw1({
      value: A.value,
      onChange: A.onChange,
      onSubmit: A.onSubmit,
      // ... todas as configurações
    });

    // 4. Renderização final
    return _TA.default.createElement(Mw1, {
      inputState: G,
      terminalFocus: Q,
      ...A,
    });
  }

  B. Camada 2: Mw1 (Input Handler)

  function Mw1({ inputState: A, children: B, terminalFocus: Q, ...Z }) {
    // 1. Extração de handlers
    let { onInput: G, renderedZodReadonlylue: Y } = A;

    // 2. Setup RTA (Real-Time Adapter)
    let { wrappedOnInput: I, isPasting: W } = RTA({
      onPaste: Z.onPaste,
      onInput: (H, D) => {
        if (W && D.return) return; // Bloqueia Enter durante paste
        G(H, D); // ← CAPTURA PRINCIPAL DO INPUT
      },
      onImagePaste: Z.onImagePaste,
    });
  }

  C. Camada 3: RTA (Real-Time Adapter)

  function RTA({ onPaste: A, onInput: B, onImagePaste: Q }) {
    // 1. Estado de paste
    let [Z, G] = useState({ chunks: [], timeoutId: null });
    let [Y, I] = useState(false); // isPasting

    // 2. Detecção de platform
    let F = useMemo(() => zB() === 'macos', []);

    // 3. Processamento de chunks em tempo real
    // 4. Detecção de paste vs digitação normal
    // 5. Handler de imagens
  }

  6. SISTEMA DE CAPTURA DE TECLADO

  A. Hook Base wN9/r0 (linha 26897)

  var wN9 = (A, B = {}) => {
    // 1. Captura de eventos de teclado raw
    // 2. Processamento de teclas especiais
    // 3. Mapeamento de sequências ANSI
    // 4. Filtering baseado em foco
  };
  var r0 = wN9; // Alias principal

  B. Event Processing Chain

  Tecla Pressionada
        ↓
  wN9/r0 (Raw Capture)
        ↓
  kTA() Focus Filter
        ↓
  RTA() Real-Time Adapter
        ↓
  Mw1() Input Handler
        ↓
  qw1() State Management
        ↓
  Application Logic

  7. FLUXO COMPLETO: TERMINAL → INPUT

  Sequência de Inicialização:

  1. #!/usr/bin/env node
  2. import.meta.url check
  3. Fn5() execution
  4. Environment setup
  5. I5() render call
  6. React component tree mounting
  7. _6() InputConfigAdapter creation
  8. qw1() state initialization
  9. Mw1() input handler setup
  10. RTA() real-time adapter activation
  11. wN9/r0() keyboard capture ready
  12. → USUÁRIO PODE INTERAGIR ←

  Fluxo de Input do Usuário:

  Usuário digita 'hello'
        ↓
  wN9() captura raw 'h', 'e', 'l', 'l', 'o'
        ↓
  kTA() filtra baseado em foco
        ↓
  RTA() detecta digitação normal (não paste)
        ↓
  Mw1() recebe onInput(char, keyData)
        ↓
  qw1() atualiza estado do input
        ↓
  onChange() callback para aplicação
        ↓
  Re-render com novo valor
        ↓
  Usuário vê 'hello' na tela

  Fluxo de Comando/Submit:

  Usuário pressiona Enter
        ↓
  wN9() captura { return: true }
        ↓
  RTA() verifica se não está em paste
        ↓
  Mw1() detecta onInput('', { return: true })
        ↓
  qw1() processa submit
        ↓
  onSubmit() callback executado
        ↓
  Comando enviado para agente José
        ↓
  Processamento de resposta
        ↓
  Atualização da UI

  Arquitetura em Camadas:

  ┌─────────────────────────────────────┐
  │           Terminal (Node.js)        │
  ├─────────────────────────────────────┤
  │        Entry Point (Fn5)            │
  ├─────────────────────────────────────┤
  │       Ink Renderer (I5/HN9)         │
  ├─────────────────────────────────────┤
  │       React Components Tree         │
  ├─────────────────────────────────────┤
  │    InputConfigAdapter (_6)          │
  ├─────────────────────────────────────┤
  │      Input Handler (Mw1)            │
  ├─────────────────────────────────────┤
  │   Real-Time Adapter (RTA)           │
  ├─────────────────────────────────────┤
  │   Keyboard Capture (wN9/r0)         │
  ├─────────────────────────────────────┤
  │        Raw TTY Events               │
  └─────────────────────────────────────┘

  O sistema José CLI utiliza uma arquitetura em camadas robusta que transforma eventos de teclado raw em interações de alto nível com agentes de IA, mantendo responsividade e suporte a operações
  complexas como paste de texto e imagens.
