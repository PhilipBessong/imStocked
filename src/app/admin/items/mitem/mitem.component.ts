import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ItemService, Item, ItemEntry,Combo,ComboEntry } from '../../../services/item.service';
@Component({
  selector: 'app-mitem',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './mitem.component.html',
  styleUrl: './mitem.component.css',
})
export class MitemComponent implements OnInit {
  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

 
  item!: Item;
  entries: ItemEntry[] = []; // Array to hold the entries
  newEntry: ItemEntry | null = null; // To hold the new entry object
  filteredItems: Item[] = []; 
  combos: Combo[] = [];
  menuItems: Item[] = [];
  combo!:Combo;
  comboEntries: ComboEntry[] = []; // Array to hold the entries
  newComboEntry: ComboEntry | null = null; // To hold the new entry object
  ngOnInit() {
    const code = this.route.snapshot.paramMap.get('code');
    if (code) {
      const item = this.itemService.getItemByCode(code);
      if (item) {
        this.item = item;
        this.entries = item.entries || []; // Safe access
      } else {
        console.error(`Item with code ${code} not found`);
      }
    }  
  }
 
  goBack() {
    this.router.navigate(['/home']);
  }

  onSearch(event: any) {
    const query = event.target.value.toLowerCase();
    console.log(query); // Handle search logic here
  }

  addEntry() {
    const currentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    // Get the `closing` value from the last entry in the `entries` array
  const previousClosing = this.entries.length > 0 
  ? this.entries[this.entries.length - 1].closing ?? 0 
  : 0;

// Initialize a new entry with the previous `closing` as `physical`
this.newEntry = {
  date: currentDate,
  physical: previousClosing,
  purchase: 0,
  closing: 0,
  reason: '',
};
  }
 
  saveNewEntry() {
    if (this.newEntry) {
      this.entries.push(this.newEntry); // Add the new entry to the entries list
    // Calculate and update item properties based on the latest entry
    const latestEntry = this.newEntry;
    this.item.total = (latestEntry.physical ?? 0) + (latestEntry.purchase ?? 0);
    this.item.actual = this.item.total - (latestEntry.sale ?? 0);
    this.item.variance = (latestEntry.closing ?? 0) - this.item.actual;

    // Update item in the service
    this.itemService.editItem(this.item);

    // Reset newEntry after saving
    this.newEntry = null;
    }
  }

  

 // Method to cancel the new entry creation
cancelEntry() {
  this.newEntry = null; // Reset the newEntry to null
}
}
