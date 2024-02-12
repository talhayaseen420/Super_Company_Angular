import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../home/state/home.state';
import * as HomeActions from '../home/actions/home.actions';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  
  username: any = '';
  state: string = 'close';

  constructor(
    private store: Store<AppState>, 
    private toastr: ToastrService,
    private auth: AngularFireAuth) {}

  ngOnInit(): void {
    this.username = JSON.parse(localStorage.getItem('username')!);
  }

  toggleState() {
    this.state = this.state === 'close' ? 'open' : 'close';
  }

  logout() {
    this.auth.signOut().then(()=> {
      this.store.dispatch(HomeActions.resetSunriseData());
      localStorage.clear();
      this.toastr.info('Logout', 'Successfull');
    }, (err)=> {
      alert(err.message)
    })
  }
}
