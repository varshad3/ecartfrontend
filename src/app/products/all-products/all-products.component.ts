import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit{
searchTerm:string=''
allProducts:any=[]

  constructor(private api:ApiService){ }

  ngOnInit(): void {
    this.api.getallProducts().subscribe((result:any)=>{
      console.log(result);
      this.allProducts=result
    })

    // to get search term from api services
    this.api.searchTerm.subscribe((result:any)=>{
      this.searchTerm=result
      console.log(this.searchTerm);
      
    })
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
