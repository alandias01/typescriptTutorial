/* Starting a new project
mkdir <folder>, mkdir src, code readme.txt
npm init -y
git init
code .gitignore, add /node_modules /dist /build
npm i -D typescript @types/node ts-node-dev
npx tsc --init

package.json scripts
"start": "ts-node-dev --respawn src/index.ts",
"dev:d": "ts-node-dev --respawn --inspect-brk -- src/index.ts"
 */

import { Playground } from "./Playground";

new Playground();
