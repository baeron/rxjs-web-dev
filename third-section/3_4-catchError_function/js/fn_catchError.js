const Rx = (window.Rx = window["rxjs"]);
const { Observable, interval, of } = Rx;
const { map, take, catchError } = Rx.operators;

Rx.interval(500).pipe(
	take(4),
	map(x => {
		if(x === 2) throw {code: 404, message: "not found"}
		return x
	}),
	catchError(err => of(100))
).subscribe(console.log);
