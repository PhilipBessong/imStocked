import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';  // Import RouterModule
import { CommonModule } from '@angular/common';
import { ItemService,Item } from '../../../services/item.service';
@Component({
  selector: 'app-vitems',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './vitems.component.html',
  styleUrl: './vitems.component.css'
})
export class VitemsComponent implements OnInit {
  constructor(private router: Router,private itemService: ItemService){}

  goBack(){
    this.router.navigate(['/home']);
  }
  items: Item[] = [];
  filteredItems: Item[] = []; 

  ngOnInit() {
    this.itemService.getItems().subscribe(items => {
      this.items = items;
      this.filteredItems = [...this.items];
    });
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

  toaddItem(){
    this.router.navigate(['/additem']);
  }
  // Method to edit a row
  editItem(item: Item): void {
    this.router.navigate(['/eitem', item.code]);  // Programmatic navigation
  }

  // Method to delete a row
  deleteItem(index: number) {
    const itemCode = this.items[index].code;
    console.log('Deleting item:', itemCode);
    this.items.splice(index, 1); // Remove the item from the array
    this.itemService.deleteItem(itemCode); // Call service to delete the item
  }

}
