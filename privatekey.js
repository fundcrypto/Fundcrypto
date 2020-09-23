var fs = require('fs');

const path = 'wallet.dat'
const outputtext = 'Wallet does not exist! Run CreateWallet to generate a wallet!';

try {
    if (fs.existsSync(path)) {
        var obj = JSON.parse(fs.readFileSync('wallet.dat', 'utf8'));
        console.log(obj.PrivateKey);
    }
    else {
        console.log(outputtext);
    }

} catch (err) {
    console.log(outputtext);
}

