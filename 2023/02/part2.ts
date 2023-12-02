import lib from "../../lib";

lib
	.getInput()
	.then((data: string) => {
		const colors = ['red', 'green', 'blue'];
		let result = 0;
		let lines = data.split("\n");
		for (let line of lines) {
			const [, setsStr] = line.split(": ");
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
			let currentResult = 1;
			for (let color of colors) {
				currentResult *= +currentColors[color];
			}
			result += currentResult;
		}
		console.log(result);
	})
	.catch((err) => {
		console.log(err, err.stack);
	});
