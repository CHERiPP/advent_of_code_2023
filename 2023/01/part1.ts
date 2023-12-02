import lib from "../../lib";

lib
	.getInput()
	.then((data: string) => {
		const lines = data.split("\n");
		const digits = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
		let result = 0;
		for (let line of lines) {
			let str = "";
			for (let i = 0; i < line.length; i++) {
				if (digits.has(line[i])) {
					str += line[i];
					break;
				}
			}
			for (let i = line.length - 1; i >= 0; i--) {
				if (digits.has(line[i])) {
					str += line[i];
					break;
				}
			}
			result += +str;
		}
		console.log(result);
	})
	.catch((err) => {
		console.log(err, err.stack);
	});
