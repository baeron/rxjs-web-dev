const Rx = (window.Rx = window["rxjs"]);
const { ajax } = Rx.ajax;
const { take, retry } = Rx.operators;

const getData = () => ajax('http://localhost:3000/list-data').pipe(
	retry(4)
)
let retriableObservable = getData();

retriableObservable.subscribe(
	(data) => console.log(data.response),
	console.warn()
	
)