//**********VARIABLES**********

let num = 5; //num = "a";  //throws compile error since type is different but will still transpile to js

//type is any
let anyval;
anyval = 5;
anyval = "a";

let msg = "f"; //msg.endsWith('c');  es6

//if type any, you won't get intellisense
let msg1; //msg1. no intellisense

//to get intellisense from variable of type any, use type assertions.
//let endsWithC = (<string>msg1).endsWith('c');
//let endsWithC2 = (msg1 as string).endsWith('c');

//How to set type annotations
let vAnnotations0: any;
let vAnnotations1: number;
let vAnnotations2: string;
let vAnnotations3: boolean;

let vAnnotations5: number[];
let vAnnotations6: number[] = [1, 2, 3];
let vAnnotations7: any[] = [1, "a", 3];

const ColorRed = 0;

enum Color {
  Red = 1,
  Green = 2,
  Blue = 3,
}
let bgColor = Color.Red; //intellisense support

//**********Functions**********

//Functions js way
var log = function (msg) {
  console.log(msg);
};

//typescript
//2nd arg is an optional arg;  3rd arg is optional with default val
//If default args are placed before required args, then you must pass undefined
let log1 = function (msg: string, msg2?: string, msg3 = "defaultVal") {
  console.log(msg);
};

//A more in depth example, take the below.  This is the fully typed function
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

//passing callbacks
function fn(x: () => void) {
  x();
}
fn(() => {
  console.log("call back func");
});

//arrow functions (c# lambda)
let log2 = (msg: string) => {
  console.log(msg);
};
let log3 = (msg) => console.log(msg);
let log4 = () => console.log();

//instead of passing many args
//let drawPoint = (a,b,c,d,e,f,g) => { }  pass in an object

let drawPoint = (point) => {};

drawPoint({ x: 1, y: 2 });

//problem is drawpoint can then be changed to
//drawPoint({    name: "Alan" })
//To protect against that, a verbose way, inline annotations
let drawPoint2 = (point: { x: number; y: number }) => {};

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

//**********INTERFACES**********

interface IBasicClass {
  x: number;
  y: number;
  drawPoint: () => void;
}

let drawPoint3 = (point: IBasicClass) => {};
let getDistance = (pointA: IBasicClass, pointB: IBasicClass) => {};

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
