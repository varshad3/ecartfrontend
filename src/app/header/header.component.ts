import { Component, OnInit } from '@angular/core';
import { ApiService } from '../products/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  cartitems:number=0
constructor(private api:ApiService){

}
ngOnInit(): void {
  this.api.cartItemsCount.subscribe((data:any)=>{
    console.log(data);
    this.cartitems=data
  })
}


  search(event:any){
    // console.log(event.target.value);
    // the searchterm get a value from the event we use next()
    // to assign new value to behaviour subject use next()
    this.api.searchTerm.next(event.target.value)
  }
}

