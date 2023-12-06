import lib from "../../lib";

lib
	.getInput()
	.then((data: string) => {
		let result = 0;
		let lines = data.split("\n");
		const [, timeStr] = lines[0].split(":");
		const [, distanceStr] = lines[1].split(":");
		const time = +timeStr.split(" ").join("");
		const maxDistance = +distanceStr.split(" ").join("");

		for (let k = 1; k < time; k++) {
			const distance = (time - k) * k;
			if (distance > maxDistance) {
				result++;
			}
		}

		console.log(result);
	})
	.catch((err) => {
		console.log(err, err.stack);
	});
