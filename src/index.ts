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

import { ArrayFunctions } from "./ArrayFunctions";
import { StringFunctions } from "./StringFunctions";
import { Files } from "./FilePathOsFunctions";
import { PromiseTutorial } from "./PromiseTutorial";
import { ErrorHandling } from "./ErrorHandling";
import { TrueCar } from "./TrueCar";

//new ArrayFunctions();
//new PromiseTutorial();
//new ErrorHandling();
new TrueCar();
