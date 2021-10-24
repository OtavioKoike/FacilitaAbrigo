import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
  }

  route(place: string){
    localStorage.setItem('pagePlace', JSON.stringify(place));
  }

  SignOut(){
    this._authService.doLogoutUser();
  }

}
