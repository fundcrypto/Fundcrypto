var https = require('https');

const fs = require('fs');

const path = 'wallet.dat'
const outputtext = 'Wallet does not exist! Run CreateWallet to generate a wallet!';

try {
    if (fs.existsSync(path)) {
        var obj = JSON.parse(fs.readFileSync('wallet.dat', 'utf8'));
        var cryptoAssetInput = { PrivateKey: obj.PrivateKey, PublicKey: obj.PublicKey, CryptoAsset: "FUNDCRYPTO", Identifier: "" };

        var jsonObject = JSON.stringify({
            "SignMessage": cryptoAssetInput,
            "CryptoAsset": "FUNDCRYPTO",
        });

        var postheaders = {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(jsonObject, 'utf8')
        };

        var optionspost = {
            host: 'www.fundcrypto.org',
            path: '/api/cryptoasset2',
            method: 'POST',
            headers: postheaders
        };

        console.info('Options prepared:');
        console.info(optionspost);
        console.info('Do the POST call');

        // do the POST call
        var reqPost = https.request(optionspost, function (res) {
            console.log("statusCode: ", res.statusCode);

            res.on('data', function (d) {
                console.info('POST result:\n');

                process.stdout.write(d);
                console.info('\n\nPOST completed');
            });
        });

        // write the json data
        reqPost.write(jsonObject);
        reqPost.end();

        reqPost.on('error', function (e) {
            console.error(e);
        });


    }
    else {
        console.log(outputtext);
    }

} catch (err) {
    console.log(outputtext);
}


