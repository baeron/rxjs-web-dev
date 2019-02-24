import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from "@angular/core";
import { Subscription, of, throwError } from 'rxjs';
import { ajax } from "rxjs/ajax";
import { mergeMap, mergeMapTo, delay } from "rxjs/operators";

const requestUrl = "http://localhost:3000/request-data";
const responseUrl = "http://localhost:3000/get-response?dataId=";

@Component({
  selector: "app-merge-map-api",
  templateUrl: "./merge-map-api.component.html",
  styleUrls: ["./merge-map-api.component.css"]
})
export class MergeMapApiComponent implements OnInit, OnDestroy {
  public items: number[] = [];
  @ViewChild("moreButton") moreButton: ElementRef;
  public disableMoreButton = false;
  private subscription: Subscription;

  constructor() {}

  ngOnInit() {
    this.subscription = this.getItems(requestUrl, 5, null).subscribe(
      (result: any) => {
        console.log("result ", result);
        this.items = result;
      },
      (err: any) => console.warn(err.message)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getItems(url, maxCounter, dataId) {
    if (maxCounter === 0) {
      return throwError({ message: "max retry count exceeded" })
    }

    return ajax.get(url).pipe(
      mergeMap(
        d => {
          if ("dataId" in d.response) {
            // first run
            dataId = d.response.dataId;
            return this.getItems(responseUrl + dataId, maxCounter, dataId);
          }

          if (d.response.ready) {
            // recursive run
            return of(d.response.data);
          } else {
            return of(1).pipe(
              delay(1000),
              mergeMapTo(
                this.getItems(responseUrl + dataId, maxCounter - 1, dataId)
              )
            );
          }
        },
        null, // selector function - we don't need it here.
        1
      ) // Maximum concurrency, 1 - to prevent race conditions
    );
  }
}
