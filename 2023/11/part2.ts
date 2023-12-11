import lib from "../../lib";

lib
	.getInput()
	.then((data: string) => {
		let lines = data.split("\n");
		const EMPTY_DIFF = 1000000 - 1;
		let result = 0;

		const matrix: string[][] = [];
		for (let line of lines) {
			matrix.push(line.split(""));
		}
		let yDiff = 0;
		for (let i = 0; i < matrix.length; i++) {
			let isEmpty = true;
			for (let j = 0; j < matrix[0].length; j++) {
				if (matrix[i][j] !== ".") {
					isEmpty = false;
					matrix[i][j] = `${i + yDiff}-${j}`;
				}
			}
			if (isEmpty) {
				yDiff += EMPTY_DIFF;
			}
		}
		let xDiff = 0;
		for (let i = 0; i < matrix[0].length; i++) {
			let isEmpty = true;
			for (let j = 0; j < matrix.length; j++) {
				if (matrix[j][i] !== ".") {
					isEmpty = false;
					const [y, x] = matrix[j][i].split("-");
					matrix[j][i] = `${y}-${+x + +xDiff}`;
				}
			}
			if (isEmpty) {
				xDiff += EMPTY_DIFF;
			}
		}

		const set = [];
		for (let i = 0; i < matrix.length; i++) {
			for (let j = 0; j < matrix[0].length; j++) {
				if (matrix[i][j] !== ".") {
					set.push(matrix[i][j]);
				}
			}
		}

		while (set.length > 0) {
			const [x, y] = set.pop().split("-");
			for (let coord of set) {
				const [otherX, otherY] = coord.split("-");
				result += Math.abs(x - otherX) + Math.abs(y - otherY);
			}
		}

		console.log(result);
	})
	.catch((err) => {
		console.log(err, err.stack);
	});
