import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ItemService, Item, MiEntry,Combo,ComboEntry } from '../../../services/item.service';
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
menuItems: Item[] = [];
combo!:Combo;
item!:Item;
mi!:Item;
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
    const combo = this.itemService.getComboById(id);
    if (combo) {
      this.combo = combo;
      this.comboEntries = combo.comboEntries || []; // Safe access
    } else {
      console.error(`Combo with id ${id} not found`);
    }
  }
  const code = this.route.snapshot.paramMap.get('code');
  if (code) {
    const mi = this.itemService.getMiByCode(code);
    if (mi) {
      this.mi = mi;
      this.miEntries = mi.miEntries || []; // Safe access
    } else {
      console.error(`Item with code ${code} not found`);
    }
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

saveComboEntry(): void {
  // Ensure the combo entry is valid
  if (!this.newComboEntry || this.newComboEntry.unitsSold <= 0) {
    console.error('Invalid combo entry or units sold');
    return;
  }

  // Create a new combo entry with the sale information
  const entry: ComboEntry = {
    date: new Date().toISOString(), // Current date
    unitsSold: this.newComboEntry.unitsSold,
    reason: this.newComboEntry.reason || '', // Optional reason
  };

  // Add the entry to the combo entries list
  this.comboEntries.push(entry);

  // Update physical stock for each item in the combo using the helper method
  this.updatePhysicalValues(entry);

  // Persist the updated combo with new combo entries
  this.itemService.editCombo({
    ...this.combo,
    comboEntries: this.comboEntries, // Update the combo entries with the new entry
  });

  // Clear the new combo entry fields after saving
  this.newComboEntry = null;
  console.log('Combo sold and entry recorded successfully:', entry);
}
// Helper method to update the physical stock for the items in the combo
updatePhysicalValues(entry: ComboEntry): void {
  // Update physical stock for each item in the combo
  for (const comp of this.combo.comps) {
    this.itemService.getItemByCode(comp.code).subscribe(item => {
      if (item) {
        // Calculate the total units to be reduced based on the combo quantity
        const totalReduction = entry.unitsSold * comp.units;

        // Update the item's physical stock
        item.physical = (item.physical || 0) - totalReduction;

        // Ensure that physical stock doesn't go negative
        if (item.physical < 0) {
          item.physical = 0;
          console.warn(`Item ${item.code} stock went negative. Reset to 0.`);
        }

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
