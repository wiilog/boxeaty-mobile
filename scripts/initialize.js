const fs = require('fs');

cp(`android/app/src/main/assets/capacitor.config.json.dist`, `android/app/src/main/assets/capacitor.config.json`);
cp(`capacitor.config.json.dist`, `capacitor.config.json`);
cp(`credentials.json`, `src/config/credentials.json`, {autoConnect: false, email: '', password: ''});

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
        fs.writeFile(to, typeof value === `object` ? JSON.stringify(value) : value, err => {
            if (err) {
                throw err;
            }

            console.log(`Wrote default value into "${to}"`);
        });
    } else {
        console.log(`Ignored copy of "${from}", file does not exist`);
    }
}
