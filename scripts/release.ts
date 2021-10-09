import execa, { Options } from 'execa';
import prompt, { Choice } from 'prompts';

import fg from 'fast-glob';
import fse from 'fs-extra';
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
      ignore: ignoredList
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
   const stringifiedPackageJSON = JSON.stringify(newPKG);
   return await fse.writeFile(join(root, 'package.json'), stringifiedPackageJSON);
}

async function execute(command: string, commandArguments: string[], options?: Options) {
   await execa(command, commandArguments, {
      ...options,
      stdio: 'inherit'
   });
}
