import { Component,OnInit  } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Item, ItemService } from '../../../services/item.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-edititem',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './edititem.component.html',
  styleUrl: './edititem.component.css'
})
export class EdititemComponent implements OnInit {
  itemCode: string | null = null;
  item!: Item;
  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('code');
    if (code) {
      this.item = this.itemService.getItemByCode(code)!;
    }
  }
   // Method to update the item
   updateItem(): void {
    this.itemService.editItem(this.item);
      this.closeModal();
    
  }

  closeModal() {
    this.router.navigate(['/vitems']); // Navigate back to home, effectively closing the modal
  }
}
