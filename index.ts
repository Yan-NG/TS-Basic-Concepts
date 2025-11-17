
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

//----------------------------------------------------------------------------------
//Typescript Utility Types
//----------------------------------------------------------------------------------
//Utilities for Object Types

type User = {
    id:string;
    name?:string;
    age:number;
}

type PartialUser = Partial<User> // all of the properties are optionals
type RequiredPropsUser = Required<User> // all props are required 
type OmitPropUser = Omit<User,"id"|"name" > // to remove an specific props 
type PickPropUser = Pick<User, "id"> // to pick specific props 
type ReadOnlyUser = Readonly<User> // to create a read only type

// you can create a custom Mutable type 
type Mutable<Type> ={
    -readonly [Key in keyof Type]:Type[Key]
}
type MutableUser = Mutable<ReadOnlyUser>

//Utilities for Unions
type Role ="admin" | "user" | "anonymous"
type NonRoleAdmin = Exclude<Role, "admin">

type RoleAttributes = 
    |   {   role:"admin", orgId:string  }
    |   {   role:"user" }
    |   {   role:"anonymous"};

type AdminRole = Extract<RoleAttributes,{role:"admin"}>

//Utility Types for Functions
type Func = (a:number, b:string)=>string
type ReturnFuncValue = ReturnType<Func>;
type ParamsFunc = Parameters<Func> 
type MaybeString = string | null | undefined;
type DefinitelyString = NonNullable<MaybeString>;
type PromiseString =  Promise<string>;
type Result = Awaited<PromiseString>;

const func = async ()=>{
    return{
        id:123
    }
}
type Result2 = Awaited<ReturnType<typeof func>>



