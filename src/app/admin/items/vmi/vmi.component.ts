import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';  // Import RouterModule
import { CommonModule } from '@angular/common';
import { ItemService,MenuItem } from '../../../services/item.service';
@Component({
  selector: 'app-vmi',
  imports: [CommonModule, RouterModule],
  templateUrl: './vmi.component.html',
  styleUrl: './vmi.component.css'
})
export class VmiComponent {
  menuItems: MenuItem[] = [];
  filteredMenuItems: MenuItem[] = [];
  constructor(private router: Router, private itemService: ItemService) {}

  goBack(){
    this.router.navigate(['/home']);
  }
  ngOnInit() {
    this.itemService.getMenuitems().subscribe(items => {
      this.menuItems = items;
      this.filteredMenuItems = [...this.menuItems];
    });
    this.filteredMenuItems = [...this.menuItems];
  }
   onSearch(event: any) {
    const query = event.target.value.toLowerCase();
     // Filter items based on the search query
     this.filteredMenuItems = this.menuItems.filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.id.toLowerCase().includes(query)
    );
  }
  toaddMenuItem() {
    this.router.navigate(['/addmi']);
  }
  editMenuItem(item: MenuItem): void {
    this.router.navigate(['/emi', item.id]);  // Programmatic navigation
  }

 deleteMenuItem(index: number) {
    const itemId = this.menuItems[index].id;
    console.log('Deleting menu item:', itemId);
    this.menuItems.splice(index, 1); // Remove the item from the array
    this.itemService.deleteMenuItem(itemId); // Call service to delete the item
  }
}
