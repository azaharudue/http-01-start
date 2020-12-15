import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Post } from "./post.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    console.log(postData);
    this.http
      .post(
        "https://ng-basic-angular-http-default-rtdb.firebaseio.com/posts.json",
        postData
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }
  private fetchPosts(): void {
    this.http
      .get(
        "https://ng-basic-angular-http-default-rtdb.firebaseio.com/posts.json"
      )
      .pipe(
        map((responeData: { [key: string]: Post }) => {
          const postsArray: Post[] = [];
          for (const key in responeData) {
            if (responeData.hasOwnProperty(key)) {
              postsArray.push({ ...responeData[key], id: key });
            }
          }
          return postsArray;
        })
      )
      .subscribe((_posts) => {
        console.log(_posts);
      });
  }
}
