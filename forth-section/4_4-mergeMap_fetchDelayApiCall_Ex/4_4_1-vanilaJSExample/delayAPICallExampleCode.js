let Rx = window["rxjs"];
const { of, throwError } = Rx;
const { ajax } = Rx.ajax;
let { mergeMap, delay, mergeMapTo } = Rx.operators;

const list = document.querySelector(".list");
const requestUrl = "http://localhost:3000/request-data";
const responseUrl = "http://localhost:3000/get-response?dataId=";

const getItems = (url, maxCounter, dataId) => {
  if (maxCounter === 0)
    return throwError({ message: "max retry count exceeded" });

  return ajax.get(url).pipe(
    mergeMap(
      d => {
        if ("dataId" in d.response) {
          dataId = d.response.dataId;
          return getItems(responseUrl + dataId, maxCounter, dataId);
        }

        if (d.response.ready) {
          return of(d.response.data);
        } else {
          return of(1).pipe(
            delay(1000),
            mergeMapTo(getItems(responseUrl + dataId, maxCounter - 1, dataId))
          );
        }
      },
      null,
      1
    )
  );
};

getItems(requestUrl, 5, null).subscribe(
  result => {
    result.forEach(item => {
      const newSpan = document.createElement("span");
      newSpan.innerHTML = item;
      list.appendChild(newSpan);
    });
  },
  err => console.warn(err.message)
);
