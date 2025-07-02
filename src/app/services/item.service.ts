import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import {
  Firestore,
  collection,
  collectionData,
  getDoc,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  setDoc,
  docData,
} from '@angular/fire/firestore';

export interface User {
  username: string;
  password: string;
}

export interface ItemEntry {
  date: string;
  physical?: number; // Date of the stock take entry
  sale?: number; // Sales recorded in the stock take
  purchase?: number; // Purchases recorded in the stock take
  closing?: number;
  reason: string; // Closing recorded in the stock take
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
  variance?: number;
  dateMade?: string;
  entries?: ItemEntry[];
  miEntries?: MiEntry[];
}
export interface ComboEntry {
  date: string;
  unitsSold: number;
  reason?: string;
  // Closing recorded in the stock take
}
export interface MiEntry {
  date: string;
  unitsSold: number;
  reason?: string;
  // Closing recorded in the stock take
}
export interface Combo {
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
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  unitsSold?: number;
  miEntries?: MiEntry[];
}
@Injectable({
  providedIn: 'root',
})
export class ItemService {
  //private app = initializeApp(environment.firebaseConfig);
  private itemsCollection;
  private combosCollection;
  private menuItemsCollection;
  constructor(private firestore: Firestore,private auth: Auth, private router: Router) {
    this.itemsCollection = collection(this.firestore, 'items');
    this.menuItemsCollection = collection(this.firestore, 'menuItems');
    this.combosCollection = collection(this.firestore, 'combos');
  }
  async loginUser(username: string, password: string): Promise<boolean> {
    try {
      await signInWithEmailAndPassword(this.auth, username, password);
      return true;
    } catch (error) {
      console.error('Login error', error);
      return false;
    }
  }

  async registerUser(username: string, password: string): Promise<void> {
    await createUserWithEmailAndPassword(this.auth, username, password);
  }

  // Logout
  async logout() {
    return await this.auth.signOut();
  }

  // Get currently logged-in user
  //getUser() {
  //return this.afAuth.authState;
  //}

