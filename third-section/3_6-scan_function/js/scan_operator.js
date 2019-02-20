const Rx = (window.Rx = window["rxjs"]);
const { from } = Rx;
const { scan, pipe, map } = Rx.operators;

Rx.from([1, 2, 3, 4, 5])
	.pipe(
		scan((acc, next) => acc + next, 0),
		// map((x, index) => x/(index+1))
	)
	.subscribe(
		v => console.log(v)
	);