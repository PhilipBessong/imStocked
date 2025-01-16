import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ItemEntry {
  date: string;  
  physical?:number      // Date of the stock take entry
  sale?: number;      // Sales recorded in the stock take
  purchase?: number;  // Purchases recorded in the stock take
  closing?: number;
  reason: string;       // Closing recorded in the stock take
}
export interface Item {
  code: string;
  name: string;
  price: number;
  cases: number;
  units: number;
  physical?: number;
  sale?: number;
  purchase?: number;
  closing?: number;
  total?: number;
  actual?: number;
  variance?:number;
  dateMade?: string;
  entries?: ItemEntry[];
  miEntries?: MiEntry[];
}
export interface ComboEntry{

  date: string;  
  unitsSold: number;
  reason?: string;  
       // Closing recorded in the stock take
}
export interface MiEntry{

  date: string;  
  unitsSold: number;
  reason?: string;  
       // Closing recorded in the stock take
}
export interface Combo{
  id: string;
  name: string;
  price: number;
  unitsSold?: number;
  comps: Array<{
    code: string; // Code of the item
    units: number; // Units of the item
  }>;
  comboEntries?: ComboEntry[];
}
@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor() { }
  
  private items = new BehaviorSubject<Item[]>([
    {
      code: 'SM_HAKE',
      name: 'Small Hake',
      price: 15.0,
      cases: 0,
      units: 0,
      physical: 0,
      sale: 0,
      purchase: 0,
      closing: 0,
      total: 0,
      actual: 0,
      variance: 0,
      dateMade: '2024-11-18',
      entries: []
    },
    {
      code: 'MD_HAKE',
      name: 'Medium Hake',
      price: 25.0,
      cases: 0,
      units: 0,
      physical: 0,
      sale: 0,
      purchase: 0,
      closing: 0,
      total: 0,
      actual: 0,
      variance: 0,
      dateMade: '2024-11-18',
      entries: []
    },
    {
      code: 'LG_HAKE',
      name: 'Large Hake',
      price: 35.0,
      cases: 0,
      units: 0,
      physical: 0,
      sale: 0,
      purchase: 0,
      closing: 0,
      total: 0,
      actual: 0,
      variance: 0,
      dateMade: '2024-11-18',
      entries: []
    },
    {
      code: 'CAL_RINGS',
      name: 'Calamari Rings',
      price: 20.0,
      cases: 0,
      units: 0,
      physical: 0,
      sale: 0,
      purchase: 0,
      closing: 0,
      total: 0,
      actual: 0,
      variance: 0,
      dateMade: '2024-11-18',
      entries: []
    },
    {
      code: 'FISH_CAKE',
      name: 'Fish Cake',
      price: 10.0,
      cases: 0,
      units: 0,
      physical: 0,
      sale: 0,
      purchase: 0,
      closing: 0,
      total: 0,
      actual: 0,
      variance: 0,
      dateMade: '2024-11-18',
      entries: []
    },
    {
      code: 'MINI_LOAF',
      name: 'Mini Loaf',
      price: 8.0,
      cases: 0,
      units: 0,
      physical: 0,
      sale: 0,
      purchase: 0,
      closing: 0,
      total: 0,
      actual: 0,
      variance: 0,
      dateMade: '2024-11-18',
      entries: []
    },
    {
      code: 'MD_CHK_RUS',
      name: 'Medium Chicken Russian',
      price: 18.0,
      cases: 0,
      units: 0,
      physical: 0,
      sale: 0,
      purchase: 0,
      closing: 0,
      total: 0,
      actual: 0,
      variance: 0,
      dateMade: '2024-11-18',
      entries: []
    },
    {
      code: 'CHK_STRIPS',
      name: 'Chicken Strips',
      price: 22.0,
      cases: 0,
      units: 0,
      physical: 0,
      sale: 0,
      purchase: 0,
      closing: 0,
      total: 0,
      actual: 0,
      variance: 0,
      dateMade: '2024-11-18',
      entries: []
    },
    {
      code: 'SM_RUS',
      name: 'Small Russian',
      price: 12.0,
      cases: 0,
      units: 0,
      physical: 0,
      sale: 0,
      purchase: 0,
      closing: 0,
      total: 0,
      actual: 0,
      variance: 0,
      dateMade: '2024-11-18',
      entries: []
    },
    {
      code: 'MD_RUS',
      name: 'Medium Russian',
      price: 15.0,
      cases: 0,
      units: 0,
      physical: 0,
      sale: 0,
      purchase: 0,
      closing: 0,
      total: 0,
      actual: 0,
      variance: 0,
      dateMade: '2024-11-18',
      entries: []
    },
    {
      code: 'LG_RUS',
      name: 'Large Russian',
      price: 18.0,
      cases: 0,
      units: 0,
      physical: 0,
      sale: 0,
      purchase: 0,
      closing: 0,
      total: 0,
      actual: 0,
      variance: 0,
      dateMade: '2024-11-18',
      entries: []
    },
    {
      code: 'XL_RUS',
      name: 'X-Large Russian',
      price: 22.0,
      cases: 0,
      units: 0,
      physical: 0,
      sale: 0,
      purchase: 0,
      closing: 0,
      total: 0,
      actual: 0,
      variance: 0,
      dateMade: '2024-11-18',
      entries: []
    },
    {
      code: 'MD_CHS_GRILL',
      name: 'Medium Cheese Griller',
      price: 20.0,
      cases: 0,
      units: 0,
      physical: 0,
      sale: 0,
      purchase: 0,
      closing: 0,
      total: 0,
      actual: 0,
      variance: 0,
      dateMade: '2024-11-18',
      entries: []
    },
    {
      code: 'SM_VIENNA',
      name: 'Small Vienna',
      price: 10.0,
      cases: 0,
      units: 0,
      physical: 0,
      sale: 0,
      purchase: 0,
      closing: 0,
      total: 0,
      actual: 0,
      variance: 0,
      dateMade: '2024-11-18',
      entries: []
    },
    {
      code: 'CHS_COCKTAIL',
      name: 'Cheesy Cocktail Vienna',
      price: 20.0,
      cases: 0,
      units: 0,
      physical: 0,
      sale: 0,
      purchase: 0,
      closing: 0,
      total: 0,
      actual: 0,
      variance: 0,
      dateMade: '2024-11-18',
      entries: []
    }
]);


