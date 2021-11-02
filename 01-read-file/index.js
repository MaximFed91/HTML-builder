const fs = require('fs');
const path = require('path');

const filePaht = path.join(__dirname, '/text.txt');
const stream = fs.createReadStream(filePaht);
stream.pipe(process.stdout);