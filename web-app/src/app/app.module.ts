import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BooksComponent } from 'src/app/books/books.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { JwtModule } from "@auth0/angular-jwt";
//import { AuthGuard } from 'src/app/guard/auth-guard.service';
import { HomeComponent } from 'src/app/home/home.component';
import { LoginComponent } from './login/login.component';
import { ToastrModule } from 'ngx-toastr';
//all components routes
const routes: Routes = [
  { path: '', component: HomeComponent },
  //{ path: 'book', component: BooksComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
];
//function is use to get jwt token from local storage
export function tokenGetter() {
  return localStorage.getItem("jwt");
}
@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:7299"],
        disallowedRoutes: []
      }
  }),
  ToastrModule.forRoot()
  ],
  //providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
