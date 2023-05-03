import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder } from '@angular/forms';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  public payPalConfig?: IPayPalConfig;


  allProducts:any=[]
  cartTotalprice:number=0
  proceedtoPaymentClickedStatus:boolean=false
  username:string=""
  flat:string=""
  street:string=""
  state:string=""
  offerClickedStatus:boolean=false
  discountClickedStatus:boolean=false
  showSuccess:boolean=false
  showCancel:boolean=false
  showError:boolean=false

  showPaypal:boolean=false
  // address 
   addressForm = this.fb.group({
   username:[''],
     flat:[''],
     street:[''],
     state:['']
   })
  constructor(private api:ApiService,private fb:FormBuilder){

  
  }
  ngOnInit(): void {
    this.api.getCart().subscribe(
      // 200
      (result:any)=>{
      console.log(result);
      this.allProducts=result
      this.getCartTotal()
      // paypal call
    this.initConfig()
    },
    // 400
    (result:any)=>{
      console.log(result.error);
      
    }
    )

  }
  getCartTotal(){
    let total=0
    this.allProducts.forEach((item:any)=>{
      total += item.granttotal
      this.cartTotalprice=Math.ceil(total)
    })
  }

 // remove item from cart
   removeItem(id:any){
    this.api.removeItemCart(id).subscribe(
      // 200
      (result:any)=>{
      this.allProducts=result
        this.getCartTotal()
        this.api.cartCount()
    },
    // 400
    (result:any)=>{
      alert(result.error)
      
    }
    )
  }

  // emptycart()
  emptycart(){
    this.api.emptycart().subscribe(
      // 200
      (result:any)=>{
      this.allProducts=[]
      // update cart  total price
        this.getCartTotal()
      // update cart total count
        this.api.cartCount()
    },
    // 400
    (result:any)=>{
      alert(result.error)
    }
    )
  }

  // increment quantitty
  incrementQuantity(id:any){
    this.api.incCartItem(id).subscribe(
      // 200
      (result:any)=>{
    this.allProducts=result
    // update total
    this.getCartTotal()
    },
    // 400
    (result:any)=>{
      alert(result.error)
    }
    )

  }

  // decrement quantity
  decrementQuantity(id:any){
    this.api.decCartItem(id).subscribe(
      // 200
      (result:any)=>{
    this.allProducts=result
    // update total
    this.getCartTotal()
    },
    (result:any)=>{
      alert(result.error)

    }
    )
  }
  // submitBtnClicked

  submitBtnClicked(){
// check addressForm is valid 
if(this.addressForm.valid){
  // if the status is true on address form is valid 
  this.proceedtoPaymentClickedStatus=true
  this.username=this.addressForm.value.username || ""
  this.flat=this.addressForm.value.flat || ""
  this.street=this.addressForm.value.street || ""
  this.state=this.addressForm.value.state || ""

}
else{
  alert('please enter valid input!!!')
}
  }

  // offerclicked btn
  offerClicked(){
    this.offerClickedStatus=true
  }

  // discount50
  discount50(){
   let discount = Math.ceil(this.cartTotalprice*50/100)
   this.cartTotalprice-=discount 
this.discountClickedStatus=true
  }

   // discount50
   discount10(){
    let discount = Math.ceil(this.cartTotalprice*10/100)
    this.cartTotalprice-=discount 
 this.discountClickedStatus=true
   }


  //  paypal  payment method
  private initConfig(): void {
    let amount = this.cartTotalprice.toString()
    this.payPalConfig = {
    currency: 'USD',
    clientId: 'sb',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: amount,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: amount
              }
            }
          },
          items: [
            {
              name: 'Enterprise Subscription',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'USD',
                value: amount,
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then((details:any)=> {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.showSuccess = true;
      // empty cart
      this.emptycart()
      // hide the paypal div
      this.showPaypal=false
      // hide proceedtoPaymentClickedStatus
      this.proceedtoPaymentClickedStatus=false
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
      this.showCancel=true
      // hide the paypal div
      this.showPaypal=false
    },
    onError: err => {
      console.log('OnError', err);
      this.showError=true
      // hide the paypal div
      this.showPaypal=false
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }


  // makepayment
  makepayment(){
  this.showPaypal=true
  }

  // close the model for full of the data wanish 
  modalClose(){
    this.addressForm.reset()
    this.showCancel=false
    this.showError=false
    this.showSuccess=false
    this.proceedtoPaymentClickedStatus=false
    this.showPaypal=false
  }

}
