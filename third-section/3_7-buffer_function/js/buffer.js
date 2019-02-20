const Rx = (window.Rx = window["rxjs"]);
const { interval, timer } = Rx;
const { buffer, pipe } = Rx.operators;

const source$ = timer(0, 1000);
const closingNotifier$ = interval(3000);
const buffered$ = source$.pipe(buffer(closingNotifier$));

buffered$.subscribe(v => console.log(v));
