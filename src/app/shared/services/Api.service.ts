import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class ApiService {



    constructor(private http: HttpClient, private route: Router,
        private toastr: ToastrService) {
    }


    /**
     * @param url
     * @param entities
     */
    get(url: string, entities: string) {

        return this.http.get(environment.apiUrl + entities)
            .pipe(map(this.extractData)
                , catchError(this.handleError));

    }
    public getData(entities: string) {

        return this.http.get(environment.apiUrl + entities)
            .pipe(map((res: any) => {
                 console.log(res,"fffffffffffffffffffffffffffffffffffffffffff");

                return res.data;
            }, err => {
                // console.log(err.error.message);

            }));
    }

    /**
     *
     * @param url string
     * @param entities string
     * @param id number
     * @param entity object
     */
    put(url: string, entities: string, id: number) {

        return this.http.put(environment.apiUrl + url + id, entities)
            .pipe(map((res: any) => {
                return res.data;
            }, err => {
                // console.log(err);

            }));
    }
    patchData(url: string, entities: any, id: number) {

        return this.http.patch(environment.apiUrl + url + id, entities)
            .pipe(map((res: any) => {
                return res;
            }, err => {
                // console.log(err);

            }));
    }


    updatePointVenteEnseigne(url: string, entities: any, id: number) {

        return this.http.patch(environment.apiUrl + url + id, entities)
           /*  .pipe(map((res: any) => {
                return res;
            }, err => {

            })); */
    }

    /* updateProject(url: string,id:number,project:Object):Observable<Object>{
        return this.http.put('commercants/updateCommercant/',+ id,project, {responseType: 'text'});
      }
 */

    patch(url: string, entities: any) {
        // console.log(entities);

        return this.http.patch(environment.apiUrl + url, entities)
            .pipe(map((res: any) => {
                return res;
            }, err => {
                // console.log(err);

            }));
    }

    /**
     *
     * @param url string
     */
    delete(url: string, id: string,) {

        return this.http.delete(environment.apiUrl + url + id)
            .pipe(map((res: any) => {
                // console.log(res);

                return res;
            }, err => {
                // console.log(err);

            }));
    }



    deletePointVenteById(url: string, id: string,) {

        return this.http.delete(environment.apiUrl + url + id)
            .pipe(map((res: any) => {
                // console.log(res);

                return res;
            }, err => {
                // console.log(err);

            }));
    }

    /**
     * @param url string
     * @param entities string
     * @param entity object
     */

    post(url, entity) {
        // console.log(entity);

        return this.http.post(environment.apiUrl + url, entity).pipe(map((res: any) => {
            return res;
        }));
    }

    postData(url: string, entity: any) {

        return this.http.post(environment.apiUrl + url, entity)
            .pipe(map((res: any) => {
                return res;
            }, err => {

                // console.log(err.name);

            }));
    }
    /**
     * @param res Response
     */
    extractData(res) {
        let body = res();
        return body;
    }

    /**
     *
     * @param error Response or any
     */
    handleError(error
        :
        Response | any
    ) {
        console.error(error.message || error);
        return Observable.throw(error);
    }

    private jwt() {
        let token = localStorage.getItem(environment.TOKEN);
        if (token) {
            let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
            //   console.log(headers);
            return ({ headers: headers });
        }
    }
    typeError(message) {
        this.toastr.error(message);
    }
}
