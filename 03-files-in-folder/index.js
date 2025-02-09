const fs = require('fs/promises');
const path = require('path');

const pathFolder = path.join(__dirname, 'secret-folder');

fs.readdir(pathFolder, {
        withFileTypes: true
    })
    .then(data => {
        data.forEach(item => {
            if (item.isFile()) {
                const pathItem = path.join(pathFolder, item.name);
                const itemObj = path.parse(pathItem);
                fs.stat(pathItem).then(itemStats=>{
                    console.log(`${itemObj.name} - ${itemObj.ext.slice(1)} - ${itemStats.size}`);
                });
            }
        });
    });