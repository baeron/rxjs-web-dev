import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription, of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { mergeMap } from "rxjs/operators";

@Component({
  selector: "rx-merge-map",
  templateUrl: "./merge-map.component.html",
  styleUrls: ["./merge-map.component.scss"]
})
export class MergeMapComponent implements OnInit, OnDestroy {
  items: string[] = [];
  private subscription: Subscription;
  constructor() {}

  ngOnInit() {
    this.subscription = this.getItems(0).subscribe(result => this.items = result);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getItems = (index, result = []) => {
    const baseURL = "http://localhost:3001/list-data?page=";
    return ajax.get(baseURL + index).pipe(
      mergeMap(
        d => {
          result = result.concat(d.response.data);
          if ("nextIndex" in d.response) {
            return this.getItems(d.response.nextIndex, result);
          }
          debugger;
          return of(result);
        },
        null,
        1
      )
    );
  }
}
