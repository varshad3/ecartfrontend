import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(allProducts:any[],searchTerm:string,propertyName:string): any[] {
   // transform output
    const result :any=[]

  //  if not all products
  if(!allProducts || searchTerm=="" || propertyName=="") {
    return allProducts
  }
  allProducts.forEach((item:any)=>{
    if(item[propertyName].trim().toLowerCase().includes(searchTerm.trim().toLowerCase())){
      result.push(item)
    }
  })
  return result;
  }

}
