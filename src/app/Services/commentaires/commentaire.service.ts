import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {

  constructor(private http: HttpClient) { }

  public getcommentaires():Observable<any>{
    return this.http.get<any>(`http://localhost:8761/api/commentaire`);
  }
}
