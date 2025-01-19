import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { environment } from './environment';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './admin/home/home.component';
import { AdditemComponent } from './admin/items/additem/additem.component';
import { VitemsComponent } from './admin/items/vitems/vitems.component';
import { EdititemComponent } from './admin/items/edititem/edititem.component';
import { MitemComponent } from './admin/items/mitem/mitem.component';
import { VcombosComponent } from './admin/items/vcombos/vcombos.component';
import { McomboComponent } from './admin/items/mcombo/mcombo.component';
import { AddcomboComponent } from './admin/items/addcombo/addcombo.component';
import { EcomboComponent } from './admin/items/ecombo/ecombo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'imStocked';
}
