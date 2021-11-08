const fs = require('fs/promises');
const path = require('path');

const dirPath = path.join(__dirname, 'files');
const dircopyPath = path.join(__dirname, 'files-copy');

fs.rm(dircopyPath, {
    recursive: true,
    force: true
}).finally(() => {
    fs.mkdir(dircopyPath, {
        recursive: true
    });
    fs.readdir(dirPath, {
        withFileTypes: true
    }).then(data => {
        data.forEach(item => {
            if (item.isFile()) {
                const pathItem = path.join(dirPath, item.name);
                const pathItemDes = path.join(dircopyPath, item.name);
                fs.copyFile(pathItem, pathItemDes);
            }
        });
    });
});