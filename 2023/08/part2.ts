import lib from "../../lib";

lib
	.getInput()
	.then((data: string) => {
		let lines = data.split("\n");

		const directions = lines[0].split("");
		const dirsMap = {};
		for (let i = 2; i < lines.length; i++) {
			const [set, dirsStr] = lines[i].split(" = ");
			const dirs = dirsStr.slice(1, dirsStr.length - 1).split(", ");
			dirsMap[set] = { L: dirs[0], R: dirs[1] };
		}
		let positions = [];
		for (let key of Object.keys(dirsMap)) {
			if (key[2] === "A") {
				positions.push(key);
			}
		}
		let counters = [];
		for (let position of positions) {
			let count = 0;
			let directionCount = 0;
			let curPosition = position;
			while (curPosition[2] !== "Z") {
				curPosition = dirsMap[curPosition][directions[directionCount]];
				count++;
				directionCount++;
				if (directionCount >= directions.length) {
					directionCount = 0;
				}
			}

			counters.push(count);
		}

		console.log(nokArr(counters));
	})
	.catch((err) => {
		console.log(err, err.stack);
	});

function nokArr(arr: number[]) {
	return arr.reduce((sum, a) => {
		return nok(sum, a);
	});
}

function nod(a: number, b: number) {
	return !b ? a : nod(b, a % b);
}

function nok(a: number, b: number) {
	return (a * b) / nod(a, b);
}
