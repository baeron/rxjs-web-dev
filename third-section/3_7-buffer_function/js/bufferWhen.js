const Rx = (window.Rx = window["rxjs"]);
const { timer, interval } = Rx;
const { bufferWhen, pipe } = Rx.operators;

const source$ = interval(1000);

const buffered$ = source$.pipe(
  bufferWhen(() => {
    console.log("Call factory function");
    return interval(1000 + Math.random() * 4000);
  })
);

buffered$.subscribe(v => console.log(v));
