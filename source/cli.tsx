#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import App from './app.js';

const cli = meow(
	`
	Usage
	  $ koode-cli

	Options
		--name      Your name (default: "User")
		--api-key   OpenAI API key (can also use OPENAI_API_KEY env var)

	Examples
	  $ koode-cli --name=Jane
	  $ koode-cli --api-key=sk-...
	  $ OPENAI_API_KEY=sk-... koode-cli
`,
	{
		importMeta: import.meta,
		flags: {
			name: {
				type: 'string',
			},
			apiKey: {
				type: 'string',
			},
		},
	},
);

const apiKey = cli.flags.apiKey || process.env['OPENAI_API_KEY'];

render(<App name={cli.flags.name} apiKey={apiKey} />);
