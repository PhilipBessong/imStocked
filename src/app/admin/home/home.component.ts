import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ItemService,Item, Combo } from '../../services/item.service';
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
  constructor(private router: Router,private itemService: ItemService) {} 
  items: Item[] = [];
  combos: Combo[] = [];
  menuItems: Item[] = [];
  filteredItems: Item[] = []; 

  ngOnInit() {
    this.itemService.getItems().subscribe(items => this.items = items);
    this.combos = this.itemService.getCombos();
    this.menuItems = this.itemService.getMenuitems();

    this.filteredItems = [...this.items];
  }
  
  onSearch(event: any) {
    const query = event.target.value.toLowerCase();
     // Filter items based on the search query
     this.filteredItems = this.items.filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.code.toLowerCase().includes(query)
    );
  }
  
  tovitems(){
    this.router.navigate(['/vitems']);
  }
  tovCombos(){
    this.router.navigate(['/vcombos']);
  }
  // Method to add a new row to the table





    // Methods to manage single thing
    manageItem(item: Item): void {
      this.router.navigate(['/mitem', item.code]);  // Programmatic navigation
    }
    manageCombo(combo: Combo): void {
      this.router.navigate(['/mcombo', combo.id]);  // Programmatic navigation
    }
    manageMenuItem(mi: Item): void {
      this.router.navigate(['/mcombo', mi.code]);  // Programmatic navigation
    }

    


}
