const Rx = (window.Rx = window["rxjs"]);
const { defer } = Rx;
const { ajax } = Rx.ajax;
const { take, repeat } = Rx.operators;

let counter = 0;
const getData = () => defer(
	() => ajax('http://localhost:3000/list-data?page=' + counter++)
).pipe(repeat(3));

let repetableObservable = getData();

repetableObservable.subscribe(
	(data) => console.log(data.response),
	console.warn()
);
