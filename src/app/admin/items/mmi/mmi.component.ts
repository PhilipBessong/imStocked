import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, firstValueFrom  } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ItemService, Item, MiEntry,Combo,ComboEntry, MenuItem } from '../../../services/item.service';

@Component({
  selector: 'app-mmi',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './mmi.component.html',
  styleUrl: './mmi.component.css'
})
export class MmiComponent implements OnInit, OnDestroy {
  constructor( private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router
  ){}
  menuItems: MenuItem[] = [];
  mi!:MenuItem;
  items:Item[]=[];
  miEntries: MiEntry[] = []; 
  newMiEntry: MiEntry | null = null
  private subscription!: Subscription;
  ngOnInit() {
   
    const id = this.route.snapshot.paramMap.get('id');
     if (id) {
      this.itemService.getMiByCode(id).subscribe((menuItem) => {
        if (menuItem) this.mi = menuItem;
      });

      this.itemService.getmenuItemEntries(id).subscribe((entries) => {
        this.miEntries = entries;
      });
    }

   // Synchronize items with the service
   this.subscription = this.itemService.getItems().subscribe((items) => {
    this.items = items; // Assign the emitted items to the local array
  });
  }
  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  goBack() {
    this.router.navigate(['/home']);
  }

  addMiEntry() {
    const currentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    this.newMiEntry = {
      date: currentDate,
      unitsSold: 0,
      reason: '',
    }; // Initialize a new entry with prepopulated date and empty values
  }

 async saveMiEntry(): Promise <void> {
    if (!this.newMiEntry || this.newMiEntry.unitsSold <= 0) {
      console.error('Invalid menu item entry or units sold');
      return;
    }
    // Create a new combo entry with the latest sale data
  const entry: MiEntry = {
    date: new Date().toISOString(), // Use current date
    unitsSold: this.newMiEntry.unitsSold,
    reason: this.newMiEntry.reason || '', // Optional reason
  };

  
  // Add entry to comboEntries array
  this.miEntries.push(entry);

  // Update combo.unitsSold with the latest entry value
  this.mi.unitsSold = entry.unitsSold;

  try {
    // Fetch all items **once**
    const items = await firstValueFrom(this.itemService.getItems());

    // Update only the affected items in the combo
    const updatedItems = items.map((item) => {
      if (this.mi && this.mi.id === item.code) {
        const totalUnitsSold = entry.unitsSold ?? 0; // Just use `entry.unitsSold`
        
        const updatedPhysical = Math.max((item.physical ?? 0) - totalUnitsSold, 0);
        const total = (item.total ?? 0) - totalUnitsSold;
        const actual = (item.actual ?? 0) - totalUnitsSold;

        return { 
          ...item, 
          physical: updatedPhysical,
          sale: (item.sale ?? 0) + totalUnitsSold,
          total, 
          actual 
        };
      }
      return item;
    });

    // Apply updates to all affected items
    updatedItems.forEach((updatedItem) => this.itemService.editItem(updatedItem));

    // Persist the updated combo with new combo entries and latest unitsSold
    this.itemService.editMi({
      ...this.mi,
      unitsSold: this.mi.unitsSold, // Ensure only the latest value is stored
      miEntries: this.miEntries, // Save updated entries
    });

     // Save entry to Firestore
    await this.itemService.addMenuItemEntry(this.mi.id, entry);
    // Clear the new combo entry fields after saving
    this.newMiEntry = null;
  } catch (error) {
    console.error('Error updating menu item:', error);
  }

  }
 
  cancelMiEntry(){
    this.newMiEntry = null;
  }
  
}
