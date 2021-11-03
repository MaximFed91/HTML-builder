const fs = require('fs/promises');
const path = require('path');

const distPath = path.join(__dirname, 'project-dist');
const assetsPath = path.join(__dirname, 'assets');
const assetsCopyPath = path.join(distPath, 'assets');
const stylePath = path.join(__dirname, 'styles');
const styleDistPath = path.join(__dirname, 'project-dist', 'style.css');
const templatePath = path.join(__dirname, 'template.html');
const indexPath = path.join(distPath, 'index.html');
const componentsPath = path.join(__dirname, 'components');

function copyFL(src, des) {
    fs.mkdir(des, {
        recursive: true
    });
    fs.readdir(src, {
        withFileTypes: true
    }).then(data => {
        data.forEach(item => {
            const pathItem = path.join(src, item.name);
            const pathItemDes = path.join(des, item.name);
            if (item.isFile()) {
                fs.copyFile(pathItem, pathItemDes);
            } else {
                copyFL(pathItem, pathItemDes);
            }
        });
    });
}



fs.mkdir(distPath, {
    recursive: true
});

copyFL(assetsPath, assetsCopyPath);

fs.writeFile(styleDistPath, '');
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
                        fs.appendFile(styleDistPath, data);
                    });
                }
            }
        });
    });
(async function () {
    const reg = new RegExp('^{{[a-z]+}}$', 'gm');
    let res = (await fs.readFile(templatePath, 'utf-8')).split('\n');
    let objHtml = {};
    const arrDir = await fs.readdir(componentsPath, {
        withFileTypes: true
    });
    for (const item of arrDir) {
        if (item.isFile()) {
            const pathItem = path.join(componentsPath, item.name);
            const itemName = path.basename(pathItem, '.html');
            objHtml[itemName] = await fs.readFile(pathItem, 'utf-8');
        }
    }
    for (let i = 0; i < res.length; i++) {
        if (reg.test(res[i].trim())) {
            res[i] = objHtml[res[i].trim().slice(2, -2)];
        }
        reg.test(res[0].trim());
    }
    await fs.writeFile(indexPath, res.join('\n'));
})();