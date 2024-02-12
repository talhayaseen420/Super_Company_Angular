import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class SuperService {

  items: Observable<any> =  this.afs.collection("bookings").valueChanges();
  
  private apiUrl = 'https://catfact.ninja/fact';
  private apiUrlSun = 'https://api.sunrise-sunset.org/json';
  private products = 'https://dummyjson.com/products/'

  constructor(private http: HttpClient, private afs: AngularFirestore) { }

  getCatFact(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getSunriseSunset(lat: string, lng: string, date: string): Observable<any> {
    const params = { lat: lat.toString(), lng: lng.toString(), date: date };
    return this.http.get(this.apiUrlSun, { params: params });
  }

  getProducts(id? : number) {
    const url = id? `${this.products}/${id}` : this.products
    return this.http.get<any>(url)
  }

  getFireStoreData() {
    return this.items
  }
}
