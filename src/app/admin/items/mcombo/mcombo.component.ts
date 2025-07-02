import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, firstValueFrom  } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ItemService, Item, MiEntry,Combo,ComboEntry, MenuItem } from '../../../services/item.service';
@Component({
  selector: 'app-mcombo',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './mcombo.component.html',
  styleUrl: './mcombo.component.css'
})
export class McomboComponent implements OnInit, OnDestroy {
constructor( private itemService: ItemService,
  private route: ActivatedRoute,
  private router: Router
){}
private subscription!: Subscription; // To manage the subscription
filteredItems: Item[] = []; 
items:Item[]=[];
combos: Combo[] = [];
menuItems: MenuItem[] = [];
combo!:Combo;
item!:Item;
mi!:MenuItem;
comboEntries: ComboEntry[] = []; // Array to hold the entries
miEntries: MiEntry[] = []; 
newComboEntry: ComboEntry | null = null; // To hold the new entry object
newMiEntry: MiEntry | null = null

// Get the name of an item using its code
getItemName(code: string): string {
  const item = this.items.find(item => item.code === code);
  return item ? item.name : 'Unknown Item';
}

// Check if the current component is the last in the list
isLastComponent(comps: { code: string; units: number }[], comp: { code: string; units: number }): boolean {
  return comps.indexOf(comp) === comps.length - 1;
}
ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id');
  if (id) {
   this.itemService.getComboById(id).subscribe((combo) => {
        if (combo) this.combo = combo;
      });

      this.itemService.getComboEntries(id).subscribe((comboEntries) => {
        this.comboEntries = comboEntries;
      });

  }
 
     if (id) {
      this.itemService.getMiByCode(id).subscribe((menuItem) => {
        if (menuItem) this.mi = menuItem;
      });}
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

addComboEntry() {
  const currentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
  this.newComboEntry = {
    date: currentDate,
    unitsSold: 0,
    reason: '',
  }; // Initialize a new entry with prepopulated date and empty values
}


badsaveComboEntry() {
  if (this.newComboEntry) {
    this.comboEntries.push(this.newComboEntry);

    // Calculate and update combo properties
    const latestEntry = this.newComboEntry;
    this.combo.unitsSold = latestEntry.unitsSold ?? 0;

    // Deduct unitsSold from the physical of each item in the combo
    if (this.combo.comps?.length && this.combo.unitsSold > 0) {
      this.combo.comps.forEach(comp => {
        const item = this.items.find(i => i.code === comp.code);

        if (item) {
          // Deduct the correct amount based on the combo's composition
          const totalUnitsToDeduct = (this.combo.unitsSold ?? 0) * comp.units;
          item.physical = (item.physical ?? 0) - totalUnitsToDeduct;

          // Ensure physical doesn't go below zero
          if ((item.physical ?? 0) < 0) {
            console.warn(`Physical for item ${item.code} went below zero. Setting to 0.`);
            item.physical = 0;
          }
        }
      });
    }

    // Save updated combo to the service
    this.itemService.editCombo(this.combo);

    // Reset newEntry after saving
    this.newComboEntry = null;
  }
}

async saveComboEntry(): Promise<void> {
  // Ensure the combo entry is valid
  if (!this.newComboEntry || this.newComboEntry.unitsSold <= 0) {
    console.error('Invalid combo entry or units sold');
    return;
  }

  // Create a new combo entry with the latest sale data
  const entry: ComboEntry = {
    date: new Date().toISOString(), // Use current date
    unitsSold: this.newComboEntry.unitsSold,
    reason: this.newComboEntry.reason || '', // Optional reason
  };

   // Add entry to comboEntries (make sure it's initialized)
  if (!this.comboEntries) this.comboEntries = [];
  this.comboEntries.push(entry);


  // Update combo.unitsSold with the latest entry value
  this.combo.unitsSold = entry.unitsSold;
  if (!this.combo.comps) {
    console.error('Combo components not found');
    return;
  }

  try {
    // Fetch all items **once**
    const items = await firstValueFrom(this.itemService.getItems());

    // Update only the affected items in the combo
    const updatedItems = items.map((item) => {
      const comp = this.combo.comps.find((c) => c.code === item.code);
      if (!comp) return item;
      
        const totalUnitsSold = comp.units * entry.unitsSold;
        
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
     
    });

    // Await updates to ensure all item changes are saved
    await Promise.all(
      updatedItems.map((updatedItem) => this.itemService.editItem(updatedItem))
    );
    // Persist the updated combo with new combo entries and latest unitsSold
    this.itemService.editCombo({
      ...this.combo,
      unitsSold: this.combo.unitsSold, // Ensure only the latest value is stored
      comboEntries: this.comboEntries, // Save updated entries
    });

    // Save entry to Firestore
    await this.itemService.addComboEntry(this.combo.id, entry);


    // Clear the new combo entry fields after saving
    this.newComboEntry = null;
  } catch (error) {
    console.error('Error updating items:', error);
  }
}


// Helper method to update the physical stock for the items in the combo
updatePhysicalValues(entry: ComboEntry): void {
  if (!this.combo || !this.combo.comps) {
    console.error('Combo or components are undefined.');
    return;
  }

  // Update physical stock for each item in the combo
  for (const comp of this.combo.comps) {
    if (!comp || !comp.code) {
      console.warn('Invalid component in combo.');
      continue;
    }

    // Retrieve the item asynchronously
    this.itemService.getItemByCode(comp.code).subscribe(item => {
      if (item) {
        // Calculate the total units to be reduced based on the combo quantity
        const totalReduction = entry.unitsSold * (comp.units || 0);

        // Update the item's physical stock
        item.physical = Math.max(0, (item.physical || 0) - totalReduction);

        // Persist the updated item in the service
        this.itemService.editItem(item);
      } else {
        console.error(`Item with code ${comp.code} not found in the service`);
      }
    });
  }
}





cancelComboEntry(){
  this.newComboEntry = null;
}


}
