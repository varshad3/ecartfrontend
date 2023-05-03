import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // to hold searchterm - behaviour subject (behaviour subject comes from rxjs -rxjs is a adynchronous function)and it can be done by subscribe
  searchTerm = new BehaviorSubject('')

  // to hold cart count  
  cartItemsCount = new BehaviorSubject(0)

  BASE_URL= 'https://ecommerse-yvvk.onrender.com'
  constructor(private http:HttpClient) { 

    this.cartCount()
  }

  // get all products
  getallProducts(){
    // api
    return this.http.get(`${this.BASE_URL}/products/all-products`)
  }

  // view product

  viewProducts(id:any){
    // api
    return this.http.get(`${this.BASE_URL}/products/view-product/${id}`)
  }

  // add to wishlist
  addtoWishlist(id:any,title:any,price:any,image:any){
    const body={
      id,title,price,image
    }
    // api
    return this.http.post(`${this.BASE_URL}/wishlist/add-product`,body)
  }

  // get wishlist
  getWishlist(){
    //api
    return this.http.get(`${this.BASE_URL}/wishlist/get-items`)
  }

  // remove wishlist item
  removeWishlistItem(id:any){
    return this.http.delete(`${this.BASE_URL}/wishlist/remove-item/${id}`)
  }

  // add to cart api-cart/add-product
  addtocart(product:any){
    // get id,title,price,image,quantity from product
    const body={
      id:product.id,
      title:product.title,
      price:product.price,
      image:product.image,
      quantity:product.quantity
    }

    // api
    return this.http.post(`${this.BASE_URL}/cart/add-product`,body)
  }

  // get cart items
  getCart(){
    // api
    return this.http.get(`${this.BASE_URL}/cart/all-products`)
  }

  // cartCount 
  cartCount(){
    this.getCart().subscribe((result:any)=>{
      this.cartItemsCount.next(result.length)
    })
  }
  
  // remove from cart
  removeItemCart(id:any){
    return this.http.delete(`${this.BASE_URL}/cart/remove-item/${id}`)
  }

  // cart/remove-all-items

  emptycart(){
    //api
    return this.http.delete(`${this.BASE_URL}/cart/remove-all-items`)

  }

  incCartItem(id:any){
    // api
    return this.http.get(`${this.BASE_URL}/cart/increment-item/${id}`)
  }

  decCartItem(id:any){
    // api
    return this.http.get(`${this.BASE_URL}/cart/decrement-item/${id}`)
  }
  
}
