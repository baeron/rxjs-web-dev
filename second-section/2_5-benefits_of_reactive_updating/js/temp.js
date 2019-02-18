const Rx = window["rxjs"];
const { Subject } = Rx;

let switcherValueObservable = (function() {
	// create new Observable like Subject
	let switcherSubject = new Subject();
	
	// get DOM elements  in variable step1 and step2
  let step1 = document.querySelector(".step-one");
	let step2 = document.querySelector(".step-two");
	
	// add event to item button
  step1.addEventListener("click", event => {
		// change data
		switcherSubject.next(1);
		// change css styles
    step1.classList.add("active");
    step2.classList.remove("active");
	});
	
	// add event to item button
  step2.addEventListener("click", event => {
		// change data
		switcherSubject.next(2);
		// change css styles
    step1.classList.remove("active");
    step2.classList.add("active");
  });

  return switcherSubject.asObservable();
})();

//counter
function createCounter(selector, stepObservable) {
  let counter = 0;
  let step = 1;

  stepObservable.subscribe(value => (step = value));

  let counterElement = document.querySelector(selector + " .value");

  setInterval(() => {
    counter = counter + step;
    counterElement.innerHTML = counter;
  }, 1000);
}

createCounter(".counter", switcherValueObservable);
createCounter('.counter2', switcherValueObservable)
createCounter('.counter3', switcherValueObservable)
