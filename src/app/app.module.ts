import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MenuPrincipalComponent } from './components/admin/menu-principal/menu-principal.component';
import { UserCatalogoComponent } from './components/admin/user-catalogo/user-catalogo.component';
import { ProductsCatalogoComponent } from './components/admin/products-catalogo/products-catalogo.component';
import { NavegadorComponent } from './components/admin/navegador/navegador.component';
import { AddUserComponent } from './components/admin/user-catalogo/add-user/add-user.component';
import { ListUserComponent } from './components/admin/user-catalogo/list-user/list-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuPrincipalComponent,
    UserCatalogoComponent,
    NavegadorComponent,
    ProductsCatalogoComponent,
    AddUserComponent,
    ListUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
