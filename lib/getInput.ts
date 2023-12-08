let fs = require("fs");
let path = require("path");
let readline = require("readline");

function getInput() {
	return new Promise((resolve, reject) => {
		let rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
			terminal: false,
		});

		let data = "";
		let timeout;

		function handleData(line) {
			clearTimeout(timeout);
			data += line + "\n";
		}

		function handleEnd() {
			resolve(data.replace(/\n$/, ""));
		}

		rl.on("line", handleData);
		rl.on("close", handleEnd);

		timeout = setTimeout(() => {
			rl.removeAllListeners();
			process.stdin.pause();
			getFile(resolve, reject);
		}, 100);
	});
}

function getFile(resolve, reject) {
	let currentDirectory = path.dirname(require.main.filename);
	let inputFileName = path.resolve(currentDirectory, "input.txt");
	fs.exists(inputFileName, (exists) => {
		if (exists) {
			fs.readFile(inputFileName, "utf-8", (err, data) => {
				if (err) {
					return reject(err);
				}
				resolve(data.replace(/\n$/, ""));
			});
		} else {
			reject("No file");
		}
	});
}

export default getInput;
