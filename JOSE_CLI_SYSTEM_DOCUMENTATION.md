# José CLI System Documentation

## System Overview

The José CLI is a sophisticated AI-powered coding assistant that provides an interactive terminal interface for developers. Built with React/Ink for terminal UI and integrated with OpenRouter for LLM access, it creates a seamless bridge between natural language interaction and code execution.

## Architecture Components

### 1. Entry Point & System Initialization

**File**: `jose-cli-code-original.tsx`  
**Main Function**: `Fn5()` (line 121216)

```typescript
function Fn5() {
	// System initialization
	// Sets up React render environment
	// Configures terminal settings
	// Initializes input handlers
}
```

**Execution Flow**:

1. `#!/usr/bin/env node` - System startup via terminal
2. `Fn5()` invocation - Main entry point
3. React/Ink environment setup
4. Terminal configuration for raw input mode
5. Component tree rendering

### 2. Input System Architecture

#### 2.1 InputConfigAdapter - `_6` Component

**Location**: `jose-cli-code-original.tsx`  
**Purpose**: Configuration adapter for input handling

```typescript
function _6(A) {
	// Input configuration management
	// Handles different input modes
	// Manages state transitions
	// Configures event handlers
}
```

**Responsibilities**:

- Input mode configuration (insert, command, visual)
- Event handler registration
- State management for input contexts
- Integration with terminal raw mode

#### 2.2 Main Input Handler - `Mw1` Component

**Location**: `jose-cli-code-original.tsx` (line 31209)  
**Purpose**: Primary input processing engine

```typescript
function Mw1() {
	// Core input processing
	// Character-by-character handling
	// Command parsing and validation
	// State management for user interactions
}
```

**Key Features**:

- **Real-time Input Processing**: Handles each keystroke immediately
- **Command Recognition**: Identifies user intents and commands
- **State Management**: Maintains conversation context and history
- **Validation**: Ensures input integrity before processing

#### 2.3 Real-Time Input Adapter - `RTA` Component

**Location**: `jose-cli-code-original.tsx` (line 30508)  
**Purpose**: Real-time event processing

```typescript
function RTA() {
	// Real-time event streaming
	// ANSI escape sequence processing
	// Terminal event normalization
	// Input buffering and optimization
}
```

### 3. Terminal Event Processing

#### 3.1 Raw TTY Mode Configuration

**Process**:

1. **Terminal Initialization**: Switch to raw mode for direct key capture
2. **ANSI Processing**: Handle escape sequences for special keys
3. **Event Normalization**: Convert raw bytes to structured events

**Key Sequences Handled**:

```
Enter: \r (0x0D) or \n (0x0A)
Backspace: \x7F (127) or \b (0x08)
Arrow Keys: \x1B[A (up), \x1B[B (down), \x1B[C (right), \x1B[D (left)
Ctrl+C: \x03 (ETX - End of Text)
Ctrl+D: \x04 (EOT - End of Transmission)
Tab: \t (0x09)
Escape: \x1B (27)
```

#### 3.2 Event Flow Architecture

```
Terminal Input → Raw TTY Events → ANSI Parser → Event Normalizer → Input Handler
```

**Detailed Flow**:

1. **Raw Events**: Direct terminal byte stream
2. **ANSI Parser**: Processes escape sequences
3. **Event Normalizer**: Creates structured input events
4. **Input Handler**: Routes to appropriate component

### 4. User Interface Components

#### 4.1 ToolSelector Component

**File**: `source/ToolSelector.tsx`  
**Purpose**: Tool selection interface for agent capabilities

```tsx
function ToolSelector({tools, initialTools, onComplete, onCancel}) {
	// Multi-select tool interface
	// Keyboard navigation (↑↓ arrows)
	// Space to toggle selection
	// Enter to confirm, Esc to cancel
}
```

**Features**:

- Visual selection indicators
- Search/filter capabilities
- Batch selection operations
- Keyboard-only navigation

#### 4.2 SelectTools Component

**File**: `source/SelectTools.tsx`  
**Purpose**: Wizard step for tool selection

```tsx
function SelectTools({tools}) {
	// Wizard integration component
	// Manages tool selection state
	// Handles navigation between steps
	// Persists selections in wizard context
}
```

#### 4.3 Color Selector - `Yg1` Component

**File**: `source/Component.tsx`  
**Purpose**: Color theme selection interface

```tsx
function Yg1() {
	// Color theme selection
	// Visual preview of themes
	// Real-time theme application
	// Persistence of user preferences
}
```

### 5. Agent System Integration

#### 5.1 Agent Selection Process

**Flow**:

1. User input captured by `Mw1`
2. Intent analysis determines agent requirements
3. Tool selection via `ToolSelector`
4. Agent instantiation with selected capabilities
5. Context preparation for LLM

#### 5.2 Context Management

**Components**:

- **Session Context**: Maintains conversation history
- **Project Context**: Tracks current working directory and files
- **Tool Context**: Available capabilities and permissions
- **User Preferences**: Themes, settings, and configurations

### 6. LLM Integration via OpenRouter

#### 6.1 OpenRouter Configuration

**Location**: `jose-cli-code-original.tsx` (lines 359-604)

```typescript
const openRouterConfig = {
	baseURL: 'https://openrouter.ai/api/v1',
	apiKey: process.env.OPENROUTER_API_KEY,
	defaultModel: 'anthropic/claude-3.5-sonnet',
	fallbackModels: ['openai/gpt-4o', 'meta-llama/llama-3.1-405b'],
};
```

#### 6.2 Request Processing Pipeline

**Flow**:

