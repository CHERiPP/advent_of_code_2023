import lib from "../../lib";

let year = 2023;
let day = 1;
console.log("test");
lib
	.getInput(year, day)
	.then((data: string) => {
		const lines = data.split("\n");
		const digits = new Set(["1", "2", "3", "4", "5", "6", "7", "8", "9"]);
		const leftMap = {
			one: "1",
			two: "2",
			three: "3",
			four: "4",
			five: "5",
			six: "6",
			seven: "7",
			eight: "8",
			nine: "9",
		};
		const leftMapKeys = Object.keys(leftMap);
		const rightMap = {
			eno: "1",
			owt: "2",
			eerht: "3",
			ruof: "4",
			evif: "5",
			xis: "6",
			neves: "7",
			thgie: "8",
			enin: "9",
		};
		const rightMapKeys = Object.keys(rightMap);
		let result = 0;
		for (let line of lines) {
			let str = "";
			for (let i = 0; i < line.length; i++) {
				if (digits.has(line[i])) {
					str += line[i];
					break;
				}
				const maybeFirstDigit = line.slice(i, i + 5);
				const firstTextNumber = leftMapKeys.find((key) => maybeFirstDigit.startsWith(key));
				if (firstTextNumber) {
					str += leftMap[firstTextNumber];
					break;
				}
			}
			const lastLine = line.split("").reverse().join("");
			for (let i = 0; i < lastLine.length; i++) {
				if (digits.has(lastLine[i])) {
					str += lastLine[i];
					break;
				}
				const maybeLastDigit = lastLine.slice(i, i + 5);
				const lastTextNumber = rightMapKeys.find((key) => maybeLastDigit.startsWith(key));
				if (lastTextNumber) {
					str += rightMap[lastTextNumber];
					break;
				}
			}
			result += +str;
		}
		console.log(result);
	})
	.catch((err) => {
		console.log(err, err.stack);
	});
