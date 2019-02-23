
const Rx = (window.Rx = window["rxjs"]);
const { of, fromEvent, EMPTY } = Rx;
const { ajax } = Rx.ajax;
const { mergeScan, pipe } = Rx.operators;

const itemsContainer = document.querySelector('.container');
const moreButton = document.querySelector(".more");
const fetchMoreEvents$ = fromEvent(moreButton, "click");

const items$ = fetchMoreEvents$.pipe(
	mergeScan((prevAjaxResponce, next) => {
		if('nextIndex' in prevAjaxResponce.response) {
			return ajax.get("http://localhost:3002/list-data?page=" + prevAjaxResponce.response.nextIndex)
		}
		return EMPTY;
	},
	{
		response: { nextIndex: 1}
	}, 1)
)

items$.subscribe(d => {
	d.response.data.forEach((item) => {
		const newSpan  = document.createElement('span');
		newSpan.innerHTML = item;
		itemsContainer.insertBefore(newSpan, moreButton);

		if(!('nextIndex' in d.response)) moreButton.disabled = true;
	})
});