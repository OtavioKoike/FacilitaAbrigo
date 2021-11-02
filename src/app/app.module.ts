import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
// Routing
import { AppRoutingModule } from './app-routing.module';
// Api Http
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//Interceptors
import { TokenInterceptor } from './interceptors/token.interceptor';
import { RefreshTokenInterceptor } from './interceptors/refresh-token.interceptor';
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
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
// Componentes
import { AdministradorComponent } from './screens/administrador/administrador.component';
import { AppComponent } from './app.component';
import { AprovacoesComponent } from './screens/administrador/aprovacoes/aprovacoes.component';
import { AprovacoesMembrosComponent } from './screens/entidade/aprovacoes-membros/aprovacoes-membros.component';
import { CaracteristicasComponent } from './screens/administrador/caracteristicas/caracteristicas.component';
import { DadosComponent } from './screens/entidade/dados/dados.component';
import { EntidadeComponent } from './screens/entidade/entidade.component';
import { HomeComponent } from './screens/home/home.component';
import { MenuComponent } from './shared/menu/menu.component';
import { PopupComponent } from './shared/popup/popup.component';
import { SignInComponent } from './screens/login/sign-in/sign-in.component';
import { SignUpComponent } from './screens/login/sign-up/sign-up.component';
import { SignUpPlaceComponent } from './screens/login/sign-up-place/sign-up-place.component';

@NgModule({
  declarations: [
    AdministradorComponent,
    AppComponent,
    AprovacoesComponent,
    AprovacoesMembrosComponent,
    CaracteristicasComponent,
    DadosComponent,
    EntidadeComponent,
    HomeComponent,
    MenuComponent,
    PopupComponent,
    SignInComponent,
    SignUpComponent,
    SignUpPlaceComponent,
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
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
