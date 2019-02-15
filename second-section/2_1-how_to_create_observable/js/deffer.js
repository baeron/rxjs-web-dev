const Rx = window["rxjs"];
const defer = Rx.defer;
const of = Rx.of;

function ObservableFactory(n) {
	// some bisnes logic
	return of(n);
}

let counter = 0;
const source$ = defer( () => ObservableFactory(counter++) );

// get fresh observable fo each new observable
source$.subscribe( (data) => console.log('1: ', data));
source$.subscribe( (data) => console.log('2: ', data));
