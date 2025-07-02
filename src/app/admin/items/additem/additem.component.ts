import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Item, ItemService,ItemEntry } from '../../../services/item.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-additem',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Add required modules here
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.css']  // Corrected property name (styleUrls)
})
export class AdditemComponent {
  newItem: Item = {
    code: '',
    name: '',
    price: 0,
    cases: 0,
    units: 0,
    physical: 0,
    sale: 0,
    purchase: 0,
    closing: 0,
    total: 0,
    actual: 0,
    variance:0,
    dateMade: '',
    entries: [],
  };

  constructor(private itemService: ItemService,private router: Router) {}

  closeModal() {
    this.router.navigate(['/vitems']); // Navigate back to home, effectively closing the modal
  }

 
  async addItem() {
    // Perform calculations before adding the item
    this.newItem.physical = this.newItem.cases * this.newItem.units;
    this.newItem.total = (this.newItem.physical || 0) + (this.newItem.purchase || 0);
    this.newItem.actual = (this.newItem.total || 0) - (this.newItem.sale || 0);
    
    // Set closing equal to total
    this.newItem.closing = this.newItem.total;
  
    // Calculate variance based on the new closing value
    this.newItem.variance = (this.newItem.closing || 0) - (this.newItem.actual || 0);
  
    // Set the dateMade to the current date
    const today = new Date();
    this.newItem.dateMade = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD

    // Create the first stock take entry for the new item
    const initEntry: ItemEntry = {
      date: this.newItem.dateMade,
      physical: this.newItem.physical || 0,
      sale: this.newItem.sale || 0, // Initial sales value
      purchase: this.newItem.purchase || 0, // Initial purchases value
      closing: this.newItem.closing || 0,
      reason: ''
    };
    this.newItem.entries?.push(initEntry); // Add the entry to the item's entries

    // Add the item to the service
    await this.itemService.addItem(this.newItem);
  
    // Log the current list of items to the console
    console.log('Items created:', this.itemService.getItems());
    console.log('date made:',this.newItem.dateMade)
    
    // Navigate to the list page
    this.closeModal();
  }
  
  
}