  private users = new BehaviorSubject<User[]>([
    { username: 'admin', password: 'admin123' },
    { username: 'user1', password: 'password1' },
    { username: 'guest', password: 'guest123' },
  ]);
  private currentUser = new BehaviorSubject<User | null>(null);
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
      entries: [],
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
      entries: [],
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
      entries: [],
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
      entries: [],
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
      entries: [],
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
      entries: [],
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
      entries: [],
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
      entries: [],
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
      entries: [],
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
      entries: [],
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
      entries: [],
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
      entries: [],
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
      entries: [],
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
      entries: [],
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
      entries: [],
    },
  ]);

  private combos: Combo[] = [
    {
      id: 'CMB_001',
      name: 'Combo 1',
      price: 40.0,
      comps: [
        { code: 'SM_HAKE', units: 1 },
        { code: 'MINI_LOAF', units: 1 },
      ],
      unitsSold: 0,
    },
    {
      id: 'CMB_002',
      name: 'Combo 2',
      price: 60.0,
      comps: [
        { code: 'MD_HAKE', units: 1 },
        { code: 'MINI_LOAF', units: 1 },
      ],
      unitsSold: 0,
    },
    {
      id: 'CMB_003',
      name: 'Combo 3',
      price: 80.0,
      comps: [
        { code: 'SM_HAKE', units: 2 },
        { code: 'MINI_LOAF', units: 1 },
      ],
      unitsSold: 0,
    },
    {
      id: 'CMB_004',
      name: 'Combo 4',
      price: 70.0,
      comps: [
        { code: 'SM_RUS', units: 2 },
        { code: 'MINI_LOAF', units: 1 },
      ],
      unitsSold: 0,
    },
    {
      id: 'CMB_005',
      name: 'Combo 5',
      price: 90.0,
      comps: [
        { code: 'MD_HAKE', units: 2 },
        { code: 'MINI_LOAF', units: 1 },
      ],
      unitsSold: 0,
    },
    {
      id: 'CMB_006',
      name: 'Combo 6',
      price: 75.0,
      comps: [
        { code: 'SM_HAKE', units: 1 },
        { code: 'MD_RUS', units: 1 },
        { code: 'MINI_LOAF', units: 1 },
      ],
      unitsSold: 0,
    },
    {
      id: 'CMB_007',
      name: 'Combo 7',
      price: 50.0,
      comps: [
        { code: 'MD_CHS_GRILL', units: 1 },
        { code: 'MINI_LOAF', units: 1 },
      ],
      unitsSold: 0,
    },
    {
      id: 'CMB_008',
      name: 'Combo 8',
      price: 45.0,
      comps: [
        { code: 'SM_VIENNA', units: 2 },
        { code: 'MINI_LOAF', units: 1 },
      ],
      unitsSold: 0,
    },
    {
      id: 'CMB_009',
      name: 'Combo 9',
      price: 85.0,
      comps: [
        { code: 'SM_HAKE', units: 1 },
        { code: 'SM_RUS', units: 1 },
        { code: 'MINI_LOAF', units: 2 },
      ],
      unitsSold: 0,
    },
    {
      id: 'CMB_010',
      name: 'Combo 10',
      price: 55.0,
      comps: [
        { code: 'SM_RUS', units: 1 },
        { code: 'MINI_LOAF', units: 1 },
      ],
      unitsSold: 0,
    },
    {
      id: 'CMB_011',
      name: 'Combo 11',
      price: 65.0,
      comps: [
        { code: 'CAL_RINGS', units: 1 },
        { code: 'MINI_LOAF', units: 1 },
      ],
      unitsSold: 0,
    },
    {
      id: 'CMB_012',
      name: 'Combo 12',
      price: 75.0,
      comps: [
        { code: 'CHK_STRIPS', units: 1 },
        { code: 'MINI_LOAF', units: 1 },
      ],
      unitsSold: 0,
    },
    {
      id: 'CMB_013',
      name: 'Combo 13 - Big Box Deal',
      price: 150.0,
      comps: [
        { code: 'MD_CHIPS', units: 1 },
        { code: 'MINI_LOAF', units: 2 },
        { code: 'CHS_COCKTAIL', units: 10 },
      ],
      unitsSold: 0,
    },
    {
      id: 'CMB_014',
      name: 'Combo 14',
      price: 45.0,
      comps: [
        { code: 'SM_RUS', units: 1 },
        { code: 'MINI_LOAF', units: 1 },
      ],
      unitsSold: 0,
    },
    {
      id: 'CMB_015',
      name: 'Combo 15',
      price: 50.0,
      comps: [
        { code: 'SM_HAKE', units: 1 },
        { code: 'MINI_LOAF', units: 1 },
      ],
      unitsSold: 0,
    },
    {
      id: 'CMB_016',
      name: 'Combo 16',
      price: 60.0,
      comps: [
        { code: 'FISH_CAKE', units: 2 },
        { code: 'MINI_LOAF', units: 1 },
      ],
      unitsSold: 0,
    },
    {
      id: 'CMB_017',
      name: 'Combo 17',
      price: 35.0,
      comps: [
        { code: 'SM_VIENNA', units: 1 },
        { code: 'MINI_LOAF', units: 1 },
      ],
      unitsSold: 0,
    },
    {
      id: 'CMB_018',
      name: 'Combo 18',
      price: 50.0,
      comps: [
        { code: 'CHS_COCKTAIL', units: 5 },
        { code: 'MINI_LOAF', units: 1 },
      ],
      unitsSold: 0,
    },
    {
      id: 'CMB_019',
      name: 'Combo 19 - Max Meal',
      price: 120.0,
      comps: [
        { code: 'SM_HAKE', units: 2 },
        { code: 'SM_RUS', units: 2 },
        { code: 'SM_VIENNA', units: 2 },
        { code: 'MINI_LOAF', units: 1 },
      ],
      unitsSold: 0,
    },
    {
      id: 'CMB_020',
      name: 'Combo 20 - Sailors Choice',
      price: 135.0,
      comps: [
        { code: 'SM_HAKE', units: 2 },
        { code: 'FISH_CAKE', units: 2 },
        { code: 'CAL_RINGS', units: 1 },
        { code: 'MINI_LOAF', units: 1 },
      ],
      unitsSold: 0,
    },
    {
      id: 'CMB_021',
      name: 'Combo 21 - Sausage Selection',
      price: 125.0,
      comps: [
        { code: 'SM_RUS', units: 2 },
        { code: 'SM_VIENNA', units: 2 },
        { code: 'CHS_COCKTAIL', units: 5 },
        { code: 'MINI_LOAF', units: 1 },
      ],
      unitsSold: 0,
    },
    {
      id: 'CMB_022',
      name: 'Combo 22 - Meal for 4',
      price: 200.0,
      comps: [
        { code: 'SM_RUS', units: 4 },
        { code: 'SM_HAKE', units: 4 },
        { code: 'MINI_LOAF', units: 1 },
      ],
      unitsSold: 0,
    },
    {
      id: 'CMB_023',
      name: 'Russian Roll',
      price: 20.0,
      comps: [
        { code: 'SM_RUS', units: 1 },
        { code: 'MINI_LOAF', units: 1 },
      ],
      unitsSold: 0,
    },
    {
      id: 'CMB_024',
      name: 'Hot Dog',
      price: 15.0,
      comps: [
        { code: 'SM_VIENNA', units: 1 },
        { code: 'MINI_LOAF', units: 1 },
      ],
      unitsSold: 0,
    },
  ];

  /*private menuItems: MenuItem[] = [
    {
      id: 'SM_CHIPS',
      name: 'Small Chips',
      price: 20.0,
      unitsSold: 0,
    },
    {
      id: 'MD_CHIPS',
      name: 'Medium Chips',
      price: 30.0,
      unitsSold: 0,
    },
    {
      id: 'LG_CHIPS',
      name: 'Large Chips',
      price: 40.0,
      unitsSold: 0,
    },
    {
      id: 'MAX_CHIPS',
      name: 'Max Chips',
      price: 50.0,
      unitsSold: 0,
    },
    {
      id: 'CHK_STRIPS',
      name: 'Chicken Strip',
      price: 10.0,
      unitsSold: 0,
    },
    {
      id: 'CHK_STRIPS_3',
      name: '3 Chicken Strips',
      price: 25.0,
      unitsSold: 0,
    },
    {
      id: 'MD_CHS_GRILL',
      name: 'Medium Cheese Griller',
      price: 25.0,
      unitsSold: 0,
    },
    { id: 'SM_HAKE', name: 'Small Hake', price: 15.0, unitsSold: 0 },
    {
      id: 'MD_HAKE',
      name: 'Medium Hake',
      price: 25.0,
      unitsSold: 0,
    },
    { id: 'LG_HAKE', name: 'Large Hake', price: 35.0, unitsSold: 0 },
    {
      id: 'CAL_RINGS',
      name: 'Half Calamari Rings',
      price: 30.0,
      unitsSold: 0,
    },
    {
      id: 'FULL_CAL_RINGS',
      name: 'Full Calamari Rings',
      price: 60.0,
      unitsSold: 0,
    },
    {
      id: 'FISH_CAKE',
      name: 'Fish Cake',
      price: 10.0,
      unitsSold: 0,
    },
    {
      id: 'MINI_LOAF',
      name: 'Mini Loaf',
      price: 15.0,
      unitsSold: 0,
    },
    {
      id: 'SM_RUS',
      name: 'Small Russian',
      price: 20.0,
      unitsSold: 0,
    },
    {
      id: 'MD_RUS',
      name: 'Medium Russian',
      price: 25.0,
      unitsSold: 0,
    },
    {
      id: 'LG_RUS',
      name: 'Large Russian',
      price: 30.0,
      unitsSold: 0,
    },
    {
      id: 'XL_RUS',
      name: 'Extra Large Russian',
      price: 35.0,
      unitsSold: 0,
    },
    {
      id: 'SM_VIENNA',
      name: 'Small Vienna',
      price: 10.0,
      unitsSold: 0,
    },
    {
      id: 'CHS_COCKTAIL',
      name: 'Cheesy Cocktail Viennas',
      price: 15.0,
      unitsSold: 0,
    },
  ];*/
  private menuItems = new BehaviorSubject<MenuItem[]>([]);

  // User Management
 /* registerUser(newUser: User): void {
    const currentUsers = this.users.getValue();
    if (currentUsers.some((user) => user.username === newUser.username)) {
      console.error('Username already exists.');
      return;
    }
    this.users.next([...currentUsers, newUser]);
  }

  loginUser(username: string, password: string): boolean {
    const user = this.users
      .getValue()
      .find((u) => u.username === username && u.password === password);
    if (user) {
      this.currentUser.next(user);
      console.log(`User ${username} logged in successfully.`);
      return true;
    }
    console.error('Invalid username or password.');
    return false;
  }

  logoutUser(): void {
    this.currentUser.next(null);
  }*/

  getCurrentUser() {
    return this.currentUser.asObservable();
  }

  //item methods-----------------------------------------------------

 
  // Get all items from Firestore
  getItems(): Observable<Item[]> {
    return collectionData(this.itemsCollection, { idField: 'id' }).pipe(
      map((items) => items.map((item) => item as Item))
    );
  }
  // Add item to Firestore
  async addItem(newItem: Item): Promise<void> {
    try {
      // Create a document reference with ID = newItem.code
      const itemDocRef = doc(this.firestore, 'items', newItem.code);

      // Save the item data at that document
      await setDoc(itemDocRef, newItem);

      console.log('Item added to Firestore with code as ID:', newItem.code);
    } catch (err) {
      console.error('Error adding item:', err);
    }
  }

  getItemByCode(code: string): Observable<Item | undefined> {
    const itemDocRef = doc(this.firestore, 'items', code);
    return docData(itemDocRef).pipe(
      map((data) => {
        if (data) {
          return { code, ...data } as Item;
        } else {
          return undefined;
        }
      })
    );
  }
  getItemEntries(code: string): Observable<ItemEntry[]> {
    const entriesRef = collection(this.firestore, `items/${code}/entries`);
    return collectionData(entriesRef, { idField: 'id' }) as Observable<
      ItemEntry[]
    >;
  }

  addItemEntry(code: string, entry: ItemEntry): Promise<void> {
    const entriesRef = collection(this.firestore, `items/${code}/entries`);
    return addDoc(entriesRef, entry).then(() => {});
  }

  // Edit item by Firestore document ID
  async editItem(updatedItem: Item): Promise<void> {
    try {
      const itemDocRef = doc(this.itemsCollection, updatedItem.code); // Requires item.id
      await updateDoc(itemDocRef, { ...updatedItem });
      console.log(`Item ${updatedItem.code} updated.`);
    } catch (err) {
      console.error('Error updating item:', err);
    }
  }

  // Delete item by Firestore document ID
  async deleteItem(itemId: string): Promise<void> {
    try {
      const itemDocRef = doc(this.itemsCollection, itemId);
      await deleteDoc(itemDocRef);
      console.log(`Item with id ${itemId} deleted.`);
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  }
  //Combo methods--------------------------------------------------
  // Add a new item
async addCombo(newCombo: Combo): Promise<void> {
    const comboDocRef = doc(this.firestore, 'combos', newCombo.id);
    const existing = await getDoc(comboDocRef);

    if (existing.exists()) {
      console.log(`Combo with ID ${newCombo.id} already exists.`);
      return;
    }

    await setDoc(comboDocRef, newCombo);
    console.log(`Combo with ID ${newCombo.id} added to Firestore.`);
  }
  // Get all Combos
  getCombos(): Observable<Combo[]> {
    return collectionData(this.combosCollection, { idField: 'id' }).pipe(
      map((combos) => combos.map((combo) => combo as Combo))
    );
  }
  //get combo by id
  getComboById(id: string): Observable<Combo | undefined> {
    const comboDocRef = doc(this.firestore, 'combos', id);
    return docData(comboDocRef).pipe(
      map((data) => {
        if (data) {
          return { id, ...data } as Combo;
        } else {
          return undefined;
        }
      })
    );
  }
  //edit combo
async editCombo(updatedCombo: Combo): Promise<void> {
  try {
    const comboDocRef = doc(this.combosCollection, updatedCombo.id);
    await updateDoc(comboDocRef, { ...updatedCombo });
    console.log(`Combo ${updatedCombo.id} updated.`);
  } catch (err) {
    console.error('Error updating combo:', err);
  }
}
  //delete combo
  async deleteCombo(id: string): Promise<void> {
  try {
    const comboDocRef = doc(this.combosCollection, id);
    await deleteDoc(comboDocRef);
    console.log(`Combo with ID ${id} deleted.`);
  } catch (err) {
    console.error('Error deleting combo:', err);
  }
}

 getComboEntries(code: string): Observable<ComboEntry[]> {
    const entriesRef = collection(this.firestore, `combos/${code}/entries`);
    return collectionData(entriesRef, { idField: 'id' }) as Observable<
      ComboEntry[]
    >;
  }

   addComboEntry(code: string, entry: ComboEntry): Promise<void> {
    const entriesRef = collection(this.firestore, `combos/${code}/entries`);
    return addDoc(entriesRef, entry).then(() => {});
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
  /*addmenuitem(newMi: MenuItem): void {
    // Check if an item with the same code already exists
    const existingMi = this.getMiByCode(newMi.id);
    if (existingMi) {
      console.log(`Item with code ${newMi.id} already exists.`);
      return;
    }

    // Add the new item to the list
    this.menuItems.push(newMi);
    console.log(`Item with code ${newMi.id} added successfully.`);
  }*/
  async addMenuItem(newMi: MenuItem): Promise<void> {
    try {
      const itemDocRef = doc(this.menuItemsCollection, newMi.id);
      const existing = await getDoc(itemDocRef);

      if (existing.exists()) {
        console.log(`Item with ID ${newMi.id} already exists.`);
        return;
      }

      await setDoc(itemDocRef, newMi);
      console.log(`Item with ID ${newMi.id} added to Firestore.`);
    } catch (err) {
      console.error('Error adding item:', err);
    }
  }

  getMenuitems(): Observable<MenuItem[]> {
    return collectionData(this.menuItemsCollection, { idField: 'id' }).pipe(
      map((menuItems) => menuItems.map((menuItem) => menuItem as MenuItem))
    );
  }
  //get combo by id
  /*getMiByCode(id: string): MenuItem | undefined {
    return this.menuItems.find((mi) => mi.id === id);
  }*/
  getMiByCode(id: string): Observable<MenuItem | undefined> {
    const itemDocRef = doc(this.firestore, 'menuItems', id);
    return docData(itemDocRef).pipe(
      map((data) => {
        if (data) {
          return { id, ...data } as MenuItem;
        } else {
          return undefined;
        }
      })
    );
  }
  getmenuItemEntries(id: string): Observable<MiEntry[]> {
    const entriesRef = collection(this.firestore, `menuItems/${id}/entries`);
    return collectionData(entriesRef, { idField: 'id' }) as Observable<
      MiEntry[]
    >;
  }
  addMenuItemEntry(id: string, entry: MiEntry): Promise<void> {
    const entriesRef = collection(this.firestore, `menuItems/${id}/entries`);
    return addDoc(entriesRef, entry).then(() => {});
  }
 async editMi(updatedMi: MenuItem): Promise<void> {
    try {
      const itemDocRef = doc(this.menuItemsCollection, updatedMi.id); // Requires item.id
      await updateDoc(itemDocRef, { ...updatedMi });
      console.log(`Item ${updatedMi.id} updated.`);
    } catch (err) {
      console.error('Error updating item:', err);
    }
  }

  //delete menu item
  async deleteMenuItem(id: string): Promise<void> {
  try {
    const itemDocRef = doc(this.menuItemsCollection, id);
    await deleteDoc(itemDocRef);
    console.log(`Menu item with ID ${id} deleted.`);
  } catch (err) {
    console.error('Error deleting menu item:', err);
  }
}
  
  /*deleteMi(id: string): void {
    const index = this.menuItems.findIndex((mi) => mi.id === id);
    if (index !== -1) {
      this.menuItems.splice(index, 1);
      console.log(`Item with code ${id} deleted successfully.`);
    } else {
      console.log(`Item with code ${IDBRequest} not found.`);
    }
  }*/
}
