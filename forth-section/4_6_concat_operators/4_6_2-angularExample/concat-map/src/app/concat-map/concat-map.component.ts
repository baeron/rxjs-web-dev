import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subject, Subscription, of } from "rxjs";
import { concatMap, delay } from "rxjs/operators";

@Component({
  selector: "app-concat-map",
  templateUrl: "./concat-map.component.html",
  styleUrls: ["./concat-map.component.css"]
})
export class ConcatMapComponent implements OnInit, OnDestroy {
  items: any[] = [
    { id: 1, value: "item1" },
    { id: 2, value: "item2" },
    { id: 3, value: "item3" }
  ];
  deleteSubject = new Subject();
  deleteItems$ = this.deleteSubject.asObservable().pipe(
    concatMap((id, index) => {
      if (index === 1) {
        return this.deleteItem(id).pipe(delay(2000));
      }
      return this.deleteItem(id);
    }, null)
  );

  private subscription: Subscription;

  constructor() {}

  ngOnInit() {
    this.subscription = this.deleteItems$.subscribe(response => {
      const index = this.items.findIndex(item => response.id === item.id);
      this.items.splice(index, 1);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  deleteItem(id) {
    return of({ id, success: true }).pipe(delay(2000));
  }
}
