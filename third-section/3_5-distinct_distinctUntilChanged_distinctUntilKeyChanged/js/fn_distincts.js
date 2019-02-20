const Rx = (window.Rx = window["rxjs"]);
const { from } = Rx;
const {
  distinct,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  pipe
} = Rx.operators;

Rx.from([1, 2, 3, 4, 4, 4, 5])
  .pipe(distinctUntilChanged())
  .subscribe(
    data => console.log("onNext", data),
    err => console.log("onError", err)
  );

Rx.from([{v: 1}, {v: 2}, {v: 3}, {v: 4}, {v: 4}, {v: 4}, {v: 5}])
  .pipe(
		// FIXME: distinctUntilChanged not work for Objects
		// distinctUntilChanged()
		// TODO: for Objects use distinctUntilChanged with callback function
		distinctUntilChanged((prev,next) => prev.v === next.v)
	)
  .subscribe(
    data => console.log("onNext", data),
    err => console.log("onError", err)
	);

Rx.from([{v: 1}, {v: 2}, {v: 3}, {v: 4}, {v: 4}, {v: 4}, {v: 5}, {v: 4},])
  .pipe(
		// filter ALL array data
		distinct((item) => item.v)
		// FIXME: distinctUntilKeyChanged filter by key only previos value
		//distinctUntilKeyChanged('v')
	)
  .subscribe(
    data => console.log("onNext", data),
		err => console.log("onError", err)
	);