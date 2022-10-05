# ts-fork-demos

This repository contains examples for features implemented in my own fork of TypeScript (you can find it [here](https://github.com/laurci/TypeScript)).

## Running the examples

Prerequisites:
0. Node 16 + *Yarn* & *Gulp* installed globally
1. Make sure you have a clone of the fork in a folder called `TypeScript` next to this folder.
2. Make sure to build the compiler. You can run the following:
    - `npm ci` to install dependencies
    - `npm run build:compiler` to build
3. Run `yarn` in the root of this directory.

There are 4 scripts in this project. You must run them in the root of this repository.
1. `compile`: Will run `tsc` with specified sample. Ex: `yarn compile examples/defer`.
2. `clean`: Will clean the compile output of a specified sample. Ex: `yarn clean examples/defer`.
3. `build`: Runs both of the above. Ex: `yarn build examples/defer`.
4. `start`: Builds and runs a specified sample. Ex: `yarn start examples/defer`. You can also skip building or cleaning with `--no-rebuild` and `--no-clean` flags.

## Syntax and Language Service

The fork adds custom Syntax. If you want this to work in your editor, you will have use the built language service and modify the TS syntax to match the fork.

### VSCode setup

If you use `vscode` you're in luck because I use it too, so you have some easy options.

For the language service, VSCode will prompt you to use the lamguage service from the fork (if it doesn't you can still [manually choose it](https://code.visualstudio.com/docs/typescript/typescript-compiling#_using-the-workspace-version-of-typescript)).

For the syntax, you have two options:
1. Install the latest extension version from [here](https://github.com/laurci/ts-fork-vscode/tree/master/pack).
2. Use my fork of vscode :) (I don't recommend it, but you can find it [here](https://github.com/laurci/vscode)).