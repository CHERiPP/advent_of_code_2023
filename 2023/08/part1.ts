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
		let count = 0;
		let directionCount = 0;
		let position = "AAA";
		while (position !== "ZZZ") {
			position = dirsMap[position][directions[directionCount]];
			count++;
			directionCount++;
			if (directionCount >= directions.length) {
				directionCount = 0;
			}
		}

		console.log(count);
	})
	.catch((err) => {
		console.log(err, err.stack);
	});
