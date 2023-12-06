import lib from "../../lib";

lib
	.getInput()
	.then((data: string) => {
		let result = 1;
		let lines = data.split("\n");
		const [, timeStr] = lines[0].split(":");
		const [, distanceStr] = lines[1].split(":");
		const times = timeStr
			.split(" ")
			.map((item) => +item.trim())
			.filter(Boolean);
		const distances = distanceStr
			.split(" ")
			.map((item) => +item.trim())
			.filter(Boolean);

		for (let i = 0; i < times.length; i++) {
			const distanceTime = times[i];
			const currentMaxDistance = distances[i];
			let count = 0;
			for (let k = 1; k < distanceTime; k++) {
				const distance = (distanceTime - k) * k;
				if (distance > currentMaxDistance) {
					count++;
				}
			}
			result *= count;
		}

		console.log(result);
	})
	.catch((err) => {
		console.log(err, err.stack);
	});
