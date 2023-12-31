import lib from "../../lib";

lib
	.getInput()
	.then((data: string) => {
		const colors = ['red', 'green', 'blue'];
		const maxColors = {
			red: 12,
			green: 13,
			blue: 14,
		};
		let result = 0;
		let lines = data.split("\n");
		for (let line of lines) {
			const [gameStr, setsStr] = line.split(": ");
			const [, gameNumber] = gameStr.split(" ");
			const sets = setsStr.split("; ");
			const currentColors = {
				red: 0,
				green: 0,
				blue: 0,
			};
			for (let set of sets) {
				const setColors = set.split(', ');
				for (let setColor of setColors) {
					const [numberColor, color] = setColor.split(' ');
					currentColors[color] = Math.max(currentColors[color], +numberColor);
				}
			}
			if (colors.some(color => currentColors[color] > maxColors[color])) {
				continue;
			}
			result += +gameNumber;
		}
		console.log(result);
	})
	.catch((err) => {
		console.log(err, err.stack);
	});
