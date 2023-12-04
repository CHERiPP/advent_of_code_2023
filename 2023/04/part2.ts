import lib from "../../lib";

lib
	.getInput()
	.then((data: string) => {
		let resultMap: Record<string, { count: number; winningCount: number }> = {};
		let lines = data.split("\n");
		for (let i = 0; i < lines.length; i++) {
			const [, setsStr] = lines[i].split(": ");
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
			resultMap[i + 1] = {
				count: 1,
				winningCount: currentCount,
			};
		}

		for (let [key, value] of Object.entries(resultMap)) {
			for (let i = 1; i <= value.winningCount; i++) {
				const newKey = +key + i;
				if (resultMap[newKey] !== undefined) {
					resultMap[newKey].count += value.count;
				}
			}
		}

		const result = Object.values(resultMap).reduce((sum, item) => {
			return sum + item.count;
		}, 0);

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
