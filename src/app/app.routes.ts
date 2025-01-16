import { Routes } from '@angular/router';
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
export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'home', component: HomeComponent},
    {path: 'additem', component: AdditemComponent},
    {path: 'vitems', component: VitemsComponent},
    {path:'eitem/:code',component: EdititemComponent},
    {path:'mitem/:code',component: MitemComponent},
    {path:'mcombo/:id',component: McomboComponent},
    {path:'vcombos', component: VcombosComponent},
    {path:'addcombo', component: AddcomboComponent},
    {path: 'ecombo/:id', component: EcomboComponent}


];
