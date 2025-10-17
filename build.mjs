import * as esbuild from 'esbuild';
import * as fs from 'fs';
import * as path from 'path';

const OUT_DIR = 'dist';
/**
 * ink attempts to import react-devtools-core in an ESM-unfriendly way:
 *
 * https://github.com/vadimdemedes/ink/blob/eab6ef07d4030606530d58d3d7be8079b4fb93bb/src/reconciler.ts#L22-L45
 *
 * to make this work, we have to strip the import out of the build.
 */
const ignoreReactDevToolsPlugin = {
	name: 'ignore-react-devtools',
	setup(build) {
		// When an import for 'react-devtools-core' is encountered,
		// return an empty module.
		build.onResolve({filter: /^react-devtools-core$/}, args => {
			return {path: args.path, namespace: 'ignore-devtools'};
		});
		build.onLoad({filter: /.*/, namespace: 'ignore-devtools'}, () => {
			return {contents: '', loader: 'js'};
		});
	},
};

// ----------------------------------------------------------------------------
// Build mode detection (production vs development)
//
//  • production (default): minified, external telemetry shebang handling.
//  • development (--dev):
//      – no minification
//      – inline source maps for better stacktraces
//      – shebang tweaked to enable Node's source‑map support at runtime
// ----------------------------------------------------------------------------

const isDevBuild = process.argv.includes('--dev');

const plugins = [ignoreReactDevToolsPlugin];

// Build Hygiene, ensure we create dist dir if it doesn't exist
const outPath = path.resolve(OUT_DIR);
if (!fs.existsSync(outPath)) {
	fs.mkdirSync(outPath, {recursive: true});
}

// Add shebang for both dev and production builds
const shebangLine = isDevBuild 
	? '#!/usr/bin/env -S NODE_OPTIONS=--enable-source-maps node\n'
	: '#!/usr/bin/env node\n';

const shebangPlugin = {
	name: 'shebang',
	setup(build) {
		build.onEnd(async () => {
			const outFile = path.resolve(
				isDevBuild ? `${OUT_DIR}/koode-dev.js` : `${OUT_DIR}/koode.js`,
			);
			let code = await fs.promises.readFile(outFile, 'utf8');
			code = shebangLine + code;
			await fs.promises.writeFile(outFile, code, 'utf8');
			// Make file executable
			await fs.promises.chmod(outFile, 0o755);
		});
	},
};
plugins.push(shebangPlugin);

esbuild
	.build({
		entryPoints: ['src/cli.tsx'],
		// Do not bundle the contents of package.json at build time: always read it
		// at runtime.
		external: ['./package.json', 'cfonts'],
		bundle: true,
		format: 'esm',
		platform: 'node',
		tsconfig: 'tsconfig.json',
		outfile: isDevBuild ? `${OUT_DIR}/koode-dev.js` : `${OUT_DIR}/koode.js`,
		minify: !isDevBuild,
		sourcemap: isDevBuild ? 'inline' : true,
		plugins,
		inject: ['./require-shim.js'],
		jsx: 'automatic',
		jsxImportSource: 'react',
	})
	.catch(() => process.exit(1));
