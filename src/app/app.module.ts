import { TokenInterceptor } from './interceptors/token.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
// Routing
import { AppRoutingModule } from './app-routing.module';
// Api Http
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//Mask
import { NgxMaskModule } from 'ngx-mask'
//Responsividade
import { FlexLayoutModule } from "@angular/flex-layout";
// Angular Material
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
// Componentes
import { AppComponent } from './app.component';
import { PopupComponent } from './shared/popup/popup.component';
import { SignInComponent } from './screens/login/sign-in/sign-in.component';
import { SignUpComponent } from './screens/login/sign-up/sign-up.component';
import { SignUpPlaceComponent } from './screens/login/sign-up-place/sign-up-place.component';
import { MenuComponent } from './shared/menu/menu.component';
import { AdministradorComponent } from './screens/administrador/administrador.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    SignUpPlaceComponent,
    PopupComponent,
    MenuComponent,
    AdministradorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatRadioModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ],
  entryComponents: [
    PopupComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
