
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


