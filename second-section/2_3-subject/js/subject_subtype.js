const Rx = window["rxjs"];
const { Subject } = Rx;

const sourse$ = new Subject();
let counter = 0;

let clearId = setInterval(() => {
	console.log('source$ value', counter);
	sourse$.next(counter++);
}, 1000);

sourse$.subscribe((data) => console.log('Observer 1: ', data));

setTimeout(() => {sourse$.subscribe((data) => console.log('Observer 2: ', data))});
setTimeout(() => {sourse$.complete(); clearInterval(clearId)}, 5000);
