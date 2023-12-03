import lib from "../../lib";

const digits = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);

lib
	.getInput()
	.then((data: string) => {
		let result = 0;
		let lines = data.split("\n");

		for (let i = 0; i < lines.length; i++) {
			for (let j = 0; j < lines[i].length; j++) {
				if (digits.has(lines[i][j])) {
					let start = j;
					let end = j;
					while (j < lines[i].length && digits.has(lines[i][j + 1])) {
						end++;
						j++;
					}
					if (doesMatrixHasAdjacentSymbols(i, start, end, lines)) {
						const num = lines[i].slice(start, end + 1);
						result += +num;
					}
				}
			}
		}

		console.log(result);
	})
	.catch((err) => {
		console.log(err, err.stack);
	});

const doesMatrixHasAdjacentSymbols = (
	lineNumber: number,
	start: number,
	end: number,
	lines: string[]
) => {
	let startX = start > 0 ? start - 1 : start;
	let endX = end < lines[lineNumber].length - 1 ? end + 1 : end;
	let startY = lineNumber > 0 ? lineNumber - 1 : lineNumber;
	let endY = lineNumber < lines.length - 1 ? lineNumber + 1 : lineNumber;
	for (let i = startY; i <= endY; i++) {
		for (let j = startX; j <= endX; j++) {
			if (!digits.has(lines[i][j]) && lines[i][j] !== ".") {
				return true;
			}
		}
	}
	return false;
};
