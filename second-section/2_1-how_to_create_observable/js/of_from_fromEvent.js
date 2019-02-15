let Rx = (window.Rx = window["rxjs"]);
let { map, debounceTime } = Rx.operators;
let { fromEvent, of, from } = Rx;

const inputElement = document.querySelector("input");

// method OF for simple data
of("hello")
  .pipe(
		map(v => v + " world")
	)
  .subscribe(console.log);

// method FROM for Odbect and Array structure
from([1, 2])
	.subscribe(console.log);

// method FROM_EVENT for subscribing to event
fromEvent(inputElement, "keyup")
  .pipe(
    map(e => e.target.value),
    debounceTime(750)
  )
  .subscribe(console.log);
