const $ =  window.$;

const Rx = (window.Rx = window["rxjs"]);
const { ajax } = Rx.ajax;
const { Observable, fromEvent, of } = Rx;
const {
  map,
  pipe,
  filter,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  switchMapTo,
  switchAll
} = Rx.operators;

function makeWikiSearch (value) {
	return $.ajax({
		url: 'https://en.wikipedia.org/w/api.php',
		dataType: 'jsonp',
		data: {
			action: 'opensearch',
			format: 'json',
			search: value
		}
	}).promise();
}

const $input = document.querySelector('#textInput');
const $results = $('#results');

// Get all distinct key up events from the input and only fire if long enough and distinct
Rx.fromEvent($input, 'keyup').pipe(
map(e => e.target.value),
debounceTime(750),
distinctUntilChanged(),
// switchAll PART
// map((text) => makeWikiSearch(text)),
// switchAll()

// switchMap PART
switchMap((text) => makeWikiSearch(text))

// switchMapTo PART
//switchMapTo(makeWikiSearch('test'))
)
.subscribe(
	(response) => {
		const data = response[1];
		const listItems = data.map(str => $('<li>').text(str))
		$results.empty().append(listItems)
		$results.children().on('click', (event) => {
			$input.value = event.target.innerHTML;
			$results.empty()
		})
 }
);