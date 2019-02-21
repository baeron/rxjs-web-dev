import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Subscription, fromEvent } from "rxjs";
import {
  map,
  filter,
  debounceTime,
  distinctUntilChanged,
  switchMap
} from "rxjs/operators";

@Component({
  selector: "app-auto-complete",
  templateUrl: "./auto-complete.component.html",
  styleUrls: ["./auto-complete.component.css"]
})
export class AutoCompleteComponent implements AfterViewInit, OnDestroy {
  @ViewChild("textInput") input;
  constructor(private http: HttpClient) {}
  private subscription: Subscription;
  items = [];

  ngAfterViewInit(): void {
    this.subscription = fromEvent(this.input.nativeElement, "keyup")
      .pipe(
        map(e => (e as any).target.value),
        filter(text => text.length > 2),
        debounceTime(750),
        distinctUntilChanged(),
        switchMap(v => this.getWikiSearchResult(v))
      )
      .subscribe(response => (this.items = response[1]));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getWikiSearchResult(value) {
    const wikiUrl = "https://en.wikipedia.org/w/api.php?";
    const params = new HttpParams()
      .set("action", "opensearch")
      .set("format", "json")
      .set("search", value);

    const searchUrl: string = wikiUrl + params.toString();
    return this.http.jsonp(searchUrl, "callback");
  }

  onItemClick(item: string) {
    this.items = [];
    this.input.nativeElement.value = item;
  }
}
