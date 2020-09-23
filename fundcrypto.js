var https = require('https');
const fs = require('fs');
const path = 'wallet.dat'
const outputtext = 'Wallet does not exist! Run CreateWallet to generate a wallet!';

var FUNDCRYPTOCoin = /** @class */ (function () {
    function FUNDCRYPTOCoin() {
    }
    FUNDCRYPTOCoin.prototype.CreateWallet = function () {
        jsonObject = JSON.stringify({
            "PrivateKey": "",
            "PublicKey": "",
            "CryptoAsset": "FUNDCRYPTO",
            "Identifier": ""
        });

        var postheaders = {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(jsonObject, 'utf8')
        };

        var optionspost = {
            host: 'www.fundcrypto.org',
            path: '/api/cryptoasset10',
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
                //add wallet file  //d.PublicKey + '\n' + d.PrivateKey
                fs.writeFile("wallet.dat", d, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("Wallet file was created!");
                });
                console.info('\n\nPOST completed');
            });
        });

        // write the json data
        reqPost.write(jsonObject);
        reqPost.end();

        reqPost.on('error', function (e) {
            console.error(e);
        });
        return "Wallet Created!";
    };
    FUNDCRYPTOCoin.prototype.PublicKey = function () {

        try {
            if (fs.existsSync(path)) {
                var obj = JSON.parse(fs.readFileSync('wallet.dat', 'utf8'));
                console.log(obj.PublicKey);
            }
            else {
                console.log(outputtext);
            }

        } catch (err) {
            console.log(outputtext);
        }

        return "PublicKey";
    };
    FUNDCRYPTOCoin.prototype.PrivateKey = function () {

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

        return "PrivateKey";
    };
    FUNDCRYPTOCoin.prototype.Balance = function () {

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
        return "Balance!";
    };
    FUNDCRYPTOCoin.prototype.Send = function (addresstoSend,amounttoSend) {
        var sender = { AddressTo: addresstoSend, Amount: amounttoSend };
        try {
            if (fs.existsSync(path)) {
                var obj = JSON.parse(fs.readFileSync('wallet.dat', 'utf8'));
                var cryptoAssetInput = { PrivateKey: obj.PrivateKey, PublicKey: obj.PublicKey, CryptoAsset: "FUNDCRYPTO", Identifier: "" };

                var jsonObject = JSON.stringify({
                    "SignMessage": cryptoAssetInput,
                    "AddressTo": sender.AddressTo,
                    "AddressFrom": obj.PublicKey,
                    "Amount": sender.Amount,
                    "CryptoAsset": "FUNDCRYPTO",
                    "IsAddressToAlias": false
                });

                var postheaders = {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(jsonObject, 'utf8')
                };

                var optionspost = {
                    host: 'www.fundcrypto.org',
                    path: '/api/cryptoasset1',
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

        return "Send!";
    };
    return FUNDCRYPTOCoin;
}());

var worker = new FUNDCRYPTOCoin();
//console.log(worker.CreateWallet());