1. **Input Validation**: Verify user input completeness
2. **Context Assembly**: Gather relevant context (files, history, tools)
3. **Prompt Construction**: Build structured prompt for LLM
4. **API Request**: Send to OpenRouter with model selection
5. **Response Processing**: Parse and validate LLM response
6. **Action Execution**: Execute any tool calls or commands
7. **UI Update**: Display results to user

#### 6.3 Streaming Response Handling

```typescript
async function processLLMStream(response) {
	// Handle streaming responses
	// Real-time UI updates
	// Token-by-token processing
	// Error handling and recovery
}
```

### 7. Tool Execution System

#### 7.1 Tool Categories

**Available Tools**:

- **File Operations**: Read, write, edit, delete files
- **Code Analysis**: Parse, analyze, and understand code
- **Terminal Commands**: Execute system commands
- **Git Operations**: Version control interactions
- **Search & Replace**: Pattern-based code modifications

#### 7.2 Permission System

**Security Model**:

- **Tool Permissions**: Granular control over tool access
- **File System Permissions**: Restricted access to project directories
- **Network Permissions**: Controlled external API access
- **Execution Permissions**: Safe command execution with sandboxing

#### 7.3 Execution Flow

```
User Intent → Tool Selection → Permission Check → Execution → Result Validation → UI Update
```

### 8. Error Handling & Recovery

#### 8.1 Input Error Handling

**Strategies**:

- **Validation**: Real-time input validation
- **Correction**: Auto-correction of common mistakes
- **Suggestion**: Intelligent error suggestions
- **Recovery**: Graceful fallback mechanisms

#### 8.2 LLM Error Handling

**Error Types**:

- **API Errors**: Network, authentication, rate limits
- **Model Errors**: Invalid responses, timeouts
- **Context Errors**: Token limits, context overflow
- **Tool Errors**: Execution failures, permission denials

#### 8.3 Recovery Mechanisms

```typescript
async function handleError(error, context) {
	// Error classification
	// Recovery strategy selection
	// User notification
	// Fallback execution
}
```

### 9. Performance Optimizations

#### 9.1 Input Processing Optimizations

- **Debouncing**: Reduce excessive event processing
- **Buffering**: Batch input events for efficiency
- **Caching**: Cache frequently used computations
- **Lazy Loading**: Load components on demand

#### 9.2 Memory Management

- **Context Pruning**: Remove old conversation history
- **Tool Cleanup**: Dispose of unused tool instances
- **Cache Management**: LRU cache for API responses
- **Resource Monitoring**: Track memory usage

### 10. Configuration & Customization

#### 10.1 User Configuration

**Configuration File**: `~/.koode-cli/config.json`

```json
{
	"theme": "dark",
	"defaultModel": "claude-3.5-sonnet",
	"toolPermissions": {
		"fileSystem": true,
		"network": false,
		"terminal": true
	},
	"shortcuts": {
		"quickChat": "Ctrl+Enter",
		"toolSelector": "Ctrl+T",
		"exit": "Ctrl+C"
	}
}
```

#### 10.2 Project Configuration

**Configuration File**: `.koode/project.json`

```json
{
	"projectType": "typescript",
	"includePaths": ["src/", "lib/"],
	"excludePaths": ["node_modules/", "dist/"],
	"customTools": ["./tools/custom-analyzer.js"],
	"preferences": {
		"codeStyle": "standard",
		"testFramework": "vitest"
	}
}
```

### 11. Development Workflow Integration

#### 11.1 IDE Integration

**Features**:

- **VSCode Extension**: Direct integration with editor
- **Language Server**: Code completion and analysis
- **Debugging Support**: Integrated debugging capabilities
- **Live Sync**: Real-time file synchronization

#### 11.2 CI/CD Integration

**Capabilities**:

- **Pre-commit Hooks**: Automated code review
- **Build Integration**: Continuous analysis during builds
- **Test Generation**: Automated test creation
- **Documentation**: Auto-generated documentation

### 12. Security Considerations

#### 12.1 Input Sanitization

- **Command Injection Prevention**: Escape shell commands
- **Path Traversal Protection**: Validate file paths
- **Code Injection Prevention**: Sanitize code inputs
- **XSS Protection**: Escape terminal output

#### 12.2 API Security

- **Key Management**: Secure storage of API keys
- **Rate Limiting**: Prevent API abuse
- **Request Validation**: Validate all API requests
- **Response Sanitization**: Clean API responses

### 13. Testing & Quality Assurance

#### 13.1 Testing Strategy

**Test Types**:

- **Unit Tests**: Individual component testing
- **Integration Tests**: Component interaction testing
- **E2E Tests**: Full workflow testing
- **Performance Tests**: Speed and memory testing

#### 13.2 Quality Metrics

**Monitoring**:

- **Response Time**: LLM and tool execution times
- **Accuracy**: Tool execution success rates
- **User Satisfaction**: Feedback and usage metrics
- **System Stability**: Error rates and crashes

### 14. Future Enhancements

#### 14.1 Planned Features

- **Multi-language Support**: Support for additional programming languages
- **Custom Agents**: User-defined specialized agents
- **Plugin System**: Extensible architecture for third-party tools
- **Collaboration**: Multi-user development support

#### 14.2 Architecture Evolution

- **Microservices**: Split into specialized services
- **Distributed Processing**: Scale across multiple machines
- **Advanced AI**: Integration with newer LLM models
- **Mobile Support**: Cross-platform terminal applications

## Conclusion

The José CLI system represents a sophisticated integration of terminal UI, AI processing, and development tools. Its modular architecture allows for flexible extension while maintaining security and performance. The system's strength lies in its seamless user experience, combining the power of modern LLMs with practical development workflows.

The input system's real-time processing, combined with intelligent tool selection and execution, creates an intuitive interface that feels natural to developers while providing powerful AI assistance capabilities.
