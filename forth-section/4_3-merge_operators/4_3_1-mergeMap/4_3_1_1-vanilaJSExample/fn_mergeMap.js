const Rx = (window.Rx = window["rxjs"]);
const { of } = Rx;
const { ajax } = Rx.ajax;
const { mergeMap, pipe } = Rx.operators;

const list = document.querySelector(".list");
const modeButton = document.querySelector(".more");

const getItems = (index, result = []) => {
  return ajax.get("http://localhost:3000/list-data?page=" + index).pipe(
    mergeMap(
      d => {
        result = result.concat(d.response.data);
        if ("nextIndex" in d.response) {
          return getItems(d.response.nextIndex, result);
        }
        debugger;
        return of(result);
      },
      null,
      1
    )
  );
};

getItems(0).subscribe(result => {
  result.forEach(item => {
    const newSpan = document.createElement("span");
    newSpan.innerHTML = item;
    list.appendChild(newSpan);
  });
});
