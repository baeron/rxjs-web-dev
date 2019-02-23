import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from "@angular/core";
import { Subscription, fromEvent, EMPTY } from "rxjs";
import { ajax } from "rxjs/ajax";
import { mergeScan } from "rxjs/operators";

@Component({
  selector: "app-merge-scan",
  templateUrl: "./merge-scan.component.html",
  styleUrls: ["./merge-scan.component.css"]
})
export class MergeScanComponent implements OnInit, OnDestroy {
  items: number[] = [1, 2, 3, 4, 5];
  disableMoreButton = false;
  @ViewChild("moreButton") moreButton: ElementRef;
  private subscription: Subscription;
  constructor() {}

  ngOnInit() {
    this.subscription = this.getItems().subscribe((result: any) => {
      this.items = this.items.concat(result.response.data);

      if (!("nextIndex" in result.response)) {
        this.disableMoreButton = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getItems() {
    const baseUrl = "http://localhost:3004/list-data?page=";
    const fetchMoreEvents$ = fromEvent(this.moreButton.nativeElement, "click");

    return fetchMoreEvents$.pipe(
      mergeScan(
        (prevAjaxResponse, next) => {
          if ("nextIndex" in prevAjaxResponse.response) {
            return ajax.get(baseUrl + prevAjaxResponse.response.nextIndex);
          }
          return EMPTY;
        },
        { response: { nextIndex: 1 } },
        1
      )
    );
  }
}
