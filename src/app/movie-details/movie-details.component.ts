import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentObj } from '../models/comment';
import { Movie } from '../models/movie';
import { User } from '../models/user';
import { AlertifyService } from '../services/alertify.services';
import { AuthService } from '../services/auth.service';
import { CommentService } from '../services/comment.service';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
  providers:[MovieService, CommentService]
})
export class MovieDetailsComponent implements OnInit {

  private movieId: string;
  movie:Movie;
  comment: string;
  comments: CommentObj[];

  constructor(private movieService:MovieService,
              private commentService: CommentService,
              private alertifyService: AlertifyService,
              private activatedRouted:ActivatedRoute) { }

  ngOnInit() {
    this.activatedRouted.params.subscribe(params=>{
      this.movieService.getMovieById(params["movieId"])
      .subscribe(data=>{
        this.movie=data;
      })

      this.commentService.getComments(params["movieId"])
      .subscribe(data => {this.comments = data;});

      this.movieId = params["movieId"];
    });
  }


  sendComment(){
    if (!this.comment) {
      this.alertifyService.error("Please enter comment");
      return;
    }
    else{
      var user = AuthService.userObj;
      var commentObj = {
        email: user.email,
        comment: this.comment,
        movieId: this.movieId
      };

      this.commentService.createComment(commentObj).subscribe(data => {});
    }
  }

  getComments(): string{
    var data = "";
    this.comments.forEach(comm => {
      data += comm.email + "\n\t" + comm.comment + "\n\n";
    });
    return data;
  }
}