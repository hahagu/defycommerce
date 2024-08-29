import { replaceInFileSync } from 'replace-in-file';
import generator from 'generate-password';
import * as fs from 'fs';

console.info('Pre-seed starting at: ', new Date().toISOString());

// Copy seed template to seed.json
try {
    fs.copyFileSync('./data/seed-template.json', './data/seed.json');
} catch (error) {
    console.error('An error occurred while copying the seed template:', error);
    throw error;
}

// Email detection
let email = process.env.MEDUSA_EMAIL ?? 'mingu.kang@defy.works';

// Password detection and generation
let password = process.env.MEDUSA_PASSWORD;
const passwordDetected = !!password;
if (!password) {
    password = generator.generate({
        length: 10,
        numbers: true,
        symbols: true,
    });
}

// Email replacement
console.info('Replacing email in seed.json...');

const emailOptions = {
    files: './data/seed.json',
    from: '$MEDUSA_EMAIL',
    to: email,
}

try {
    const results = replaceInFileSync(emailOptions);
}
catch (error) {
    console.error('An error occurred while replacing the email:', error);
    throw error;
}

// Password replacement
console.info('Replacing password in seed.json...');

const passwordOptions = {
    files: './data/seed.json',
    from: '$MEDUSA_PASSWORD',
    to: password,
}

try {
    const results = replaceInFileSync(passwordOptions);
}
catch (error) {
    console.error('An error occurred while replacing the password:', error);
    throw error;
}

console.info('Email and password replaced in seed.json');
console.info('Email: ', email);
if (!passwordDetected) console.info('Password: ', password);

console.info('Pre-seed finished at: ', new Date().toISOString());