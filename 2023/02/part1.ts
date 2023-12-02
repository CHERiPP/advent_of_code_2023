import lib from '../../lib';

let year = 2023;
let day = 1;

lib.getInput(year, day).then((data: string) => {
    let lines = data.split('\n');
		debugger;
    for(let line of lines) {
			console.log(line);
    }
}).catch((err) => {
    console.log(err, err.stack);
});
