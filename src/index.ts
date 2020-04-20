/* Starting a new project
mkdir <folder>, mkdir src, code readme.txt
npm init -y
git init
code .gitignore, add /node_modules
npm i -D typescript @types/node ts-node
node .\node_modules\typescript\bin\tsc --init

package.json scripts
"start": "ts-node src/index.ts",
"dev:d": "node --inspect-brk -r ts-node/register src/index.ts"
 * 
 */

import { ArrayFunctions } from "./ArrayFunctions";
import { StringFunctions } from "./StringFunctions";

//new ArrayFunctions();
new StringFunctions();
