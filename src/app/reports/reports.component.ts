import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ItemService,Item, Combo, MenuItem } from '../services/item.service';
import { from, Observable } from 'rxjs';
@Component({
  selector: 'app-reports',
  imports: [],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {

     private itemService = inject(ItemService);
    constructor(private router: Router) {} 
   items$!: Observable<Item[]>;
  
    combos$!: Observable<Combo[]>;
    menuItems$!: Observable<MenuItem[]>;
  
    filteredItems: Item[] = []; 
    filteredCombos: Combo[] = [];
    filteredMenuItems: MenuItem[] = [];
  
    ngOnInit() {
      this.items$ = this.itemService.getItems();    
      this.combos$ = this.itemService.getCombos();
      this.menuItems$ = this.itemService.getMenuitems();
     
      this.items$.subscribe(items => {
        this.filteredItems = [...items];
      });
  
      this.combos$.subscribe(combos => {
        this.filteredCombos = [...combos];
      });
     
      this.menuItems$.subscribe(menuItems => {
        this.filteredMenuItems = [...menuItems];
      });
    }
    
    onSearch(event: any) {
      const query = event.target.value.toLowerCase();
       // Filter items based on the search query
        this.items$.subscribe(items => {
      this.filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.code.toLowerCase().includes(query)
      );
    });
      // Filter combos based on the search query
      this.combos$.subscribe(combos => {
        this.filteredCombos = combos.filter(combo =>
          combo.name.toLowerCase().includes(query) ||
          combo.id.toLowerCase().includes(query)
        );
      });
  
      this.menuItems$.subscribe(menuItems => {
      this.filteredMenuItems = menuItems.filter(menuItem =>
        menuItem.name.toLowerCase().includes(query) ||
        menuItem.id.toLowerCase().includes(query)
      );
    });
    }

    goBack() {
      this.router.navigate(['/home']);
    }
}
