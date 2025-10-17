// Real Application State Management System
// Manages actual application status: directories, configurations, session state

import { readFileSync, existsSync, statSync } from 'fs';
import { join, resolve, basename, extname } from 'path';
import { homedir } from 'os';
import { status, DevToolCategory } from './DevTools.js';

// Core application state interfaces
export interface WorkspaceState {
  currentDirectory: string;
  projectRoot: string | null;
  allowedDirectories: string[];
  projectType: ProjectType | null;
  projectName: string | null;
  detectedLanguages: string[];
  packageManager: PackageManager | null;
  gitRepository: boolean;
}

export interface ConfigurationState {
  apiKey: string | null;
  currentModel: string;
  temperature: number;
  maxTokens: number;
  userPreferences: UserPreferences;
  configPath: string;
  isConfigured: boolean;
}

export interface SessionState {
  sessionId: string;
  isInteractive: boolean;
  isNonInteractive: boolean;
  clientType: ClientType;
  startTime: number;
  lastInteractionTime: number;
  conversationHistory: ConversationEntry[];
  currentContext: string | null;
}

export interface ToolsState {
  availableTools: ToolDefinition[];
  enabledTools: string[];
  toolPermissions: ToolPermissionContext;
  lastUsedTool: string | null;
  toolExecutionHistory: ToolExecution[];
}

export interface ProjectState {
  hasPackageJson: boolean;
  hasTsConfig: boolean;
  hasGitIgnore: boolean;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  scripts: Record<string, string>;
  mainFiles: string[];
  testFiles: string[];
  configFiles: string[];
}

// Supporting types
export type ProjectType = 'typescript' | 'javascript' | 'react' | 'nextjs' | 'vue' | 'angular' | 'nodejs' | 'python' | 'rust' | 'go' | 'unknown';
export type PackageManager = 'npm' | 'yarn' | 'pnpm' | 'bun';
export type ClientType = 'cli' | 'sdk-cli' | 'sdk-typescript' | 'sdk-python' | 'github-action';

export interface UserPreferences {
  theme: 'dark' | 'light' | 'auto';
  verboseMode: boolean;
  debugMode: boolean;
  autoSave: boolean;
  confirmActions: boolean;
  preferredLanguage: string;
}

export interface ToolPermissionContext {
  mode: 'strict' | 'permissive' | 'bypassPermissions' | 'plan';
  allowedToolCategories: string[];
  deniedTools: string[];
  requireConfirmation: boolean;
}

export interface ConversationEntry {
  id: string;
  timestamp: number;
  role: 'user' | 'assistant' | 'system';
  content: string;
  toolCalls?: any[];
}

export interface ToolDefinition {
  name: string;
  description: string;
  category: string;
  enabled: boolean;
  requiresConfirmation: boolean;
}

export interface ToolExecution {
  toolName: string;
  timestamp: number;
  success: boolean;
  duration: number;
  error?: string;
}

// Complete application state
export interface ApplicationState {
  workspace: WorkspaceState;
  configuration: ConfigurationState;
  session: SessionState;
  tools: ToolsState;
  project: ProjectState;
  lastUpdated: number;
}

// Application State Manager
class ApplicationStateManager {
  private state: ApplicationState;
  private listeners: Set<(state: ApplicationState) => void> = new Set();

  constructor() {
    status.debug(DevToolCategory.SYSTEM, 'Initializing ApplicationStateManager');
    this.state = this.createInitialState();
    this.detectAndUpdateWorkspace();
    this.loadConfiguration();
  }

