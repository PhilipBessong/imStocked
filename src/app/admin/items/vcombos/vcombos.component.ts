import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';  // Import RouterModule
import { CommonModule } from '@angular/common';
import { ItemService,Combo,Item } from '../../../services/item.service';
@Component({
  selector: 'app-vcombos',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './vcombos.component.html',
  styleUrl: './vcombos.component.css'
})
export class VcombosComponent implements OnInit{
  constructor(private router: Router,private itemService: ItemService){}

  comboId: string | null = null;
  goBack(){
    this.router.navigate(['/home']);
  }
  combos: Combo[] = [];
  mi: Item[]=[];
  filteredItems: Combo[] = []; 

  ngOnInit() {
    this.combos = this.itemService.getCombos();
    this.mi = this.itemService.getMenuitems();
    this.filteredItems = [...this.combos];
    console.log(this.combos);
  }
  
  onSearch(event: any) {
    const query = event.target.value.toLowerCase();
     // Filter items based on the search query
     this.filteredItems = this.combos.filter(combo =>
      combo.name.toLowerCase().includes(query) ||
      combo.id.toLowerCase().includes(query)
    );
  }

  toaddCombp(){
    this.router.navigate(['/addcombo']);
  }
  // Method to edit a row
  editCombo(combo: Combo): void {
    this.router.navigate(['/ecombo', combo.id]);  // Programmatic navigation
  }

  // Method to delete a row
  deleteCombo(index: number) {
    const comboId = this.combos[index].id;
    console.log('Deleting item:', comboId);
    this.combos.splice(index, 1); // Remove the item from the array
    this.itemService.deleteCombo(comboId); // Call service to delete the item
  }

}

