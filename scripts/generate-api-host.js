/**
 * Generate src/config/api-host.ts file which is exporting the IP address of the current computer
 */
`use strict`;

const fs = require(`fs`);
const os = require(`os`);
const path = require(`path`);

const api_host_path = path.join(__dirname, `..`, `src`, `config`, `api-host.ts`);
const ifaces = os.networkInterfaces();

if(process.argv[2] === `prod`) {
  writeConfig(`https://app.boxeaty.fr`);
} else if(process.argv[2] === `rec`) {
  writeConfig(`https://app-rec.boxeaty.fr`);
} else if(process.argv[2] === `test`) {
  writeConfig(`https://boxeaty.wiilog.fr`);
} else {
  delete ifaces[`VirtualBox Host-Only Network`];

  const availableIPv4Addresses = Object
    .values(ifaces)
    .map((ifaceValues) => (ifaceValues && ifaceValues.find(({family}) => family === `IPv4`))) // get first IPv4 address
    .filter((ifaceValue) => ifaceValue && !ifaceValue.internal)
    .map(({address}) => address);

  if(availableIPv4Addresses.length === 0) {
    throw new Error(`IP of the local server not found`);
  } else {
    writeConfig(`http://${availableIPv4Addresses[0]}:8000`);
  }
}

function writeConfig(address) {
  fs.writeFile(api_host_path, `export default '${address}';`, (err) => {
    if(err) {
      throw err;
    }

    console.log(`Address of the server is ${address}`);
  });
}
