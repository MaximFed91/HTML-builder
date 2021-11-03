const fs = require('fs/promises');
const path = require('path');

const stylePath = path.join(__dirname, 'styles');
const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');


fs.writeFile(bundlePath, '');
fs.readdir(stylePath, {
        withFileTypes: true
    })
    .then(data => {
        data.forEach(item => {
            if (item.isFile()) {
                const pathItem = path.join(stylePath, item.name);
                const itemExt = path.extname(pathItem);
                if (itemExt === '.css') {
                    fs.readFile(pathItem).then(data => {
                        fs.appendFile(bundlePath, data);
                    });
                }
            }
        });
    });