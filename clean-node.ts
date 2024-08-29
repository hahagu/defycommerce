import { rimraf } from "rimraf";
import fkill from 'fkill';
import fs from 'fs';

const targets = [
    "./apps/medusa/node_modules",
    "./apps/nuxt/node_modules",
    "./node_modules",
];

const options = {
    filter: (file) => {
        const path = fs.realpathSync(file);
        const filter = ['rimraf', 'fkill', 'lerna'];
        return !filter.some((f) => path.includes(f));
    }
};

console.log("Kill all node processes");
await fkill("node", { force: true });

console.log("Clean build directories");
try {
    await rimraf.windows(targets, options);
} catch {
    await rimraf(targets, options);
}