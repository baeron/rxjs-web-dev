const Rx = (window.Rx = window["rxjs"]);
const { throwError, of } = Rx;
const { ajax } = Rx.ajax;
const { take, repeat, delay, retryWhen, concat, mergeMap } = Rx.operators;

// simple example
/*
const getData = counter => ajax("http://localhost:3000/list-data").pipe(
	retryWhen(
		(error) => error.pipe(
			delay(1000),
			take(counter),
			concat(throwError({error: 'Sory, there wasan error (after 3 retries'}))
		)
	)
)
*/

// Increase interval by counter
const getData = (counter) => ajax("http://localhost:3000/list-data").pipe(
	retryWhen(
		(error) => {
			console.log('retryWhen callback run: ');
			return error.pipe(
				mergeMap((errorMessage, index) => {
					console.log('index = ', index);
					return of(1).pipe(delay(1000 * (index + 1)));
				}),
				take(counter),
				concat(throwError({error: 'Sorry, there was an error (after + ' + counter + 'retries'}))
			)
		}
	)
)

let retriableObservable = getData(5);

retriableObservable.subscribe(
	(data) => console.log('onNext handler run:', data.response),
	(errorMessage) => console.warn('Errorhandler run: ', errorMessage)
)