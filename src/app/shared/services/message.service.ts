

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from './Api.service';
import { environment } from 'environments/environment';
import { Review } from '../Model/Review';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
    messageSubject: BehaviorSubject<any>;
    userMessageSubject: BehaviorSubject<any>;
    user: any;
    currentUser: any;
  constructor(private apiSer: ApiService, private http: HttpClient) {
    this.messageSubject = new BehaviorSubject([]);
    this.userMessageSubject = new BehaviorSubject([]);
   this. currentUser = JSON.parse(localStorage.getItem(environment.currentAdmin));

  }


  getCommercantByIdUser() {
    
    return new Promise(resolve => {
      
      return this.apiSer.getData(`commercants/getCommercantByIdUser`).subscribe((res: any) => {
        this.user = res.data[0];

        resolve(res.data[0].id);
      });
    });


  }

 async getMessages(): Promise<Review[]> {
  
  let messages: any[] = [] 
    let url = `reviews`;
    
    if (this.currentUser.role == "commercant"){
      
      await this.getCommercantByIdUser();
      url = `reviews?commercant=${this.user.id}`
    }
    
    return new Promise(resolve => {
      
      return this.apiSer.getData(url).subscribe((res: any) => {
        
        if (this.currentUser.role == "commercant"){
      ;
        this.getMessagesByUseId(res.data[0].user.id);
        res.data.filter(msg => {
          if (!messages.find(param => msg.user.id == param.user.id )) {
            messages.push(msg);
         }
        //   messages?.user?.id == msg ? '':'';

        });
       
      }
       this.messageSubject.next(messages);
        resolve(res.data);

      }, err => {}
      );
    });
  }
  getMessagesByUseId(id): Promise<any[]> {
    return new Promise(resolve => {

      return this.apiSer.getData(`reviews?user=${id}&commercant=${this.user.id}`).subscribe((res: any) => {

         this.userMessageSubject.next(res.data);
         resolve(res.data);

      }, err => {}
      );
    });
  }

  updateStatus(status, id, userid) {
    return new Promise(resolve => {

      return this.apiSer.patch(`reviews/${status}/${id}`, null).subscribe((res: any) => {
        this.getMessagesByUseId(userid);
        //
        resolve(res.data);

      }, err => {}
      );
    });

  }


}


