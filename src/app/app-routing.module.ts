import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Guards
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { MembroGuard } from './guards/membro.guard';
import { SecureInnerPagesGuard } from './guards/secure-inner-pages.guard';
//Login
import { AbrigadoComponent } from './screens/abrigado/abrigado.component';
import { AdministradorComponent } from './screens/administrador/administrador.component';
import { DadosEstadiaComponent } from './screens/estadias/dados-estadia/dados-estadia.component';
import { DadosHistoricoComponent } from './screens/abrigado/dados-historico/dados-historico.component';
import { EntidadeComponent } from './screens/entidade/entidade.component';
import { EstadiasComponent } from './screens/estadias/estadias.component';
import { HomeComponent } from './screens/home/home.component';
import { MenuComponent } from './shared/menu/menu.component';
import { SignInComponent } from './screens/login/sign-in/sign-in.component';
import { SignUpComponent } from './screens/login/sign-up/sign-up.component';
import { SignUpPlaceComponent } from './screens/login/sign-up-place/sign-up-place.component';

const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'sign-up', component: SignUpComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'sign-up-place', component: SignUpPlaceComponent, canActivate: [AuthGuard] },

  {
    path: 'menu', component: MenuComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'administrador', component: AdministradorComponent, canActivate: [AdminGuard] },
      { path: 'entidade', component: EntidadeComponent, canActivate: [MembroGuard] },
      { path: 'abrigado', component: AbrigadoComponent, canActivate: [MembroGuard] },
      { path: 'abrigado/:id', component: DadosHistoricoComponent, canActivate: [MembroGuard] },
      { path: 'estadia', component: EstadiasComponent, canActivate: [MembroGuard] },
      { path: 'estadia/:id', component: DadosEstadiaComponent, canActivate: [MembroGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
