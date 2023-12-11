import lib from "../../lib";

lib
	.getInput()
	.then((data: string) => {
		let lines = data.split("\n");
		const matrix: string[][] = [];
		for (let line of lines) {
			matrix.push(line.split(""));
		}
		const width = matrix[0].length;
		const height = matrix.length;
		let positionS = [0, 0];
		for (let k = 0; k < 4; k++) {
			for (let i = 0; i < height; i++) {
				for (let j = 0; j < width; j++) {
					const elem = matrix[i][j];
					const { hasTop, hasBottom, hasLeft, hasRight } = getDirections(i, j, matrix);

					switch (elem) {
						case "|":
							if (hasTop && hasBottom) {
								continue;
							} else {
								matrix[i][j] = ".";
								break;
							}
						case "-":
							if (hasLeft && hasRight) {
								continue;
							} else {
								matrix[i][j] = ".";
								break;
							}
						case "L":
							if (hasTop && hasRight) {
								continue;
							} else {
								matrix[i][j] = ".";
								break;
							}
						case "J":
							if (hasTop && hasLeft) {
								continue;
							} else {
								matrix[i][j] = ".";
								break;
							}
						case "7":
							if (hasBottom && hasLeft) {
								continue;
							} else {
								matrix[i][j] = ".";
								break;
							}
						case "F":
							if (hasBottom && hasRight) {
								continue;
							} else {
								matrix[i][j] = ".";
								break;
							}
						case "S": {
							positionS = [i, j];
						}
						case ".":
						default:
							continue;
					}
				}
			}
		}
		const [startI, startJ] = positionS;
		let i = startI;
		let j = startJ;
		let count = 0;
		let previous = "left";
		do {
			const { hasTop, hasBottom, hasLeft, hasRight } = getDirections(i, j, matrix);

			if (hasTop && previous !== "top") {
				i--;
				previous = "bottom";
			} else if (hasBottom && previous !== "bottom") {
				i++;
				previous = "top";
			} else if (hasLeft && previous !== "left") {
				j--;
				previous = "right";
			} else if (hasRight && previous !== "right") {
				j++;
				previous = "left";
			}
			count++;
		} while (i !== startI || j !== startJ);

		console.log(count / 2);
	})
	.catch((err) => {
		console.log(err, err.stack);
	});

const dirMap = {
	"|": ["top", "bottom"],
	"-": ["left", "right"],
	L: ["top", "right"],
	J: ["top", "left"],
	"7": ["left", "bottom"],
	F: ["right", "bottom"],
	S: ["top", "bottom", "left", "right"],
	".": [],
};

const getDirections = (i: number, j: number, matrix: string[][]) => {
	const width = matrix[0].length;
	const height = matrix.length;
	const hasTop = i > 0 ? dirMap[matrix[i - 1][j]].includes("bottom") : false;
	const hasBottom = i < height - 1 ? dirMap[matrix[i + 1][j]].includes("top") : false;
	const hasLeft = j > 0 ? dirMap[matrix[i][j - 1]].includes("right") : false;
	const hasRight = j < width - 1 ? dirMap[matrix[i][j + 1]].includes("left") : false;
	return {
		hasTop,
		hasBottom,
		hasLeft,
		hasRight,
	};
};
