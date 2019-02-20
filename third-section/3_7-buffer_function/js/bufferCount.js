const Rx = (window.Rx = window["rxjs"]);
const { timer } = Rx;
const { bufferTime, bufferCount, pipe } = Rx.operators;

const sourseInterval$ = Rx.timer(0, 1000);

const buffered$ = sourseInterval$.pipe(
  // buffer size equals StartBufferEvery
  // bufferCount(2, 2)

  // buffer size bigger then StartBufferEvery
  // bufferCount(4, 2)

  // buffer size less then StartBufferEvery
  // bufferCount(2, 3)

  bufferTime(3000)
);
//

buffered$.subscribe(v => console.log(v));
