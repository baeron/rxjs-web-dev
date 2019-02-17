const Rx = (window.Rx = window["rxjs"]);
const { interval, range, timer, Observable } = Rx;
const { take, delay, pipe } = Rx.operators;

Rx.interval(500).pipe(
	take(4)
).subscribe(
	v => console.log(v),
	e => console.log(e),
	() => console.log('Compleated')
);

Rx.range(1, 4).subscribe(
	v => console.log(v),
	e => console.log(e),
	() => console.log('Comleated')
);


Rx.timer(1000, 100).pipe(
	take(10),
	delay(2000)
).subscribe(
	v => console.log(v),
	e => console.log(e),
	() => console.log('Compleated')
);