  // Create initial state
  private createInitialState(): ApplicationState {
    const now = Date.now();
    const sessionId = `session-${now}-${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      workspace: {
        currentDirectory: process.cwd(),
        projectRoot: null,
        allowedDirectories: [process.cwd()],
        projectType: null,
        projectName: null,
        detectedLanguages: [],
        packageManager: null,
        gitRepository: false
      },
      configuration: {
        apiKey: process.env['OPENAI_API_KEY'] || process.env['OPENROUTER_API_KEY'] || null,
        currentModel: 'qwen/qwen3-coder-30b-a3b-instruct',
        temperature: 0.7,
        maxTokens: 4000,
        userPreferences: {
          theme: 'dark',
          verboseMode: false,
          debugMode: false,
          autoSave: true,
          confirmActions: true,
          preferredLanguage: 'en'
        },
        configPath: this.getConfigPath(),
        isConfigured: false
      },
      session: {
        sessionId,
        isInteractive: true,
        isNonInteractive: false,
        clientType: 'cli',
        startTime: now,
        lastInteractionTime: now,
        conversationHistory: [],
        currentContext: null
      },
      tools: {
        availableTools: this.getDefaultTools(),
        enabledTools: [],
        toolPermissions: {
          mode: 'strict',
          allowedToolCategories: ['file', 'git', 'search'],
          deniedTools: [],
          requireConfirmation: true
        },
        lastUsedTool: null,
        toolExecutionHistory: []
      },
      project: {
        hasPackageJson: false,
        hasTsConfig: false,
        hasGitIgnore: false,
        dependencies: {},
        devDependencies: {},
        scripts: {},
        mainFiles: [],
        testFiles: [],
        configFiles: []
      },
      lastUpdated: now
    };
  }

  // Workspace Detection and Management
  private detectAndUpdateWorkspace(): void {
    status.debug(DevToolCategory.SYSTEM, 'Detecting workspace configuration');
    
    const currentDir = process.cwd();
    const projectRoot = this.findProjectRoot(currentDir);
    const projectType = this.detectProjectType(projectRoot || currentDir);
    const projectName = projectRoot ? basename(projectRoot) : basename(currentDir);
    const packageManager = this.detectPackageManager(projectRoot || currentDir);
    const gitRepository = this.isGitRepository(projectRoot || currentDir);
    const detectedLanguages = this.detectLanguages(projectRoot || currentDir);

    this.updateState({
      workspace: {
        ...this.state.workspace,
        currentDirectory: currentDir,
        projectRoot,
        projectType,
        projectName,
        packageManager,
        gitRepository,
        detectedLanguages
      }
    });

    // Update project-specific state
    this.updateProjectState(projectRoot || currentDir);
    
    status.info(DevToolCategory.SYSTEM, `Workspace detected: ${projectType} project in ${projectName}`);
  }

  // Find project root by looking for common files
  private findProjectRoot(startDir: string): string | null {
    let currentDir = startDir;
    const rootIndicators = ['package.json', 'Cargo.toml', 'go.mod', 'pyproject.toml', '.git'];
    
    while (currentDir !== '/' && currentDir !== '.') {
      for (const indicator of rootIndicators) {
        if (existsSync(join(currentDir, indicator))) {
          return currentDir;
        }
      }
      currentDir = resolve(currentDir, '..');
    }
    
    return null;
  }

  // Detect project type based on files and structure
  private detectProjectType(projectDir: string): ProjectType {
    const packageJsonPath = join(projectDir, 'package.json');
    const tsConfigPath = join(projectDir, 'tsconfig.json');
    const cargoTomlPath = join(projectDir, 'Cargo.toml');
    const goModPath = join(projectDir, 'go.mod');
    const pyProjectPath = join(projectDir, 'pyproject.toml');
    
    // Rust project
    if (existsSync(cargoTomlPath)) return 'rust';
    
    // Go project  
    if (existsSync(goModPath)) return 'go';
    
    // Python project
    if (existsSync(pyProjectPath) || existsSync(join(projectDir, 'requirements.txt'))) return 'python';
    
    // JavaScript/TypeScript projects
    if (existsSync(packageJsonPath)) {
      try {
        const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
        
        // Check for specific frameworks
        if (packageJson.dependencies?.['next'] || packageJson.devDependencies?.['next']) return 'nextjs';
        if (packageJson.dependencies?.['nest'] || packageJson.devDependencies?.['nest']) return 'nestjs';
        if (packageJson.dependencies?.['vue'] || packageJson.devDependencies?.['vue']) return 'vue';
        if (packageJson.dependencies?.['@angular/core']) return 'angular';
        if (packageJson.dependencies?.['react'] || packageJson.devDependencies?.['react']) return 'react';
        
        // TypeScript vs JavaScript
        if (existsSync(tsConfigPath) || packageJson.devDependencies?.['typescript']) return 'typescript';
        
        return 'javascript';
      } catch (error) {
        status.warn(DevToolCategory.SYSTEM, 'Failed to parse package.json', { error });
      }
    }
    
    // TypeScript without package.json
    if (existsSync(tsConfigPath)) return 'typescript';
    
    return 'unknown';
  }

  // Detect package manager
  private detectPackageManager(projectDir: string): PackageManager | null {
    if (existsSync(join(projectDir, 'bun.lockb'))) return 'bun';
    if (existsSync(join(projectDir, 'pnpm-lock.yaml'))) return 'pnpm';
    if (existsSync(join(projectDir, 'yarn.lock'))) return 'yarn';
    if (existsSync(join(projectDir, 'package-lock.json'))) return 'npm';
    return null;
  }

  // Check if directory is a git repository
  private isGitRepository(projectDir: string): boolean {
    return existsSync(join(projectDir, '.git'));
  }

  // Detect programming languages in project
  private detectLanguages(projectDir: string): string[] {
    const languages = new Set<string>();
    const languageExtensions = {
      'typescript': ['.ts', '.tsx'],
      'javascript': ['.js', '.jsx', '.mjs'],
      'python': ['.py', '.pyw'],
      'rust': ['.rs'],
      'go': ['.go'],
      'java': ['.java'],
      'c++': ['.cpp', '.cc', '.cxx'],
      'c': ['.c'],
      'c#': ['.cs'],
      'php': ['.php'],
      'ruby': ['.rb'],
      'swift': ['.swift'],
      'kotlin': ['.kt'],
      'dart': ['.dart']
    };

    try {
      this.scanDirectoryForLanguages(projectDir, languages, languageExtensions, 0, 3);
    } catch (error) {
      status.warn(DevToolCategory.SYSTEM, 'Failed to scan for languages', { error });
    }

    return Array.from(languages);
  }

  // Recursive language detection (limited depth)
  private scanDirectoryForLanguages(
    dir: string, 
    languages: Set<string>, 
    extensions: Record<string, string[]>,
    currentDepth: number,
    maxDepth: number
  ): void {
    if (currentDepth >= maxDepth) return;

    try {
      const entries = require('fs').readdirSync(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        if (entry.isDirectory()) {
          if (!entry.name.startsWith('.') && entry.name !== 'node_modules') {
            this.scanDirectoryForLanguages(
              join(dir, entry.name), 
              languages, 
              extensions, 
              currentDepth + 1, 
              maxDepth
            );
          }
        } else if (entry.isFile()) {
          const ext = extname(entry.name);
          for (const [language, exts] of Object.entries(extensions)) {
            if (exts.includes(ext)) {
              languages.add(language);
            }
          }
        }
      }
    } catch (error) {
      // Ignore permission errors, etc.
    }
  }

  // Update project-specific state
  private updateProjectState(projectDir: string): void {
    const packageJsonPath = join(projectDir, 'package.json');
    const tsConfigPath = join(projectDir, 'tsconfig.json');
    const gitIgnorePath = join(projectDir, '.gitignore');

    let projectState: Partial<ProjectState> = {
      hasPackageJson: existsSync(packageJsonPath),
      hasTsConfig: existsSync(tsConfigPath),
      hasGitIgnore: existsSync(gitIgnorePath),
      dependencies: {},
      devDependencies: {},
      scripts: {}
    };

    // Parse package.json if it exists
    if (projectState.hasPackageJson) {
      try {
        const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
        projectState.dependencies = packageJson.dependencies || {};
        projectState.devDependencies = packageJson.devDependencies || {};
        projectState.scripts = packageJson.scripts || {};
      } catch (error) {
        status.warn(DevToolCategory.SYSTEM, 'Failed to parse package.json', { error });
      }
    }

    // Find main files, test files, config files
    projectState.mainFiles = this.findFilesByPattern(projectDir, ['index.*', 'main.*', 'app.*']);
    projectState.testFiles = this.findFilesByPattern(projectDir, ['*.test.*', '*.spec.*', '__tests__/*']);
    projectState.configFiles = this.findFilesByPattern(projectDir, ['*.config.*', '.*rc.*', '*.yaml', '*.yml']);

    this.updateState({ project: { ...this.state.project, ...projectState } });
  }

  // Find files by patterns
  private findFilesByPattern(dir: string, patterns: string[]): string[] {
    // Simplified implementation - in real app would use glob
    const files: string[] = [];
    try {
      const entries = require('fs').readdirSync(dir);
      for (const entry of entries) {
        for (const pattern of patterns) {
          // Simple pattern matching
          if (pattern.includes('*')) {
            const regex = new RegExp(pattern.replace(/\*/g, '.*'));
            if (regex.test(entry)) {
              files.push(entry);
            }
          } else if (entry === pattern) {
            files.push(entry);
          }
        }
      }
    } catch (error) {
      // Ignore errors
    }
    return files;
  }

  // Configuration management
  private getConfigPath(): string {
    return join(homedir(), '.koode-cli', 'config.json');
  }

  private loadConfiguration(): void {
    status.debug(DevToolCategory.SYSTEM, 'Loading configuration');
    
    const configPath = this.state.configuration.configPath;
    
    try {
      if (existsSync(configPath)) {
        const configData = JSON.parse(readFileSync(configPath, 'utf8'));
        
        this.updateState({
          configuration: {
            ...this.state.configuration,
            ...configData,
            isConfigured: true
          }
        });
        
        status.info(DevToolCategory.SYSTEM, 'Configuration loaded successfully');
      } else {
        status.debug(DevToolCategory.SYSTEM, 'No configuration file found, using defaults');
      }
    } catch (error) {
      status.warn(DevToolCategory.SYSTEM, 'Failed to load configuration', { error });
    }
  }

  // Default tools definition
  private getDefaultTools(): ToolDefinition[] {
    return [
      { name: 'read', description: 'Read files', category: 'file', enabled: true, requiresConfirmation: false },
      { name: 'write', description: 'Write files', category: 'file', enabled: true, requiresConfirmation: true },
      { name: 'edit', description: 'Edit files', category: 'file', enabled: true, requiresConfirmation: true },
      { name: 'bash', description: 'Execute shell commands', category: 'system', enabled: true, requiresConfirmation: true },
      { name: 'grep', description: 'Search in files', category: 'search', enabled: true, requiresConfirmation: false },
      { name: 'glob', description: 'Find files by pattern', category: 'search', enabled: true, requiresConfirmation: false },
    ];
  }

  // State management methods
  public getState(): ApplicationState {
    return { ...this.state };
  }

  public updateState(updates: Partial<ApplicationState>): void {
    this.state = {
      ...this.state,
      ...updates,
      lastUpdated: Date.now()
    };
    
    // Notify listeners
    this.listeners.forEach(listener => {
      try {
        listener(this.state);
      } catch (error) {
        status.error(DevToolCategory.SYSTEM, 'Error in state listener', { error });
      }
    });
    
    status.debug(DevToolCategory.SYSTEM, 'Application state updated', { keys: Object.keys(updates) });
  }

  public subscribe(listener: (state: ApplicationState) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  // Workspace management
  public changeWorkspace(newPath: string): boolean {
    try {
      const resolvedPath = resolve(newPath);
      
      if (!existsSync(resolvedPath) || !statSync(resolvedPath).isDirectory()) {
        status.error(DevToolCategory.SYSTEM, `Invalid workspace path: ${resolvedPath}`);
        return false;
      }

      process.chdir(resolvedPath);
      this.detectAndUpdateWorkspace();
      
      status.success(DevToolCategory.SYSTEM, `Workspace changed to: ${resolvedPath}`);
      return true;
    } catch (error) {
      status.error(DevToolCategory.SYSTEM, 'Failed to change workspace', { error, newPath });
      return false;
    }
  }

  // Session management
  public addConversationEntry(entry: Omit<ConversationEntry, 'id' | 'timestamp'>): void {
    const conversationEntry: ConversationEntry = {
      ...entry,
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now()
    };

    this.updateState({
      session: {
        ...this.state.session,
        conversationHistory: [...this.state.session.conversationHistory, conversationEntry],
        lastInteractionTime: Date.now()
      }
    });
  }

  // Tool management
  public enableTool(toolName: string): boolean {
    const tool = this.state.tools.availableTools.find(t => t.name === toolName);
    if (!tool) {
      status.error(DevToolCategory.TOOL, `Tool not found: ${toolName}`);
      return false;
    }

    if (!this.state.tools.enabledTools.includes(toolName)) {
      this.updateState({
        tools: {
          ...this.state.tools,
          enabledTools: [...this.state.tools.enabledTools, toolName]
        }
      });
      
      status.success(DevToolCategory.TOOL, `Tool enabled: ${toolName}`);
    }
    
    return true;
  }

  public recordToolExecution(execution: ToolExecution): void {
    this.updateState({
      tools: {
        ...this.state.tools,
        lastUsedTool: execution.toolName,
        toolExecutionHistory: [...this.state.tools.toolExecutionHistory, execution]
      }
    });
  }

  // Utility methods
  public getWorkspaceInfo(): WorkspaceState {
    return this.state.workspace;
  }

  public getConfiguration(): ConfigurationState {
    return this.state.configuration;
  }

  public getSessionInfo(): SessionState {
    return this.state.session;
  }

  public getProjectInfo(): ProjectState {
    return this.state.project;
  }

  public getToolsInfo(): ToolsState {
    return this.state.tools;
  }

  public isConfigured(): boolean {
    return this.state.configuration.isConfigured && !!this.state.configuration.apiKey;
  }

  public printStatus(): void {
    const { workspace, configuration, session, project, tools } = this.state;
    
    console.log('\n📊 Application Status:');
    console.log(`📁 Workspace: ${workspace.projectName || 'Unknown'} (${workspace.projectType})`);
    console.log(`📂 Directory: ${workspace.currentDirectory}`);
    console.log(`🛠️  Languages: ${workspace.detectedLanguages.join(', ') || 'None detected'}`);
    console.log(`⚙️  Configuration: ${configuration.isConfigured ? '✅ Loaded' : '❌ Not configured'}`);
    console.log(`🤖 Model: ${configuration.currentModel}`);
    console.log(`🔧 Enabled Tools: ${tools.enabledTools.length}/${tools.availableTools.length}`);
    console.log(`💬 Session: ${session.sessionId.split('-')[1]}`);
    console.log(`📜 Conversation: ${session.conversationHistory.length} messages`);
    
    if (project.hasPackageJson) {
      console.log(`📦 Dependencies: ${Object.keys(project.dependencies).length}`);
      console.log(`🧰 Scripts: ${Object.keys(project.scripts).length}`);
    }
  }
}

// Global application state manager
export const appState = new ApplicationStateManager();

// Convenience exports
export default appState;