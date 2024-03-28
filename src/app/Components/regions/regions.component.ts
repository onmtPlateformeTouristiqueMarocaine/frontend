import { Component, OnInit } from '@angular/core';
import { RegionsService } from "../../Services/regions/regions.service";
import { Regions } from "../../Classes/Regions/regions";
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Commentaires } from 'src/app/Classes/Commentaires/commentaires';
import { CommentaireService } from 'src/app/Services/commentaires/commentaire.service';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.css']
})
export class RegionsComponent implements OnInit {
  addcommentaire!:FormGroup;
  regions: Regions[] = [];
  commentaires:Commentaires[]=[];
  isContentValid = false;

  constructor(private service: RegionsService,private servicecommentaire: CommentaireService,
    private fb: FormBuilder,private http: HttpClient
  ) {}

  ngOnInit() {
    this.addcommentaire = this.fb.group({
      content: ['', Validators.required],
      user: [1],
      regionId:[1],
    });


    this.getRegions();
    this.getCommentaire();



  }
  onSubmit() {
    const formData = this.addcommentaire.value;
    console.log(formData);
    this.http.post('http://localhost:8761/api/commentaire', formData)
      .subscribe(
        (response) => {
          this.addcommentaire = this.fb.group({
            content: ['', Validators.required],
            user: [1],
            regionId:[1],
          });
          this.getCommentaire();
        },
        (error) => {
          // Handle error response if needed
          console.error('Error adding comment:', error);
        }
      );
  }


  getRegions() {
    this.service.getregions().subscribe(
      (data: Regions[]) => {
        this.regions = data;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  getCommentaire() {
    this.servicecommentaire.getcommentaires().subscribe(
      (data: Commentaires[]) => {
        this.commentaires = data;
        console.log(data)
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }


}
