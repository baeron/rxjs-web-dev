const Rx = (window.Rx = window["rxjs"]);
const { Observable, pipe, range } = Rx;
const { map, filter } = Rx.operators;

const filterMoreThen5 = filter(x => x <= 5);
const doubleValue = map(value => value * 2);

const customOperator = pipe(
  doubleValue,
  filterMoreThen5
);

const source$ = range(0, 10);
source$.pipe(customOperator).subscribe(console.log);
