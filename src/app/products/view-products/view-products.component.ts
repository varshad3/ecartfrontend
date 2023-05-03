import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {

  productId:string=""
  product:any={}
// dependency injection 
  constructor(private viewActivatedRoute:ActivatedRoute,private api:ApiService){

  }

  ngOnInit(): void {
    // to get path parameter from route
    this.viewActivatedRoute.params.subscribe((data:any)=>{
      console.log(data);
      this.productId=data.id
    })


    // call view product api
    this.api.viewProducts(this.productId).subscribe((result:any)=>{
      console.log(result);  
      this.product=result
    },

    (result:any)=>{
      alert(result.error)
    }
    )
  }

  // api add to wishlist
  addtoWishlist(){
    const {id,title,price,image}=this.product
    // api
    this.api.addtoWishlist(id,title,price,image).subscribe(
      // response 200
      (result:any)=>{
        alert(result)
      },
      // 400
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
      // call cartcount
      this.api.cartCount()
      alert(result)

    },
    // response 400
    (result:any)=>{
      alert(result.error)
    }
    )
  }
}
