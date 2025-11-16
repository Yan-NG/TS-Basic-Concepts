
//----------------------------------------------------------------------------------
//Typescript Generics
//----------------------------------------------------------------------------------
//Generics let you write reusable, type-safe code that works with many types without losing type information.


function getFirstElement<ElementType>(array:ElementType[]){
    return array[0]
}

const numbers = [1,2,3]
const firstNumber = getFirstElement<number>(numbers)// you can specify in the execution what the generic value type will be for that execution 

const strings = ["some txt", "other txt", "txt"]
const firstString = getFirstElement(strings)

const a = [1,2,3]
const aDouble = a.map((number)=>number*2)
console.log(`Original Array`,a)
console.log(`New Array with doubles` , aDouble)

//Example without generics
type ApiResponse = {
    data:any, //we don't want data to be any
    error:boolean
}
const response:ApiResponse = {
    data:{
        name:"Ann",
        age:20
    },
    error:false
}

//Example with generics
// type ApiResponseWithGenerics<Data>= { //without default value for data

//type ApiResponseWithGenerics<Data = {status:number}>= { //specify default value

type ApiResponseWithGenerics<Data extends object ={status:number} >= { // here I'm checking the type and defining a default value all at ones by using extends  
    data:Data, //we don't want data to be any
    error:boolean
}

// this way I can specify that my data matches an structure and I'm obligated to pass the type
const responseWithGenerics:ApiResponseWithGenerics<{name:string,age:number}> = {
    data:{
        name:"Ann",
        age:20
    },
    error:false
}

//I can generate a type for each specific response 
type UserResponse = ApiResponseWithGenerics<{name:string,age:number}> 
type StatusResponse = ApiResponseWithGenerics<{status:number}>
const userResponse:UserResponse = {
    data:{
        name:"Ann",
        age:20
    },
    error:false
}

// in this case I don't have to specify a type cz is using the default structure of the generics type 
const apiResponse : ApiResponse ={
    data:{
        status:200
    },
    error:false
}

//----------------------------------------------------------------------------------
//Type Guards
//----------------------------------------------------------------------------------
//Type guards refine union types during runtime, allowing the compiler to determine the specific type you're working with.

//typeof guard
type alphanumeric = string | number;

function add(a:alphanumeric, b:alphanumeric){
    if(typeof a === "number" && typeof b === "number" ){
        return a + b
    }
}
add(5,5)

//instanceof guard 
class Banana{
    isTasty():boolean{
        return true
    }
}
class Apple{
    isJuicy():boolean{
        return true
    }
}
type Fruit = Banana | Apple;

function buyFruit(fruit:Fruit):number{
    let price =0;
    if(fruit instanceof Apple){
        price = fruit.isJuicy() ? 5 : 10; 
    }
    return price;
}

const apple = new Apple();
buyFruit(apple)

//in guard

function buyFruitInGuard(fruit:Fruit):number{
    let price = 0;
    if('isTasty' in fruit){
        price = fruit.isTasty() ? 5 : 10; 
    }

    if('isJuicy' in fruit){
        price = fruit.isJuicy() ? 5 : 10; 
    }
    return price;
}
buyFruitInGuard(apple)

//equality narrowing 
function getValues(a:number|string, b:string){
    if(a===b){
        console.log(a)
    }else{
        console.log(a)
    }   
}

//user-defined guards

// this function is a user-defined guards
function isBanana(fruit:Fruit):fruit is Banana{
    return fruit instanceof Banana
}

function buyFruitUserDefinedGuard(fruit:Fruit):number{
    let price =0 ;
    if(isBanana(fruit)){
        price = fruit.isTasty ? 5: 10;
    }else{
        price = fruit.isJuicy ? 5 : 10;
    }
    return price;
}
buyFruitUserDefinedGuard(apple)
