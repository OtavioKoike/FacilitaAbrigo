import { SignUpPlaceComponent } from './screens/login/sign-up-place/sign-up-place.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Login
import { SignInComponent } from './screens/login/sign-in/sign-in.component';
import { SignUpComponent } from './screens/login/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent},
  { path: 'sign-up', component: SignUpComponent},
  { path: 'sign-up-place', component: SignUpPlaceComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
