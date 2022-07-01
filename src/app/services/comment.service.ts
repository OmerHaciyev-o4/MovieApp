import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, tap, catchError, Observable, throwError } from 'rxjs';
import { CommentObj } from '../models/comment';

@Injectable()

export class CommentService {
    url_firebase = "https://angular-movie-app-7c9d3-default-rtdb.firebaseio.com/";

    constructor(private httpClient: HttpClient) { }
    

    getComments(movieId: string): Observable<CommentObj[]> {
        let newUrl = this.url_firebase + "comments.json";

        return this.httpClient.get<CommentObj[]>(newUrl)
        .pipe(
            map(response => {
                const comments: CommentObj[] = [];

                for (const key in response) {
                    if (movieId) {
                        if (movieId == response[key].movieId) {
                            comments.push({ ...response[key], id: key });
                        }
                    }
                    else {
                        comments.push({ ...response[key], id: key });
                    }
                }

                return comments;
            }),
            tap(data => console.log(data)),
            catchError(this.handleError)
        );
    }

    createComment(comment: any): Observable<CommentObj>{
        var newUrl = this.url_firebase + "comments.json";
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Token'
            })
        };
        return this.httpClient.post<any>(newUrl, comment, httpOptions)
        .pipe(
            tap(data => console.log(data)),
            catchError(this.handleError)
        );
    }
    
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.log("Error : " + error.error.message);
        }
        else {
            switch (error.status) {
                case 404:
                    console.log("Not Found");
                    break;
                case 403:
                    console.log("Access Denied");
                    break;
                case 500:
                    console.log("Internal server");
                    break;
                default:
                    console.log("some unknow error happened");
            }
        }
        return throwError(() => new Error("some error happened"));
    }
}