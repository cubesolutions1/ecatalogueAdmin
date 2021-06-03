import { environment } from './../../../environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UtilsService {
  // public static REMOTE_ADDRESS = 'http://212.129.62.79:8090/';
  public static REMOTE_ADDRESS = environment.apiUrl;
  public static API_USER = UtilsService.REMOTE_ADDRESS + "users/";
  public static API_BANNIERRE = UtilsService.REMOTE_ADDRESS + "bannieres/";
  public static API_ENSEIGNE = UtilsService.REMOTE_ADDRESS + "enseignes/";
  public static API_Commercant = UtilsService.REMOTE_ADDRESS + "commercants/";
  public static API_Commercant1 = UtilsService.REMOTE_ADDRESS + "commercants/AllPointVentCommercant/";
  constructor(private httpClient: HttpClient,) { }
  public post(url: string, object: any): Observable<any> {

    return this.httpClient.post(url, object);
  }

  public put(url: string, object: any): Observable<any> {

    return this.httpClient.put(url, object);
  }
  public patch(url: string, object: any): Observable<any> {

    return this.httpClient.patch(url, object);
  }

  public get(url: string): Observable<any> {

    return this.httpClient.get(url);
  }

  public delete(url: string): Observable<any> {

    return this.httpClient.delete(url);
  }

}
