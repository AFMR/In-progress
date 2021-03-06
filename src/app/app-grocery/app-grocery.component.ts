import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListDataService } from '../list-data.service';
import { ListData } from '../ListData';
import { ShoppingItem } from '../ShoppingItem';

@Component({
  selector: 'app-app-grocery',
  templateUrl: './app-grocery.component.html',
  styleUrls: ['./app-grocery.component.css']
})
export class AppGroceryComponent implements OnInit {

  listName: string
  listData: ListData
  itemsArray: Array<ShoppingItem> = new Array<ShoppingItem>()
  itemBeingEdited: string

  constructor(private route: ActivatedRoute, private service: ListDataService) { }

  updateItem(newItem: string){
    if (newItem === ""){
      alert("Please enter a text")
    }
    else{
      if (this.itemBeingEdited === '')
      {
        this.service.addItem(this.listName, newItem)
      }
      else
      {
        this.service.editItem(this.listName, this.itemBeingEdited, newItem)
      }
   }
  }

  clearList(){
    var confirmation = confirm("Are you sure you want to delete the list?");
    if(confirmation == true ){
      this.service.clearList(this.listName)
   }
  }

  clearItem(deleteItem : string){
    this.service.clearItem(this.listName, deleteItem)
  }

  checkBoxValueChanged(e){
    this.service.changeItemStatus(this.listName, e.target.id.toString(), e.target.checked)
  }
  inputfocus(){
    const newItemText: any = document.querySelector('input[name=textbox]');
    newItemText.focus();
  }

  ngOnInit() {
    this.refresh()
    this.inputfocus()
  }

  refresh(){
    this.route.params.subscribe(
      params => this.listName = params.listName.toString())
  
      this.listData = this.service.getlistData(this.listName)
  
      this.itemsArray = new Array<ShoppingItem>()
      for (let [key, value] of this.listData.items) {
        this.itemsArray.push(new ShoppingItem(key, value))
      }
  }
}
