import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from './state/home.state';
import * as HomeActions from '../home/actions/home.actions';
import * as HomeSelectors from '../home/selectors/home.selector';
import { SuperService } from '../../super.service';
import { Observable, exhaustMap, map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  catFact: any = {};
  sunriseSunsetData: any;
  showError: boolean = false;
  sunriseForm!: FormGroup;

  getHomeData$ = this.store.select(HomeSelectors.selectSunriseData);
  getHomeError$ = this.store.select(HomeSelectors.selectSunriseError);

  constructor(
    private service: SuperService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
  ) {
    this.sunriseForm = fb.group({
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]],
      date: ['', [Validators.required]],
    });

    this.service.getFireStoreData().subscribe(res=> {
      console.log(res)
    })

    const data = new Promise(
      (resolve) => {
        for(let i = 0; i <= 3; i++ ){
          resolve(i)
        }
        // resolve(1)
        // resolve(2)
        // resolve(3)
        // resolve(4)
        // resolve(5)
        // resolve(6)
        // resolve(7)
      }
    );

    data.then(data=> {
      console.log('promise',data)
    });

    const obs = new Observable(
      (observer) => {
        for(let i = 0; i <= 3; i++ ){
          observer.next('Data'+i);
        }
        // observer.next('Data 1');
        // observer.next('Data 2');
        // observer.next('Data 3');
        // observer.next('Data 4');
      }
    );
    obs.subscribe(data=> {
      console.log('observer',data)
    });
  }
  
  ngOnInit(): void {
    this.store
    .pipe(select(HomeSelectors.selectSunriseData))
    .pipe(map((items) => items?.results))
    .subscribe((response) => {
      this.sunriseSunsetData = response;
    });

    let params = JSON.parse(localStorage.getItem('sunrise')!) || this.route.snapshot.queryParams
    this.sunriseForm.patchValue(params);
    this.getSunriseSunsetData();
    this.getCatFact();
  }

  getCatFact() {
    this.service.getCatFact().subscribe((response: any) => {
      this.catFact = response;
    });
  }

  submit() {
    this.showError = true;
  }

  getQueryParams() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.sunriseForm.value,
      queryParamsHandling: 'merge',
    });

    localStorage.setItem('sunrise', JSON.stringify(this.sunriseForm.value))
  }

  getSunriseSunsetData() {
    if (this.sunriseForm.valid) {
      this.store.dispatch(
        HomeActions.loadSunriseData({
          latitude: this.sunriseForm.value.latitude,
          longitude: this.sunriseForm.value.longitude,
          date: this.sunriseForm.value.date,
        })
      );

      this.getQueryParams();
    }
  }

  update() {
    this.getCatFact();
    this.service.getProducts().pipe(
      map(data => data.products),
      exhaustMap(data => data)
    ).subscribe(response => {
      console.log(response)
    })
  }
}
