import lib from "../../lib";

lib
	.getInput()
	.then((data: string) => {
		let result = 0;
		let lines = data.split("\n");
		for (let line of lines) {
			const [, setsStr] = line.split(": ");
			const [winningStr, gamerStr] = setsStr.split(" | ");
			const winningNumbers = new Set(
				winningStr
					.split(" ")
					.map((item) => item.trim())
					.filter(Boolean)
			);
			const gamerNumbers = gamerStr
				.split(" ")
				.map((item) => item.trim())
				.filter(Boolean);
			let currentCount = 0;
			for (let gamerNumber of gamerNumbers) {
				if (winningNumbers.has(gamerNumber)) {
					currentCount++;
				}
			}
			result += getCardPoints(currentCount);
		}

		console.log(result);
	})
	.catch((err) => {
		console.log(err, err.stack);
	});

const getCardPoints = (currentCount: number) => {
	if (currentCount === 0) return 0;
	if (currentCount === 1) return 1;
	return Math.pow(2, currentCount - 1);
};
