const Rx = window["rxjs"];
const { Observable } = Rx;

//create simple Observable
const observable = Observable.create((observer) => {
	let id = setInterval( () => {
		observer.next('hi')
		// observable.complete()
	}, 1000)
});

// subscribing to observable
observable.subscribe(
	v => { console.log(v) },
	e => { console.log(e) },
	() => { console.log('Complete') }
);