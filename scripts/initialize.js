const fs = require('fs');

const defaultConfiguration = {
    autoConnect: false,
    email: null,
    password: null
};

cp(`android/app/src/main/assets/capacitor.config.json.dist`, `android/app/src/main/assets/capacitor.config.json`);
cp(`capacitor.config.json.dist`, `capacitor.config.json`);

if([`prod`, `rec`, `test`].includes(process.argv[2])) {
    create(`src/config/credentials.json`, defaultConfiguration);
} else {
    cp(`credentials.json`, `src/config/credentials.json`, defaultConfiguration);
}

require(`./generate-api-host`);

function cp(from, to, value) {
    if (fs.existsSync(from)) {
        fs.copyFile(from, to, (err) => {
            if (err) {
                throw err;
            }

            console.log(`Copied "${from}" to "${to}"`);
        });
    } else if (value) {
        create(to, value);
    } else {
        console.log(`Ignored copy of "${from}", file does not exist`);
    }
}

function create(path, content) {
    fs.writeFile(path, typeof content === `object` ? JSON.stringify(content) : content, err => {
        if (err) {
            throw err;
        }

        console.log(`Wrote to file "${path}"`);
    });
}
