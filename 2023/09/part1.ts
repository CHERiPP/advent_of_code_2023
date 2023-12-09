import lib from "../../lib";

lib
	.getInput()
	.then((data: string) => {
		let lines = data.split("\n");
		let result = 0;

		for (let line of lines) {
			const numbers: number[][] = [];
			numbers[0] = line.split(" ").map(Number);
			while (numbers[numbers.length - 1].some((num) => num !== 0)) {
				const lastArr = numbers[numbers.length - 1];
				const newArr = [];
				for (let i = 1; i < lastArr.length; i++) {
					newArr.push(lastArr[i] - lastArr[i - 1]);
				}
				numbers.push(newArr);
			}
			numbers[numbers.length - 1].push(0);
			for (let i = numbers.length - 2; i >= 0; i--) {
				numbers[i].push(
					numbers[i][numbers[i].length - 1] + numbers[i + 1][numbers[i + 1].length - 1]
				);
			}
			result += numbers[0][numbers[0].length - 1];
		}

		console.log(result);
	})
	.catch((err) => {
		console.log(err, err.stack);
	});
