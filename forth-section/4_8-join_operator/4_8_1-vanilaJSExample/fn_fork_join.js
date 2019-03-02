let Rx = window["rxjs"];
const { Subject, of, forkJoin } = Rx;
const { ajax } = Rx.ajax;
let { concatMap, mergeMap, delay } = Rx.operators;

const deleteSubject = new Subject();

const deleteClick = id => deleteSubject.next(id);

const deleteAllClick = () => {
  const ids = [1, 2, 3];
  const arrayOfObservables = ids.map(deleteItem);
  forkJoin(arrayOfObservables).subscribe(responses => {
    responses.forEach(response => {
      console.log("response ", response);
      document.querySelector(`#item${response.id}`).remove();
    });
  });
};

const deleteItem = id => {
  // return ajax.post(deleteUrl, headers, {id})
  return of({ id }).pipe(delay(2000));
};

const deleteItems$ = deleteSubject.asObservable().pipe(
  concatMap((id, index) => {
    if (index === 1) {
      return deleteItem(id).pipe(delay(2000));
    }
    return deleteItem(id);
  }, null) // selector function - we don't need it here.
);

deleteItems$.subscribe(response => {
  console.log("Item to delete:", response);
  document.querySelector(`#item${response.id}`).remove();
});
