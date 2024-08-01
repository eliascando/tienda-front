import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Global } from "../global";
import { catchError, Observable, of } from "rxjs";

@Injectable()

export class ApiService {
    private api_url: string;

    constructor(
        private http: HttpClient
    ){
        this.api_url = Global.api_url;
    }

    private getOptions() {
        return {
            headers: {
                'Content-Type': 'application/json',
            }
        };
    }

    public get(enpoint: string) : Observable<any> {
        return this.http.get<any>(
            this.api_url + enpoint, this.getOptions()
        ).pipe(
            catchError(this.handleError<any>('get',{
                success: false,
                message: 'An error occurred',
                data: null,
                statusCode: 500
            }))
        );
    }

    public post(enpoint: string, data: any) : Observable<any> {
        return this.http.post<any>(
            this.api_url + enpoint, data, this.getOptions()
        ).pipe(
            catchError(this.handleError<any>('post',{
                success: false,
                message: 'An error occurred',
                data: null,
                statusCode: 500
            }))
        );
    }

    public put(enpoint: string, data: any) : Observable<any> {
        return this.http.put<any>(
            this.api_url + enpoint, data, this.getOptions()
        ).pipe(
            catchError(this.handleError<any>('put',{
                success: false,
                message: 'An error occurred',
                data: null,
                statusCode: 500
            }))
        );
    }

    public delete(enpoint: string) : Observable<any> {
        return this.http.delete<any>(
            this.api_url + enpoint, this.getOptions()
        ).pipe(
            catchError(this.handleError<any>('delete',{
                success: false,
                message: 'An error occurred',
                data: null,
                statusCode: 500
            }))
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }

}
