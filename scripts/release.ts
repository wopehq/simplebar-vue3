import execa, { Options } from 'execa';
import prompt, { Choice } from 'prompts';

import fg from 'fast-glob';
import fse from 'fs-extra';
import { join } from 'path';
import pkgJSON from '../package.json';

const root = process.cwd();

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

   const { value: newVersion } = await prompt({
      type: 'text',
      name: 'value',
      message: 'Select new version'
   });

   const { value: gitAddFiles } = await prompt({
      type: 'multiselect',
      name: 'value',
      message: `Select files to be pushed`,
      choices: [{ title: 'All Files', value: '.' }, ...fileChoices]
   });
}
main();

async function readGitignore() {
   return await fse.readFile(join(root, '.gitignore'), 'utf8');
}

async function readPackageJson() {
   return await fse.readFile(join(root, '.gitignore'), 'utf8');
}

async function writeNewPackageJson(newPKG: typeof pkgJSON) {
   const stringifiedPackageJSON = JSON.stringify(newPKG);
   return await fse.writeFile(join(root, 'package.json'), stringifiedPackageJSON);
}

async function execute(command: string, commandArguments: string[], options: Options) {
   await execa(command, commandArguments, {
      ...options,
      stdio: 'inherit'
   });
}
