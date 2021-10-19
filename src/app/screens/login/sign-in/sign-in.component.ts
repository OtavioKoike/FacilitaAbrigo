import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signinForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required]),
  });

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  async onSubmit(){
    const user = {
      email: this.signinForm.get('email').value,
      senha: this.signinForm.get('senha').value
    }

    let response, usuario, token, refresh_token;

    await this._authService.login(user)
    .subscribe(
      request => {
        response = request;
        usuario = response.usuario;
        token = response.token;
        refresh_token = response.refresh_token;

        this._authService.doLoginUser(usuario, token, refresh_token);
        // this.router.navigateByUrl('/home');
      },
      error => {
        this.signinForm.get('senha').setErrors({valid:false});
      }
    );
  }

}
