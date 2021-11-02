import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { EntidadeService } from '../../../services/entidade.service';

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
    private _entidadeService: EntidadeService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  async onSubmit(){
    const user = {
      email: this.signinForm.get('email').value,
      senha: this.signinForm.get('senha').value
    }

    await this._authService.login(user)
    .subscribe(
      response => {
        const usuario = (response as any).usuario;
        const token = (response as any).token;
        const refresh_token = (response as any).refresh_token;

        this._authService.doLoginUser(usuario, token, refresh_token);
        usuario.abrigo_id !== null ? this._entidadeService.storeEntidade("albergue", usuario.abrigo) : this._entidadeService.storeEntidade("saude", usuario.instituicao)

        this._router.navigateByUrl('/menu');
      },
      error => {
        this.signinForm.get('senha').setErrors({valid:false});
      }
    );
  }

}
