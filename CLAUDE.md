# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

koode-cli is the foundation for building an AI-powered coding assistant CLI tool, inspired by and aimed at creating functionality similar to Koode Code. Currently it's a basic Node.js CLI application built with TypeScript and React using the Ink framework for terminal UI rendering.

**Current State**: Basic scaffolded project from create-ink-app with "Hello, name" greeting functionality
**Goal**: Develop into a full-featured agentic coding tool that can help developers with tasks like:
- Building features from natural language descriptions
- Debugging and fixing code issues
- Navigating and understanding codebases
- Automating development tasks
- Supporting extensible plugins and subagents

The project aims to create a terminal-native AI assistant that integrates with existing developer workflows.

## Key Technologies

- **TypeScript**: Primary language with strict configuration
- **React + Ink**: Terminal UI framework for building command-line interfaces (React for CLIs)
- **Commander**: CLI framework for building command-line interfaces
- **Meow**: CLI argument parsing and help text generation
- **ESM**: Project uses ES modules (`"type": "module"`)
- **OpenAI**: AI integration for powered features
- **Winston**: Logging framework
- **Zod**: Schema validation and parsing
- **Ora**: Terminal spinners and progress indicators

### React + Ink Framework Deep Dive

Ink is "React for CLIs" - it provides the same component-based UI building experience that React offers in the browser, but for command-line applications. It uses Yoga (Facebook's Flexbox layout engine) to build layouts in the terminal using familiar CSS-like properties.

**Key Insight**: Every element in Ink is a Flexbox container by default (like having `display: flex` on every `<div>`).

### Commander.js Framework Deep Dive

Commander.js is "the complete solution for Node.js command-line interfaces" - it handles argument parsing, option validation, subcommand routing, and automatic help generation. This is the perfect complement to Ink's UI capabilities.

**Key Insight**: Commander handles the CLI logic and routing, while Ink handles the rich interactive UI. This separation creates a powerful, maintainable architecture.

#### Core Commander.js Concepts
- **Commands & Subcommands**: Hierarchical command structure (`koode chat`, `koode analyze <file>`)
- **Options & Arguments**: Flexible parsing with validation (`--model <type>`, `<files...>`)
- **Action Handlers**: Functions that execute when commands are invoked
- **Automatic Help**: Generated help text and error handling
- **Lifecycle Hooks**: Pre/post action callbacks for validation and cleanup

#### Core Ink Components
- **`<Box>`**: Layout container with full Flexbox support (margin, padding, borders, colors)
- **`<Text>`**: Text rendering with colors, styles (bold, italic, underline), and text wrapping
- **`<Static>`**: Permanent content that doesn't rerender (perfect for logs, completed tasks)
- **`<Spacer>`**: Flexible space that expands to fill available space
- **`<Newline>`**: Add line breaks within Text components
- **`<Transform>`**: Transform string output before rendering

#### Essential Ink Hooks
- **`useInput(handler)`**: Capture user keyboard input (arrows, enter, custom keys)
- **`useApp()`**: Access app lifecycle methods (exit, unmount)
- **`useFocus()`**: Create focusable components with Tab navigation
- **`useStdout/useStderr()`**: Direct access to output streams
- **`useFocusManager()`**: Programmatically control focus between components

#### Commander + Ink Integration Patterns

**Hybrid Architecture**: Commander routes commands → Ink renders rich UI

```tsx
import { Command } from 'commander';
import { render } from 'ink';

const program = new Command();

program.command('chat')
  .option('-m, --model <type>', 'AI model to use', 'gpt-4')
  .action((options) => {
    // Commander parses, Ink renders
    const ChatApp = () => <ChatInterface options={options} />;
    render(<ChatApp />);
  });

await program.parseAsync();
```

#### Real-World Patterns for AI CLI

1. **Interactive Chat Interface**: Commander routes to chat command → Ink renders chat UI with `useInput`
2. **Command Execution Display**: Commander validates args → Ink shows `<Static>` logs + dynamic progress
3. **File Tree Navigation**: Commander handles file arguments → Ink renders focusable tree with `useFocus`
4. **Progress & Status**: Commander manages async operations → Ink displays real-time progress
5. **Multi-pane Layouts**: Commander routes to dashboard → Ink renders complex Flexbox layouts

#### Recommended Command Structure for AI CLI

```bash
koode chat [options]                    # Interactive AI conversation
koode analyze <file|directory>          # Code analysis with AI  
koode generate <description>            # Generate code from prompt
koode fix <files...>                    # Auto-fix issues in files
koode explain <code|file>               # Explain code functionality
koode refactor <target> [options]       # Intelligent refactoring
koode dashboard                         # Project overview UI
```

## Development Commands

```bash
# Build the project (compiles TypeScript to dist/)
npm run build

# Development mode with watch
npm run dev

# Run all tests and linting
npm test

# Development testing
npm run test:watch   # Run tests in watch mode
npm run test:ui      # Run tests with UI

# Individual commands from test script:
prettier --check .   # Code formatting check
xo                  # ESLint with TypeScript support
vitest run          # Test runner
```

## Architecture

### Source Structure

- `source/cli.tsx` - Entry point with CLI argument parsing using meow
- `source/app.tsx` - Main React component that renders the terminal UI
- `app.test.tsx` - Vitest tests using ink-testing-library

### Build Process

- TypeScript compiles from `source/` to `dist/`
- Main executable is `dist/cli.js` (specified in package.json bin field)
- Uses `@sindresorhus/tsconfig` for TypeScript configuration

### Testing Setup

- Vitest test runner with jsdom environment for React component testing
- Ink testing library for component testing
- Tests compare rendered terminal output
- Supports watch mode and UI mode for development

### Code Quality

- **XO (ESLint)** with React extensions and Prettier integration
- **Prettier** with `@vdemedes/prettier-config`
- **Vitest** for testing with jsdom environment
- **Ink Testing Library** for React component testing
- React prop-types disabled in favor of TypeScript
- Ignores `docs/` directory from linting

## Available Dependencies

The project includes these key libraries for development:

### Core Infrastructure
- **commander**: Advanced CLI framework with subcommands
- **meow**: Simple CLI argument parsing
- **ora**: Terminal spinners and loading indicators
- **boxen**: Create boxes in terminal output
- **chalk**: Terminal string styling (dev dependency)

### AI and Data Processing
- **openai**: OpenAI API integration for AI features
- **zod**: Runtime type validation and schema parsing
- **ajv**: JSON schema validation
- **lodash-es**: Utility functions

### System Integration
- **cross-spawn**: Cross-platform process spawning
- **spawn-rx**: Reactive process spawning
- **shell-quote**: Shell command escaping
- **which**: Cross-platform executable detection
- **is-online**: Network connectivity detection

### File and Stream Processing
- **globby**: File pattern matching
- **ignore**: .gitignore-style file filtering
- **combined-stream**: Stream combination utilities
- **lru-cache**: Memory-efficient caching

### Development Tools
- **winston**: Structured logging
- **vitest**: Fast testing framework
- **ink-testing-library**: React component testing for terminal

### Useful Ink Ecosystem Libraries
- **ink-text-input**: Text input components
- **ink-select-input**: Dropdown/select components  
- **ink-spinner**: Loading spinners
- **ink-progress-bar**: Progress indicators
- **ink-table**: Data tables
- **ink-link**: Clickable terminal links
- **ink-gradient**: Gradient text effects

## Development Philosophy

This project follows a foundation-first approach:
- Start with solid CLI infrastructure using proven tools (Ink, TypeScript, Vitest)
- Build incrementally towards AI-powered features using OpenAI integration
- Maintain terminal-native UX principles with interactive prompts and visual feedback
- Design for extensibility with modular architecture and plugin support
- Leverage existing ecosystem tools for file processing, validation, and system integration

### 95% Confidence Rule

- ✅ **MUST**: 95%+ certainty before implementing
- ❌ **NEVER**: Assume requirements or proceed without validation


### Core Development Principles

All agents follow these **non-negotiable rules**:

#### 95% Confidence Rule

- **MUST**: Have 95%+ certainty before proceeding with ANY implementation
- **MUST**: Ask questions until absolute certainty about requirements
- **NEVER**: Assume requirements or make speculative interpretations

#### Evidence-Based Development

- **MUST**: Use Read/LS/Bash tools for direct codebase analysis
- **MUST**: Base decisions on actual code, not assumptions
- **NEVER**: Proceed without verification of current state

#### Vertical Slice Methodology

- **MUST**: Implement complete slices
- **MUST**: Ensure end-to-end functionality
- **NEVER**: Implement partial horizontal layers

## Ink Development Guidelines for Junior Developers

### Basic Ink Component Structure

```tsx
import React from 'react';
import {render, Box, Text, useInput} from 'ink';

const MyComponent = () => {
  useInput((input, key) => {
    if (input === 'q') {
      process.exit(0);
    }
  });

  return (
    <Box flexDirection="column" padding={1}>
      <Text color="green">Hello from Ink!</Text>
      <Text dimColor>Press 'q' to quit</Text>
    </Box>
  );
};

render(<MyComponent />);
```

### Common Ink Patterns

#### 1. Interactive Input Handler
```tsx
const [userInput, setUserInput] = useState('');

useInput((input, key) => {
  if (key.return) {
    // Process the input
    console.log('User entered:', userInput);
    setUserInput('');
  } else if (key.backspace) {
    setUserInput(prev => prev.slice(0, -1));
  } else {
    setUserInput(prev => prev + input);
  }
});
```

#### 2. Static + Dynamic Content Pattern
```tsx
<Box flexDirection="column">
  {/* Static content that doesn't rerender */}
  <Static items={completedTasks}>
    {task => <Text key={task.id}>✓ {task.name}</Text>}
  </Static>
  
  {/* Dynamic content that updates */}
  <Box marginTop={1}>
    <Text>Current task: {currentTask}</Text>
  </Box>
</Box>
```

#### 3. Focusable Navigation
```tsx
const {isFocused} = useFocus();

return (
  <Box borderStyle={isFocused ? 'round' : undefined}>
    <Text color={isFocused ? 'cyan' : 'white'}>
      {isFocused ? '> ' : '  '}Menu Item
    </Text>
  </Box>
);
```

### Layout Best Practices

1. **Use `<Box>` for all layout needs** - it's your CSS Flexbox equivalent
2. **Wrap all text in `<Text>`** - plain strings won't render
3. **Think mobile-first** - terminal space is limited
4. **Use `<Static>` for logs/history** - prevents performance issues
5. **Handle keyboard gracefully** - always provide exit mechanisms

### Testing Ink Components

```tsx
import {render} from 'ink-testing-library';

const {lastFrame} = render(<MyComponent />);
expect(lastFrame()).toContain('Hello from Ink!');
```

## Commander.js Development Guidelines for Junior Developers

### Basic Command Structure

```tsx
import { Command } from 'commander';

const program = new Command();

program
  .name('koode')
  .description('AI-powered coding assistant')
  .version('0.1.0');

// Simple command
program.command('chat')
  .description('Start AI chat session')
  .option('-m, --model <type>', 'AI model', 'gpt-4')
  .action((options) => {
    console.log(`Starting chat with ${options.model}`);
  });

program.parse();
```

### Common Commander Patterns

#### 1. File Processing Commands
```tsx
program.command('analyze')
  .argument('<file>', 'file to analyze')
  .option('-d, --depth <number>', 'analysis depth', '3')
  .action((file, options) => {
    analyzeFile(file, { depth: parseInt(options.depth) });
  });
```

#### 2. Variadic Arguments (Multiple Files)
```tsx
program.command('fix')
  .argument('<files...>', 'files to fix')
  .option('--auto', 'auto-apply fixes')
  .action((files, options) => {
    files.forEach(file => fixFile(file, options.auto));
  });
```

#### 3. Required vs Optional Options
```tsx
program.command('deploy')
  .requiredOption('--api-key <key>', 'OpenAI API key')
  .option('--cache', 'enable caching', false)
  .action((options) => {
    // options.apiKey is guaranteed to exist
    deploy(options.apiKey, options.cache);
  });
```

#### 4. Advanced Option Processing
```tsx
function parseContext(value, previous) {
  return previous.concat([value]);
}

program.command('generate')
  .option('-c, --context <paths...>', 'context files', parseContext, [])
  .option('--model <type>', 'AI model')
    .choices(['gpt-4', 'gpt-3.5-turbo', 'claude'])
    .default('gpt-4')
  .action((options) => {
    generateCode(options.context, options.model);
  });
```

#### 5. Lifecycle Hooks for Validation
```tsx
program
  .hook('preAction', (thisCommand, actionCommand) => {
    // Validate environment before any command runs
    if (!process.env.OPENAI_API_KEY && !actionCommand.opts().apiKey) {
      console.error('Error: OpenAI API key required');
      process.exit(1);
    }
  })
  .hook('postAction', (thisCommand, actionCommand) => {
    // Cleanup or logging after command completes
    console.log(`Command ${actionCommand.name()} completed`);
  });
```

### Commander + Ink Integration Best Practices

1. **Commander for Routing**: Use Commander to parse arguments and route to appropriate functionality
2. **Ink for UI**: Use Ink to render rich, interactive interfaces
3. **Separation of Concerns**: Keep CLI logic in Commander actions, UI logic in Ink components
4. **Error Handling**: Use Commander's built-in error handling for validation
5. **Help Generation**: Leverage Commander's automatic help system

### Testing Commander Commands

```tsx
// Test command parsing
const program = new Command();
program.command('test').action((options) => {
  // Command logic here
});

// Mock process.argv for testing
program.parse(['node', 'script.js', 'test'], { from: 'node' });
```