private combos: Combo[] = [
  { id: 'CMB_001', name: 'Combo 1', price: 40.0, comps: [{ code: 'SM_HAKE', units: 1 }, { code: 'MINI_LOAF', units: 1 }], unitsSold: 0 },
  { id: 'CMB_002', name: 'Combo 2', price: 60.0, comps: [{ code: 'MD_HAKE', units: 1 }, { code: 'MINI_LOAF', units: 1 }], unitsSold: 0 },
  { id: 'CMB_003', name: 'Combo 3', price: 80.0, comps: [{ code: 'SM_HAKE', units: 2 }, { code: 'MINI_LOAF', units: 1 }], unitsSold: 0 },
  { id: 'CMB_004', name: 'Combo 4', price: 70.0, comps: [{ code: 'SM_RUS', units: 2 }, { code: 'MINI_LOAF', units: 1 }], unitsSold: 0 },
  { id: 'CMB_005', name: 'Combo 5', price: 90.0, comps: [{ code: 'MD_HAKE', units: 2 }, { code: 'MINI_LOAF', units: 1 }], unitsSold: 0 },
  { id: 'CMB_006', name: 'Combo 6', price: 75.0, comps: [{ code: 'SM_HAKE', units: 1 }, { code: 'MD_RUS', units: 1 }, { code: 'MINI_LOAF', units: 1 }], unitsSold: 0 },
  { id: 'CMB_007', name: 'Combo 7', price: 50.0, comps: [{ code: 'MD_CHS_GRILL', units: 1 }, { code: 'MINI_LOAF', units: 1 }], unitsSold: 0 },
  { id: 'CMB_008', name: 'Combo 8', price: 45.0, comps: [{ code: 'SM_VIENNA', units: 2 }, { code: 'MINI_LOAF', units: 1 }], unitsSold: 0 },
  { id: 'CMB_009', name: 'Combo 9', price: 85.0, comps: [{ code: 'SM_HAKE', units: 1 }, { code: 'SM_RUS', units: 1 }, { code: 'MINI_LOAF', units: 2 }], unitsSold: 0 },
  { id: 'CMB_010', name: 'Combo 10', price: 55.0, comps: [{ code: 'SM_RUS', units: 1 }, { code: 'MINI_LOAF', units: 1 }], unitsSold: 0 },
  { id: 'CMB_011', name: 'Combo 11', price: 65.0, comps: [{ code: 'CAL_RINGS', units: 1 }, { code: 'MINI_LOAF', units: 1 }], unitsSold: 0 },
  { id: 'CMB_012', name: 'Combo 12', price: 75.0, comps: [{ code: 'CHK_STRIPS', units: 1 }, { code: 'MINI_LOAF', units: 1 }], unitsSold: 0 },
  { id: 'CMB_013', name: 'Combo 13 - Big Box Deal', price: 150.0, comps: [{ code: 'MD_CHIPS', units: 1 }, { code: 'MINI_LOAF', units: 2 }, { code: 'CHS_COCKTAIL', units: 10 }], unitsSold: 0 },
  { id: 'CMB_014', name: 'Combo 14', price: 45.0, comps: [{ code: 'SM_RUS', units: 1 }, { code: 'MINI_LOAF', units: 1 }], unitsSold: 0 },
  { id: 'CMB_015', name: 'Combo 15', price: 50.0, comps: [{ code: 'SM_HAKE', units: 1 }, { code: 'MINI_LOAF', units: 1 }], unitsSold: 0 },
  { id: 'CMB_016', name: 'Combo 16', price: 60.0, comps: [{ code: 'FISH_CAKE', units: 2 }, { code: 'MINI_LOAF', units: 1 }], unitsSold: 0 },
  { id: 'CMB_017', name: 'Combo 17', price: 35.0, comps: [{ code: 'SM_VIENNA', units: 1 }, { code: 'MINI_LOAF', units: 1 }], unitsSold: 0 },
  { id: 'CMB_018', name: 'Combo 18', price: 50.0, comps: [{ code: 'CHS_COCKTAIL', units: 5 }, { code: 'MINI_LOAF', units: 1 }], unitsSold: 0 },
  { id: 'CMB_019', name: 'Combo 19 - Max Meal', price: 120.0, comps: [{ code: 'SM_HAKE', units: 2 }, { code: 'SM_RUS', units: 2 }, { code: 'SM_VIENNA', units: 2 }, { code: 'MINI_LOAF', units: 1 }], unitsSold: 0 },
  { id: 'CMB_020', name: 'Combo 20 - Sailors Choice', price: 135.0, comps: [{ code: 'SM_HAKE', units: 2 }, { code: 'FISH_CAKE', units: 2 }, { code: 'CAL_RINGS', units: 1 }, { code: 'MINI_LOAF', units: 1 }], unitsSold: 0 },
  { id: 'CMB_021', name: 'Combo 21 - Sausage Selection', price: 125.0, comps: [{ code: 'SM_RUS', units: 2 }, { code: 'SM_VIENNA', units: 2 }, { code: 'CHS_COCKTAIL', units: 5 }, { code: 'MINI_LOAF', units: 1 }], unitsSold: 0 },
  { id: 'CMB_022', name: 'Combo 22 - Meal for 4', price: 200.0, comps: [{ code: 'SM_RUS', units: 4 }, { code: 'SM_HAKE', units: 4 }, { code: 'MINI_LOAF', units: 1 }], unitsSold: 0 },
  { id: 'CMB_023', name: 'Russian Roll', price: 20.0, comps: [{ code: 'SM_RUS', units: 1 }, { code: 'MINI_LOAF', units: 1 }], unitsSold: 0 },
  { id: 'CMB_024', name: 'Hot Dog', price: 15.0, comps: [{ code: 'SM_VIENNA', units: 1 }, { code: 'MINI_LOAF', units: 1 }], unitsSold: 0 },
];

  private menuItems: Item[] = [
    { code: 'SM_CHIPS', name: 'Small Chips', price: 20.0, cases: 10, units: 100 },
    { code: 'MD_CHIPS', name: 'Medium Chips', price: 30.0, cases: 10, units: 100 },
    { code: 'LG_CHIPS', name: 'Large Chips', price: 40.0, cases: 10, units: 100 },
    { code: 'MAX_CHIPS', name: 'Max Chips', price: 50.0, cases: 10, units: 100 },
    { code: 'CHK_STRIPS', name: 'Chicken Strip', price: 10.0, cases: 10, units: 100 },
    { code: 'CHK_STRIPS_3', name: '3 Chicken Strips', price: 25.0, cases: 10, units: 100 },
    { code: 'MD_CHS_GRILL', name: 'Medium Cheese Griller', price: 25.0, cases: 10, units: 100 },
    { code: 'SM_HAKE', name: 'Small Hake', price: 15.0, cases: 10, units: 100 },
    { code: 'MD_HAKE', name: 'Medium Hake', price: 25.0, cases: 10, units: 100 },
    { code: 'LG_HAKE', name: 'Large Hake', price: 35.0, cases: 10, units: 100 },
    { code: 'CAL_RINGS', name: 'Half Calamari Rings', price: 30.0, cases: 10, units: 100 },
    { code: 'FULL_CAL_RINGS', name: 'Full Calamari Rings', price: 60.0, cases: 10, units: 100 },
    { code: 'FISH_CAKE', name: 'Fish Cake', price: 10.0, cases: 10, units: 100 },
    { code: 'MINI_LOAF', name: 'Mini Loaf', price: 15.0, cases: 10, units: 100 },
    { code: 'SM_RUS', name: 'Small Russian', price: 20.0, cases: 10, units: 100 },
    { code: 'MD_RUS', name: 'Medium Russian', price: 25.0, cases: 10, units: 100 },
    { code: 'LG_RUS', name: 'Large Russian', price: 30.0, cases: 10, units: 100 },
    { code: 'XL_RUS', name: 'Extra Large Russian', price: 35.0, cases: 10, units: 100 },
    { code: 'SM_VIENNA', name: 'Small Vienna', price: 10.0, cases: 10, units: 100 },
    { code: 'CHS_COCKTAIL', name: 'Cheesy Cocktail Viennas', price: 15.0, cases: 10, units: 100 },
  ];

