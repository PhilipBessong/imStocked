import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ItemService,Item, Combo, MenuItem } from '../../services/item.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule  
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
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
  
  tovitems(){
    this.router.navigate(['/vitems']);
  }
  tovCombos(){
    this.router.navigate(['/vcombos']);
  }
  tovMenuItems(){
    this.router.navigate(['/vmi']);
  }
  // Method to add a new row to the table





    // Methods to manage single thing
    manageItem(item: Item): void {
      this.router.navigate(['/mitem', item.code]);  // Programmatic navigation
    }
    manageCombo(combo: Combo): void {
      this.router.navigate(['/mcombo', combo.id]);  // Programmatic navigation
    }
    manageMenuItem(mi: MenuItem): void {
      this.router.navigate(['/mmi', mi.id]);  // Programmatic navigation
    }

    getTotalUnitsSold(combo: Combo): number {
  if (!combo.comboEntries || combo.comboEntries.length === 0) return 0;
  return combo.comboEntries.reduce((sum, entry) => sum + entry.unitsSold, 0);
}



}
