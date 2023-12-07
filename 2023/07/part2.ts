import lib from "../../lib";

lib
	.getInput()
	.then((data: string) => {
		let result = 0;
		let lines = data.split("\n");

		const parsedData: Array<{
			lineStr: string;
			bid: number;
			weights: number[];
		}> = [];

		for (let line of lines) {
			const [lineStr, bid] = line.split(" ");
			parsedData.push({
				lineStr,
				bid: +bid,
				weights: getWeightsOfHand(lineStr),
			});
		}

		parsedData.sort((a, b) => {
			return (
				b.weights[0] - a.weights[0] ||
				b.weights[1] - a.weights[1] ||
				b.weights[2] - a.weights[2] ||
				b.weights[3] - a.weights[3] ||
				b.weights[4] - a.weights[4] ||
				b.weights[5] - a.weights[5]
			);
		});

		for (let i = 0; i < parsedData.length; i++) {
			result += parsedData[i].bid * (i + 1);
		}
		console.log(result);
	})
	.catch((err) => {
		console.log(err, err.stack);
	});

const cardsMap = {
	A: 1,
	K: 2,
	Q: 3,
	T: 4,
	"9": 5,
	"8": 6,
	"7": 7,
	"6": 8,
	"5": 9,
	"4": 10,
	"3": 11,
	"2": 12,
	J: 13,
};

// Five of a kind, where all five cards have the same label: AAAAA
// Four of a kind, where four cards have the same label and one card has a different label: AA8AA
// Full house, where three cards have the same label, and the remaining two cards share a different label: 23332
// Three of a kind, where three cards have the same label, and the remaining two cards are each different from any other card in the hand: TTT98
// Two pair, where two cards share one label, two other cards share a second label, and the remaining card has a third label: 23432
// One pair, where two cards share one label, and the other three cards have a different label from the pair and each other: A23A4
// High card, where all cards' labels are distinct: 23456

const getWeightsOfHand = (line: string) => {
	const weights = [];
	const set = line.split("").reduce<Record<string, number>>((acc, symb) => {
		acc[symb] = (acc[symb] || 0) + 1;
		weights.push(cardsMap[symb]);
		return acc;
	}, {});

	let mainWeight = 7;
	const differentCards = Object.keys(set).length;
	const JCards = set["J"] || 0;
	const cardsFrequency = Object.values(set);
	if (differentCards === 1) {
		mainWeight = 1; // Five of a kind
	} else if (differentCards === 2) {
		if (JCards > 0) {
			mainWeight = 1; // Five of a kind
		} else if (cardsFrequency.some((item) => item === 4)) {
			mainWeight = 2; //Four of a kind
		} else {
			mainWeight = 3; // Full house
		}
	} else if (differentCards === 3) {
		if (cardsFrequency.some((item) => item === 3)) {
			if (JCards > 0) {
				mainWeight = 2; // Four of a kind
			} else {
				mainWeight = 4; // Three of a kind
			}
		} else {
			if (JCards === 2) {
				mainWeight = 2; // // Four of a kind
			} else if (JCards === 1) {
				mainWeight = 3; // Full house, ex. KKJ77
			} else {
				mainWeight = 5; // Two pair
			}
		}
	} else if (differentCards === 4) {
		// 32T3K, 32T3J, J2TJK
		if (JCards > 0) {
			mainWeight = 4; // Three of a kind
		} else {
			mainWeight = 6; // One pair
		}
	} else {
		if (JCards > 0) {
			mainWeight = 6; // One pair
		}
	}

	return [mainWeight, ...weights];
};
