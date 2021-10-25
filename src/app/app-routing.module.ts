import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Guards
import { AuthGuard } from './guards/auth.guard';
import { SecureInnerPagesGuard } from './guards/secure-inner-pages.guard';
//Login
import { SignInComponent } from './screens/login/sign-in/sign-in.component';
import { SignUpComponent } from './screens/login/sign-up/sign-up.component';
import { SignUpPlaceComponent } from './screens/login/sign-up-place/sign-up-place.component';
import { MenuComponent } from './shared/menu/menu.component';
import { AdministradorComponent } from './screens/administrador/administrador.component';

const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'sign-up', component: SignUpComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'sign-up-place', component: SignUpPlaceComponent, canActivate: [AuthGuard]},

  {path: 'menu', component: MenuComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo:'administrador', pathMatch:'full'},
      {path: 'administrador', component: AdministradorComponent}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
