const { execSync } = require('child_process');
// const dir = process.argv[2];
// const pass = process.argv[2];

execSync(`scp -rv package.json pi@192.168.0.100:/home/pi/kiosk`, {stdio: [0, 1, 2]})
execSync(`scp -rv build/* pi@192.168.0.100:/home/pi/kiosk`, {stdio: [0, 1, 2]})
execSync(`scp -rv node_modules pi@192.168.0.100:/home/pi/kiosk`, {stdio: [0, 1, 2]})
