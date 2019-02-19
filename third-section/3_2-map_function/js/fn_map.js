const Rx = (window.Rx = window["rxjs"]);
const { Observable, pipe, range } = Rx;
const { map, filter } = Rx.operators;

class SomeComponent {
  constructor(service2Inst) {
    this.s2 = service2Inst;
  }

  showValues() {
    this.s2.getRange().subscribe(console.log);
  }
}

class Service2 {
  constructor(service1Inst) {
    this.s1 = service1Inst;
  }

  getRange() {
    return range(0, 4).pipe(map(
			(...args) => this.multiplyByTwo(...args)
			// FIXME: wrong context
			// this.multiplyByTwo
			));
  }

  multiplyByTwo(x) {
    return this.s1.multiplyByTwo2(x);
  }
}

class Service1 {
  multiplyByTwo2(x) {
    return x * 2;
  }
}

let temp = new SomeComponent(new Service2(new Service1()));
temp.showValues();
