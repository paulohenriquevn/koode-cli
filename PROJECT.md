# Koode Code overview

> Learn about Koode Code, paulohenriquevn's agentic coding tool that lives in your terminal and helps you turn ideas into code faster than ever before.

## Get started in 30 seconds

Prerequisites:

* [Node.js 18 or newer](https://nodejs.org/en/download/)
* A [Koode.ai](https://Koode.ai) (recommended) or [Koode Console](https://console.paulohenriquevn.com/) account

```bash  theme={null}
# Install Koode Code
npm install -g @paulohenriquevn-ai/Koode-code

# Navigate to your project
cd your-awesome-project

# Start coding with Koode
Koode
# You'll be prompted to log in on first use
```

That's it! You're ready to start coding with Koode. [Continue with Quickstart (5 mins) →](/en/docs/Koode-code/quickstart)

(Got specific setup needs or hit issues? See [advanced setup](/en/docs/Koode-code/setup) or [troubleshooting](/en/docs/Koode-code/troubleshooting).)

<Note>
  **New VS Code Extension (Beta)**: Prefer a graphical interface? Our new [VS Code extension](/en/docs/Koode-code/vs-code) provides an easy-to-use native IDE experience without requiring terminal familiarity. Simply install from the marketplace and start coding with Koode directly in your sidebar.
</Note>

## What Koode Code does for you

* **Build features from descriptions**: Tell Koode what you want to build in plain English. It will make a plan, write the code, and ensure it works.
* **Debug and fix issues**: Describe a bug or paste an error message. Koode Code will analyze your codebase, identify the problem, and implement a fix.
* **Navigate any codebase**: Ask anything about your team's codebase, and get a thoughtful answer back. Koode Code maintains awareness of your entire project structure, can find up-to-date information from the web, and with [MCP](/en/docs/Koode-code/mcp) can pull from external datasources like Google Drive, Figma, and Slack.
* **Automate tedious tasks**: Fix fiddly lint issues, resolve merge conflicts, and write release notes. Do all this in a single command from your developer machines, or automatically in CI.

## Why developers love Koode Code

* **Works in your terminal**: Not another chat window. Not another IDE. Koode Code meets you where you already work, with the tools you already love.
* **Takes action**: Koode Code can directly edit files, run commands, and create commits. Need more? [MCP](/en/docs/Koode-code/mcp) lets Koode read your design docs in Google Drive, update your tickets in Jira, or use *your* custom developer tooling.
* **Unix philosophy**: Koode Code is composable and scriptable. `tail -f app.log | Koode -p "Slack me if you see any anomalies appear in this log stream"` *works*. Your CI can run `Koode -p "If there are new text strings, translate them into French and raise a PR for @lang-fr-team to review"`.
* **Enterprise-ready**: Use the Koode API, or host on AWS or GCP. Enterprise-grade [security](/en/docs/Koode-code/security), [privacy](/en/docs/Koode-code/data-usage), and [compliance](https://trust.paulohenriquevn.com/) is built-in.

# Quickstart

> Welcome to koode Code!

This quickstart guide will have you using AI-powered coding assistance in just a few minutes. By the end, you'll understand how to use koode Code for common development tasks.

## Before you begin

Make sure you have:

* A terminal or command prompt open
* A code project to work with
* A [koode.ai](https://koode.ai) (recommended) or [koode Console](https://console.paulohenriquevn.com/) account

## Step 1: Install koode Code

### NPM Install

If you have [Node.js 18 or newer installed](https://nodejs.org/en/download/):

```sh  theme={null}
npm install -g @paulohenriquevn-ai/koode-code
```

### Native Install

<Tip>
  Alternatively, try our new native install, now in beta.
</Tip>

**Homebrew (macOS, Linux):**

```sh  theme={null}
brew install --cask koode-code
```

**macOS, Linux, WSL:**

```bash  theme={null}
curl -fsSL https://koode.ai/install.sh | bash
```

**Windows PowerShell:**

```powershell  theme={null}
irm https://koode.ai/install.ps1 | iex
```

**Windows CMD:**

```batch  theme={null}
curl -fsSL https://koode.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

## Step 2: Log in to your account

koode Code requires an account to use. When you start an interactive session with the `koode` command, you'll need to log in:

```bash  theme={null}
koode
# You'll be prompted to log in on first use
```

```bash  theme={null}
/login
# Follow the prompts to log in with your account
```

You can log in using either account type:

* [koode.ai](https://koode.ai) (subscription plans - recommended)
* [koode Console](https://console.paulohenriquevn.com/) (API access with pre-paid credits)

Once logged in, your credentials are stored and you won't need to log in again.

<Note>
  When you first authenticate koode Code with your koode Console account, a workspace called "koode Code" is automatically created for you. This workspace provides centralized cost tracking and management for all koode Code usage in your organization.
</Note>

<Note>
  You can have both account types under the same email address. If you need to log in again or switch accounts, use the `/login` command within koode Code.
</Note>

## Step 3: Start your first session

Open your terminal in any project directory and start koode Code:

```bash  theme={null}
cd /path/to/your/project
koode
```

You'll see the koode Code welcome screen with your session information, recent conversations, and latest updates. Type `/help` for available commands or `/resume` to continue a previous conversation.

<Tip>
  After logging in (Step 2), your credentials are stored on your system. Learn more in [Credential Management](/en/docs/koode-code/iam#credential-management).
</Tip>

## Step 4: Ask your first question

Let's start with understanding your codebase. Try one of these commands:

```
> what does this project do?
```

koode will analyze your files and provide a summary. You can also ask more specific questions:

```
> what technologies does this project use?
```

```
> where is the main entry point?
```

```
> explain the folder structure
```

You can also ask koode about its own capabilities:

```
> what can koode Code do?
```

```
> how do I use slash commands in koode Code?
```

```
> can koode Code work with Docker?
```

<Note>
  koode Code reads your files as needed - you don't have to manually add context. koode also has access to its own documentation and can answer questions about its features and capabilities.
</Note>

## Step 5: Make your first code change

Now let's make koode Code do some actual coding. Try a simple task:

```
> add a hello world function to the main file
```

koode Code will:

1. Find the appropriate file
2. Show you the proposed changes
3. Ask for your approval
4. Make the edit

<Note>
  koode Code always asks for permission before modifying files. You can approve individual changes or enable "Accept all" mode for a session.
</Note>

## Step 6: Use Git with koode Code

koode Code makes Git operations conversational:

```
> what files have I changed?
```

```
> commit my changes with a descriptive message
```

You can also prompt for more complex Git operations:

```
> create a new branch called feature/quickstart
```

```
> show me the last 5 commits
```

```
> help me resolve merge conflicts
```

## Step 7: Fix a bug or add a feature

koode is proficient at debugging and feature implementation.

Describe what you want in natural language:

```
> add input validation to the user registration form
```

Or fix existing issues:

```
> there's a bug where users can submit empty forms - fix it
```

koode Code will:

* Locate the relevant code
* Understand the context
* Implement a solution
* Run tests if available

## Step 8: Test out other common workflows

There are a number of ways to work with koode:

**Refactor code**

```
> refactor the authentication module to use async/await instead of callbacks
```

**Write tests**

```
> write unit tests for the calculator functions
```

**Update documentation**

```
> update the README with installation instructions
```

**Code review**

```
> review my changes and suggest improvements
```

<Tip>
  **Remember**: koode Code is your AI pair programmer. Talk to it like you would a helpful colleague - describe what you want to achieve, and it will help you get there.
</Tip>

## Essential commands

Here are the most important commands for daily use:

| Command             | What it does                      | Example                             |
| ------------------- | --------------------------------- | ----------------------------------- |
| `koode`            | Start interactive mode            | `koode`                            |
| `koode "task"`     | Run a one-time task               | `koode "fix the build error"`      |
| `koode -p "query"` | Run one-off query, then exit      | `koode -p "explain this function"` |
| `koode -c`         | Continue most recent conversation | `koode -c`                         |
| `koode -r`         | Resume a previous conversation    | `koode -r`                         |
| `koode commit`     | Create a Git commit               | `koode commit`                     |
| `/clear`            | Clear conversation history        | `> /clear`                          |
| `/help`             | Show available commands           | `> /help`                           |
| `exit` or Ctrl+C    | Exit koode Code                  | `> exit`                            |

See the [CLI reference](/en/docs/koode-code/cli-reference) for a complete list of commands.

## Pro tips for beginners

<AccordionGroup>
  <Accordion title="Be specific with your requests">
    Instead of: "fix the bug"

    Try: "fix the login bug where users see a blank screen after entering wrong credentials"
  </Accordion>

  <Accordion title="Use step-by-step instructions">
    Break complex tasks into steps:

    ```
    > 1. create a new database table for user profiles
    ```

    ```
    > 2. create an API endpoint to get and update user profiles
    ```

    ```
    > 3. build a webpage that allows users to see and edit their information
    ```
  </Accordion>

  <Accordion title="Let koode explore first">
    Before making changes, let koode understand your code:

    ```
    > analyze the database schema
    ```

    ```
    > build a dashboard showing products that are most frequently returned by our UK customers
    ```
  </Accordion>

  <Accordion title="Save time with shortcuts">
    * Press `?` to see all available keyboard shortcuts
    * Use Tab for command completion
    * Press ↑ for command history
    * Type `/` to see all slash commands
  </Accordion>
</AccordionGroup>



## Getting help

* **In koode Code**: Type `/help` or ask "how do I..."
* **Documentation**: You're here! Browse other guides
* **Community**: Join our [Discord](https://www.paulohenriquevn.com/discord) for tips and support


# Subagents

> Create and use specialized AI subagents in Koode Code for task-specific workflows and improved context management.

Custom subagents in Koode Code are specialized AI assistants that can be invoked to handle specific types of tasks. They enable more efficient problem-solving by providing task-specific configurations with customized system prompts, tools and a separate context window.

## What are subagents?

Subagents are pre-configured AI personalities that Koode Code can delegate tasks to. Each subagent:

* Has a specific purpose and expertise area
* Uses its own context window separate from the main conversation
* Can be configured with specific tools it's allowed to use
* Includes a custom system prompt that guides its behavior

When Koode Code encounters a task that matches a subagent's expertise, it can delegate that task to the specialized subagent, which works independently and returns results.

## Key benefits

<CardGroup cols={2}>
  <Card title="Context preservation" icon="layer-group">
    Each subagent operates in its own context, preventing pollution of the main conversation and keeping it focused on high-level objectives.
  </Card>

  <Card title="Specialized expertise" icon="brain">
    Subagents can be fine-tuned with detailed instructions for specific domains, leading to higher success rates on designated tasks.
  </Card>

  <Card title="Reusability" icon="rotate">
    Once created, subagents can be used across different projects and shared with your team for consistent workflows.
  </Card>

  <Card title="Flexible permissions" icon="shield-check">
    Each subagent can have different tool access levels, allowing you to limit powerful tools to specific subagent types.
  </Card>
</CardGroup>

## Quick start

To create your first subagent:

<Steps>
  <Step title="Open the subagents interface">
    Run the following command:

    ```
    /agents
    ```
  </Step>

  <Step title="Select 'Create New Agent'">
    Choose whether to create a project-level or user-level subagent
  </Step>

  <Step title="Define the subagent">
    * **Recommended**: Generate with Koode first, then customize to make it yours
    * Describe your subagent in detail and when it should be used
    * Select the tools you want to grant access to (or leave blank to inherit all tools)
    * The interface shows all available tools, making selection easy
    * If you're generating with Koode, you can also edit the system prompt in your own editor by pressing `e`
  </Step>

  <Step title="Save and use">
    Your subagent is now available! Koode will use it automatically when appropriate, or you can invoke it explicitly:

    ```
    > Use the code-reviewer subagent to check my recent changes
    ```
  </Step>
</Steps>

## Subagent configuration

### File locations

Subagents are stored as Markdown files with YAML frontmatter in two possible locations:

| Type                  | Location            | Scope                         | Priority |
| :-------------------- | :------------------ | :---------------------------- | :------- |
| **Project subagents** | `.Koode/agents/`   | Available in current project  | Highest  |
| **User subagents**    | `~/.Koode/agents/` | Available across all projects | Lower    |

When subagent names conflict, project-level subagents take precedence over user-level subagents.

### Plugin agents

[Plugins](/en/docs/Koode-code/plugins) can provide custom subagents that integrate seamlessly with Koode Code. Plugin agents work identically to user-defined agents and appear in the `/agents` interface.

**Plugin agent locations**: Plugins include agents in their `agents/` directory (or custom paths specified in the plugin manifest).

**Using plugin agents**:

* Plugin agents appear in `/agents` alongside your custom agents
* Can be invoked explicitly: "Use the code-reviewer agent from the security-plugin"
* Can be invoked automatically by Koode when appropriate
* Can be managed (viewed, inspected) through `/agents` interface

See the [plugin components reference](/en/docs/Koode-code/plugins-reference#agents) for details on creating plugin agents.

### CLI-based configuration

You can also define subagents dynamically using the `--agents` CLI flag, which accepts a JSON object:

```bash  theme={null}
Koode --agents '{
  "code-reviewer": {
    "description": "Expert code reviewer. Use proactively after code changes.",
    "prompt": "You are a senior code reviewer. Focus on code quality, security, and best practices.",
    "tools": ["Read", "Grep", "Glob", "Bash"],
    "model": "sonnet"
  }
}'
```

**Priority**: CLI-defined subagents have lower priority than project-level subagents but higher priority than user-level subagents.

**Use case**: This approach is useful for:

* Quick testing of subagent configurations
* Session-specific subagents that don't need to be saved
* Automation scripts that need custom subagents
* Sharing subagent definitions in documentation or scripts

For detailed information about the JSON format and all available options, see the [CLI reference documentation](/en/docs/Koode-code/cli-reference#agents-flag-format).

### File format

Each subagent is defined in a Markdown file with this structure:

```markdown  theme={null}
---
name: your-sub-agent-name
description: Description of when this subagent should be invoked
tools: tool1, tool2, tool3  # Optional - inherits all tools if omitted
model: sonnet  # Optional - specify model alias or 'inherit'
---

Your subagent's system prompt goes here. This can be multiple paragraphs
and should clearly define the subagent's role, capabilities, and approach
to solving problems.

Include specific instructions, best practices, and any constraints
the subagent should follow.
```

#### Configuration fields

| Field         | Required | Description                                                                                                                                                                                                                      |
| :------------ | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`        | Yes      | Unique identifier using lowercase letters and hyphens                                                                                                                                                                            |
| `description` | Yes      | Natural language description of the subagent's purpose                                                                                                                                                                           |
| `tools`       | No       | Comma-separated list of specific tools. If omitted, inherits all tools from the main thread                                                                                                                                      |
| `model`       | No       | Model to use for this subagent. Can be a model alias (`sonnet`, `opus`, `haiku`) or `'inherit'` to use the main conversation's model. If omitted, defaults to the [configured subagent model](/en/docs/Koode-code/model-config) |

### Model selection

The `model` field allows you to control which [AI model](/en/docs/Koode-code/model-config) the subagent uses:

* **Model alias**: Use one of the available aliases: `sonnet`, `opus`, or `haiku`
* **`'inherit'`**: Use the same model as the main conversation (useful for consistency)
* **Omitted**: If not specified, uses the default model configured for subagents (`sonnet`)

<Note>
  Using `'inherit'` is particularly useful when you want your subagents to adapt to the model choice of the main conversation, ensuring consistent capabilities and response style throughout your session.
</Note>

### Available tools

Subagents can be granted access to any of Koode Code's internal tools. See the [tools documentation](/en/docs/Koode-code/settings#tools-available-to-Koode) for a complete list of available tools.

<Tip>
  **Recommended:** Use the `/agents` command to modify tool access - it provides an interactive interface that lists all available tools, including any connected MCP server tools, making it easier to select the ones you need.
</Tip>

You have two options for configuring tools:

* **Omit the `tools` field** to inherit all tools from the main thread (default), including MCP tools
* **Specify individual tools** as a comma-separated list for more granular control (can be edited manually or via `/agents`)

**MCP Tools**: Subagents can access MCP tools from configured MCP servers. When the `tools` field is omitted, subagents inherit all MCP tools available to the main thread.

## Managing subagents

### Using the /agents command (Recommended)

The `/agents` command provides a comprehensive interface for subagent management:

```
/agents
```

This opens an interactive menu where you can:

* View all available subagents (built-in, user, and project)
* Create new subagents with guided setup
* Edit existing custom subagents, including their tool access
* Delete custom subagents
* See which subagents are active when duplicates exist
* **Easily manage tool permissions** with a complete list of available tools

### Direct file management

You can also manage subagents by working directly with their files:

```bash  theme={null}
# Create a project subagent
mkdir -p .Koode/agents
echo '---
name: test-runner
description: Use proactively to run tests and fix failures
---

You are a test automation expert. When you see code changes, proactively run the appropriate tests. If tests fail, analyze the failures and fix them while preserving the original test intent.' > .Koode/agents/test-runner.md

# Create a user subagent
mkdir -p ~/.Koode/agents
# ... create subagent file
```

## Using subagents effectively

### Automatic delegation

Koode Code proactively delegates tasks based on:

* The task description in your request
* The `description` field in subagent configurations
* Current context and available tools

<Tip>
  To encourage more proactive subagent use, include phrases like "use PROACTIVELY" or "MUST BE USED" in your `description` field.
</Tip>

### Explicit invocation

Request a specific subagent by mentioning it in your command:

```
> Use the test-runner subagent to fix failing tests
> Have the code-reviewer subagent look at my recent changes
> Ask the debugger subagent to investigate this error
```

## Example subagents

### Code reviewer

```markdown  theme={null}
---
name: code-reviewer
description: Expert code review specialist. Proactively reviews code for quality, security, and maintainability. Use immediately after writing or modifying code.
tools: Read, Grep, Glob, Bash
model: inherit
---

You are a senior code reviewer ensuring high standards of code quality and security.

When invoked:
1. Run git diff to see recent changes
2. Focus on modified files
3. Begin review immediately

Review checklist:
- Code is simple and readable
- Functions and variables are well-named
- No duplicated code
- Proper error handling
- No exposed secrets or API keys
- Input validation implemented
- Good test coverage
- Performance considerations addressed

Provide feedback organized by priority:
- Critical issues (must fix)
- Warnings (should fix)
- Suggestions (consider improving)

Include specific examples of how to fix issues.
```

### Debugger

```markdown  theme={null}
---
name: debugger
description: Debugging specialist for errors, test failures, and unexpected behavior. Use proactively when encountering any issues.
tools: Read, Edit, Bash, Grep, Glob
---

You are an expert debugger specializing in root cause analysis.

When invoked:
1. Capture error message and stack trace
2. Identify reproduction steps
3. Isolate the failure location
4. Implement minimal fix
5. Verify solution works

Debugging process:
- Analyze error messages and logs
- Check recent code changes
- Form and test hypotheses
- Add strategic debug logging
- Inspect variable states

For each issue, provide:
- Root cause explanation
- Evidence supporting the diagnosis
- Specific code fix
- Testing approach
- Prevention recommendations

Focus on fixing the underlying issue, not just symptoms.
```

### Data scientist

```markdown  theme={null}
---
name: data-scientist
description: Data analysis expert for SQL queries, BigQuery operations, and data insights. Use proactively for data analysis tasks and queries.
tools: Bash, Read, Write
model: sonnet
---

You are a data scientist specializing in SQL and BigQuery analysis.

When invoked:
1. Understand the data analysis requirement
2. Write efficient SQL queries
3. Use BigQuery command line tools (bq) when appropriate
4. Analyze and summarize results
5. Present findings clearly

Key practices:
- Write optimized SQL queries with proper filters
- Use appropriate aggregations and joins
- Include comments explaining complex logic
- Format results for readability
- Provide data-driven recommendations

For each analysis:
- Explain the query approach
- Document any assumptions
- Highlight key findings
- Suggest next steps based on data

Always ensure queries are efficient and cost-effective.
```

## Best practices

* **Start with Koode-generated agents**: We highly recommend generating your initial subagent with Koode and then iterating on it to make it personally yours. This approach gives you the best results - a solid foundation that you can customize to your specific needs.

* **Design focused subagents**: Create subagents with single, clear responsibilities rather than trying to make one subagent do everything. This improves performance and makes subagents more predictable.

* **Write detailed prompts**: Include specific instructions, examples, and constraints in your system prompts. The more guidance you provide, the better the subagent will perform.

* **Limit tool access**: Only grant tools that are necessary for the subagent's purpose. This improves security and helps the subagent focus on relevant actions.

* **Version control**: Check project subagents into version control so your team can benefit from and improve them collaboratively.

## Advanced usage

### Chaining subagents

For complex workflows, you can chain multiple subagents:

```
> First use the code-analyzer subagent to find performance issues, then use the optimizer subagent to fix them
```

### Dynamic subagent selection

Koode Code intelligently selects subagents based on context. Make your `description` fields specific and action-oriented for best results.

## Performance considerations

* **Context efficiency**: Agents help preserve main context, enabling longer overall sessions
* **Latency**: Subagents start off with a clean slate each time they are invoked and may add latency as they gather context that they require to do their job effectively.

# Plugins

> Extend Koode Code with custom commands, agents, hooks, and MCP servers through the plugin system.

<Tip>
  For complete technical specifications and schemas, see [Plugins reference](/en/docs/Koode-code/plugins-reference). For marketplace management, see [Plugin marketplaces](/en/docs/Koode-code/plugin-marketplaces).
</Tip>

Plugins let you extend Koode Code with custom functionality that can be shared across projects and teams. Install plugins from [marketplaces](/en/docs/Koode-code/plugin-marketplaces) to add pre-built commands, agents, hooks, and MCP servers, or create your own to automate your workflows.

## Quickstart

Let's create a simple greeting plugin to get you familiar with the plugin system. We'll build a working plugin that adds a custom command, test it locally, and understand the core concepts.

### Prerequisites

* Koode Code installed on your machine
* Basic familiarity with command-line tools

### Create your first plugin

<Steps>
  <Step title="Create the marketplace structure">
    ```bash  theme={null}
    mkdir test-marketplace
    cd test-marketplace
    ```
  </Step>

  <Step title="Create the plugin directory">
    ```bash  theme={null}
    mkdir my-first-plugin
    cd my-first-plugin
    ```
  </Step>

  <Step title="Create the plugin manifest">
    ```bash Create .Koode-plugin/plugin.json theme={null}
    mkdir .Koode-plugin
    cat > .Koode-plugin/plugin.json << 'EOF'
    {
    "name": "my-first-plugin",
    "description": "A simple greeting plugin to learn the basics",
    "version": "1.0.0",
    "author": {
    "name": "Your Name"
    }
    }
    EOF
    ```
  </Step>

  <Step title="Add a custom command">
    ```bash Create commands/hello.md theme={null}
    mkdir commands
    cat > commands/hello.md << 'EOF'
    ---
    description: Greet the user with a personalized message
    ---

    # Hello Command

    Greet the user warmly and ask how you can help them today. Make the greeting personal and encouraging.
    EOF
    ```
  </Step>

  <Step title="Create the marketplace manifest">
    ```bash Create marketplace.json theme={null}
    cd ..
    mkdir .Koode-plugin
    cat > .Koode-plugin/marketplace.json << 'EOF'
    {
    "name": "test-marketplace",
    "owner": {
    "name": "Test User"
    },
    "plugins": [
    {
      "name": "my-first-plugin",
      "source": "./my-first-plugin",
      "description": "My first test plugin"
    }
    ]
    }
    EOF
    ```
  </Step>

  <Step title="Install and test your plugin">
    ```bash Start Koode Code from parent directory theme={null}
    cd ..
    Koode
    ```

    ```shell Add the test marketplace theme={null}
    /plugin marketplace add ./test-marketplace
    ```

    ```shell Install your plugin theme={null}
    /plugin install my-first-plugin@test-marketplace
    ```

    Select "Install now". You'll then need to restart Koode Code in order to use the new plugin.

    ```shell Try your new command theme={null}
    /hello
    ```

    You'll see Koode use your greeting command! Check `/help` to see your new command listed.
  </Step>
</Steps>

You've successfully created and tested a plugin with these key components:

* **Plugin manifest** (`.Koode-plugin/plugin.json`) - Describes your plugin's metadata
* **Commands directory** (`commands/`) - Contains your custom slash commands
* **Test marketplace** - Allows you to test your plugin locally

### Plugin structure overview

Your plugin follows this basic structure:

```
my-first-plugin/
├── .Koode-plugin/
│   └── plugin.json          # Plugin metadata
├── commands/                 # Custom slash commands (optional)
│   └── hello.md
├── agents/                   # Custom agents (optional)
│   └── helper.md
└── hooks/                    # Event handlers (optional)
    └── hooks.json
```

**Additional components you can add:**

* **Commands**: Create markdown files in `commands/` directory
* **Agents**: Create agent definitions in `agents/` directory
* **Hooks**: Create `hooks/hooks.json` for event handling
* **MCP servers**: Create `.mcp.json` for external tool integration

<Note>
  **Next steps**: Ready to add more features? Jump to [Develop more complex plugins](#develop-more-complex-plugins) to add agents, hooks, and MCP servers. For complete technical specifications of all plugin components, see [Plugins reference](/en/docs/Koode-code/plugins-reference).
</Note>

***

## Install and manage plugins

Learn how to discover, install, and manage plugins to extend your Koode Code capabilities.

### Prerequisites

* Koode Code installed and running
* Basic familiarity with command-line interfaces

### Add marketplaces

Marketplaces are catalogs of available plugins. Add them to discover and install plugins:

```shell Add a marketplace theme={null}
/plugin marketplace add your-org/Koode-plugins
```

```shell Browse available plugins theme={null}
/plugin
```

For detailed marketplace management including Git repositories, local development, and team distribution, see [Plugin marketplaces](/en/docs/Koode-code/plugin-marketplaces).

### Install plugins

#### Via interactive menu (recommended for discovery)

```shell Open the plugin management interface theme={null}
/plugin
```

Select "Browse Plugins" to see available options with descriptions, features, and installation options.

#### Via direct commands (for quick installation)

```shell Install a specific plugin theme={null}
/plugin install formatter@your-org
```

```shell Enable a disabled plugin theme={null}
/plugin enable plugin-name@marketplace-name
```

```shell Disable without uninstalling theme={null}
/plugin disable plugin-name@marketplace-name
```

```shell Completely remove a plugin theme={null}
/plugin uninstall plugin-name@marketplace-name
```

### Verify installation

After installing a plugin:

1. **Check available commands**: Run `/help` to see new commands
2. **Test plugin features**: Try the plugin's commands and features
3. **Review plugin details**: Use `/plugin` → "Manage Plugins" to see what the plugin provides

## Set up team plugin workflows

Configure plugins at the repository level to ensure consistent tooling across your team. When team members trust your repository folder, Koode Code automatically installs specified marketplaces and plugins.

**To set up team plugins:**

1. Add marketplace and plugin configuration to your repository's `.Koode/settings.json`
2. Team members trust the repository folder
3. Plugins install automatically for all team members

For complete instructions including configuration examples, marketplace setup, and rollout best practices, see [Configure team marketplaces](/en/docs/Koode-code/plugin-marketplaces#how-to-configure-team-marketplaces).

***

## Develop more complex plugins

Once you're comfortable with basic plugins, you can create more sophisticated extensions.

### Organize complex plugins

For plugins with many components, organize your directory structure by functionality. For complete directory layouts and organization patterns, see [Plugin directory structure](/en/docs/Koode-code/plugins-reference#plugin-directory-structure).

### Test your plugins locally

When developing plugins, use a local marketplace to test changes iteratively. This workflow builds on the quickstart pattern and works for plugins of any complexity.

<Steps>
  <Step title="Set up your development structure">
    Organize your plugin and marketplace for testing:

    ```bash Create directory structure theme={null}
    mkdir dev-marketplace
    cd dev-marketplace
    mkdir my-plugin
    ```

    This creates:

    ```
    dev-marketplace/
    ├── .Koode-plugin/marketplace.json  (you'll create this)
    └── my-plugin/                        (your plugin under development)
        ├── .Koode-plugin/plugin.json
        ├── commands/
        ├── agents/
        └── hooks/
    ```
  </Step>

  <Step title="Create the marketplace manifest">
    ```bash Create marketplace.json theme={null}
    mkdir .Koode-plugin
    cat > .Koode-plugin/marketplace.json << 'EOF'
    {
    "name": "dev-marketplace",
    "owner": {
    "name": "Developer"
    },
    "plugins": [
    {
      "name": "my-plugin",
      "source": "./my-plugin",
      "description": "Plugin under development"
    }
    ]
    }
    EOF
    ```
  </Step>

  <Step title="Install and test">
    ```bash Start Koode Code from parent directory theme={null}
    cd ..
    Koode
    ```

    ```shell Add your development marketplace theme={null}
    /plugin marketplace add ./dev-marketplace
    ```

    ```shell Install your plugin theme={null}
    /plugin install my-plugin@dev-marketplace
    ```

    Test your plugin components:

    * Try your commands with `/command-name`
    * Check that agents appear in `/agents`
    * Verify hooks work as expected
  </Step>

  <Step title="Iterate on your plugin">
    After making changes to your plugin code:

    ```shell Uninstall the current version theme={null}
    /plugin uninstall my-plugin@dev-marketplace
    ```

    ```shell Reinstall to test changes theme={null}
    /plugin install my-plugin@dev-marketplace
    ```

    Repeat this cycle as you develop and refine your plugin.
  </Step>
</Steps>

<Note>
  **For multiple plugins**: Organize plugins in subdirectories like `./plugins/plugin-name` and update your marketplace.json accordingly. See [Plugin sources](/en/docs/Koode-code/plugin-marketplaces#plugin-sources) for organization patterns.
</Note>

### Debug plugin issues

If your plugin isn't working as expected:

1. **Check the structure**: Ensure your directories are at the plugin root, not inside `.Koode-plugin/`
2. **Test components individually**: Check each command, agent, and hook separately
3. **Use validation and debugging tools**: See [Debugging and development tools](/en/docs/Koode-code/plugins-reference#debugging-and-development-tools) for CLI commands and troubleshooting techniques

### Share your plugins

When your plugin is ready to share:

1. **Add documentation**: Include a README.md with installation and usage instructions
2. **Version your plugin**: Use semantic versioning in your `plugin.json`
3. **Create or use a marketplace**: Distribute through plugin marketplaces for easy installation
4. **Test with others**: Have team members test the plugin before wider distribution

<Note>
  For complete technical specifications, debugging techniques, and distribution strategies, see [Plugins reference](/en/docs/Koode-code/plugins-reference).
</Note>

***

## Next steps

Now that you understand Koode Code's plugin system, here are suggested paths for different goals:

### For plugin users

* **Discover plugins**: Browse community marketplaces for useful tools
* **Team adoption**: Set up repository-level plugins for your projects
* **Marketplace management**: Learn to manage multiple plugin sources
* **Advanced usage**: Explore plugin combinations and workflows

### For plugin developers

* **Create your first marketplace**: [Plugin marketplaces guide](/en/docs/Koode-code/plugin-marketplaces)
* **Advanced components**: Dive deeper into specific plugin components:
  * [Slash commands](/en/docs/Koode-code/slash-commands) - Command development details
  * [Subagents](/en/docs/Koode-code/sub-agents) - Agent configuration and capabilities
  * [Hooks](/en/docs/Koode-code/hooks) - Event handling and automation
  * [MCP](/en/docs/Koode-code/mcp) - External tool integration
* **Distribution strategies**: Package and share your plugins effectively
* **Community contribution**: Consider contributing to community plugin collections

### For team leads and administrators

* **Repository configuration**: Set up automatic plugin installation for team projects
* **Plugin governance**: Establish guidelines for plugin approval and security review
* **Marketplace maintenance**: Create and maintain organization-specific plugin catalogs
* **Training and documentation**: Help team members adopt plugin workflows effectively

## See also

* [Plugin marketplaces](/en/docs/Koode-code/plugin-marketplaces) - Creating and managing plugin catalogs
* [Slash commands](/en/docs/Koode-code/slash-commands) - Understanding custom commands
* [Subagents](/en/docs/Koode-code/sub-agents) - Creating and using specialized agents
* [Hooks](/en/docs/Koode-code/hooks) - Automating workflows with event handlers
* [MCP](/en/docs/Koode-code/mcp) - Connecting to external tools and services
* [Settings](/en/docs/Koode-code/settings) - Configuration options for plugins

# Output styles

> Adapt Koode Code for uses beyond software engineering

Output styles allow you to use Koode Code as any type of agent while keeping
its core capabilities, such as running local scripts, reading/writing files, and
tracking TODOs.

## Built-in output styles

Koode Code's **Default** output style is the existing system prompt, designed
to help you complete software engineering tasks efficiently.

There are two additional built-in output styles focused on teaching you the
codebase and how Koode operates:

* **Explanatory**: Provides educational "Insights" in between helping you
  complete software engineering tasks. Helps you understand implementation
  choices and codebase patterns.

* **Learning**: Collaborative, learn-by-doing mode where Koode will not only
  share "Insights" while coding, but also ask you to contribute small, strategic
  pieces of code yourself. Koode Code will add `TODO(human)` markers in your
  code for you to implement.

## How output styles work

Output styles directly modify Koode Code's system prompt.

* Non-default output styles exclude instructions specific to code generation and
  efficient output normally built into Koode Code (such as responding concisely
  and verifying code with tests).
* Instead, these output styles have their own custom instructions added to the
  system prompt.

## Change your output style

You can either:

* Run `/output-style` to access the menu and select your output style (this can
  also be accessed from the `/config` menu)

* Run `/output-style [style]`, such as `/output-style explanatory`, to directly
  switch to a style

These changes apply to the [local project level](/en/docs/Koode-code/settings)
and are saved in `.Koode/settings.local.json`.

## Create a custom output style

To set up a new output style with Koode's help, run
`/output-style:new I want an output style that ...`

By default, output styles created through `/output-style:new` are saved as
markdown files at the user level in `~/.Koode/output-styles` and can be used
across projects. They have the following structure:

```markdown  theme={null}
---
name: My Custom Style
description:
  A brief description of what this style does, to be displayed to the user
---

# Custom Style Instructions

You are an interactive CLI tool that helps users with software engineering
tasks. [Your custom instructions here...]

## Specific Behaviors

[Define how the assistant should behave in this style...]
```

You can also create your own output style Markdown files and save them either at
the user level (`~/.Koode/output-styles`) or the project level
(`.Koode/output-styles`).

## Comparisons to related features

### Output Styles vs. Koode.md vs. --append-system-prompt

Output styles completely “turn off” the parts of Koode Code’s default system
prompt specific to software engineering. Neither Koode.md nor
`--append-system-prompt` edit Koode Code’s default system prompt. Koode.md
adds the contents as a user message *following* Koode Code’s default system
prompt. `--append-system-prompt` appends the content to the system prompt.

### Output Styles vs. [Agents](/en/docs/Koode-code/sub-agents)

Output styles directly affect the main agent loop and only affect the system
prompt. Agents are invoked to handle specific tasks and can include additional
settings like the model to use, the tools they have available, and some context
about when to use the agent.

### Output Styles vs. [Custom Slash Commands](/en/docs/Koode-code/slash-commands)

You can think of output styles as “stored system prompts” and custom slash
commands as “stored prompts”.

# Output styles

> Adapt Koode Code for uses beyond software engineering

Output styles allow you to use Koode Code as any type of agent while keeping
its core capabilities, such as running local scripts, reading/writing files, and
tracking TODOs.

## Built-in output styles

Koode Code's **Default** output style is the existing system prompt, designed
to help you complete software engineering tasks efficiently.

There are two additional built-in output styles focused on teaching you the
codebase and how Koode operates:

* **Explanatory**: Provides educational "Insights" in between helping you
  complete software engineering tasks. Helps you understand implementation
  choices and codebase patterns.

* **Learning**: Collaborative, learn-by-doing mode where Koode will not only
  share "Insights" while coding, but also ask you to contribute small, strategic
  pieces of code yourself. Koode Code will add `TODO(human)` markers in your
  code for you to implement.

## How output styles work

Output styles directly modify Koode Code's system prompt.

* Non-default output styles exclude instructions specific to code generation and
  efficient output normally built into Koode Code (such as responding concisely
  and verifying code with tests).
* Instead, these output styles have their own custom instructions added to the
  system prompt.

## Change your output style

You can either:

* Run `/output-style` to access the menu and select your output style (this can
  also be accessed from the `/config` menu)

* Run `/output-style [style]`, such as `/output-style explanatory`, to directly
  switch to a style

These changes apply to the [local project level](/en/docs/Koode-code/settings)
and are saved in `.Koode/settings.local.json`.

## Create a custom output style

To set up a new output style with Koode's help, run
`/output-style:new I want an output style that ...`

By default, output styles created through `/output-style:new` are saved as
markdown files at the user level in `~/.Koode/output-styles` and can be used
across projects. They have the following structure:

```markdown  theme={null}
---
name: My Custom Style
description:
  A brief description of what this style does, to be displayed to the user
---

# Custom Style Instructions

You are an interactive CLI tool that helps users with software engineering
tasks. [Your custom instructions here...]

## Specific Behaviors

[Define how the assistant should behave in this style...]
```

You can also create your own output style Markdown files and save them either at
the user level (`~/.Koode/output-styles`) or the project level
(`.Koode/output-styles`).

## Comparisons to related features

### Output Styles vs. Koode.md vs. --append-system-prompt

Output styles completely “turn off” the parts of Koode Code’s default system
prompt specific to software engineering. Neither Koode.md nor
`--append-system-prompt` edit Koode Code’s default system prompt. Koode.md
adds the contents as a user message *following* Koode Code’s default system
prompt. `--append-system-prompt` appends the content to the system prompt.

### Output Styles vs. [Agents](/en/docs/Koode-code/sub-agents)

Output styles directly affect the main agent loop and only affect the system
prompt. Agents are invoked to handle specific tasks and can include additional
settings like the model to use, the tools they have available, and some context
about when to use the agent.

### Output Styles vs. [Custom Slash Commands](/en/docs/Koode-code/slash-commands)

You can think of output styles as “stored system prompts” and custom slash
commands as “stored prompts”.

# Headless mode

> Run Koode Code programmatically without interactive UI

## Overview

The headless mode allows you to run Koode Code programmatically from command line scripts and automation tools without any interactive UI.

## Basic usage

The primary command-line interface to Koode Code is the `Koode` command. Use the `--print` (or `-p`) flag to run in non-interactive mode and print the final result:

```bash  theme={null}
Koode -p "Stage my changes and write a set of commits for them" \
  --allowedTools "Bash,Read" \
  --permission-mode acceptEdits
```

## Configuration Options

Headless mode leverages all the CLI options available in Koode Code. Here are the key ones for automation and scripting:

| Flag                       | Description                                                                                            | Example                                                                                                                   |
| :------------------------- | :----------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| `--print`, `-p`            | Run in non-interactive mode                                                                            | `Koode -p "query"`                                                                                                       |
| `--output-format`          | Specify output format (`text`, `json`, `stream-json`)                                                  | `Koode -p --output-format json`                                                                                          |
| `--resume`, `-r`           | Resume a conversation by session ID                                                                    | `Koode --resume abc123`                                                                                                  |
| `--continue`, `-c`         | Continue the most recent conversation                                                                  | `Koode --continue`                                                                                                       |
| `--verbose`                | Enable verbose logging                                                                                 | `Koode --verbose`                                                                                                        |
| `--append-system-prompt`   | Append to system prompt (only with `--print`)                                                          | `Koode --append-system-prompt "Custom instruction"`                                                                      |
| `--allowedTools`           | Space-separated list of allowed tools, or <br /><br /> string of comma-separated list of allowed tools | `Koode --allowedTools mcp__slack mcp__filesystem`<br /><br />`Koode --allowedTools "Bash(npm install),mcp__filesystem"` |
| `--disallowedTools`        | Space-separated list of denied tools, or <br /><br /> string of comma-separated list of denied tools   | `Koode --disallowedTools mcp__splunk mcp__github`<br /><br />`Koode --disallowedTools "Bash(git commit),mcp__github"`   |
| `--mcp-config`             | Load MCP servers from a JSON file                                                                      | `Koode --mcp-config servers.json`                                                                                        |
| `--permission-prompt-tool` | MCP tool for handling permission prompts (only with `--print`)                                         | `Koode --permission-prompt-tool mcp__auth__prompt`                                                                       |

For a complete list of CLI options and features, see the [CLI reference](/en/docs/Koode-code/cli-reference) documentation.

## Multi-turn conversations

For multi-turn conversations, you can resume conversations or continue from the most recent session:

```bash  theme={null}
# Continue the most recent conversation
Koode --continue "Now refactor this for better performance"

# Resume a specific conversation by session ID
Koode --resume 550e8400-e29b-41d4-a716-446655440000 "Update the tests"

# Resume in non-interactive mode
Koode --resume 550e8400-e29b-41d4-a716-446655440000 "Fix all linting issues" --no-interactive
```

## Output Formats

### Text Output (Default)

```bash  theme={null}
Koode -p "Explain file src/components/Header.tsx"
# Output: This is a React component showing...
```

### JSON Output

Returns structured data including metadata:

```bash  theme={null}
Koode -p "How does the data layer work?" --output-format json
```

Response format:

```json  theme={null}
{
  "type": "result",
  "subtype": "success",
  "total_cost_usd": 0.003,
  "is_error": false,
  "duration_ms": 1234,
  "duration_api_ms": 800,
  "num_turns": 6,
  "result": "The response text here...",
  "session_id": "abc123"
}
```

### Streaming JSON Output

Streams each message as it is received:

```bash  theme={null}
Koode -p "Build an application" --output-format stream-json
```

Each conversation begins with an initial `init` system message, followed by a list of user and assistant messages, followed by a final `result` system message with stats. Each message is emitted as a separate JSON object.

## Input Formats

### Text Input (Default)

```bash  theme={null}
# Direct argument
Koode -p "Explain this code"

# From stdin
echo "Explain this code" | Koode -p
```

### Streaming JSON Input

A stream of messages provided via `stdin` where each message represents a user turn. This allows multiple turns of a conversation without re-launching the `Koode` binary and allows providing guidance to the model while it is processing a request.

Each message is a JSON 'User message' object, following the same format as the output message schema. Messages are formatted using the [jsonl](https://jsonlines.org/) format where each line of input is a complete JSON object. Streaming JSON input requires `-p` and `--output-format stream-json`.

```bash  theme={null}
echo '{"type":"user","message":{"role":"user","content":[{"type":"text","text":"Explain this code"}]}}' | Koode -p --output-format=stream-json --input-format=stream-json --verbose
```

## Agent Integration Examples

### SRE Incident Response Bot

```bash  theme={null}
#!/bin/bash

# Automated incident response agent
investigate_incident() {
    local incident_description="$1"
    local severity="${2:-medium}"

    Koode -p "Incident: $incident_description (Severity: $severity)" \
      --append-system-prompt "You are an SRE expert. Diagnose the issue, assess impact, and provide immediate action items." \
      --output-format json \
      --allowedTools "Bash,Read,WebSearch,mcp__datadog" \
      --mcp-config monitoring-tools.json
}

# Usage
investigate_incident "Payment API returning 500 errors" "high"
```

### Automated Security Review

```bash  theme={null}
# Security audit agent for pull requests
audit_pr() {
    local pr_number="$1"

    gh pr diff "$pr_number" | Koode -p \
      --append-system-prompt "You are a security engineer. Review this PR for vulnerabilities, insecure patterns, and compliance issues." \
      --output-format json \
      --allowedTools "Read,Grep,WebSearch"
}

# Usage and save to file
audit_pr 123 > security-report.json
```

### Multi-turn Legal Assistant

```bash  theme={null}
# Legal document review with session persistence
session_id=$(Koode -p "Start legal review session" --output-format json | jq -r '.session_id')

# Review contract in multiple steps
Koode -p --resume "$session_id" "Review contract.pdf for liability clauses"
Koode -p --resume "$session_id" "Check compliance with GDPR requirements"
Koode -p --resume "$session_id" "Generate executive summary of risks"
```

## Best Practices

* **Use JSON output format** for programmatic parsing of responses:

  ```bash  theme={null}
  # Parse JSON response with jq
  result=$(Koode -p "Generate code" --output-format json)
  code=$(echo "$result" | jq -r '.result')
  cost=$(echo "$result" | jq -r '.cost_usd')
  ```

* **Handle errors gracefully** - check exit codes and stderr:

  ```bash  theme={null}
  if ! Koode -p "$prompt" 2>error.log; then
      echo "Error occurred:" >&2
      cat error.log >&2
      exit 1
  fi
  ```

* **Use session management** for maintaining context in multi-turn conversations

* **Consider timeouts** for long-running operations:

  ```bash  theme={null}
  timeout 300 Koode -p "$complex_prompt" || echo "Timed out after 5 minutes"
  ```

* **Respect rate limits** when making multiple requests by adding delays between calls

## Related Resources

* [CLI usage and controls](/en/docs/Koode-code/cli-reference) - Complete CLI documentation
* [Common workflows](/en/docs/Koode-code/common-workflows) - Step-by-step guides for common use cases

# Connect Koode Code to tools via MCP

> Learn how to connect Koode Code to your tools with the Model Context Protocol.

export const MCPServersTable = ({platform = "all"}) => {
  const generateKoodeCodeCommand = server => {
    if (server.customCommands && server.customCommands.KoodeCode) {
      return server.customCommands.KoodeCode;
    }
    if (server.urls.http) {
      return `Koode mcp add --transport http ${server.name.toLowerCase().replace(/[^a-z0-9]/g, '-')} ${server.urls.http}`;
    }
    if (server.urls.sse) {
      return `Koode mcp add --transport sse ${server.name.toLowerCase().replace(/[^a-z0-9]/g, '-')} ${server.urls.sse}`;
    }
    if (server.urls.stdio) {
      const envFlags = server.authentication && server.authentication.envVars ? server.authentication.envVars.map(v => `--env ${v}=YOUR_${v.split('_').pop()}`).join(' ') : '';
      const baseCommand = `Koode mcp add --transport stdio ${server.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
      return envFlags ? `${baseCommand} ${envFlags} -- ${server.urls.stdio}` : `${baseCommand} -- ${server.urls.stdio}`;
    }
    return null;
  };
  const servers = [{
    name: "Airtable",
    category: "Databases & Data Management",
    description: "Read/write records, manage bases and tables",
    documentation: "https://github.com/domdomegg/airtable-mcp-server",
    urls: {
      stdio: "npx -y airtable-mcp-server"
    },
    authentication: {
      type: "api_key",
      envVars: ["AIRTABLE_API_KEY"]
    },
    availability: {
      KoodeCode: true,
      mcpConnector: false,
      KoodeDesktop: true
    }
  }, {
    name: "Figma",
    category: "Design & Media",
    description: "Generate better code by bringing in full Figma context",
    documentation: "https://developers.figma.com",
    urls: {
      http: "https://mcp.figma.com/mcp"
    },
    customCommands: {
      KoodeCode: "Koode mcp add --transport http figma-remote-mcp https://mcp.figma.com/mcp"
    },
    availability: {
      KoodeCode: true,
      mcpConnector: false,
      KoodeDesktop: false
    },
    notes: "Visit developers.figma.com for local server setup."
  }, {
    name: "Asana",
    category: "Project Management & Documentation",
    description: "Interact with your Asana workspace to keep projects on track",
    documentation: "https://developers.asana.com/docs/using-asanas-model-control-protocol-mcp-server",
    urls: {
      sse: "https://mcp.asana.com/sse"
    },
    authentication: {
      type: "oauth"
    },
    availability: {
      KoodeCode: true,
      mcpConnector: true,
      KoodeDesktop: false
    }
  }, {
    name: "Atlassian",
    category: "Project Management & Documentation",
    description: "Manage your Jira tickets and Confluence docs",
    documentation: "https://www.atlassian.com/platform/remote-mcp-server",
    urls: {
      sse: "https://mcp.atlassian.com/v1/sse"
    },
    authentication: {
      type: "oauth"
    },
    availability: {
      KoodeCode: true,
      mcpConnector: true,
      KoodeDesktop: false
    }
  }, {
    name: "ClickUp",
    category: "Project Management & Documentation",
    description: "Task management, project tracking",
    documentation: "https://github.com/hauptsacheNet/clickup-mcp",
    urls: {
      stdio: "npx -y @hauptsache.net/clickup-mcp"
    },
    authentication: {
      type: "api_key",
      envVars: ["CLICKUP_API_KEY", "CLICKUP_TEAM_ID"]
    },
    availability: {
      KoodeCode: true,
      mcpConnector: false,
      KoodeDesktop: true
    }
  }, {
    name: "Cloudflare",
    category: "Infrastructure & DevOps",
    description: "Build applications, analyze traffic, monitor performance, and manage security settings through Cloudflare",
    documentation: "https://developers.cloudflare.com/agents/model-context-protocol/mcp-servers-for-cloudflare/",
    urls: {},
    availability: {
      KoodeCode: true,
      mcpConnector: true,
      KoodeDesktop: false
    },
    notes: "Multiple services available. See documentation for specific server URLs. Koode Code can use the Cloudflare CLI if installed."
  }, {
    name: "Cloudinary",
    category: "Design & Media",
    description: "Upload, manage, transform, and analyze your media assets",
    documentation: "https://cloudinary.com/documentation/cloudinary_llm_mcp#mcp_servers",
    urls: {},
    authentication: {
      type: "oauth"
    },
    availability: {
      KoodeCode: true,
      mcpConnector: true,
      KoodeDesktop: false
    },
    notes: "Multiple services available. See documentation for specific server URLs."
  }, {
    name: "Intercom",
    category: "Project Management & Documentation",
    description: "Access real-time customer conversations, tickets, and user data",
    documentation: "https://developers.intercom.com/docs/guides/mcp",
    urls: {
      http: "https://mcp.intercom.com/mcp"
    },
    authentication: {
      type: "oauth"
    },
    availability: {
      KoodeCode: true,
      mcpConnector: true,
      KoodeDesktop: false
    }
  }, {
    name: "invideo",
    category: "Design & Media",
    description: "Build video creation capabilities into your applications",
    documentation: "https://invideo.io/ai/mcp",
    urls: {
      sse: "https://mcp.invideo.io/sse"
    },
    authentication: {
      type: "oauth"
    },
    availability: {
      KoodeCode: true,
      mcpConnector: true,
      KoodeDesktop: false
    }
  }, {
    name: "Linear",
    category: "Project Management & Documentation",
    description: "Integrate with Linear's issue tracking and project management",
    documentation: "https://linear.app/docs/mcp",
    urls: {
      http: "https://mcp.linear.app/mcp"
    },
    authentication: {
      type: "oauth"
    },
    availability: {
      KoodeCode: true,
      mcpConnector: true,
      KoodeDesktop: false
    }
  }, {
    name: "Notion",
    category: "Project Management & Documentation",
    description: "Read docs, update pages, manage tasks",
    documentation: "https://developers.notion.com/docs/mcp",
    urls: {
      http: "https://mcp.notion.com/mcp"
    },
    authentication: {
      type: "oauth"
    },
    availability: {
      KoodeCode: true,
      mcpConnector: false,
      KoodeDesktop: false
    }
  }, {
    name: "PayPal",
    category: "Payments & Commerce",
    description: "Integrate PayPal commerce capabilities, payment processing, transaction management",
    documentation: "https://www.paypal.ai/",
    urls: {
      http: "https://mcp.paypal.com/mcp"
    },
    authentication: {
      type: "oauth"
    },
    availability: {
      KoodeCode: true,
      mcpConnector: true,
      KoodeDesktop: false
    }
  }, {
    name: "Plaid",
    category: "Payments & Commerce",
    description: "Analyze, troubleshoot, and optimize Plaid integrations. Banking data, financial account linking",
    documentation: "https://plaid.com/blog/plaid-mcp-ai-assistant-Koode/",
    urls: {
      sse: "https://api.dashboard.plaid.com/mcp/sse"
    },
    authentication: {
      type: "oauth"
    },
    availability: {
      KoodeCode: true,
      mcpConnector: true,
      KoodeDesktop: false
    }
  }, {
    name: "Sentry",
    category: "Development & Testing Tools",
    description: "Monitor errors, debug production issues",
    documentation: "https://docs.sentry.io/product/sentry-mcp/",
    urls: {
      http: "https://mcp.sentry.dev/mcp"
    },
    authentication: {
      type: "oauth"
    },
    availability: {
      KoodeCode: true,
      mcpConnector: false,
      KoodeDesktop: false
    }
  }, {
    name: "Square",
    category: "Payments & Commerce",
    description: "Use an agent to build on Square APIs. Payments, inventory, orders, and more",
    documentation: "https://developer.squareup.com/docs/mcp",
    urls: {
      sse: "https://mcp.squareup.com/sse"
    },
    authentication: {
      type: "oauth"
    },
    availability: {
      KoodeCode: true,
      mcpConnector: true,
      KoodeDesktop: false
    }
  }, {
    name: "Socket",
    category: "Development & Testing Tools",
    description: "Security analysis for dependencies",
    documentation: "https://github.com/SocketDev/socket-mcp",
    urls: {
      http: "https://mcp.socket.dev/"
    },
    authentication: {
      type: "oauth"
    },
    availability: {
      KoodeCode: true,
      mcpConnector: false,
      KoodeDesktop: false
    }
  }, {
    name: "Stripe",
    category: "Payments & Commerce",
    description: "Payment processing, subscription management, and financial transactions",
    documentation: "https://docs.stripe.com/mcp",
    urls: {
      http: "https://mcp.stripe.com"
    },
    authentication: {
      type: "oauth"
    },
    availability: {
      KoodeCode: true,
      mcpConnector: true,
      KoodeDesktop: false
    }
  }, {
    name: "Workato",
    category: "Automation & Integration",
    description: "Access any application, workflows or data via Workato, made accessible for AI",
    documentation: "https://docs.workato.com/mcp.html",
    urls: {},
    availability: {
      KoodeCode: true,
      mcpConnector: true,
      KoodeDesktop: false
    },
    notes: "MCP servers are programmatically generated"
  }, {
    name: "Zapier",
    category: "Automation & Integration",
    description: "Connect to nearly 8,000 apps through Zapier's automation platform",
    documentation: "https://help.zapier.com/hc/en-us/articles/36265392843917",
    urls: {},
    availability: {
      KoodeCode: true,
      mcpConnector: true,
      KoodeDesktop: false
    },
    notes: "Generate a user-specific URL at mcp.zapier.com"
  }, {
    name: "Box",
    category: "Project Management & Documentation",
    description: "Ask questions about your enterprise content, get insights from unstructured data, automate content workflows",
    documentation: "https://box.dev/guides/box-mcp/remote/",
    urls: {
      http: "https://mcp.box.com/"
    },
    authentication: {
      type: "oauth"
    },
    availability: {
      KoodeCode: true,
      mcpConnector: true,
      KoodeDesktop: false
    }
  }, {
    name: "Canva",
    category: "Design & Media",
    description: "Browse, summarize, autofill, and even generate new Canva designs directly from Koode",
    documentation: "https://www.canva.dev/docs/connect/canva-mcp-server-setup/",
    urls: {
      http: "https://mcp.canva.com/mcp"
    },
    authentication: {
      type: "oauth"
    },
    availability: {
      KoodeCode: true,
      mcpConnector: true,
      KoodeDesktop: false
    }
  }, {
    name: "Daloopa",
    category: "Databases & Data Management",
    description: "Supplies high quality fundamental financial data sourced from SEC Filings, investor presentations",
    documentation: "https://docs.daloopa.com/docs/daloopa-mcp",
    urls: {
      http: "https://mcp.daloopa.com/server/mcp"
    },
    authentication: {
      type: "oauth"
    },
    availability: {
      KoodeCode: true,
      mcpConnector: true,
      KoodeDesktop: false
    }
  }, {
    name: "Fireflies",
    category: "Project Management & Documentation",
    description: "Extract valuable insights from meeting transcripts and summaries",
    documentation: "https://guide.fireflies.ai/articles/8272956938-learn-about-the-fireflies-mcp-server-model-context-protocol",
    urls: {
      http: "https://api.fireflies.ai/mcp"
    },
    authentication: {
      type: "oauth"
    },
    availability: {
      KoodeCode: true,
      mcpConnector: true,
      KoodeDesktop: false
    }
  }, {
    name: "HubSpot",
    category: "Databases & Data Management",
    description: "Access and manage HubSpot CRM data by fetching contacts, companies, and deals, and creating and updating records",
    documentation: "https://developers.hubspot.com/mcp",
    urls: {
      http: "https://mcp.hubspot.com/paulohenriquevn"
    },
    authentication: {
      type: "oauth"
    },
    availability: {
      KoodeCode: true,
      mcpConnector: true,
      KoodeDesktop: false
    }
  }, {
    name: "Hugging Face",
    category: "Development & Testing Tools",
    description: "Provides access to Hugging Face Hub information and Gradio AI Applications",
    documentation: "https://huggingface.co/settings/mcp",
    urls: {
      http: "https://huggingface.co/mcp"
    },
    authentication: {
      type: "oauth"
    },
    availability: {
      KoodeCode: true,
      mcpConnector: true,
      KoodeDesktop: false
    }
  }, {
    name: "Jam",
    category: "Development & Testing Tools",
    description: "Debug faster with AI agents that can access Jam recordings like video, console logs, network requests, and errors",
    documentation: "https://jam.dev/docs/debug-a-jam/mcp",
    urls: {
      http: "https://mcp.jam.dev/mcp"
    },
    authentication: {
      type: "oauth"
    },
    availability: {
      KoodeCode: true,
      mcpConnector: true,
      KoodeDesktop: false
    }
  }, {
    name: "Monday",
    category: "Project Management & Documentation",
    description: "Manage monday.com boards by creating items, updating columns, assigning owners, setting timelines, adding CRM activities, and writing summaries",
    documentation: "https://developer.monday.com/apps/docs/mondaycom-mcp-integration",
    urls: {
      sse: "https://mcp.monday.com/sse"
    },
    authentication: {
      type: "oauth"
    },
    availability: {
      KoodeCode: true,
      mcpConnector: true,
      KoodeDesktop: false
    }
  }, {
    name: "Netlify",
    category: "Infrastructure & DevOps",
    description: "Create, deploy, and manage websites on Netlify. Control all aspects of your site from creating secrets to enforcing access controls to aggregating form submissions",
    documentation: "https://docs.netlify.com/build/build-with-ai/netlify-mcp-server/",
    urls: {
      http: "https://netlify-mcp.netlify.app/mcp"
    },
    authentication: {
      type: "oauth"
    },
    availability: {
      KoodeCode: true,
      mcpConnector: true,
      KoodeDesktop: false
    }
  }, {
    name: "Stytch",
    category: "Infrastructure & DevOps",
    description: "Configure and manage Stytch authentication services, redirect URLs, email templates, and workspace settings",
    documentation: "https://stytch.com/docs/workspace-management/stytch-mcp",
    urls: {
      http: "http://mcp.stytch.dev/mcp"
    },
    authentication: {
      type: "oauth"
    },
    availability: {
      KoodeCode: true,
      mcpConnector: true,
      KoodeDesktop: false
    }
  }, {
    name: "Vercel",
    category: "Infrastructure & DevOps",
    description: "Vercel's official MCP server, allowing you to search and navigate documentation, manage projects and deployments, and analyze deployment logs—all in one place",
    documentation: "https://vercel.com/docs/mcp/vercel-mcp",
    urls: {
      http: "https://mcp.vercel.com/"
    },
    authentication: {
      type: "oauth"
    },
    availability: {
      KoodeCode: true,
      mcpConnector: true,
      KoodeDesktop: false
    }
  }];
  const filteredServers = servers.filter(server => {
    if (platform === "KoodeCode") {
      return server.availability.KoodeCode;
    } else if (platform === "mcpConnector") {
      return server.availability.mcpConnector;
    } else if (platform === "KoodeDesktop") {
      return server.availability.KoodeDesktop;
    } else if (platform === "all") {
      return true;
    } else {
      throw new Error(`Unknown platform: ${platform}`);
    }
  });
  const serversByCategory = filteredServers.reduce((acc, server) => {
    if (!acc[server.category]) {
      acc[server.category] = [];
    }
    acc[server.category].push(server);
    return acc;
  }, {});
  const categoryOrder = ["Development & Testing Tools", "Project Management & Documentation", "Databases & Data Management", "Payments & Commerce", "Design & Media", "Infrastructure & DevOps", "Automation & Integration"];
  return <>
      <style jsx>{`
        .cards-container {
          display: grid;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .server-card {
          border: 1px solid var(--border-color, #e5e7eb);
          border-radius: 6px;
          padding: 1rem;
        }
        .command-row {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        .command-row code {
          font-size: 0.75rem;
          overflow-x: auto;
        }
      `}</style>
      
      {categoryOrder.map(category => {
    if (!serversByCategory[category]) return null;
    return <div key={category}>
            <h3>{category}</h3>
            <div className="cards-container">
              {serversByCategory[category].map(server => {
      const KoodeCodeCommand = generateKoodeCodeCommand(server);
      const mcpUrl = server.urls.http || server.urls.sse;
      const commandToShow = platform === "KoodeCode" ? KoodeCodeCommand : mcpUrl;
      return <div key={server.name} className="server-card">
                    <div>
                      {server.documentation ? <a href={server.documentation}>
                          <strong>{server.name}</strong>
                        </a> : <strong>{server.name}</strong>}
                    </div>
                    
                    <p style={{
        margin: '0.5rem 0',
        fontSize: '0.9rem'
      }}>
                      {server.description}
                      {server.notes && <span style={{
        display: 'block',
        marginTop: '0.25rem',
        fontSize: '0.8rem',
        fontStyle: 'italic',
        opacity: 0.7
      }}>
                          {server.notes}
                        </span>}
                    </p>
                    
                    {commandToShow && <>
                      <p style={{
        display: 'block',
        fontSize: '0.75rem',
        fontWeight: 500,
        minWidth: 'fit-content',
        marginTop: '0.5rem',
        marginBottom: 0
      }}>
                        {platform === "KoodeCode" ? "Command" : "URL"}
                      </p>
                      <div className="command-row">
                        <code>
                          {commandToShow}
                        </code>
                      </div>
                    </>}
                  </div>;
    })}
            </div>
          </div>;
  })}
    </>;
};

Koode Code can connect to hundreds of external tools and data sources through the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction), an open-source standard for AI-tool integrations. MCP servers give Koode Code access to your tools, databases, and APIs.

## What you can do with MCP

With MCP servers connected, you can ask Koode Code to:

* **Implement features from issue trackers**: "Add the feature described in JIRA issue ENG-4521 and create a PR on GitHub."
* **Analyze monitoring data**: "Check Sentry and Statsig to check the usage of the feature described in ENG-4521."
* **Query databases**: "Find emails of 10 random users who used feature ENG-4521, based on our Postgres database."
* **Integrate designs**: "Update our standard email template based on the new Figma designs that were posted in Slack"
* **Automate workflows**: "Create Gmail drafts inviting these 10 users to a feedback session about the new feature."

## Popular MCP servers

Here are some commonly used MCP servers you can connect to Koode Code:

<Warning>
  Use third party MCP servers at your own risk - paulohenriquevn has not verified
  the correctness or security of all these servers.
  Make sure you trust MCP servers you are installing.
  Be especially careful when using MCP servers that could fetch untrusted
  content, as these can expose you to prompt injection risk.
</Warning>

<MCPServersTable platform="KoodeCode" />

<Note>
  **Need a specific integration?** [Find hundreds more MCP servers on GitHub](https://github.com/modelcontextprotocol/servers), or build your own using the [MCP SDK](https://modelcontextprotocol.io/quickstart/server).
</Note>

## Installing MCP servers

MCP servers can be configured in three different ways depending on your needs:

### Option 1: Add a remote HTTP server

HTTP servers are the recommended option for connecting to remote MCP servers. This is the most widely supported transport for cloud-based services.

```bash  theme={null}
# Basic syntax
Koode mcp add --transport http <name> <url>

# Real example: Connect to Notion
Koode mcp add --transport http notion https://mcp.notion.com/mcp

# Example with Bearer token
Koode mcp add --transport http secure-api https://api.example.com/mcp \
  --header "Authorization: Bearer your-token"
```

### Option 2: Add a remote SSE server

<Warning>
  The SSE (Server-Sent Events) transport is deprecated. Use HTTP servers instead, where available.
</Warning>

```bash  theme={null}
# Basic syntax
Koode mcp add --transport sse <name> <url>

# Real example: Connect to Asana
Koode mcp add --transport sse asana https://mcp.asana.com/sse

# Example with authentication header
Koode mcp add --transport sse private-api https://api.company.com/sse \
  --header "X-API-Key: your-key-here"
```

### Option 3: Add a local stdio server

Stdio servers run as local processes on your machine. They're ideal for tools that need direct system access or custom scripts.

```bash  theme={null}
# Basic syntax
Koode mcp add --transport stdio <name> <command> [args...]

# Real example: Add Airtable server
Koode mcp add --transport stdio airtable --env AIRTABLE_API_KEY=YOUR_KEY \
  -- npx -y airtable-mcp-server
```

<Note>
  **Understanding the "--" parameter:**
  The `--` (double dash) separates Koode's own CLI flags from the command and arguments that get passed to the MCP server. Everything before `--` are options for Koode (like `--env`, `--scope`), and everything after `--` is the actual command to run the MCP server.

  For example:

  * `Koode mcp add --transport stdio myserver -- npx server` → runs `npx server`
  * `Koode mcp add --transport stdio myserver --env KEY=value -- python server.py --port 8080` → runs `python server.py --port 8080` with `KEY=value` in environment

  This prevents conflicts between Koode's flags and the server's flags.
</Note>

### Managing your servers

Once configured, you can manage your MCP servers with these commands:

```bash  theme={null}
# List all configured servers
Koode mcp list

# Get details for a specific server
Koode mcp get github

# Remove a server
Koode mcp remove github

# (within Koode Code) Check server status
/mcp
```

<Tip>
  Tips:

  * Use the `--scope` flag to specify where the configuration is stored:
    * `local` (default): Available only to you in the current project (was called `project` in older versions)
    * `project`: Shared with everyone in the project via `.mcp.json` file
    * `user`: Available to you across all projects (was called `global` in older versions)
  * Set environment variables with `--env` flags (e.g., `--env KEY=value`)
  * Configure MCP server startup timeout using the MCP\_TIMEOUT environment variable (e.g., `MCP_TIMEOUT=10000 Koode` sets a 10-second timeout)
  * Koode Code will display a warning when MCP tool output exceeds 10,000 tokens. To increase this limit, set the `MAX_MCP_OUTPUT_TOKENS` environment variable (e.g., `MAX_MCP_OUTPUT_TOKENS=50000`)
  * Use `/mcp` to authenticate with remote servers that require OAuth 2.0 authentication
</Tip>

<Warning>
  **Windows Users**: On native Windows (not WSL), local MCP servers that use `npx` require the `cmd /c` wrapper to ensure proper execution.

  ```bash  theme={null}
  # This creates command="cmd" which Windows can execute
  Koode mcp add --transport stdio my-server -- cmd /c npx -y @some/package
  ```

  Without the `cmd /c` wrapper, you'll encounter "Connection closed" errors because Windows cannot directly execute `npx`. (See the note above for an explanation of the `--` parameter.)
</Warning>

### Plugin-provided MCP servers

[Plugins](/en/docs/Koode-code/plugins) can bundle MCP servers, automatically providing tools and integrations when the plugin is enabled. Plugin MCP servers work identically to user-configured servers.

**How plugin MCP servers work**:

* Plugins define MCP servers in `.mcp.json` at the plugin root or inline in `plugin.json`
* When a plugin is enabled, its MCP servers start automatically
* Plugin MCP tools appear alongside manually configured MCP tools
* Plugin servers are managed through plugin installation (not `/mcp` commands)

**Example plugin MCP configuration**:

In `.mcp.json` at plugin root:

```json  theme={null}
{
  "database-tools": {
    "command": "${KOODE_PLUGIN_ROOT}/servers/db-server",
    "args": ["--config", "${KOODE_PLUGIN_ROOT}/config.json"],
    "env": {
      "DB_URL": "${DB_URL}"
    }
  }
}
```

Or inline in `plugin.json`:

```json  theme={null}
{
  "name": "my-plugin",
  "mcpServers": {
    "plugin-api": {
      "command": "${KOODE_PLUGIN_ROOT}/servers/api-server",
      "args": ["--port", "8080"]
    }
  }
}
```

**Plugin MCP features**:

* **Automatic lifecycle**: Servers start when plugin enables, but you must restart Koode Code to apply MCP server changes (enabling or disabling)
* **Environment variables**: Use `${KOODE_PLUGIN_ROOT}` for plugin-relative paths
* **User environment access**: Access to same environment variables as manually configured servers
* **Multiple transport types**: Support stdio, SSE, and HTTP transports (transport support may vary by server)

**Viewing plugin MCP servers**:

```bash  theme={null}
# Within Koode Code, see all MCP servers including plugin ones
/mcp
```

Plugin servers appear in the list with indicators showing they come from plugins.

**Benefits of plugin MCP servers**:

* **Bundled distribution**: Tools and servers packaged together
* **Automatic setup**: No manual MCP configuration needed
* **Team consistency**: Everyone gets the same tools when plugin is installed

See the [plugin components reference](/en/docs/Koode-code/plugins-reference#mcp-servers) for details on bundling MCP servers with plugins.

## MCP installation scopes

MCP servers can be configured at three different scope levels, each serving distinct purposes for managing server accessibility and sharing. Understanding these scopes helps you determine the best way to configure servers for your specific needs.

### Local scope

Local-scoped servers represent the default configuration level and are stored in your project-specific user settings. These servers remain private to you and are only accessible when working within the current project directory. This scope is ideal for personal development servers, experimental configurations, or servers containing sensitive credentials that shouldn't be shared.

```bash  theme={null}
# Add a local-scoped server (default)
Koode mcp add --transport http stripe https://mcp.stripe.com

# Explicitly specify local scope
Koode mcp add --transport http stripe --scope local https://mcp.stripe.com
```

### Project scope

Project-scoped servers enable team collaboration by storing configurations in a `.mcp.json` file at your project's root directory. This file is designed to be checked into version control, ensuring all team members have access to the same MCP tools and services. When you add a project-scoped server, Koode Code automatically creates or updates this file with the appropriate configuration structure.

```bash  theme={null}
# Add a project-scoped server
Koode mcp add --transport http paypal --scope project https://mcp.paypal.com/mcp
```

The resulting `.mcp.json` file follows a standardized format:

```json  theme={null}
{
  "mcpServers": {
    "shared-server": {
      "command": "/path/to/server",
      "args": [],
      "env": {}
    }
  }
}
```

For security reasons, Koode Code prompts for approval before using project-scoped servers from `.mcp.json` files. If you need to reset these approval choices, use the `Koode mcp reset-project-choices` command.

### User scope

User-scoped servers provide cross-project accessibility, making them available across all projects on your machine while remaining private to your user account. This scope works well for personal utility servers, development tools, or services you frequently use across different projects.

```bash  theme={null}
# Add a user server
Koode mcp add --transport http hubspot --scope user https://mcp.hubspot.com/paulohenriquevn
```

### Choosing the right scope

Select your scope based on:

* **Local scope**: Personal servers, experimental configurations, or sensitive credentials specific to one project
* **Project scope**: Team-shared servers, project-specific tools, or services required for collaboration
* **User scope**: Personal utilities needed across multiple projects, development tools, or frequently-used services

### Scope hierarchy and precedence

MCP server configurations follow a clear precedence hierarchy. When servers with the same name exist at multiple scopes, the system resolves conflicts by prioritizing local-scoped servers first, followed by project-scoped servers, and finally user-scoped servers. This design ensures that personal configurations can override shared ones when needed.

### Environment variable expansion in `.mcp.json`

Koode Code supports environment variable expansion in `.mcp.json` files, allowing teams to share configurations while maintaining flexibility for machine-specific paths and sensitive values like API keys.

**Supported syntax:**

* `${VAR}` - Expands to the value of environment variable `VAR`
* `${VAR:-default}` - Expands to `VAR` if set, otherwise uses `default`

**Expansion locations:**
Environment variables can be expanded in:

* `command` - The server executable path
* `args` - Command-line arguments
* `env` - Environment variables passed to the server
* `url` - For HTTP server types
* `headers` - For HTTP server authentication

**Example with variable expansion:**

```json  theme={null}
{
  "mcpServers": {
    "api-server": {
      "type": "http",
      "url": "${API_BASE_URL:-https://api.example.com}/mcp",
      "headers": {
        "Authorization": "Bearer ${API_KEY}"
      }
    }
  }
}
```

If a required environment variable is not set and has no default value, Koode Code will fail to parse the config.

## Practical examples

{/* ### Example: Automate browser testing with Playwright

  ```bash
  # 1. Add the Playwright MCP server
  Koode mcp add --transport stdio playwright -- npx -y @playwright/mcp@latest

  # 2. Write and run browser tests
  > "Test if the login flow works with test@example.com"
  > "Take a screenshot of the checkout page on mobile"
  > "Verify that the search feature returns results"
  ``` */}

### Example: Monitor errors with Sentry

```bash  theme={null}
# 1. Add the Sentry MCP server
Koode mcp add --transport http sentry https://mcp.sentry.dev/mcp

# 2. Use /mcp to authenticate with your Sentry account
> /mcp

# 3. Debug production issues
> "What are the most common errors in the last 24 hours?"
> "Show me the stack trace for error ID abc123"
> "Which deployment introduced these new errors?"
```

### Example: Connect to GitHub for code reviews

```bash  theme={null}
# 1. Add the GitHub MCP server
Koode mcp add --transport http github https://api.githubcopilot.com/mcp/

# 2. In Koode Code, authenticate if needed
> /mcp
# Select "Authenticate" for GitHub

# 3. Now you can ask Koode to work with GitHub
> "Review PR #456 and suggest improvements"
> "Create a new issue for the bug we just found"
> "Show me all open PRs assigned to me"
```

### Example: Query your PostgreSQL database

```bash  theme={null}
# 1. Add the database server with your connection string
Koode mcp add --transport stdio db -- npx -y @bytebase/dbhub \
  --dsn "postgresql://readonly:pass@prod.db.com:5432/analytics"

# 2. Query your database naturally
> "What's our total revenue this month?"
> "Show me the schema for the orders table"
> "Find customers who haven't made a purchase in 90 days"
```

## Authenticate with remote MCP servers

Many cloud-based MCP servers require authentication. Koode Code supports OAuth 2.0 for secure connections.

<Steps>
  <Step title="Add the server that requires authentication">
    For example:

    ```bash  theme={null}
    Koode mcp add --transport http sentry https://mcp.sentry.dev/mcp
    ```
  </Step>

  <Step title="Use the /mcp command within Koode Code">
    In Koode code, use the command:

    ```
    > /mcp
    ```

    Then follow the steps in your browser to login.
  </Step>
</Steps>

<Tip>
  Tips:

  * Authentication tokens are stored securely and refreshed automatically
  * Use "Clear authentication" in the `/mcp` menu to revoke access
  * If your browser doesn't open automatically, copy the provided URL
  * OAuth authentication works with HTTP servers
</Tip>

## Add MCP servers from JSON configuration

If you have a JSON configuration for an MCP server, you can add it directly:

<Steps>
  <Step title="Add an MCP server from JSON">
    ```bash  theme={null}
    # Basic syntax
    Koode mcp add-json <name> '<json>'

    # Example: Adding an HTTP server with JSON configuration
    Koode mcp add-json weather-api '{"type":"http","url":"https://api.weather.com/mcp","headers":{"Authorization":"Bearer token"}}'

    # Example: Adding a stdio server with JSON configuration
    Koode mcp add-json local-weather '{"type":"stdio","command":"/path/to/weather-cli","args":["--api-key","abc123"],"env":{"CACHE_DIR":"/tmp"}}'
    ```
  </Step>

  <Step title="Verify the server was added">
    ```bash  theme={null}
    Koode mcp get weather-api
    ```
  </Step>
</Steps>

<Tip>
  Tips:

  * Make sure the JSON is properly escaped in your shell
  * The JSON must conform to the MCP server configuration schema
  * You can use `--scope user` to add the server to your user configuration instead of the project-specific one
</Tip>

## Import MCP servers from Koode Desktop

If you've already configured MCP servers in Koode Desktop, you can import them:

<Steps>
  <Step title="Import servers from Koode Desktop">
    ```bash  theme={null}
    # Basic syntax 
    Koode mcp add-from-Koode-desktop 
    ```
  </Step>

  <Step title="Select which servers to import">
    After running the command, you'll see an interactive dialog that allows you to select which servers you want to import.
  </Step>

  <Step title="Verify the servers were imported">
    ```bash  theme={null}
    Koode mcp list 
    ```
  </Step>
</Steps>

<Tip>
  Tips:

  * This feature only works on macOS and Windows Subsystem for Linux (WSL)
  * It reads the Koode Desktop configuration file from its standard location on those platforms
  * Use the `--scope user` flag to add servers to your user configuration
  * Imported servers will have the same names as in Koode Desktop
  * If servers with the same names already exist, they will get a numerical suffix (e.g., `server_1`)
</Tip>

## Use Koode Code as an MCP server

You can use Koode Code itself as an MCP server that other applications can connect to:

```bash  theme={null}
# Start Koode as a stdio MCP server
Koode mcp serve
```

You can use this in Koode Desktop by adding this configuration to Koode\_desktop\_config.json:

```json  theme={null}
{
  "mcpServers": {
    "Koode-code": {
      "type": "stdio",
      "command": "Koode",
      "args": ["mcp", "serve"],
      "env": {}
    }
  }
}
```

<Tip>
  Tips:

  * The server provides access to Koode's tools like View, Edit, LS, etc.
  * In Koode Desktop, try asking Koode to read files in a directory, make edits, and more.
  * Note that this MCP server is simply exposing Koode Code's tools to your MCP client, so your own client is responsible for implementing user confirmation for individual tool calls.
</Tip>

## MCP output limits and warnings

When MCP tools produce large outputs, Koode Code helps manage the token usage to prevent overwhelming your conversation context:

* **Output warning threshold**: Koode Code displays a warning when any MCP tool output exceeds 10,000 tokens
* **Configurable limit**: You can adjust the maximum allowed MCP output tokens using the `MAX_MCP_OUTPUT_TOKENS` environment variable
* **Default limit**: The default maximum is 25,000 tokens

To increase the limit for tools that produce large outputs:

```bash  theme={null}
# Set a higher limit for MCP tool outputs
export MAX_MCP_OUTPUT_TOKENS=50000
Koode
```

This is particularly useful when working with MCP servers that:

* Query large datasets or databases
* Generate detailed reports or documentation
* Process extensive log files or debugging information

<Warning>
  If you frequently encounter output warnings with specific MCP servers, consider increasing the limit or configuring the server to paginate or filter its responses.
</Warning>

## Use MCP resources

MCP servers can expose resources that you can reference using @ mentions, similar to how you reference files.

### Reference MCP resources

<Steps>
  <Step title="List available resources">
    Type `@` in your prompt to see available resources from all connected MCP servers. Resources appear alongside files in the autocomplete menu.
  </Step>

  <Step title="Reference a specific resource">
    Use the format `@server:protocol://resource/path` to reference a resource:

    ```
    > Can you analyze @github:issue://123 and suggest a fix?
    ```

    ```
    > Please review the API documentation at @docs:file://api/authentication
    ```
  </Step>

  <Step title="Multiple resource references">
    You can reference multiple resources in a single prompt:

    ```
    > Compare @postgres:schema://users with @docs:file://database/user-model
    ```
  </Step>
</Steps>

<Tip>
  Tips:

  * Resources are automatically fetched and included as attachments when referenced
  * Resource paths are fuzzy-searchable in the @ mention autocomplete
  * Koode Code automatically provides tools to list and read MCP resources when servers support them
  * Resources can contain any type of content that the MCP server provides (text, JSON, structured data, etc.)
</Tip>

## Use MCP prompts as slash commands

MCP servers can expose prompts that become available as slash commands in Koode Code.

### Execute MCP prompts

<Steps>
  <Step title="Discover available prompts">
    Type `/` to see all available commands, including those from MCP servers. MCP prompts appear with the format `/mcp__servername__promptname`.
  </Step>

  <Step title="Execute a prompt without arguments">
    ```
    > /mcp__github__list_prs
    ```
  </Step>

  <Step title="Execute a prompt with arguments">
    Many prompts accept arguments. Pass them space-separated after the command:

    ```
    > /mcp__github__pr_review 456
    ```

    ```
    > /mcp__jira__create_issue "Bug in login flow" high
    ```
  </Step>
</Steps>

<Tip>
  Tips:

  * MCP prompts are dynamically discovered from connected servers
  * Arguments are parsed based on the prompt's defined parameters
  * Prompt results are injected directly into the conversation
  * Server and prompt names are normalized (spaces become underscores)
</Tip>

## Enterprise MCP configuration

For organizations that need centralized control over MCP servers, Koode Code supports enterprise-managed MCP configurations. This allows IT administrators to:

* **Control which MCP servers employees can access**: Deploy a standardized set of approved MCP servers across the organization
* **Prevent unauthorized MCP servers**: Optionally restrict users from adding their own MCP servers
* **Disable MCP entirely**: Remove MCP functionality completely if needed

### Setting up enterprise MCP configuration

System administrators can deploy an enterprise MCP configuration file alongside the managed settings file:

* **macOS**: `/Library/Application Support/KoodeCode/managed-mcp.json`
* **Windows**: `C:\ProgramData\KoodeCode\managed-mcp.json`
* **Linux**: `/etc/Koode-code/managed-mcp.json`

The `managed-mcp.json` file uses the same format as a standard `.mcp.json` file:

```json  theme={null}
{
  "mcpServers": {
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp/"
    },
    "sentry": {
      "type": "http",
      "url": "https://mcp.sentry.dev/mcp"
    },
    "company-internal": {
      "type": "stdio",
      "command": "/usr/local/bin/company-mcp-server",
      "args": ["--config", "/etc/company/mcp-config.json"],
      "env": {
        "COMPANY_API_URL": "https://internal.company.com"
      }
    }
  }
}
```

<Note>
  **Enterprise configuration precedence**: The enterprise MCP configuration has the highest precedence and cannot be overridden by user, local, or project configurations when `useEnterpriseMcpConfigOnly` is enabled.
</Note>


# CLI reference

> Complete reference for Koode Code command-line interface, including commands and flags.

## CLI commands

| Command                            | Description                                    | Example                                                            |
| :--------------------------------- | :--------------------------------------------- | :----------------------------------------------------------------- |
| `Koode`                           | Start interactive REPL                         | `Koode`                                                           |
| `Koode "query"`                   | Start REPL with initial prompt                 | `Koode "explain this project"`                                    |
| `Koode -p "query"`                | Query via SDK, then exit                       | `Koode -p "explain this function"`                                |
| `cat file \| Koode -p "query"`    | Process piped content                          | `cat logs.txt \| Koode -p "explain"`                              |
| `Koode -c`                        | Continue most recent conversation              | `Koode -c`                                                        |
| `Koode -c -p "query"`             | Continue via SDK                               | `Koode -c -p "Check for type errors"`                             |
| `Koode -r "<session-id>" "query"` | Resume session by ID                           | `Koode -r "abc123" "Finish this PR"`                              |
| `Koode update`                    | Update to latest version                       | `Koode update`                                                    |
| `Koode mcp`                       | Configure Model Context Protocol (MCP) servers | See the [Koode Code MCP documentation](/en/docs/Koode-code/mcp). |

## CLI flags

Customize Koode Code's behavior with these command-line flags:

| Flag                             | Description                                                                                                                                              | Example                                                                                            |
| :------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------- |
| `--add-dir`                      | Add additional working directories for Koode to access (validates each path exists as a directory)                                                      | `Koode --add-dir ../apps ../lib`                                                                  |
| `--agents`                       | Define custom [subagents](/en/docs/Koode-code/sub-agents) dynamically via JSON (see below for format)                                                   | `Koode --agents '{"reviewer":{"description":"Reviews code","prompt":"You are a code reviewer"}}'` |
| `--allowedTools`                 | A list of tools that should be allowed without prompting the user for permission, in addition to [settings.json files](/en/docs/Koode-code/settings)    | `"Bash(git log:*)" "Bash(git diff:*)" "Read"`                                                      |
| `--disallowedTools`              | A list of tools that should be disallowed without prompting the user for permission, in addition to [settings.json files](/en/docs/Koode-code/settings) | `"Bash(git log:*)" "Bash(git diff:*)" "Edit"`                                                      |
| `--print`, `-p`                  | Print response without interactive mode (see [SDK documentation](/en/docs/Koode-code/sdk) for programmatic usage details)                               | `Koode -p "query"`                                                                                |
| `--append-system-prompt`         | Append to system prompt (only with `--print`)                                                                                                            | `Koode --append-system-prompt "Custom instruction"`                                               |
| `--output-format`                | Specify output format for print mode (options: `text`, `json`, `stream-json`)                                                                            | `Koode -p "query" --output-format json`                                                           |
| `--input-format`                 | Specify input format for print mode (options: `text`, `stream-json`)                                                                                     | `Koode -p --output-format json --input-format stream-json`                                        |
| `--include-partial-messages`     | Include partial streaming events in output (requires `--print` and `--output-format=stream-json`)                                                        | `Koode -p --output-format stream-json --include-partial-messages "query"`                         |
| `--verbose`                      | Enable verbose logging, shows full turn-by-turn output (helpful for debugging in both print and interactive modes)                                       | `Koode --verbose`                                                                                 |
| `--max-turns`                    | Limit the number of agentic turns in non-interactive mode                                                                                                | `Koode -p --max-turns 3 "query"`                                                                  |
| `--model`                        | Sets the model for the current session with an alias for the latest model (`sonnet` or `opus`) or a model's full name                                    | `Koode --model Koode-sonnet-4-5-20250929`                                                        |
| `--permission-mode`              | Begin in a specified [permission mode](iam#permission-modes)                                                                                             | `Koode --permission-mode plan`                                                                    |
| `--permission-prompt-tool`       | Specify an MCP tool to handle permission prompts in non-interactive mode                                                                                 | `Koode -p --permission-prompt-tool mcp_auth_tool "query"`                                         |
| `--resume`                       | Resume a specific session by ID, or by choosing in interactive mode                                                                                      | `Koode --resume abc123 "query"`                                                                   |
| `--continue`                     | Load the most recent conversation in the current directory                                                                                               | `Koode --continue`                                                                                |
| `--dangerously-skip-permissions` | Skip permission prompts (use with caution)                                                                                                               | `Koode --dangerously-skip-permissions`                                                            |

<Tip>
  The `--output-format json` flag is particularly useful for scripting and
  automation, allowing you to parse Koode's responses programmatically.
</Tip>

### Agents flag format

The `--agents` flag accepts a JSON object that defines one or more custom subagents. Each subagent requires a unique name (as the key) and a definition object with the following fields:

| Field         | Required | Description                                                                                                     |
| :------------ | :------- | :-------------------------------------------------------------------------------------------------------------- |
| `description` | Yes      | Natural language description of when the subagent should be invoked                                             |
| `prompt`      | Yes      | The system prompt that guides the subagent's behavior                                                           |
| `tools`       | No       | Array of specific tools the subagent can use (e.g., `["Read", "Edit", "Bash"]`). If omitted, inherits all tools |
| `model`       | No       | Model alias to use: `sonnet`, `opus`, or `haiku`. If omitted, uses the default subagent model                   |

Example:

```bash  theme={null}
Koode --agents '{
  "code-reviewer": {
    "description": "Expert code reviewer. Use proactively after code changes.",
    "prompt": "You are a senior code reviewer. Focus on code quality, security, and best practices.",
    "tools": ["Read", "Grep", "Glob", "Bash"],
    "model": "sonnet"
  },
  "debugger": {
    "description": "Debugging specialist for errors and test failures.",
    "prompt": "You are an expert debugger. Analyze errors, identify root causes, and provide fixes."
  }
}'
```

For more details on creating and using subagents, see the [subagents documentation](/en/docs/Koode-code/sub-agents).

For detailed information about print mode (`-p`) including output formats,
streaming, verbose logging, and programmatic usage, see the
[SDK documentation](/en/docs/Koode-code/sdk).

## See also

* [Interactive mode](/en/docs/Koode-code/interactive-mode) - Shortcuts, input modes, and interactive features
* [Slash commands](/en/docs/Koode-code/slash-commands) - Interactive session commands
* [Quickstart guide](/en/docs/Koode-code/quickstart) - Getting started with Koode Code
* [Common workflows](/en/docs/Koode-code/common-workflows) - Advanced workflows and patterns
* [Settings](/en/docs/Koode-code/settings) - Configuration options
* [SDK documentation](/en/docs/Koode-code/sdk) - Programmatic usage and integrations

# Interactive mode

> Complete reference for keyboard shortcuts, input modes, and interactive features in Koode Code sessions.

## Keyboard shortcuts

<Note>
  Keyboard shortcuts may vary by platform and terminal. Press `?` to see available shortcuts for your environment.
</Note>

### General controls

| Shortcut                                     | Description                                                              | Context                                                     |
| :------------------------------------------- | :----------------------------------------------------------------------- | :---------------------------------------------------------- |
| `Ctrl+C`                                     | Cancel current input or generation                                       | Standard interrupt                                          |
| `Ctrl+D`                                     | Exit Koode Code session                                                 | EOF signal                                                  |
| `Ctrl+L`                                     | Clear terminal screen                                                    | Keeps conversation history                                  |
| `Ctrl+O`                                     | Toggle verbose output                                                    | Shows detailed tool usage and execution                     |
| `Ctrl+R`                                     | Reverse search command history                                           | Search through previous commands interactively              |
| `Ctrl+V` (macOS/Linux) or `Alt+V` (Windows)  | Paste image from clipboard                                               | Pastes an image or path to an image file                    |
| `Up/Down arrows`                             | Navigate command history                                                 | Recall previous inputs                                      |
| `Esc` + `Esc`                                | Rewind the code/conversation                                             | Restore the code and/or conversation to a previous point    |
| `Tab`                                        | Toggle [extended thinking](/en/docs/build-with-Koode/extended-thinking) | Switch between Thinking on and Thinking off                 |
| `Shift+Tab` or `Alt+M` (some configurations) | Toggle permission modes                                                  | Switch between Auto-Accept Mode, Plan Mode, and normal mode |

### Multiline input

| Method           | Shortcut       | Context                           |
| :--------------- | :------------- | :-------------------------------- |
| Quick escape     | `\` + `Enter`  | Works in all terminals            |
| macOS default    | `Option+Enter` | Default on macOS                  |
| Terminal setup   | `Shift+Enter`  | After `/terminal-setup`           |
| Control sequence | `Ctrl+J`       | Line feed character for multiline |
| Paste mode       | Paste directly | For code blocks, logs             |

<Tip>
  Configure your preferred line break behavior in terminal settings. Run `/terminal-setup` to install Shift+Enter binding for iTerm2 and VS Code terminals.
</Tip>

### Quick commands

| Shortcut     | Description                        | Notes                                                         |
| :----------- | :--------------------------------- | :------------------------------------------------------------ |
| `#` at start | Memory shortcut - add to Koode.md | Prompts for file selection                                    |
| `/` at start | Slash command                      | See [slash commands](/en/docs/Koode-code/slash-commands)     |
| `!` at start | Bash mode                          | Run commands directly and add execution output to the session |
| `@`          | File path mention                  | Trigger file path autocomplete                                |

## Vim editor mode

Enable vim-style editing with `/vim` command or configure permanently via `/config`.

### Mode switching

| Command | Action                      | From mode |
| :------ | :-------------------------- | :-------- |
| `Esc`   | Enter NORMAL mode           | INSERT    |
| `i`     | Insert before cursor        | NORMAL    |
| `I`     | Insert at beginning of line | NORMAL    |
| `a`     | Insert after cursor         | NORMAL    |
| `A`     | Insert at end of line       | NORMAL    |
| `o`     | Open line below             | NORMAL    |
| `O`     | Open line above             | NORMAL    |

### Navigation (NORMAL mode)

| Command         | Action                    |
| :-------------- | :------------------------ |
| `h`/`j`/`k`/`l` | Move left/down/up/right   |
| `w`             | Next word                 |
| `e`             | End of word               |
| `b`             | Previous word             |
| `0`             | Beginning of line         |
| `$`             | End of line               |
| `^`             | First non-blank character |
| `gg`            | Beginning of input        |
| `G`             | End of input              |

### Editing (NORMAL mode)

| Command        | Action                  |
| :------------- | :---------------------- |
| `x`            | Delete character        |
| `dd`           | Delete line             |
| `D`            | Delete to end of line   |
| `dw`/`de`/`db` | Delete word/to end/back |
| `cc`           | Change line             |
| `C`            | Change to end of line   |
| `cw`/`ce`/`cb` | Change word/to end/back |
| `.`            | Repeat last change      |

## Command history

Koode Code maintains command history for the current session:

* History is stored per working directory
* Cleared with `/clear` command
* Use Up/Down arrows to navigate (see keyboard shortcuts above)
* **Note**: History expansion (`!`) is disabled by default

### Reverse search with Ctrl+R

Press `Ctrl+R` to interactively search through your command history:

1. **Start search**: Press `Ctrl+R` to activate reverse history search
2. **Type query**: Enter text to search for in previous commands - the search term will be highlighted in matching results
3. **Navigate matches**: Press `Ctrl+R` again to cycle through older matches
4. **Accept match**:
   * Press `Tab` or `Esc` to accept the current match and continue editing
   * Press `Enter` to accept and execute the command immediately
5. **Cancel search**:
   * Press `Ctrl+C` to cancel and restore your original input
   * Press `Backspace` on empty search to cancel

The search displays matching commands with the search term highlighted, making it easy to find and reuse previous inputs.

## Background bash commands

Koode Code supports running bash commands in the background, allowing you to continue working while long-running processes execute.

### How backgrounding works

When Koode Code runs a command in the background, it runs the command asynchronously and immediately returns a background task ID. Koode Code can respond to new prompts while the command continues executing in the background.

To run commands in the background, you can either:

* Prompt Koode Code to run a command in the background
* Press Ctrl+B to move a regular Bash tool invocation to the background. (Tmux users must press Ctrl+B twice due to tmux's prefix key.)

**Key features:**

* Output is buffered and Koode can retrieve it using the BashOutput tool
* Background tasks have unique IDs for tracking and output retrieval
* Background tasks are automatically cleaned up when Koode Code exits

**Common backgrounded commands:**

* Build tools (webpack, vite, make)
* Package managers (npm, yarn, pnpm)
* Test runners (jest, pytest)
* Development servers
* Long-running processes (docker, terraform)

### Bash mode with `!` prefix

Run bash commands directly without going through Koode by prefixing your input with `!`:

```bash  theme={null}
! npm test
! git status
! ls -la
```

Bash mode:

* Adds the command and its output to the conversation context
* Shows real-time progress and output
* Supports the same `Ctrl+B` backgrounding for long-running commands
* Does not require Koode to interpret or approve the command

This is useful for quick shell operations while maintaining conversation context.

## See also

* [Slash commands](/en/docs/Koode-code/slash-commands) - Interactive session commands
* [Checkpointing](/en/docs/Koode-code/checkpointing) - Rewind Koode's edits and restore previous states
* [CLI reference](/en/docs/Koode-code/cli-reference) - Command-line flags and options
* [Settings](/en/docs/Koode-code/settings) - Configuration options
* [Memory management](/en/docs/Koode-code/memory) - Managing Koode.md files

# Slash commands

> Control Koode's behavior during an interactive session with slash commands.

## Built-in slash commands

| Command                   | Purpose                                                                                                                                      |
| :------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------- |
| `/add-dir`                | Add additional working directories                                                                                                           |
| `/agents`                 | Manage custom AI subagents for specialized tasks                                                                                             |
| `/bug`                    | Report bugs (sends conversation to paulohenriquevn)                                                                                                |
| `/clear`                  | Clear conversation history                                                                                                                   |
| `/compact [instructions]` | Compact conversation with optional focus instructions                                                                                        |
| `/config`                 | Open the Settings interface (Config tab)                                                                                                     |
| `/cost`                   | Show token usage statistics (see [cost tracking guide](/en/docs/Koode-code/costs#using-the-cost-command) for subscription-specific details) |
| `/doctor`                 | Checks the health of your Koode Code installation                                                                                           |
| `/help`                   | Get usage help                                                                                                                               |
| `/init`                   | Initialize project with Koode.md guide                                                                                                      |
| `/login`                  | Switch paulohenriquevn accounts                                                                                                                    |
| `/logout`                 | Sign out from your paulohenriquevn account                                                                                                         |
| `/mcp`                    | Manage MCP server connections and OAuth authentication                                                                                       |
| `/memory`                 | Edit Koode.md memory files                                                                                                                  |
| `/model`                  | Select or change the AI model                                                                                                                |
| `/permissions`            | View or update [permissions](/en/docs/Koode-code/iam#configuring-permissions)                                                               |
| `/pr_comments`            | View pull request comments                                                                                                                   |
| `/review`                 | Request code review                                                                                                                          |
| `/rewind`                 | Rewind the conversation and/or code                                                                                                          |
| `/status`                 | Open the Settings interface (Status tab) showing version, model, account, and connectivity                                                   |
| `/terminal-setup`         | Install Shift+Enter key binding for newlines (iTerm2 and VSCode only)                                                                        |
| `/usage`                  | Show plan usage limits and rate limit status (subscription plans only)                                                                       |
| `/vim`                    | Enter vim mode for alternating insert and command modes                                                                                      |

## Custom slash commands

Custom slash commands allow you to define frequently-used prompts as Markdown files that Koode Code can execute. Commands are organized by scope (project-specific or personal) and support namespacing through directory structures.

### Syntax

```
/<command-name> [arguments]
```

#### Parameters

| Parameter        | Description                                                       |
| :--------------- | :---------------------------------------------------------------- |
| `<command-name>` | Name derived from the Markdown filename (without `.md` extension) |
| `[arguments]`    | Optional arguments passed to the command                          |

### Command types

#### Project commands

Commands stored in your repository and shared with your team. When listed in `/help`, these commands show "(project)" after their description.

**Location**: `.Koode/commands/`

In the following example, we create the `/optimize` command:

```bash  theme={null}
# Create a project command
mkdir -p .Koode/commands
echo "Analyze this code for performance issues and suggest optimizations:" > .Koode/commands/optimize.md
```

#### Personal commands

Commands available across all your projects. When listed in `/help`, these commands show "(user)" after their description.

**Location**: `~/.Koode/commands/`

In the following example, we create the `/security-review` command:

```bash  theme={null}
# Create a personal command
mkdir -p ~/.Koode/commands
echo "Review this code for security vulnerabilities:" > ~/.Koode/commands/security-review.md
```

### Features

#### Namespacing

Organize commands in subdirectories. The subdirectories are used for organization and appear in the command description, but they do not affect the command name itself. The description will show whether the command comes from the project directory (`.Koode/commands`) or the user-level directory (`~/.Koode/commands`), along with the subdirectory name.

Conflicts between user and project level commands are not supported. Otherwise, multiple commands with the same base file name can coexist.

For example, a file at `.Koode/commands/frontend/component.md` creates the command `/component` with description showing "(project:frontend)".
Meanwhile, a file at `~/.Koode/commands/component.md` creates the command `/component` with description showing "(user)".

#### Arguments

Pass dynamic values to commands using argument placeholders:

##### All arguments with `$ARGUMENTS`

The `$ARGUMENTS` placeholder captures all arguments passed to the command:

```bash  theme={null}
# Command definition
echo 'Fix issue #$ARGUMENTS following our coding standards' > .Koode/commands/fix-issue.md

# Usage
> /fix-issue 123 high-priority
# $ARGUMENTS becomes: "123 high-priority"
```

##### Individual arguments with `$1`, `$2`, etc.

Access specific arguments individually using positional parameters (similar to shell scripts):

```bash  theme={null}
# Command definition  
echo 'Review PR #$1 with priority $2 and assign to $3' > .Koode/commands/review-pr.md

# Usage
> /review-pr 456 high alice
# $1 becomes "456", $2 becomes "high", $3 becomes "alice"
```

Use positional arguments when you need to:

* Access arguments individually in different parts of your command
* Provide defaults for missing arguments
* Build more structured commands with specific parameter roles

#### Bash command execution

Execute bash commands before the slash command runs using the `!` prefix. The output is included in the command context. You *must* include `allowed-tools` with the `Bash` tool, but you can choose the specific bash commands to allow.

For example:

```markdown  theme={null}
---
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*)
description: Create a git commit
---

## Context

- Current git status: !`git status`
- Current git diff (staged and unstaged changes): !`git diff HEAD`
- Current branch: !`git branch --show-current`
- Recent commits: !`git log --oneline -10`

## Your task

Based on the above changes, create a single git commit.
```

#### File references

Include file contents in commands using the `@` prefix to [reference files](/en/docs/Koode-code/common-workflows#reference-files-and-directories).

For example:

```markdown  theme={null}
# Reference a specific file

Review the implementation in @src/utils/helpers.js

# Reference multiple files

Compare @src/old-version.js with @src/new-version.js
```

#### Thinking mode

Slash commands can trigger extended thinking by including [extended thinking keywords](/en/docs/Koode-code/common-workflows#use-extended-thinking).

### Frontmatter

Command files support frontmatter, useful for specifying metadata about the command:

| Frontmatter                | Purpose                                                                                                                                                                               | Default                             |
| :------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------------------------- |
| `allowed-tools`            | List of tools the command can use                                                                                                                                                     | Inherits from the conversation      |
| `argument-hint`            | The arguments expected for the slash command. Example: `argument-hint: add [tagId] \| remove [tagId] \| list`. This hint is shown to the user when auto-completing the slash command. | None                                |
| `description`              | Brief description of the command                                                                                                                                                      | Uses the first line from the prompt |
| `model`                    | Specific model string (see [Models overview](/en/docs/about-Koode/models/overview))                                                                                                  | Inherits from the conversation      |
| `disable-model-invocation` | Whether to prevent `SlashCommand` tool from calling this command                                                                                                                      | false                               |

For example:

```markdown  theme={null}
---
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*)
argument-hint: [message]
description: Create a git commit
model: Koode-3-5-haiku-20241022
---

Create a git commit with message: $ARGUMENTS
```

Example using positional arguments:

```markdown  theme={null}
---
argument-hint: [pr-number] [priority] [assignee]
description: Review pull request
---

Review PR #$1 with priority $2 and assign to $3.
Focus on security, performance, and code style.
```

## Plugin commands

[Plugins](/en/docs/Koode-code/plugins) can provide custom slash commands that integrate seamlessly with Koode Code. Plugin commands work exactly like user-defined commands but are distributed through [plugin marketplaces](/en/docs/Koode-code/plugin-marketplaces).

### How plugin commands work

Plugin commands are:

* **Namespaced**: Commands can use the format `/plugin-name:command-name` to avoid conflicts (plugin prefix is optional unless there are name collisions)
* **Automatically available**: Once a plugin is installed and enabled, its commands appear in `/help`
* **Fully integrated**: Support all command features (arguments, frontmatter, bash execution, file references)

### Plugin command structure

**Location**: `commands/` directory in plugin root

**File format**: Markdown files with frontmatter

**Basic command structure**:

```markdown  theme={null}
---
description: Brief description of what the command does
---

# Command Name

Detailed instructions for Koode on how to execute this command.
Include specific guidance on parameters, expected outcomes, and any special considerations.
```

**Advanced command features**:

* **Arguments**: Use placeholders like `{arg1}` in command descriptions
* **Subdirectories**: Organize commands in subdirectories for namespacing
* **Bash integration**: Commands can execute shell scripts and programs
* **File references**: Commands can reference and modify project files

### Invocation patterns

```shell Direct command (when no conflicts) theme={null}
/command-name
```

```shell Plugin-prefixed (when needed for disambiguation) theme={null}
/plugin-name:command-name
```

```shell With arguments (if command supports them) theme={null}
/command-name arg1 arg2
```

## MCP slash commands

MCP servers can expose prompts as slash commands that become available in Koode Code. These commands are dynamically discovered from connected MCP servers.

### Command format

MCP commands follow the pattern:

```
/mcp__<server-name>__<prompt-name> [arguments]
```

### Features

#### Dynamic discovery

MCP commands are automatically available when:

* An MCP server is connected and active
* The server exposes prompts through the MCP protocol
* The prompts are successfully retrieved during connection

#### Arguments

MCP prompts can accept arguments defined by the server:

```
# Without arguments
> /mcp__github__list_prs

# With arguments
> /mcp__github__pr_review 456
> /mcp__jira__create_issue "Bug title" high
```

#### Naming conventions

* Server and prompt names are normalized
* Spaces and special characters become underscores
* Names are lowercased for consistency

### Managing MCP connections

Use the `/mcp` command to:

* View all configured MCP servers
* Check connection status
* Authenticate with OAuth-enabled servers
* Clear authentication tokens
* View available tools and prompts from each server

### MCP permissions and wildcards

When configuring [permissions for MCP tools](/en/docs/Koode-code/iam#tool-specific-permission-rules), note that **wildcards are not supported**:

* ✅ **Correct**: `mcp__github` (approves ALL tools from the github server)
* ✅ **Correct**: `mcp__github__get_issue` (approves specific tool)
* ❌ **Incorrect**: `mcp__github__*` (wildcards not supported)

To approve all tools from an MCP server, use just the server name: `mcp__servername`. To approve specific tools only, list each tool individually.

## `SlashCommand` tool

The `SlashCommand` tool allows Koode to execute [custom slash commands](/en/docs/Koode-code/slash-commands#custom-slash-commands) programmatically
during a conversation. This gives Koode the ability to invoke custom commands
on your behalf when appropriate.

To encourage Koode to trigger `SlashCommand` tool, your instructions (prompts,
Koode.md, etc.) generally need to reference the command by name with its slash.

Example:

```
> Run /write-unit-test when you are about to start writing tests.
```

This tool puts each available custom slash command's metadata into context up to the
character budget limit. You can use `/context` to monitor token usage and follow
the operations below to manage context.

### `SlashCommand` tool supported commands

`SlashCommand` tool only supports custom slash commands that:

* Are user-defined. Built-in commands like `/compact` and `/init` are *not* supported.
* Have the `description` frontmatter field populated. We use the `description` in the context.

For Koode Code versions >= 1.0.124, you can see which custom slash commands
`SlashCommand` tool can invoke by running `Koode --debug` and triggering a query.

### Disable `SlashCommand` tool

To prevent Koode from executing any slash commands via the tool:

```bash  theme={null}
/permissions
# Add to deny rules: SlashCommand
```

This will also remove SlashCommand tool (and the slash command descriptions) from context.

### Disable specific commands only

To prevent a specific slash command from becoming available, add
`disable-model-invocation: true` to the slash command's frontmatter.

This will also remove the command's metadata from context.

### `SlashCommand` permission rules

The permission rules support:

* **Exact match**: `SlashCommand:/commit` (allows only `/commit` with no arguments)
* **Prefix match**: `SlashCommand:/review-pr:*` (allows `/review-pr` with any arguments)

### Character budget limit

The `SlashCommand` tool includes a character budget to limit the size of command
descriptions shown to Koode. This prevents token overflow when many commands
are available.

The budget includes each custom slash command's name, args, and description.

* **Default limit**: 15,000 characters
* **Custom limit**: Set via `SLASH_COMMAND_TOOL_CHAR_BUDGET` environment variable

When the character budget is exceeded, Koode will see only a subset of the
available commands. In `/context`, a warning will show with "M of N commands".

## See also

* [Plugins](/en/docs/Koode-code/plugins) - Extend Koode Code with custom commands through plugins
* [Identity and Access Management](/en/docs/Koode-code/iam) - Complete guide to permissions, including MCP tool permissions
* [Interactive mode](/en/docs/Koode-code/interactive-mode) - Shortcuts, input modes, and interactive features
* [CLI reference](/en/docs/Koode-code/cli-reference) - Command-line flags and options
* [Settings](/en/docs/Koode-code/settings) - Configuration options
* [Memory management](/en/docs/Koode-code/memory) - Managing Koode's memory across sessions

# Slash commands

> Control Koode's behavior during an interactive session with slash commands.

## Built-in slash commands

| Command                   | Purpose                                                                                                                                      |
| :------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------- |
| `/add-dir`                | Add additional working directories                                                                                                           |
| `/agents`                 | Manage custom AI subagents for specialized tasks                                                                                             |
| `/bug`                    | Report bugs (sends conversation to paulohenriquevn)                                                                                                |
| `/clear`                  | Clear conversation history                                                                                                                   |
| `/compact [instructions]` | Compact conversation with optional focus instructions                                                                                        |
| `/config`                 | Open the Settings interface (Config tab)                                                                                                     |
| `/cost`                   | Show token usage statistics (see [cost tracking guide](/en/docs/Koode-code/costs#using-the-cost-command) for subscription-specific details) |
| `/doctor`                 | Checks the health of your Koode Code installation                                                                                           |
| `/help`                   | Get usage help                                                                                                                               |
| `/init`                   | Initialize project with Koode.md guide                                                                                                      |
| `/login`                  | Switch paulohenriquevn accounts                                                                                                                    |
| `/logout`                 | Sign out from your paulohenriquevn account                                                                                                         |
| `/mcp`                    | Manage MCP server connections and OAuth authentication                                                                                       |
| `/memory`                 | Edit Koode.md memory files                                                                                                                  |
| `/model`                  | Select or change the AI model                                                                                                                |
| `/permissions`            | View or update [permissions](/en/docs/Koode-code/iam#configuring-permissions)                                                               |
| `/pr_comments`            | View pull request comments                                                                                                                   |
| `/review`                 | Request code review                                                                                                                          |
| `/rewind`                 | Rewind the conversation and/or code                                                                                                          |
| `/status`                 | Open the Settings interface (Status tab) showing version, model, account, and connectivity                                                   |
| `/terminal-setup`         | Install Shift+Enter key binding for newlines (iTerm2 and VSCode only)                                                                        |
| `/usage`                  | Show plan usage limits and rate limit status (subscription plans only)                                                                       |
| `/vim`                    | Enter vim mode for alternating insert and command modes                                                                                      |

## Custom slash commands

Custom slash commands allow you to define frequently-used prompts as Markdown files that Koode Code can execute. Commands are organized by scope (project-specific or personal) and support namespacing through directory structures.

### Syntax

```
/<command-name> [arguments]
```

#### Parameters

| Parameter        | Description                                                       |
| :--------------- | :---------------------------------------------------------------- |
| `<command-name>` | Name derived from the Markdown filename (without `.md` extension) |
| `[arguments]`    | Optional arguments passed to the command                          |

### Command types

#### Project commands

Commands stored in your repository and shared with your team. When listed in `/help`, these commands show "(project)" after their description.

**Location**: `.Koode/commands/`

In the following example, we create the `/optimize` command:

```bash  theme={null}
# Create a project command
mkdir -p .Koode/commands
echo "Analyze this code for performance issues and suggest optimizations:" > .Koode/commands/optimize.md
```

#### Personal commands

Commands available across all your projects. When listed in `/help`, these commands show "(user)" after their description.

**Location**: `~/.Koode/commands/`

In the following example, we create the `/security-review` command:

```bash  theme={null}
# Create a personal command
mkdir -p ~/.Koode/commands
echo "Review this code for security vulnerabilities:" > ~/.Koode/commands/security-review.md
```

### Features

#### Namespacing

Organize commands in subdirectories. The subdirectories are used for organization and appear in the command description, but they do not affect the command name itself. The description will show whether the command comes from the project directory (`.Koode/commands`) or the user-level directory (`~/.Koode/commands`), along with the subdirectory name.

Conflicts between user and project level commands are not supported. Otherwise, multiple commands with the same base file name can coexist.

For example, a file at `.Koode/commands/frontend/component.md` creates the command `/component` with description showing "(project:frontend)".
Meanwhile, a file at `~/.Koode/commands/component.md` creates the command `/component` with description showing "(user)".

#### Arguments

Pass dynamic values to commands using argument placeholders:

##### All arguments with `$ARGUMENTS`

The `$ARGUMENTS` placeholder captures all arguments passed to the command:

```bash  theme={null}
# Command definition
echo 'Fix issue #$ARGUMENTS following our coding standards' > .Koode/commands/fix-issue.md

# Usage
> /fix-issue 123 high-priority
# $ARGUMENTS becomes: "123 high-priority"
```

##### Individual arguments with `$1`, `$2`, etc.

Access specific arguments individually using positional parameters (similar to shell scripts):

```bash  theme={null}
# Command definition  
echo 'Review PR #$1 with priority $2 and assign to $3' > .Koode/commands/review-pr.md

# Usage
> /review-pr 456 high alice
# $1 becomes "456", $2 becomes "high", $3 becomes "alice"
```

Use positional arguments when you need to:

* Access arguments individually in different parts of your command
* Provide defaults for missing arguments
* Build more structured commands with specific parameter roles

#### Bash command execution

Execute bash commands before the slash command runs using the `!` prefix. The output is included in the command context. You *must* include `allowed-tools` with the `Bash` tool, but you can choose the specific bash commands to allow.

For example:

```markdown  theme={null}
---
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*)
description: Create a git commit
---

## Context

- Current git status: !`git status`
- Current git diff (staged and unstaged changes): !`git diff HEAD`
- Current branch: !`git branch --show-current`
- Recent commits: !`git log --oneline -10`

## Your task

Based on the above changes, create a single git commit.
```

#### File references

Include file contents in commands using the `@` prefix to [reference files](/en/docs/Koode-code/common-workflows#reference-files-and-directories).

For example:

```markdown  theme={null}
# Reference a specific file

Review the implementation in @src/utils/helpers.js

# Reference multiple files

Compare @src/old-version.js with @src/new-version.js
```

#### Thinking mode

Slash commands can trigger extended thinking by including [extended thinking keywords](/en/docs/Koode-code/common-workflows#use-extended-thinking).

### Frontmatter

Command files support frontmatter, useful for specifying metadata about the command:

| Frontmatter                | Purpose                                                                                                                                                                               | Default                             |
| :------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------------------------- |
| `allowed-tools`            | List of tools the command can use                                                                                                                                                     | Inherits from the conversation      |
| `argument-hint`            | The arguments expected for the slash command. Example: `argument-hint: add [tagId] \| remove [tagId] \| list`. This hint is shown to the user when auto-completing the slash command. | None                                |
| `description`              | Brief description of the command                                                                                                                                                      | Uses the first line from the prompt |
| `model`                    | Specific model string (see [Models overview](/en/docs/about-Koode/models/overview))                                                                                                  | Inherits from the conversation      |
| `disable-model-invocation` | Whether to prevent `SlashCommand` tool from calling this command                                                                                                                      | false                               |

For example:

```markdown  theme={null}
---
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*)
argument-hint: [message]
description: Create a git commit
model: Koode-3-5-haiku-20241022
---

Create a git commit with message: $ARGUMENTS
```

Example using positional arguments:

```markdown  theme={null}
---
argument-hint: [pr-number] [priority] [assignee]
description: Review pull request
---

Review PR #$1 with priority $2 and assign to $3.
Focus on security, performance, and code style.
```

## Plugin commands

[Plugins](/en/docs/Koode-code/plugins) can provide custom slash commands that integrate seamlessly with Koode Code. Plugin commands work exactly like user-defined commands but are distributed through [plugin marketplaces](/en/docs/Koode-code/plugin-marketplaces).

### How plugin commands work

Plugin commands are:

* **Namespaced**: Commands can use the format `/plugin-name:command-name` to avoid conflicts (plugin prefix is optional unless there are name collisions)
* **Automatically available**: Once a plugin is installed and enabled, its commands appear in `/help`
* **Fully integrated**: Support all command features (arguments, frontmatter, bash execution, file references)

### Plugin command structure

**Location**: `commands/` directory in plugin root

**File format**: Markdown files with frontmatter

**Basic command structure**:

```markdown  theme={null}
---
description: Brief description of what the command does
---

# Command Name

Detailed instructions for Koode on how to execute this command.
Include specific guidance on parameters, expected outcomes, and any special considerations.
```

**Advanced command features**:

* **Arguments**: Use placeholders like `{arg1}` in command descriptions
* **Subdirectories**: Organize commands in subdirectories for namespacing
* **Bash integration**: Commands can execute shell scripts and programs
* **File references**: Commands can reference and modify project files

### Invocation patterns

```shell Direct command (when no conflicts) theme={null}
/command-name
```

```shell Plugin-prefixed (when needed for disambiguation) theme={null}
/plugin-name:command-name
```

```shell With arguments (if command supports them) theme={null}
/command-name arg1 arg2
```

## MCP slash commands

MCP servers can expose prompts as slash commands that become available in Koode Code. These commands are dynamically discovered from connected MCP servers.

### Command format

MCP commands follow the pattern:

```
/mcp__<server-name>__<prompt-name> [arguments]
```

### Features

#### Dynamic discovery

MCP commands are automatically available when:

* An MCP server is connected and active
* The server exposes prompts through the MCP protocol
* The prompts are successfully retrieved during connection

#### Arguments

MCP prompts can accept arguments defined by the server:

```
# Without arguments
> /mcp__github__list_prs

# With arguments
> /mcp__github__pr_review 456
> /mcp__jira__create_issue "Bug title" high
```

#### Naming conventions

* Server and prompt names are normalized
* Spaces and special characters become underscores
* Names are lowercased for consistency

### Managing MCP connections

Use the `/mcp` command to:

* View all configured MCP servers
* Check connection status
* Authenticate with OAuth-enabled servers
* Clear authentication tokens
* View available tools and prompts from each server

### MCP permissions and wildcards

When configuring [permissions for MCP tools](/en/docs/Koode-code/iam#tool-specific-permission-rules), note that **wildcards are not supported**:

* ✅ **Correct**: `mcp__github` (approves ALL tools from the github server)
* ✅ **Correct**: `mcp__github__get_issue` (approves specific tool)
* ❌ **Incorrect**: `mcp__github__*` (wildcards not supported)

To approve all tools from an MCP server, use just the server name: `mcp__servername`. To approve specific tools only, list each tool individually.

## `SlashCommand` tool

The `SlashCommand` tool allows Koode to execute [custom slash commands](/en/docs/Koode-code/slash-commands#custom-slash-commands) programmatically
during a conversation. This gives Koode the ability to invoke custom commands
on your behalf when appropriate.

To encourage Koode to trigger `SlashCommand` tool, your instructions (prompts,
Koode.md, etc.) generally need to reference the command by name with its slash.

Example:

```
> Run /write-unit-test when you are about to start writing tests.
```

This tool puts each available custom slash command's metadata into context up to the
character budget limit. You can use `/context` to monitor token usage and follow
the operations below to manage context.

### `SlashCommand` tool supported commands

`SlashCommand` tool only supports custom slash commands that:

* Are user-defined. Built-in commands like `/compact` and `/init` are *not* supported.
* Have the `description` frontmatter field populated. We use the `description` in the context.

For Koode Code versions >= 1.0.124, you can see which custom slash commands
`SlashCommand` tool can invoke by running `Koode --debug` and triggering a query.

### Disable `SlashCommand` tool

To prevent Koode from executing any slash commands via the tool:

```bash  theme={null}
/permissions
# Add to deny rules: SlashCommand
```

This will also remove SlashCommand tool (and the slash command descriptions) from context.

### Disable specific commands only

To prevent a specific slash command from becoming available, add
`disable-model-invocation: true` to the slash command's frontmatter.

This will also remove the command's metadata from context.

### `SlashCommand` permission rules

The permission rules support:

* **Exact match**: `SlashCommand:/commit` (allows only `/commit` with no arguments)
* **Prefix match**: `SlashCommand:/review-pr:*` (allows `/review-pr` with any arguments)

### Character budget limit

The `SlashCommand` tool includes a character budget to limit the size of command
descriptions shown to Koode. This prevents token overflow when many commands
are available.

The budget includes each custom slash command's name, args, and description.

* **Default limit**: 15,000 characters
* **Custom limit**: Set via `SLASH_COMMAND_TOOL_CHAR_BUDGET` environment variable

When the character budget is exceeded, Koode will see only a subset of the
available commands. In `/context`, a warning will show with "M of N commands".

## See also

* [Plugins](/en/docs/Koode-code/plugins) - Extend Koode Code with custom commands through plugins
* [Identity and Access Management](/en/docs/Koode-code/iam) - Complete guide to permissions, including MCP tool permissions
* [Interactive mode](/en/docs/Koode-code/interactive-mode) - Shortcuts, input modes, and interactive features
* [CLI reference](/en/docs/Koode-code/cli-reference) - Command-line flags and options
* [Settings](/en/docs/Koode-code/settings) - Configuration options
* [Memory management](/en/docs/Koode-code/memory) - Managing Koode's memory across sessions


# Hooks reference

> This page provides reference documentation for implementing hooks in Koode Code.

<Tip>
  For a quickstart guide with examples, see [Get started with Koode Code hooks](/en/docs/Koode-code/hooks-guide).
</Tip>

## Configuration

Koode Code hooks are configured in your [settings files](/en/docs/Koode-code/settings):

* `~/.Koode/settings.json` - User settings
* `.Koode/settings.json` - Project settings
* `.Koode/settings.local.json` - Local project settings (not committed)
* Enterprise managed policy settings

### Structure

Hooks are organized by matchers, where each matcher can have multiple hooks:

```json  theme={null}
{
  "hooks": {
    "EventName": [
      {
        "matcher": "ToolPattern",
        "hooks": [
          {
            "type": "command",
            "command": "your-command-here"
          }
        ]
      }
    ]
  }
}
```

* **matcher**: Pattern to match tool names, case-sensitive (only applicable for
  `PreToolUse` and `PostToolUse`)
  * Simple strings match exactly: `Write` matches only the Write tool
  * Supports regex: `Edit|Write` or `Notebook.*`
  * Use `*` to match all tools. You can also use empty string (`""`) or leave
    `matcher` blank.
* **hooks**: Array of commands to execute when the pattern matches
  * `type`: Currently only `"command"` is supported
  * `command`: The bash command to execute (can use `$KOODE_PROJECT_DIR`
    environment variable)
  * `timeout`: (Optional) How long a command should run, in seconds, before
    canceling that specific command.

For events like `UserPromptSubmit`, `Notification`, `Stop`, and `SubagentStop`
that don't use matchers, you can omit the matcher field:

```json  theme={null}
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "/path/to/prompt-validator.py"
          }
        ]
      }
    ]
  }
}
```

### Project-Specific Hook Scripts

You can use the environment variable `KOODE_PROJECT_DIR` (only available when
Koode Code spawns the hook command) to reference scripts stored in your project,
ensuring they work regardless of Koode's current directory:

```json  theme={null}
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "\"$KOODE_PROJECT_DIR\"/.Koode/hooks/check-style.sh"
          }
        ]
      }
    ]
  }
}
```

### Plugin hooks

[Plugins](/en/docs/Koode-code/plugins) can provide hooks that integrate seamlessly with your user and project hooks. Plugin hooks are automatically merged with your configuration when plugins are enabled.

**How plugin hooks work**:

* Plugin hooks are defined in the plugin's `hooks/hooks.json` file or in a file given by a custom path to the `hooks` field.
* When a plugin is enabled, its hooks are merged with user and project hooks
* Multiple hooks from different sources can respond to the same event
* Plugin hooks use the `${KOODE_PLUGIN_ROOT}` environment variable to reference plugin files

**Example plugin hook configuration**:

```json  theme={null}
{
  "description": "Automatic code formatting",
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "${KOODE_PLUGIN_ROOT}/scripts/format.sh",
            "timeout": 30
          }
        ]
      }
    ]
  }
}
```

<Note>
  Plugin hooks use the same format as regular hooks with an optional `description` field to explain the hook's purpose.
</Note>

<Note>
  Plugin hooks run alongside your custom hooks. If multiple hooks match an event, they all execute in parallel.
</Note>

**Environment variables for plugins**:

* `${KOODE_PLUGIN_ROOT}`: Absolute path to the plugin directory
* `${KOODE_PROJECT_DIR}`: Project root directory (same as for project hooks)
* All standard environment variables are available

See the [plugin components reference](/en/docs/Koode-code/plugins-reference#hooks) for details on creating plugin hooks.

## Hook Events

### PreToolUse

Runs after Koode creates tool parameters and before processing the tool call.

**Common matchers:**

* `Task` - Subagent tasks (see [subagents documentation](/en/docs/Koode-code/sub-agents))
* `Bash` - Shell commands
* `Glob` - File pattern matching
* `Grep` - Content search
* `Read` - File reading
* `Edit` - File editing
* `Write` - File writing
* `WebFetch`, `WebSearch` - Web operations

### PostToolUse

Runs immediately after a tool completes successfully.

Recognizes the same matcher values as PreToolUse.

### Notification

Runs when Koode Code sends notifications. Notifications are sent when:

1. Koode needs your permission to use a tool. Example: "Koode needs your
   permission to use Bash"
2. The prompt input has been idle for at least 60 seconds. "Koode is waiting
   for your input"

### UserPromptSubmit

Runs when the user submits a prompt, before Koode processes it. This allows you
to add additional context based on the prompt/conversation, validate prompts, or
block certain types of prompts.

### Stop

Runs when the main Koode Code agent has finished responding. Does not run if
the stoppage occurred due to a user interrupt.

### SubagentStop

Runs when a Koode Code subagent (Task tool call) has finished responding.

### PreCompact

Runs before Koode Code is about to run a compact operation.

**Matchers:**

* `manual` - Invoked from `/compact`
* `auto` - Invoked from auto-compact (due to full context window)

### SessionStart

Runs when Koode Code starts a new session or resumes an existing session (which
currently does start a new session under the hood). Useful for loading in
development context like existing issues or recent changes to your codebase.

**Matchers:**

* `startup` - Invoked from startup
* `resume` - Invoked from `--resume`, `--continue`, or `/resume`
* `clear` - Invoked from `/clear`
* `compact` - Invoked from auto or manual compact.

### SessionEnd

Runs when a Koode Code session ends. Useful for cleanup tasks, logging session
statistics, or saving session state.

The `reason` field in the hook input will be one of:

* `clear` - Session cleared with /clear command
* `logout` - User logged out
* `prompt_input_exit` - User exited while prompt input was visible
* `other` - Other exit reasons

## Hook Input

Hooks receive JSON data via stdin containing session information and
event-specific data:

```typescript  theme={null}
{
  // Common fields
  session_id: string
  transcript_path: string  // Path to conversation JSON
  cwd: string              // The current working directory when the hook is invoked

  // Event-specific fields
  hook_event_name: string
  ...
}
```

### PreToolUse Input

The exact schema for `tool_input` depends on the tool.

```json  theme={null}
{
  "session_id": "abc123",
  "transcript_path": "/Users/.../.Koode/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "cwd": "/Users/...",
  "hook_event_name": "PreToolUse",
  "tool_name": "Write",
  "tool_input": {
    "file_path": "/path/to/file.txt",
    "content": "file content"
  }
}
```

### PostToolUse Input

The exact schema for `tool_input` and `tool_response` depends on the tool.

```json  theme={null}
{
  "session_id": "abc123",
  "transcript_path": "/Users/.../.Koode/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "cwd": "/Users/...",
  "hook_event_name": "PostToolUse",
  "tool_name": "Write",
  "tool_input": {
    "file_path": "/path/to/file.txt",
    "content": "file content"
  },
  "tool_response": {
    "filePath": "/path/to/file.txt",
    "success": true
  }
}
```

### Notification Input

```json  theme={null}
{
  "session_id": "abc123",
  "transcript_path": "/Users/.../.Koode/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "cwd": "/Users/...",
  "hook_event_name": "Notification",
  "message": "Task completed successfully"
}
```

### UserPromptSubmit Input

```json  theme={null}
{
  "session_id": "abc123",
  "transcript_path": "/Users/.../.Koode/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "cwd": "/Users/...",
  "hook_event_name": "UserPromptSubmit",
  "prompt": "Write a function to calculate the factorial of a number"
}
```

### Stop and SubagentStop Input

`stop_hook_active` is true when Koode Code is already continuing as a result of
a stop hook. Check this value or process the transcript to prevent Koode Code
from running indefinitely.

```json  theme={null}
{
  "session_id": "abc123",
  "transcript_path": "~/.Koode/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "hook_event_name": "Stop",
  "stop_hook_active": true
}
```

### PreCompact Input

For `manual`, `custom_instructions` comes from what the user passes into
`/compact`. For `auto`, `custom_instructions` is empty.

```json  theme={null}
{
  "session_id": "abc123",
  "transcript_path": "~/.Koode/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "hook_event_name": "PreCompact",
  "trigger": "manual",
  "custom_instructions": ""
}
```

### SessionStart Input

```json  theme={null}
{
  "session_id": "abc123",
  "transcript_path": "~/.Koode/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "hook_event_name": "SessionStart",
  "source": "startup"
}
```

### SessionEnd Input

```json  theme={null}
{
  "session_id": "abc123",
  "transcript_path": "~/.Koode/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "cwd": "/Users/...",
  "hook_event_name": "SessionEnd",
  "reason": "exit"
}
```

## Hook Output

There are two ways for hooks to return output back to Koode Code. The output
communicates whether to block and any feedback that should be shown to Koode
and the user.

### Simple: Exit Code

Hooks communicate status through exit codes, stdout, and stderr:

* **Exit code 0**: Success. `stdout` is shown to the user in transcript mode
  (CTRL-R), except for `UserPromptSubmit` and `SessionStart`, where stdout is
  added to the context.
* **Exit code 2**: Blocking error. `stderr` is fed back to Koode to process
  automatically. See per-hook-event behavior below.
* **Other exit codes**: Non-blocking error. `stderr` is shown to the user and
  execution continues.

<Warning>
  Reminder: Koode Code does not see stdout if the exit code is 0, except for
  the `UserPromptSubmit` hook where stdout is injected as context.
</Warning>

#### Exit Code 2 Behavior

| Hook Event         | Behavior                                                           |
| ------------------ | ------------------------------------------------------------------ |
| `PreToolUse`       | Blocks the tool call, shows stderr to Koode                       |
| `PostToolUse`      | Shows stderr to Koode (tool already ran)                          |
| `Notification`     | N/A, shows stderr to user only                                     |
| `UserPromptSubmit` | Blocks prompt processing, erases prompt, shows stderr to user only |
| `Stop`             | Blocks stoppage, shows stderr to Koode                            |
| `SubagentStop`     | Blocks stoppage, shows stderr to Koode subagent                   |
| `PreCompact`       | N/A, shows stderr to user only                                     |
| `SessionStart`     | N/A, shows stderr to user only                                     |
| `SessionEnd`       | N/A, shows stderr to user only                                     |

### Advanced: JSON Output

Hooks can return structured JSON in `stdout` for more sophisticated control:

#### Common JSON Fields

All hook types can include these optional fields:

```json  theme={null}
{
  "continue": true, // Whether Koode should continue after hook execution (default: true)
  "stopReason": "string", // Message shown when continue is false

  "suppressOutput": true, // Hide stdout from transcript mode (default: false)
  "systemMessage": "string" // Optional warning message shown to the user
}
```

If `continue` is false, Koode stops processing after the hooks run.

* For `PreToolUse`, this is different from `"permissionDecision": "deny"`, which
  only blocks a specific tool call and provides automatic feedback to Koode.
* For `PostToolUse`, this is different from `"decision": "block"`, which
  provides automated feedback to Koode.
* For `UserPromptSubmit`, this prevents the prompt from being processed.
* For `Stop` and `SubagentStop`, this takes precedence over any
  `"decision": "block"` output.
* In all cases, `"continue" = false` takes precedence over any
  `"decision": "block"` output.

`stopReason` accompanies `continue` with a reason shown to the user, not shown
to Koode.

#### `PreToolUse` Decision Control

`PreToolUse` hooks can control whether a tool call proceeds.

* `"allow"` bypasses the permission system. `permissionDecisionReason` is shown
  to the user but not to Koode.
* `"deny"` prevents the tool call from executing. `permissionDecisionReason` is
  shown to Koode.
* `"ask"` asks the user to confirm the tool call in the UI.
  `permissionDecisionReason` is shown to the user but not to Koode.

```json  theme={null}
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "allow" | "deny" | "ask",
    "permissionDecisionReason": "My reason here"
  }
}
```

<Note>
  The `decision` and `reason` fields are deprecated for PreToolUse hooks.
  Use `hookSpecificOutput.permissionDecision` and
  `hookSpecificOutput.permissionDecisionReason` instead. The deprecated fields
  `"approve"` and `"block"` map to `"allow"` and `"deny"` respectively.
</Note>

#### `PostToolUse` Decision Control

`PostToolUse` hooks can provide feedback to Koode after tool execution.

* `"block"` automatically prompts Koode with `reason`.
* `undefined` does nothing. `reason` is ignored.
* `"hookSpecificOutput.additionalContext"` adds context for Koode to consider.

```json  theme={null}
{
  "decision": "block" | undefined,
  "reason": "Explanation for decision",
  "hookSpecificOutput": {
    "hookEventName": "PostToolUse",
    "additionalContext": "Additional information for Koode"
  }
}
```

#### `UserPromptSubmit` Decision Control

`UserPromptSubmit` hooks can control whether a user prompt is processed.

* `"block"` prevents the prompt from being processed. The submitted prompt is
  erased from context. `"reason"` is shown to the user but not added to context.
* `undefined` allows the prompt to proceed normally. `"reason"` is ignored.
* `"hookSpecificOutput.additionalContext"` adds the string to the context if not
  blocked.

```json  theme={null}
{
  "decision": "block" | undefined,
  "reason": "Explanation for decision",
  "hookSpecificOutput": {
    "hookEventName": "UserPromptSubmit",
    "additionalContext": "My additional context here"
  }
}
```

#### `Stop`/`SubagentStop` Decision Control

`Stop` and `SubagentStop` hooks can control whether Koode must continue.

* `"block"` prevents Koode from stopping. You must populate `reason` for Koode
  to know how to proceed.
* `undefined` allows Koode to stop. `reason` is ignored.

```json  theme={null}
{
  "decision": "block" | undefined,
  "reason": "Must be provided when Koode is blocked from stopping"
}
```

#### `SessionStart` Decision Control

`SessionStart` hooks allow you to load in context at the start of a session.

* `"hookSpecificOutput.additionalContext"` adds the string to the context.
* Multiple hooks' `additionalContext` values are concatenated.

```json  theme={null}
{
  "hookSpecificOutput": {
    "hookEventName": "SessionStart",
    "additionalContext": "My additional context here"
  }
}
```

#### `SessionEnd` Decision Control

`SessionEnd` hooks run when a session ends. They cannot block session termination
but can perform cleanup tasks.

#### Exit Code Example: Bash Command Validation

```python  theme={null}
#!/usr/bin/env python3
import json
import re
import sys

# Define validation rules as a list of (regex pattern, message) tuples
VALIDATION_RULES = [
    (
        r"\bgrep\b(?!.*\|)",
        "Use 'rg' (ripgrep) instead of 'grep' for better performance and features",
    ),
    (
        r"\bfind\s+\S+\s+-name\b",
        "Use 'rg --files | rg pattern' or 'rg --files -g pattern' instead of 'find -name' for better performance",
    ),
]


def validate_command(command: str) -> list[str]:
    issues = []
    for pattern, message in VALIDATION_RULES:
        if re.search(pattern, command):
            issues.append(message)
    return issues


try:
    input_data = json.load(sys.stdin)
except json.JSONDecodeError as e:
    print(f"Error: Invalid JSON input: {e}", file=sys.stderr)
    sys.exit(1)

tool_name = input_data.get("tool_name", "")
tool_input = input_data.get("tool_input", {})
command = tool_input.get("command", "")

if tool_name != "Bash" or not command:
    sys.exit(1)

# Validate the command
issues = validate_command(command)

if issues:
    for message in issues:
        print(f"• {message}", file=sys.stderr)
    # Exit code 2 blocks tool call and shows stderr to Koode
    sys.exit(2)
```

#### JSON Output Example: UserPromptSubmit to Add Context and Validation

<Note>
  For `UserPromptSubmit` hooks, you can inject context using either method:

  * Exit code 0 with stdout: Koode sees the context (special case for `UserPromptSubmit`)
  * JSON output: Provides more control over the behavior
</Note>

```python  theme={null}
#!/usr/bin/env python3
import json
import sys
import re
import datetime

# Load input from stdin
try:
    input_data = json.load(sys.stdin)
except json.JSONDecodeError as e:
    print(f"Error: Invalid JSON input: {e}", file=sys.stderr)
    sys.exit(1)

prompt = input_data.get("prompt", "")

# Check for sensitive patterns
sensitive_patterns = [
    (r"(?i)\b(password|secret|key|token)\s*[:=]", "Prompt contains potential secrets"),
]

for pattern, message in sensitive_patterns:
    if re.search(pattern, prompt):
        # Use JSON output to block with a specific reason
        output = {
            "decision": "block",
            "reason": f"Security policy violation: {message}. Please rephrase your request without sensitive information."
        }
        print(json.dumps(output))
        sys.exit(0)

# Add current time to context
context = f"Current time: {datetime.datetime.now()}"
print(context)

"""
The following is also equivalent:
print(json.dumps({
  "hookSpecificOutput": {
    "hookEventName": "UserPromptSubmit",
    "additionalContext": context,
  },
}))
"""

# Allow the prompt to proceed with the additional context
sys.exit(0)
```

#### JSON Output Example: PreToolUse with Approval

```python  theme={null}
#!/usr/bin/env python3
import json
import sys

# Load input from stdin
try:
    input_data = json.load(sys.stdin)
except json.JSONDecodeError as e:
    print(f"Error: Invalid JSON input: {e}", file=sys.stderr)
    sys.exit(1)

tool_name = input_data.get("tool_name", "")
tool_input = input_data.get("tool_input", {})

# Example: Auto-approve file reads for documentation files
if tool_name == "Read":
    file_path = tool_input.get("file_path", "")
    if file_path.endswith((".md", ".mdx", ".txt", ".json")):
        # Use JSON output to auto-approve the tool call
        output = {
            "decision": "approve",
            "reason": "Documentation file auto-approved",
            "suppressOutput": True  # Don't show in transcript mode
        }
        print(json.dumps(output))
        sys.exit(0)

# For other cases, let the normal permission flow proceed
sys.exit(0)
```

## Working with MCP Tools

Koode Code hooks work seamlessly with
[Model Context Protocol (MCP) tools](/en/docs/Koode-code/mcp). When MCP servers
provide tools, they appear with a special naming pattern that you can match in
your hooks.

### MCP Tool Naming

MCP tools follow the pattern `mcp__<server>__<tool>`, for example:

* `mcp__memory__create_entities` - Memory server's create entities tool
* `mcp__filesystem__read_file` - Filesystem server's read file tool
* `mcp__github__search_repositories` - GitHub server's search tool

### Configuring Hooks for MCP Tools

You can target specific MCP tools or entire MCP servers:

```json  theme={null}
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "mcp__memory__.*",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'Memory operation initiated' >> ~/mcp-operations.log"
          }
        ]
      },
      {
        "matcher": "mcp__.*__write.*",
        "hooks": [
          {
            "type": "command",
            "command": "/home/user/scripts/validate-mcp-write.py"
          }
        ]
      }
    ]
  }
}
```

## Examples

<Tip>
  For practical examples including code formatting, notifications, and file protection, see [More Examples](/en/docs/Koode-code/hooks-guide#more-examples) in the get started guide.
</Tip>

## Security Considerations

### Disclaimer

**USE AT YOUR OWN RISK**: Koode Code hooks execute arbitrary shell commands on
your system automatically. By using hooks, you acknowledge that:

* You are solely responsible for the commands you configure
* Hooks can modify, delete, or access any files your user account can access
* Malicious or poorly written hooks can cause data loss or system damage
* paulohenriquevn provides no warranty and assumes no liability for any damages
  resulting from hook usage
* You should thoroughly test hooks in a safe environment before production use

Always review and understand any hook commands before adding them to your
configuration.

### Security Best Practices

Here are some key practices for writing more secure hooks:

1. **Validate and sanitize inputs** - Never trust input data blindly
2. **Always quote shell variables** - Use `"$VAR"` not `$VAR`
3. **Block path traversal** - Check for `..` in file paths
4. **Use absolute paths** - Specify full paths for scripts (use
   "\$Koode\_PROJECT\_DIR" for the project path)
5. **Skip sensitive files** - Avoid `.env`, `.git/`, keys, etc.

### Configuration Safety

Direct edits to hooks in settings files don't take effect immediately. Koode
Code:

1. Captures a snapshot of hooks at startup
2. Uses this snapshot throughout the session
3. Warns if hooks are modified externally
4. Requires review in `/hooks` menu for changes to apply

This prevents malicious hook modifications from affecting your current session.

## Hook Execution Details

* **Timeout**: 60-second execution limit by default, configurable per command.
  * A timeout for an individual command does not affect the other commands.
* **Parallelization**: All matching hooks run in parallel
* **Deduplication**: Multiple identical hook commands are deduplicated automatically
* **Environment**: Runs in current directory with Koode Code's environment
  * The `KOODE_PROJECT_DIR` environment variable is available and contains the
    absolute path to the project root directory (where Koode Code was started)
* **Input**: JSON via stdin
* **Output**:
  * PreToolUse/PostToolUse/Stop/SubagentStop: Progress shown in transcript (Ctrl-R)
  * Notification/SessionEnd: Logged to debug only (`--debug`)
  * UserPromptSubmit/SessionStart: stdout added as context for Koode

## Debugging

### Basic Troubleshooting

If your hooks aren't working:

1. **Check configuration** - Run `/hooks` to see if your hook is registered
2. **Verify syntax** - Ensure your JSON settings are valid
3. **Test commands** - Run hook commands manually first
4. **Check permissions** - Make sure scripts are executable
5. **Review logs** - Use `Koode --debug` to see hook execution details

Common issues:

* **Quotes not escaped** - Use `\"` inside JSON strings
* **Wrong matcher** - Check tool names match exactly (case-sensitive)
* **Command not found** - Use full paths for scripts

### Advanced Debugging

For complex hook issues:

1. **Inspect hook execution** - Use `Koode --debug` to see detailed hook
   execution
2. **Validate JSON schemas** - Test hook input/output with external tools
3. **Check environment variables** - Verify Koode Code's environment is correct
4. **Test edge cases** - Try hooks with unusual file paths or inputs
5. **Monitor system resources** - Check for resource exhaustion during hook
   execution
6. **Use structured logging** - Implement logging in your hook scripts

### Debug Output Example

Use `Koode --debug` to see hook execution details:

```
[DEBUG] Executing hooks for PostToolUse:Write
[DEBUG] Getting matching hook commands for PostToolUse with query: Write
[DEBUG] Found 1 hook matchers in settings
[DEBUG] Matched 1 hooks for query "Write"
[DEBUG] Found 1 hook commands to execute
[DEBUG] Executing hook command: <Your command> with timeout 60000ms
[DEBUG] Hook command completed with status 0: <Your stdout>
```

Progress messages appear in transcript mode (Ctrl-R) showing:

* Which hook is running
* Command being executed
* Success/failure status
* Output or error messages


# Plugins reference

> Complete technical reference for Koode Code plugin system, including schemas, CLI commands, and component specifications.

<Tip>
  For hands-on tutorials and practical usage, see [Plugins](/en/docs/Koode-code/plugins). For plugin management across teams and communities, see [Plugin marketplaces](/en/docs/Koode-code/plugin-marketplaces).
</Tip>

This reference provides complete technical specifications for the Koode Code plugin system, including component schemas, CLI commands, and development tools.

## Plugin components reference

This section documents the four types of components that plugins can provide.

### Commands

Plugins add custom slash commands that integrate seamlessly with Koode Code's command system.

**Location**: `commands/` directory in plugin root

**File format**: Markdown files with frontmatter

For complete details on plugin command structure, invocation patterns, and features, see [Plugin commands](/en/docs/Koode-code/slash-commands#plugin-commands).

### Agents

Plugins can provide specialized subagents for specific tasks that Koode can invoke automatically when appropriate.

**Location**: `agents/` directory in plugin root

**File format**: Markdown files describing agent capabilities

**Agent structure**:

```markdown  theme={null}
---
description: What this agent specializes in
capabilities: ["task1", "task2", "task3"]
---

# Agent Name

Detailed description of the agent's role, expertise, and when Koode should invoke it.

## Capabilities
- Specific task the agent excels at
- Another specialized capability
- When to use this agent vs others

## Context and examples
Provide examples of when this agent should be used and what kinds of problems it solves.
```

**Integration points**:

* Agents appear in the `/agents` interface
* Koode can invoke agents automatically based on task context
* Agents can be invoked manually by users
* Plugin agents work alongside built-in Koode agents

### Hooks

Plugins can provide event handlers that respond to Koode Code events automatically.

**Location**: `hooks/hooks.json` in plugin root, or inline in plugin.json

**Format**: JSON configuration with event matchers and actions

**Hook configuration**:

```json  theme={null}
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "${KOODE_PLUGIN_ROOT}/scripts/format-code.sh"
          }
        ]
      }
    ]
  }
}
```

**Available events**:

* `PreToolUse`: Before Koode uses any tool
* `PostToolUse`: After Koode uses any tool
* `UserPromptSubmit`: When user submits a prompt
* `Notification`: When Koode Code sends notifications
* `Stop`: When Koode attempts to stop
* `SubagentStop`: When a subagent attempts to stop
* `SessionStart`: At the beginning of sessions
* `SessionEnd`: At the end of sessions
* `PreCompact`: Before conversation history is compacted

**Hook types**:

* `command`: Execute shell commands or scripts
* `validation`: Validate file contents or project state
* `notification`: Send alerts or status updates

### MCP servers

Plugins can bundle Model Context Protocol (MCP) servers to connect Koode Code with external tools and services.

**Location**: `.mcp.json` in plugin root, or inline in plugin.json

**Format**: Standard MCP server configuration

**MCP server configuration**:

```json  theme={null}
{
  "mcpServers": {
    "plugin-database": {
      "command": "${KOODE_PLUGIN_ROOT}/servers/db-server",
      "args": ["--config", "${KOODE_PLUGIN_ROOT}/config.json"],
      "env": {
        "DB_PATH": "${KOODE_PLUGIN_ROOT}/data"
      }
    },
    "plugin-api-client": {
      "command": "npx",
      "args": ["@company/mcp-server", "--plugin-mode"],
      "cwd": "${KOODE_PLUGIN_ROOT}"
    }
  }
}
```

**Integration behavior**:

* Plugin MCP servers start automatically when the plugin is enabled
* Servers appear as standard MCP tools in Koode's toolkit
* Server capabilities integrate seamlessly with Koode's existing tools
* Plugin servers can be configured independently of user MCP servers

***

## Plugin manifest schema

The `plugin.json` file defines your plugin's metadata and configuration. This section documents all supported fields and options.

### Complete schema

```json  theme={null}
{
  "name": "plugin-name",
  "version": "1.2.0",
  "description": "Brief plugin description",
  "author": {
    "name": "Author Name",
    "email": "author@example.com",
    "url": "https://github.com/author"
  },
  "homepage": "https://docs.example.com/plugin",
  "repository": "https://github.com/author/plugin",
  "license": "MIT",
  "keywords": ["keyword1", "keyword2"],
  "commands": ["./custom/commands/special.md"],
  "agents": "./custom/agents/",
  "hooks": "./config/hooks.json",
  "mcpServers": "./mcp-config.json"
}
```

### Required fields

| Field  | Type   | Description                               | Example              |
| :----- | :----- | :---------------------------------------- | :------------------- |
| `name` | string | Unique identifier (kebab-case, no spaces) | `"deployment-tools"` |

### Metadata fields

| Field         | Type   | Description                         | Example                                            |
| :------------ | :----- | :---------------------------------- | :------------------------------------------------- |
| `version`     | string | Semantic version                    | `"2.1.0"`                                          |
| `description` | string | Brief explanation of plugin purpose | `"Deployment automation tools"`                    |
| `author`      | object | Author information                  | `{"name": "Dev Team", "email": "dev@company.com"}` |
| `homepage`    | string | Documentation URL                   | `"https://docs.example.com"`                       |
| `repository`  | string | Source code URL                     | `"https://github.com/user/plugin"`                 |
| `license`     | string | License identifier                  | `"MIT"`, `"Apache-2.0"`                            |
| `keywords`    | array  | Discovery tags                      | `["deployment", "ci-cd"]`                          |

### Component path fields

| Field        | Type           | Description                          | Example                                |
| :----------- | :------------- | :----------------------------------- | :------------------------------------- |
| `commands`   | string\|array  | Additional command files/directories | `"./custom/cmd.md"` or `["./cmd1.md"]` |
| `agents`     | string\|array  | Additional agent files               | `"./custom/agents/"`                   |
| `hooks`      | string\|object | Hook config path or inline config    | `"./hooks.json"`                       |
| `mcpServers` | string\|object | MCP config path or inline config     | `"./mcp.json"`                         |

### Path behavior rules

**Important**: Custom paths supplement default directories - they don't replace them.

* If `commands/` exists, it's loaded in addition to custom command paths
* All paths must be relative to plugin root and start with `./`
* Commands from custom paths use the same naming and namespacing rules
* Multiple paths can be specified as arrays for flexibility

**Path examples**:

```json  theme={null}
{
  "commands": [
    "./specialized/deploy.md",
    "./utilities/batch-process.md"
  ],
  "agents": [
    "./custom-agents/reviewer.md",
    "./custom-agents/tester.md"
  ]
}
```

### Environment variables

**`${KOODE_PLUGIN_ROOT}`**: Contains the absolute path to your plugin directory. Use this in hooks, MCP servers, and scripts to ensure correct paths regardless of installation location.

```json  theme={null}
{
  "hooks": {
    "PostToolUse": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "${KOODE_PLUGIN_ROOT}/scripts/process.sh"
          }
        ]
      }
    ]
  }
}
```

***

## Plugin directory structure

### Standard plugin layout

A complete plugin follows this structure:

```
enterprise-plugin/
├── .Koode-plugin/           # Metadata directory
│   └── plugin.json          # Required: plugin manifest
├── commands/                 # Default command location
│   ├── status.md
│   └──  logs.md
├── agents/                   # Default agent location
│   ├── security-reviewer.md
│   ├── performance-tester.md
│   └── compliance-checker.md
├── hooks/                    # Hook configurations
│   ├── hooks.json           # Main hook config
│   └── security-hooks.json  # Additional hooks
├── .mcp.json                # MCP server definitions
├── scripts/                 # Hook and utility scripts
│   ├── security-scan.sh
│   ├── format-code.py
│   └── deploy.js
├── LICENSE                  # License file
└── CHANGELOG.md             # Version history
```

<Warning>
  The `.Koode-plugin/` directory contains the `plugin.json` file. All other directories (commands/, agents/, hooks/) must be at the plugin root, not inside `.Koode-plugin/`.
</Warning>

### File locations reference

| Component       | Default Location             | Purpose                      |
| :-------------- | :--------------------------- | :--------------------------- |
| **Manifest**    | `.Koode-plugin/plugin.json` | Required metadata file       |
| **Commands**    | `commands/`                  | Slash command markdown files |
| **Agents**      | `agents/`                    | Subagent markdown files      |
| **Hooks**       | `hooks/hooks.json`           | Hook configuration           |
| **MCP servers** | `.mcp.json`                  | MCP server definitions       |

***

## Debugging and development tools

### Debugging commands

Use `Koode --debug` to see plugin loading details:

```bash  theme={null}
Koode --debug
```

This shows:

* Which plugins are being loaded
* Any errors in plugin manifests
* Command, agent, and hook registration
* MCP server initialization

### Common issues

| Issue                  | Cause                           | Solution                                             |
| :--------------------- | :------------------------------ | :--------------------------------------------------- |
| Plugin not loading     | Invalid `plugin.json`           | Validate JSON syntax                                 |
| Commands not appearing | Wrong directory structure       | Ensure `commands/` at root, not in `.Koode-plugin/` |
| Hooks not firing       | Script not executable           | Run `chmod +x script.sh`                             |
| MCP server fails       | Missing `${KOODE_PLUGIN_ROOT}` | Use variable for all plugin paths                    |
| Path errors            | Absolute paths used             | All paths must be relative and start with `./`       |

***

## Distribution and versioning reference

### Version management

Follow semantic versioning for plugin releases:

```json  theme={null}

## See also

- [Plugins](/en/docs/Koode-code/plugins) - Tutorials and practical usage
- [Plugin marketplaces](/en/docs/Koode-code/plugin-marketplaces) - Creating and managing marketplaces
- [Slash commands](/en/docs/Koode-code/slash-commands) - Command development details
- [Subagents](/en/docs/Koode-code/sub-agents) - Agent configuration and capabilities
- [Hooks](/en/docs/Koode-code/hooks) - Event handling and automation
- [MCP](/en/docs/Koode-code/mcp) - External tool integration
- [Settings](/en/docs/Koode-code/settings) - Configuration options for plugins
```
