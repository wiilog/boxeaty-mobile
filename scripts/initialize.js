const fs = require('fs');

cp(`android/app/src/main/assets/capacitor.config.json.dist`, `android/app/src/main/assets/capacitor.config.json`);
cp(`capacitor.config.json.dist`, `capacitor.config.json`);
require(`./generate-api-host`);

function cp(from, to) {
  fs.copyFile(from, to, (err) => {
    if (err) {
      throw err;
    }

    console.log(`Copied "${from}" to "${to}"`);
  });
}
