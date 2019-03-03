const Rx = window["rxjs"];
const { Subject, of, forkJoin, fromEvent, EMPTY } = Rx;
const { ajax } = Rx.ajax;
const { map, switchMap, delay, startWith, repeatWhen, tap } = Rx.operators;

const list = document.querySelector(".list-group");

const pauseBtnClick$ = (function() {
	let repeatStatus = true;
	const pauseBtn = document.querySelector('.pause-btn');
	return fromEvent(pauseBtn, 'click').pipe(
		map(() => {
			repeatStatus = !repeatStatus;
			return repeatStatus;
		}),
		tap((repeatStatus) => {
			pauseBtn.innerHTML = repeatStatus ? 'Pause' : 'Resume';
			pauseBtn.classList.toggle('btn-danger');
			pauseBtn.classList.toggle('btn-success');
		}),
		startWith(true)
	);
})();

const getData = (timeSec) => ajax.get('http://localhost:3000/list-data').pipe(
	repeatWhen((notification) => notification.pipe(
		delay(timeSec * 1000)
	))
)

let repetableObservable$ = getData(3);

const result$ = pauseBtnClick$.pipe(
	switchMap((repeatStatus) => {
		console.log('repeatStatus', repeatStatus)
		if(repeatStatus) {
			return repetableObservable$
		}
		return EMPTY;
	})
)

result$.subscribe(
	(response) => updateListView(response),
	console.warn
)

function updateListView(response) {
	console.log(response);
	const items = response.response.data;
	list.innerHTML = '';
	items.forEach((itemText) => {
		const listItem = document.createElement('li');
		listItem.classList.add('list-group-item');
		listItem.innerHTML = itemText;
		list.append(listItem);
	})
}