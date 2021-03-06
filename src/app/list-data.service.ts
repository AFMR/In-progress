import { Injectable } from '@angular/core';
import { ListData } from './ListData';

@Injectable({
  providedIn: 'root'
})

export class ListDataService {

  listsData: Map<string, ListData> = new Map()
  list: Map<string, boolean> = new Map()
  online: Map<string, boolean> = new Map()
  other: Map<string, boolean> = new Map()
 
  constructor() { 
    this.listsData["list"] = new ListData('Grocery list', this.list)
    this.listsData["online"] = new ListData('Online shopping', this.online)
    this.listsData["other"] = new ListData('Other list', this.other)
    }

    getlistData(listName : string) : ListData {
      return this.listsData[listName]
    }
    
    addItem(listName: string, itemText: string){
      this.listsData[listName].items.set(itemText, false)
    }
    //Erase the full list
    clearList(listName: string){
      this.listsData[listName].items = new Map()
    }
    //Erase one selected item
    clearItem(listName: string, itemText: string){
      this.listsData[listName].items.delete(itemText)
    }

    editItem(listName: string, oldItemText:string, newItemText:string){
      this.listsData[listName].items.delete(oldItemText)
      this.listsData[listName].items.set(newItemText, false)
    }

    changeItemStatus(listName: string, itemText: string, itemStatus: boolean){
      this.listsData[listName].items.set(itemText, itemStatus)
    }
  }

