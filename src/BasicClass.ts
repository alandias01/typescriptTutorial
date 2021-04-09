//**********VARIABLES**********

//type is any
let anyval;
anyval = 5;
anyval = "a";

//if type any, you won't get intellisense
let msg1; //msg1. no intellisense

//to get intellisense from variable of type any, use type assertions.
let endsWithC = (<string>(<unknown>msg1)).endsWith("c");
let endsWithC2 = ((msg1 as unknown) as string).endsWith("c");

//Setting the type is referred to as setting the type annotations
let vAnnotations0: any;
let vAnnotations1: number;
let vAnnotations2: string;
let vAnnotations3: boolean;
let vAnnotations4: { name: string; age: number } = { name: "Alan", age: 1 };
let vAnnotations5: number[];
let vAnnotations6: number[] = [1, 2, 3];
let vAnnotations7: any[] = [1, "a", 3];

enum Color {
  Red = 1,
  Green = 2,
  Blue = 3,
}
let bgColor = Color.Red; //intellisense support

//**********Functions**********

//Named Function.  msg is a parameter.  When someone uses the function and passes in a value, it
//is referred to as an argument
function namedFunc(msg: string) {
  console.log(msg);
  return msg + " added";
}

//Anonymous Function
var anonymousFunc = function (msg: string) {
  console.log(msg);
  return msg + " added";
};

//Arrow Function
const arrowFunc1 = (msg: string) => {
  console.log(msg);
  return msg + " added";
};

//Arrow Function that only returns something with no body
const arrowFunc2 = (msg: string) => msg + " added";

//Optional and default arguments
//2nd arg is an optional arg;
//3rd arg is optional with default val
//If default args are placed before required args, then you must pass undefined
let log1 = (msg: string, msg2?: string, msg3 = "defaultVal") => {
  console.log(msg);
};

//A more in depth example, take the below.  This is the fully typed function
//Here we say myAdd is a function with this signature (x: number, y: number) => number
let myAdd: (x: number, y: number) => number = function (
  x: number,
  y: number
): number {
  return x + y;
};

//The transpiler has type inference and thats why we can leave out certain parts
let myAdd2 = function (x: number, y: number): number {
  return x + y;
};
//or
function myAdd3(x: number, y: number): number {
  return x + y;
}

//You can use an interface and a type
interface IMyAdd {
  x: number;
  y: number;
}

type IReturnMyAdd = (numbers: IMyAdd) => number;

let myAdd4: IReturnMyAdd = (numbers) => numbers.x + numbers.y;

//without interface
let myAdd5 = (numbers: { x: number; y: number }): number =>
  numbers.x + numbers.y;

//passing callbacks
function fn(x: () => void) {
  x();
}
fn(() => {
  console.log("call back func");
});

//SWITCH
function switchstmt(grade: string) {
  switch (grade) {
    case "a": {
      console.log("Excellent");
      break;
    }
    case "b": {
      console.log("Good");
      break;
    }
    default: {
      console.log("Invalid choice");
      break;
    }
  }
}

//Generic Functions
interface IGenA {
  FirstName: string;
  age: number;
}

interface IGenB {
  MiddleName: string;
  age: number;
}

const objA: IGenA = {
  FirstName: "Alan",
  age: 1,
};

const objB: IGenB = {
  MiddleName: "Manuel",
  age: 2,
};
function genFunc01<T extends IGenA, U extends IGenB>(a: T, b: U): T {
  a.age += b.age;
  return a;
}

//**********Class**********

interface IBasicClass {
  x: number;
  y: number;
  drawPoint: () => void;
}

export class BasicClass implements IBasicClass {
  //x: number; Already defined in constructor feature
  //y: number;

  name: string; //public by default or you can prefix it
  private age: number; //For private, you must specify

  //Properties ECMA 5 or higher
  //get z() { return this._z; }
  //set z(value)
  //{
  //    if (value < 0)
  //        throw new Error("Value cant be less than 0");

  //    this._z = value;
  //}

  //prefixing a ctor arg w/ an access modifier generates the field and inits it same name as arg
  constructor(public x: number, public y: number, private _z?: number) {}

  //drawPoint() { console.log("x: " + this.x); }  //specifying type optional
  drawPoint(): void {
    console.log("x1: " + this.x);
  }
  drawPoint2 = () => {
    console.log("x2: " + this.x);
  };
}

//let point: Point; Won't work.  You must allocate memory
//let point: Point = new Point();
let basicClass = new BasicClass(1, 2);
basicClass.drawPoint2();