//item methods-----------------------------------------------------
   // Add a new item
   addItem(newItem: Item): void {
    // Check if an item with the same code already exists
    const existingItem = this.getItemByCode(newItem.code);
    if (existingItem) {
      console.log(`Item with code ${newItem.code} already exists.`);
      return;
    }

    // Add the new item to the list
    this.items.next([...this.items.getValue(), newItem]);
    console.log(`Item with code ${newItem.code} added successfully.`);
  }
  //get all items
  getItems(): Observable<Item[]> {
    return this.items.asObservable();
  }
  //get item by code
  getItemByCode(code: string): Item | undefined {
    return this.items.getValue().find(item => item.code === code);
  }
  //edit item
  editItem(updatedItem: Item): void {
    const currentItems = this.items.getValue(); // Get current items
    const index = currentItems.findIndex(item => item.code === updatedItem.code); // Find the index of the item
    if (index !== -1) {
      const updatedItems = [...currentItems]; // Create a copy of the current items
      updatedItems[index] = updatedItem; // Update the specific item
      this.items.next(updatedItems); // Emit the updated array
    }
  }
  //delete item
  deleteItem(code: string): void {
    const index = this.items.getValue().findIndex(item => item.code === code);
    if (index !== -1) {
      const updatedItems = this.items.getValue().slice();
      updatedItems.splice(index, 1);
      this.items.next(updatedItems);
      console.log(`Item with code ${code} deleted successfully.`);
    } else {
      console.log(`Item with code ${code} not found.`);
    }
  }
  //Combo methods--------------------------------------------------
  // Add a new item
  addCombo(newCombo: Combo): void {
    // Check if an item with the same code already exists
    const existingCombo = this.getComboById(newCombo.id);
    if (existingCombo) {
      console.log(`Item with code ${newCombo.id} already exists.`);
      return;
    }

    // Add the new item to the list
    this.combos.push(newCombo);
    console.log(`Item with code ${newCombo.id} added successfully.`);
  }
  //get all combos
  getCombos(): Combo[] {
    return this.combos;
  }
  //get combo by id
  getComboById(id: string): Combo | undefined {
    return this.combos.find(combo => combo.id === id);
  }
  //edit combo
  editCombo(updatedCombo: Combo): void {
    const index = this.combos.findIndex(combo => combo.id === updatedCombo.id);
    if (index !== -1) {
      this.combos[index] = updatedCombo;
    }
  }
  //delete combo
  deleteCombo(id: string): void {
    const index = this.combos.findIndex(combo => combo.id === id);
    if (index !== -1) {
      this.combos.splice(index, 1);
      console.log(`Item with code ${id} deleted successfully.`);
    } else {
      console.log(`Item with code ${IDBRequest} not found.`);
    }
  }

  updatePhysicalValues(combo: Combo) {
    const updatedItems = this.items.getValue().map((item) => {
      const component = combo.comps.find((comp) => comp.code === item.code);
      if (component && combo.unitsSold) {
        return {
          ...item,
          physical: (item.physical ?? 0) - component.units * combo.unitsSold,
        };
      }
      return item;
    });
    this.items.next(updatedItems);
  }

  //menuitem methods--------------------------------------------------
  // Add a new item
  addmenuitem(newMi: Item): void {
    // Check if an item with the same code already exists
    const existingMi = this.getMiByCode(newMi.code);
    if (existingMi) {
      console.log(`Item with code ${newMi.code} already exists.`);
      return;
    }

    // Add the new item to the list
    this.menuItems.push(newMi);
    console.log(`Item with code ${newMi.code} added successfully.`);
  }
  //get all combos
  getMenuitems(): Item[] {
    return this.menuItems;
  }
  //get combo by id
  getMiByCode(code: string): Item | undefined {
    return this.menuItems.find(mi => mi.code === code);
  }
  //edit combo
  editMi(updatedMi: Item): void {
    const index = this.menuItems.findIndex(mi => mi.code === updatedMi.code);
    if (index !== -1) {
      this.menuItems[index] = updatedMi;
    }
  }
  //delete combo
  deleteMi(code: string): void {
    const index = this.menuItems.findIndex(mi => mi.code === code);
    if (index !== -1) {
      this.menuItems.splice(index, 1);
      console.log(`Item with code ${code} deleted successfully.`);
    } else {
      console.log(`Item with code ${IDBRequest} not found.`);
    }
  }
}
