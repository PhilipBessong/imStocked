import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Item, ItemService } from '../../../services/item.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edititem',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edititem.component.html',
  styleUrls: ['./edititem.component.css']
})
export class EdititemComponent implements OnInit {
  itemCode: string | null = null;
  item: Item = {
  code: '',
  name: '',
  price: 0,
  cases: 0,
  units: 0,
  }
  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('code');
    if (code) {
      // Call getItemByCode and check if it returns undefined
      this.itemService.getItemByCode(code).subscribe(
        (foundItem) => {
          if (foundItem) {
            this.item = foundItem; // If found, assign to item
          } else {
            console.error('Item not found');
            this.router.navigate(['/vitems']); // Navigate away if not found
          }
        },
        (error) => {
          console.error('Error fetching item', error);
          this.router.navigate(['/vitems']); // Navigate away on error
        }
      );
    }
  }

  // Method to update the item
  updateItem(): void {
    if (this.item) {
      this.itemService.editItem(this.item); // Safely edit the item if it exists
      this.closeModal();
    } else {
      console.error('Item is not defined');
    }
  }

  closeModal() {
    this.router.navigate(['/vitems']); // Navigate back to items list
  }
}
