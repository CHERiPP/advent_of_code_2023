import lib from "../../lib";

lib
	.getInput()
	.then((data: string) => {
		let result = Infinity;
		let lines = data.split("\n");
		const [, seedStr] = lines[0].split(":");
		const seeds = seedStr
			.split(" ")
			.map((item) => item.trim())
			.filter(Boolean)
			.map(Number);
		const map = {};
		for (let i = 0; i < 7; i++) {
			map[i] = [];
		}
		let mapIndex = 0;
		for (let i = 2; i < lines.length; i++) {
			if (!lines[i].trim()) {
				mapIndex++;
				continue;
			}
			if (lines[i].includes("map")) {
				continue;
			}
			const [destination, source, range] = lines[i].split(" ");
			const object = {
				start: +source,
				end: +source + +range - 1,
				range: +range,
				startDest: +destination,
			};
			map[mapIndex].push(object);
		}
		for (let seed of seeds) {
			let value = seed;
			for (let i = 0; i < 7; i++) {
				const obj = map[i].find((obj) => obj.start <= value && obj.end >= value);
				value = obj ? value - obj.start + obj.startDest : value;
			}
			result = Math.min(value, result);
		}

		console.log(result);
	})
	.catch((err) => {
		console.log(err, err.stack);
	});
