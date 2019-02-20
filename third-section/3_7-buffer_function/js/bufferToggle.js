const Rx = (window.Rx = window["rxjs"]);
const { interval, fromEvent, empty, timer } = Rx;
const { bufferToggle, share, pipe } = Rx.operators;

const sourseInterval$ = interval(1000); // emit value every second
const startInterval$ = interval(5000); // emit value every 5 seconds

//const closingIntervalFactory = val => interval(3000); // emit value after 3 seconds

let counter = 1;
const closingIntervalFactory = val =>
  counter++ % 2 ? interval(3000) : empty(); // emit value after 3 second

const buffered$ = sourseInterval$.pipe(
  bufferToggle(startInterval$, closingIntervalFactory)
);

buffered$.subscribe(v => console.log(v));
