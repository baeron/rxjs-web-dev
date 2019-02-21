const Rx = (window.Rx = window["rxjs"]);
const { Observable, from, interval } = Rx;
const { map, pipe, switchMap } = Rx.operators;

const source$ = Rx.from([1, 2, 5]);
const result = source$
    //get new value after last from([]) value seconds
  .pipe(switchMap(num => interval(num * 1000)))
  .subscribe(v => console.log(v));
