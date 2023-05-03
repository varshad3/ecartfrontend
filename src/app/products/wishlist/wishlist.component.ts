import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  allProducts:any=[]
  constructor(private api:ApiService){

  }
  ngOnInit(): void {
    this.api.getWishlist().subscribe((result:any)=>{
      console.log(result);
      this.allProducts=result
    },
    (result:any)=>{
      console.log(result.error);     
    }
    )
  }

  // remove item
  removeItem(id:any){
    this.api.removeWishlistItem(id).subscribe((result:any)=>{
      this.allProducts=result
    },
    (result:any)=>{
      alert(result.error)
      
    }
    )
  }

   // add to cart()
   addtocart(product:any){

    // add {quantity :1} to product object
    Object.assign(product,{quantity:1})
    console.log(product);
    
    // call api
    this.api.addtocart(product).subscribe(
            // response 200
      (result:any)=>{
      // call cartcount increment 
      this.api.cartCount()
      //remove item from the wishlist after addtocart 
      this.removeItem(product.id)
      alert(result)

    },
    // response 400
    (result:any)=>{
      alert(result.error)
    }
    )
  }
  
}
