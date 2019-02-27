const Rx = (window.Rx = window["rxjs"]);
const { Subject, of, fromEvent, from, zip, combineLatest } = Rx;
const { ajax } = Rx.ajax;
const { concatMap, delay, withLatestFrom, take } = Rx.operators;

const httpService = {
  getCitiesInfo: () => {
    // return ajax('http://back-end.com/get-cities');
    return of({
      London: 25,
      Paris: 30,
      Rome: 35
    }).pipe(delay(1000));
  },
  getTaxCoefficients: () => {
    //return ajax('http://back-end.com/get-coefficients');
    return of([1, 1.2, 1.5]).pipe(delay(1200));
  }
};

const citiesObject$ = httpService.getCitiesInfo();
const coefficientsList$ = httpService.getTaxCoefficients();

zip(citiesObject$, coefficientsList$)
  .pipe(take(1))
  .subscribe(() => {
    document.querySelector(".card-body.main").style.display = "block";
    document.querySelector(".loading").style.display = "none";
  });

// cities switcher
const citiesContainer = document.querySelector(".btn-group.cities");

let citiesObservable$ = (function(citiesObject$, citiesContainer) {
  citiesContainer.innerHTML = "";
  const citiesSubject = new Subject();

  citiesObject$.subscribe(cityObj => {
    Object.keys(cityObj).forEach((city, index) => {
      let classString = "btn btn-primary";
      if (index === 0) {
        citiesSubject.next(cityObj[city]);
        classString += " active";
      }

      //add button
      const button = document.createElement("button");
      button.innerHTML = city + " <br>" + cityObj[city];
      button.className = classString;
      button.addEventListener("click", () => {
        Array.from(citiesContainer.children).forEach(item =>
          item.classList.remove("active")
        );
        button.classList.add("active");
        citiesSubject.next(cityObj[city]);
      });
      citiesContainer.append(button);
    });
  });
  return citiesSubject.asObservable();
})(citiesObject$, citiesContainer);

// coefficient switcher
const coefficientsContainer = document.querySelector(".btn-group.coefficients");
let coefficientsObservable$ = (function(
  coefficientsList$,
  coefficientsContainer
) {
  coefficientsContainer.innerHTML = "";
  const coefficientsSubject = new Subject();

  coefficientsList$.subscribe(coefficientsList => {
    coefficientsList.forEach((coefficient, index) => {
      let classString = "btn btn-success";
      if (index === 0) {
        coefficientsSubject.next(coefficient);
        classString += " active";
      }

      // add button
      const button = document.createElement("button");
      button.innerHTML = coefficient;
      button.className = classString;
      button.addEventListener("click", () => {
        Array.from(coefficientsContainer.children).forEach(item => {
          item.classList.remove("active");
        });
        button.classList.add("active");
        coefficientsSubject.next(coefficient);
      });
      coefficientsContainer.append(button);
    });
  });
  return coefficientsSubject.asObservable();
})(coefficientsList$, coefficientsContainer);

combineLatest(citiesObservable$, coefficientsObservable$).subscribe(
  ([price, coef]) => {
    const valueElememt = document.querySelector(".price .value");
    valueElememt.innerHTML = parseInt(price, 10) * parseFloat(coef);
  }
);

const smsButton = document.querySelector(".sms");
fromEvent(smsButton, "click")
  .pipe(withLatestFrom(citiesObservable$, coefficientsObservable$))
  .subscribe(([event, cityValue, coefficient]) =>
    alert("Sending value = " + cityValue + " and coef = " + coefficient)
  );
