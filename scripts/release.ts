import type { BackgroundColor, ForegroundColor } from 'chalk';
import execa, { Options } from 'execa';
import fse, { move } from 'fs-extra';
import prompt, { Choice } from 'prompts';

import chalk from 'chalk';
import fg from 'fast-glob';
import { join } from 'path';
import pkgJSON from '../package.json';

const root = process.cwd();

interface PromptVal<T> {
   value: T;
}

async function main() {
   let gitignore = await readGitignore();
   const ignoredList = gitignore.split('\n').filter(Boolean);

   const allFiles = await fg('./**/*', {
      cwd: process.cwd(),
      ignore: ignoredList,
      markDirectories: true
   });

   const fileChoices: Choice[] = allFiles.map((v) => {
      return { title: v, value: v };
   });

   const { value: newVersion }: PromptVal<string> = await prompt({
      type: 'text',
      name: 'value',
      message: 'Select new version',
      initial: pkgJSON.version
   });

   let { value: gitAddFiles }: PromptVal<string[]> = await prompt({
      type: 'multiselect',
      name: 'value',
      message: `Select files to be pushed`,
      choices: [{ title: 'All Files', value: '.' }, ...fileChoices]
   });

   if (gitAddFiles.length > 1 && gitAddFiles.includes('.')) {
      gitAddFiles = ['.'];
   }

   const { value: commitMessage }: PromptVal<string> = await prompt({
      type: 'text',
      name: 'value',
      message: 'Git commit message',
      min: 3
   });

   const { value: branchName }: PromptVal<string> = await prompt({
      type: 'text',
      name: 'value',
      message: 'branch',
      initial: 'main'
   });

   log('Choices you made:', 'yellow');

   log('Version:', 'magenta');
   log(indent(newVersion), 'blue');

   log('Files:', 'magenta');
   for (const file of gitAddFiles) {
      if (file === '.') log(indent('All Files'), 'blue');
      else log(indent(file), 'blue');
   }

   log('Commit Message:', 'magenta');
   log(indent(commitMessage), 'blue');

   log('Branch:', 'magenta');
   log(indent(branchName), 'blue');

   const { value: isSure }: PromptVal<boolean> = await prompt({
      type: 'toggle',
      name: 'value',
      message: 'Are you sure to add these changes?',
      active: 'yes',
      inactive: 'no'
   });

   if (!isSure) {
      process.exit();
   }

   await execute('npm', ['run', 'build']);
   await sleep(300);

   await moveTypeFile();

   const newPkgJson = { ...pkgJSON, version: newVersion };
   await writeNewPackageJson(newPkgJson);

   await execute('git', ['add', ...gitAddFiles]);
   await execute('git', ['commit', '-m', commitMessage]);
   await execute('git', ['push', 'origin', branchName]);
}
main();

async function readGitignore() {
   return await fse.readFile(join(root, '.gitignore'), 'utf8');
}

async function writeNewPackageJson(newPKG: typeof pkgJSON) {
   const stringifiedPackageJSON = JSON.stringify(newPKG, undefined, 3);
   return await fse.writeFile(join(root, 'package.json'), stringifiedPackageJSON);
}

async function execute(command: string, commandArguments: string[], options?: Options) {
   await execa(command, commandArguments, {
      ...options,
      stdio: 'inherit'
   });
}

async function log(msg: string, color?: typeof ForegroundColor, bgColor?: typeof BackgroundColor) {
   if (color) {
      msg = chalk[color](msg);
   }
   if (bgColor) {
      msg = chalk[bgColor](msg);
   }
   return console.log(msg);
}

function sleep(ms: number): Promise<void> {
   return new Promise((resolve) => {
      setTimeout(() => {
         resolve();
      }, ms);
   });
}

function indent(msg: string) {
   const indentValue = '   ';
   return indentValue + msg;
}

async function moveTypeFile() {
   const fileName = 'lib.d.ts';
   const libDTS = join(root, 'src', 'lib.d.ts');
   const distLibDTS = join(root, 'dist', 'lib.d.ts');
   await fse.move(libDTS, distLibDTS);
}
