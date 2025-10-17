- JSX é syntactic sugar para React.createElement()
- O processo de converter createElement para </> é chamado de "JSX transformation" ou "JSX conversion"
- O processo inverso (JSX para createElement) é feito pelo "JSX transpiler" (Babel/TypeScript)

Termos técnicos relacionados:

1. JSX Syntax: A sintaxe <Component />
2. React.createElement API: A função baixo nível createElement(type, props, children)
3. JSX Transpilation: Conversão automática de JSX para createElement pelo compilador
4. Syntactic Sugar: JSX é açúcar sintático que torna o código mais legível

Exemplo da transformação:
// JSX (syntactic sugar)
<Box flexDirection="column">
<Text>Hello</Text>
</Box>

// React.createElement (baixo nível)
createElement(Box, { flexDirection: 'column' },
createElement(Text, null, 'Hello')
)

Então o que você está pedindo é uma "JSX transformation" do componente!
