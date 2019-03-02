import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnDestroy
} from "@angular/core";
import { ajax } from "rxjs/ajax";
import { mergeScan, repeat } from "rxjs/operators";
import { fromEvent, EMPTY, defer, concat } from "rxjs";
import { Subscription } from "rxjs/internal/Subscription";

const baseUrl = "http://localhost:3000/list-data?page=";

@Component({
  selector: "app-merge-scan",
  templateUrl: "./merge-scan.component.html",
  styleUrls: ["./merge-scan.component.css"]
})
export class MergeScanComponent implements OnInit, OnDestroy {
  public items: number[] = [];
  @ViewChild("moreButton") moreButton: ElementRef;
  public disableMoreButton = false;
  private subscription: Subscription;

  constructor() {}

  ngOnInit() {
    this.subscription = this.getItems(2).subscribe((result: any) => {
      this.items = this.items.concat(result.response.data);
      if (!("nextIndex" in result.response)) {
        this.disableMoreButton = true;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getItems(prefetchPages: number) {
    const initialData$ = this.getInitialData(prefetchPages);
    const fetchMoreEvents$ = fromEvent(this.moreButton.nativeElement, "click");
    const moreItems$ = fetchMoreEvents$.pipe(
      mergeScan(
        (prevAjaxResponse, next) => {
          if ("nextIndex" in prevAjaxResponse.response) {
            return ajax.get(baseUrl + prevAjaxResponse.response.nextIndex);
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
  }

  getInitialData(prefetchPages: number) {
    let counter = 0;
    return defer(() => ajax.get(baseUrl + counter++)).pipe(
      repeat(prefetchPages)
    );
  }
}
