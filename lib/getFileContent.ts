let fs = require('fs');
let path = require('path');
let http = require('https');
let readline = require('readline');

function getInput(fileName: string) {
    return new Promise((resolve, reject) => {
        let rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false
        });

        let data = '';
        let timeout;

        function handleData(line) {
            clearTimeout(timeout);
            data += line + '\n';
        }

        function handleEnd() {
            resolve(data.replace(/\n$/, ''));
        }

        rl.on('line', handleData);
        rl.on('close', handleEnd);

        timeout = setTimeout(() => {
            rl.removeAllListeners();
            process.stdin.pause();
            getFile(fileName, resolve, reject);
        }, 100);
    });
}

function getFile(fileName, resolve, reject) {
		debugger;
    fs.exists(fileName, (exists) => {
        if(exists) {
            fs.readFile(fileName, 'utf-8', (err, data) => {
                if(err) {
                    return reject(err);
                }
                resolve(data.replace(/\n$/, ''));
            });
        }
        else {
           reject('No file')
        }
    });
}

export default getInput;
