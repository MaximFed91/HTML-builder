const fs = require('fs/promises');
const path = require('path');

const stylePath = path.join(__dirname, 'styles');
const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');


(async function () {
    await fs.writeFile(bundlePath, '');
    const stlFils = await fs.readdir(stylePath, {
        withFileTypes: true
    });
    for (const item of stlFils) {
        if (item.isFile()) {
            const pathItem = path.join(stylePath, item.name);
            const itemExt = path.extname(pathItem);
            if (itemExt === '.css') {
              const data = await  fs.readFile(pathItem);
                   await fs.appendFile(bundlePath, data);
            }
        }
    }
})();