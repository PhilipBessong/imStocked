import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import {
  ItemService,
  Item,
  ItemEntry,
  Combo,
  ComboEntry,
} from '../../../services/item.service';
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
  combo!: Combo;
  comboEntries: ComboEntry[] = []; // Array to hold the entries
  newComboEntry: ComboEntry | null = null; // To hold the new entry object
  ngOnInit() {
    const code = this.route.snapshot.paramMap.get('code');
    if (code) {
      this.itemService.getItemByCode(code).subscribe((item) => {
        if (item) this.item = item;
      });

      this.itemService.getItemEntries(code).subscribe((entries) => {
        this.entries = entries;
      });
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
    const previousClosing =
      this.entries.length > 0
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

  async saveNewEntry() {
    if (!this.newEntry || !this.item?.code) return;
     const latest = this.newEntry;

  // Precompute values
  const physical = latest.physical ?? 0;
  const purchase = latest.purchase ?? 0;
  const sale = latest.sale ?? 0;
  const closing = latest.closing ?? 0;

  this.item.total = physical + purchase;
  this.item.actual = this.item.total - sale;
  this.item.variance = closing - this.item.actual;
    console.log(this.item.total);
    console.log(this.item.closing);
    const currentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    // Get the `closing` value from the last entry in the `entries` array
    const previousClosing =
      this.entries.length > 0
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

    // Save entry to Firestore
    await this.itemService.addItemEntry(this.item.code, latest);

    // Reset newEntry after saving
    this.newEntry = null;
  }

  // Method to cancel the new entry creation
  cancelEntry() {
    this.newEntry = null; // Reset the newEntry to null
  }
}
