import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Auth } from './auth';
import 'rxjs/add/operator/map';

@Injectable()
export class Party {

  constructor(public http: Http, public authService: Auth) {

  }

  getParties(){

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Authorization', this.authService.token);

      this.http.get('http://127.0.0.1:8080/api/party/get', {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });

  }

  createParty(party){

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);

      this.http.post('http://127.0.0.1:8080/api/party/create', JSON.stringify(party), {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });

    });

  }

  deleteTodo(id){

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Authorization', this.authService.token);

      this.http.delete('https://YOUR_HEROKU_APP.herokuapp.com/api/todos/' + id, {headers: headers}).subscribe((res) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });

    });

  }

}
