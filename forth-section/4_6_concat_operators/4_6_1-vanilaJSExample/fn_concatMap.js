const Rx = (window.Rx = window["rxjs"]);
const { Subject, of } = Rx;
const { ajax } = Rx.ajax;
const { concatMap, pipe, delay } = Rx.operators;

const deleteSubject = new Subject();
const deleteClick = id => deleteSubject.next(id);

const deleteItem = id => {
	// return ajax.post(deleteUrl, headers, {id})
	return of({id}).pipe(delay(2000));
}

const deleteItems$ = deleteSubject.asObservable().pipe(
	concatMap(
		(id, index) => {
			if (index === 1) {
				return deleteItem(id).pipe(delay(2000))
			}
			return deleteItem(id)
		},
		null)
);

deleteItems$.subscribe((response) => {
	console.log('Item to delete:', response);
	document.querySelector(`#item${response.id}`).remove();
});