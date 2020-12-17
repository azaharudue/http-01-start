import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Post } from "./post.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    console.log(postData);
    this.http
      .post<{ name: string }>(
        "https://ng-basic-angular-http-default-rtdb.firebaseio.com/posts.json",
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
    this.loadedPosts = [];
  }
  private fetchPosts(): void {
    this.isFetching = true;
    this.http
      .get<{ [key: string]: Post }>(
        "https://ng-basic-angular-http-default-rtdb.firebaseio.com/posts.json"
      )
      .pipe(
        map(responeData => {
          const postsArray: Post[] = [];
          for (const key in responeData) {
            if (responeData.hasOwnProperty(key)) {
              postsArray.push({ ...responeData[key], id: key });
            }
          }
          return postsArray;
        })
      )
      .subscribe(_posts => {
        console.log(_posts);
        this.isFetching = false;
        this.loadedPosts = _posts;
      });
  }
}
