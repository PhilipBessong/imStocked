import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, ItemService } from '../../../services/item.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-addmi',
  imports: [CommonModule, FormsModule],
  templateUrl: './addmi.component.html',
  styleUrl: './addmi.component.css'
})
export class AddmiComponent {
constructor(private itemService: ItemService,private router: Router) {}

  closeModal() {
    this.router.navigate(['/vmi']); // Navigate back to home, effectively closing the modal
  }
  newMenuItem: MenuItem = {
    id: '',
    name: '',
    price: 0,
    miEntries: [],
  };

  addItem() {
    this.itemService.addMenuItem(this.newMenuItem).then(() => {
      this.closeModal();
    });
  }
}
