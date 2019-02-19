const Rx = (window.Rx = window["rxjs"]);
const { Observable, pipe, interval } = Rx;
const { map, filter, take } = Rx.operators;

Rx.interval(500).pipe(
	// take(4),
	// map(x => x*2),
	filter(x => x < 5)
).subscribe(console.log);
