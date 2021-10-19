import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PopupComponent } from './../../../shared/popup/popup.component';
import { Usuario } from './../../../models/usuario.model';
import { AuthService } from '../../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  usuario = {} as Usuario;
  signupForm = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    cpf: new FormControl('', [Validators.required]),
    nascimento: new FormControl('', [Validators.required]),
    sexo: new FormControl('', [Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required]),
  });

  constructor(
    public dialog: MatDialog,
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    let response, usuario, token, refresh_token;
    let errorResponse;

    this._authService.onCreateUser(this.usuario)
      .subscribe(
        request => {
          response = request;
          usuario = response.usuario;
          token = response.token;
          refresh_token = response.refresh_token;

          this._authService.doLoginUser(usuario, token, refresh_token);

          let mensagem = { principal: "Cadastro realizado com sucesso!", secundaria: "Cadastre sua instituição ou solicite para ser membro dela."}
          this.dialog.open(PopupComponent, {data:  mensagem }).afterClosed().subscribe(
            result => {
              this._router.navigateByUrl('/sign-up-place');
            }
          )
        },
        error => {
          errorResponse = error;
          if (errorResponse.error.status === 400) {
            this.signupForm.get('cpf').setErrors({ valid: false });
          }
          else if (errorResponse.error.fields.email) {
            this.signupForm.get('email').setErrors({ valid: false });
          }
          else if (errorResponse.error.fields.cpf) {
            this.signupForm.get('cpf').setErrors({ valid: false });
          }
        }
      );
  }

}