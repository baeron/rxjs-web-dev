const Rx = (window.Rx = window["rxjs"]);
const { Observable, from, interval } = Rx;
const { map, pipe, switchMapTo } = Rx.operators;

const source$ = Rx.from([1, 2, 5]);
const result = source$
  .pipe(switchMapTo(interval(1000)))
  .subscribe(v => console.log(v));
