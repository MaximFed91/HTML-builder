const fs = require('fs');
const path = require('path');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const pathFile = path.join(__dirname, 'testtext.txt');
fs.writeFile(pathFile, '', err=>{
    if (err) {
        throw err;
    }
});
console.log('Write some text:');
rl.on('line', line => {
    if (line === 'exit') {
        process.exit();
    }
    const newStr = '\n' + line;
    fs.appendFile(pathFile, newStr, err => {
        if (err) {
            throw err;
        }
    });
    console.log('Write more text:');
});

process.on('exit', () => {
    console.log('Your text is saved. Bye.');
});
