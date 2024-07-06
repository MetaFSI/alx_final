import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { DarkModeToggleComponent } from './dark-mode-toggle/dark-mode-toggle.component';
import { FormsModule } from '@angular/forms';
import { TableModule } from './table/modules/table.module';
import { NewComponent } from './new/new.component';
import { JletComponent } from './jlet/jlet.component';
@NgModule({
 declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    FooterComponent,
    DarkModeToggleComponent,
    NewComponent,
    JletComponent
 ],
 imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    TableModule
 ],
 providers: [],
 bootstrap: [AppComponent]
})
export class AppModule { }