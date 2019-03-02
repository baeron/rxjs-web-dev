let Rx = window["rxjs"];
const { interval, of, from, Subject, empty, fromEvent, concat, defer } = Rx;
const { ajax } = Rx.ajax;
let { mergeScan, delay, catchError, repeat } = Rx.operators;

const itemContainer = document.querySelector(".container");
const moreButton = document.querySelector(".more");

const baseUrl = "http://localhost:3000/list-data?page=";

const getInitialData = prefetchPages => {
  let counter = 0;
  return defer(() => ajax(baseUrl + counter++)).pipe(repeat(prefetchPages));
};

const getItems = prefetchPages => {
  const initialData$ = getInitialData(prefetchPages);

  const fetchMoreEvents$ = fromEvent(moreButton, "click");
  const moreItems$ = fetchMoreEvents$.pipe(
    mergeScan(
      (prevAjaxResponce, next) => {
        if ("nextIndex" in prevAjaxResponce.response) {
          return ajax.get(baseUrl + prevAjaxResponce.response.nextIndex);
        }
        return EMPTY;
      },
      {
        response: { nextIndex: prefetchPages }
      },
      1
    )
  );
  return concat(initialData$, moreItems$);
};

const allItems$ = getItems(2);

allItems$.subscribe(d => {
  d.response.data.forEach(item => {
    const newSpan = document.createElement("span");
    newSpan.innerHTML = item;
    itemContainer.insertBefore(newSpan, moreButton);

    if (!("nextIndex" in d.response)) {
      moreButton.disabled = true;
    }
  });
});
