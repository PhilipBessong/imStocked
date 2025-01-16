import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Combo, ItemService,ComboEntry, Item } from '../../../services/item.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-addcombo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './addcombo.component.html',
  styleUrl: './addcombo.component.css'
})
export class AddcomboComponent {
  constructor(private itemService: ItemService,private router: Router) {}
  items: Item[] = [
    { code: '001', name: 'Item 1', price: 10, cases: 0, units: 0 },
    { code: '002', name: 'Item 2', price: 15, cases: 0, units: 0 },
  ];
  selectedItems: Item[] = [];
  combos: Combo[] = []; 
  newCombo: Combo = {
    id: '',
    name: '',
    price: 0,
    comps: [],
  };

  newComp = { code: '', units: 0 };

  ngOnInit() {
    this.itemService.getItems().subscribe(items => this.items = items);

  }

  closeModal() {
    this.router.navigate(['/vcombos']); // Navigate back to home, effectively closing the modal
  }

 // Add a component to the combo
 addComp(): void {
  if (this.newComp.code && this.newComp.units > 0) {
    this.newCombo.comps.push({ ...this.newComp });
    this.newComp = { code: '', units: 0 }; // Reset input fields
  }
}

// Remove a component from the combo
removeComp(item: { code: string; units: number }): void {
  this.newCombo.comps = this.newCombo.comps.filter(comps => comps !== item);
}

  onSubmit(): void {
    const existingCombo = this.getComboById(this.newCombo.id);

    if (existingCombo) {
      console.log(`Combo with ID ${this.newCombo.id} already exists.`);
      return;
    }
    this.itemService.addCombo(this.newCombo);
    this.combos.push({ ...this.newCombo });
    console.log(`Combo with ID ${this.newCombo.id} added successfully.`);
    this.resetForm();
  }

  getComboById(id: string): Combo | undefined {
    return this.combos.find(combo => combo.id === id);
  }

  resetForm(): void {
    this.newCombo = {
      id: '',
      name: '',
      price: 0,
      comps: [],
    };
  }

  
 
}
