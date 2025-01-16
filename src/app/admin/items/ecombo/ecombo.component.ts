import { Component,OnInit  } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Item, ItemService,Combo } from '../../../services/item.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-ecombo',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './ecombo.component.html',
  styleUrl: './ecombo.component.css'
})
export class EcomboComponent {
  comboId: string | null = null;
  combo!: Combo;
  combos: Combo[] = []; 

  items: Item[] = []
  newComp = { code: '', units: 0 };
  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.combo = this.itemService.getComboById(id)!;
    }
    this.itemService.getItems().subscribe(items => this.items = items);

  }
   // Method to update the item
   updateItem(): void {
    this.itemService.editCombo(this.combo);
      this.closeModal();
    
  }
 // Add a component to the combo
 addComp(): void {
  if (this.newComp.code && this.newComp.units > 0) {
    this.combo.comps.push({ ...this.newComp });
    this.newComp = { code: '', units: 0 }; // Reset input fields
  }}

  removeComp(item: { code: string; units: number }): void {
    this.combo.comps = this.combo.comps.filter(comps => comps !== item);
  }

  closeModal() {
    this.router.navigate(['/vcombos']); // Navigate back to home, effectively closing the modal
  }

 
  getComboById(id: string): Combo | undefined {
    return this.combos.find(combo => combo.id === id);
  }
}
