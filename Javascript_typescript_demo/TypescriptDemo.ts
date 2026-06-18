import { Page, Locator } from '@playwright/test';

let message1: string="Hiii";
//wrong message1=2;
console.log(message1);
let age1: number=40;
console.log(age1);
let isactive:boolean=true;
//if u are not sure of data type use
let data:any="any data type";
data=42;
//array
let numbers1:number[]=[1,2,3];
//function
function add1(a:number,b:number):number
{
    return a+b;
}
add1(3,4);
//object

let user:{name:string,age:number,location:string}={name:"Robin",age:34,location:"Hyderabad"}
//can't declare here
//user.location="hyderabad"
class CartPage
{
    page:Page;
    cartProducts:Locator;
    checkout:Locator;
    constructor(page:Page)
    {
        this.page=page;
        this.cartProducts=page.locator("div ul li");
        this.checkout=page.locator("text=Checkout");
    }
}






//to run typescript
//tsc TypescriptDemo.ts -it will create javascript file for this typescript file
//node TypescriptDemo.js