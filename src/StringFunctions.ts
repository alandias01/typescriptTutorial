export class StringFunctions {
  constructor() {
    this.basic();
    this.numbers();
  }

  out = (x: any) => x && console.log(x);

  basic = () => {
    var text1 = "Hello";
    var text2 = "World";
    this.out("concat: " + text1.concat(" ", text2));

    var txt = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.out("length: " + txt.length);
    this.out("indexOf: " + txt.indexOf("CDE"));
    this.out("slice: " + txt.slice(3, 6)); //DEF
    this.out("slice -7, -2: " + txt.slice(-7, -2)); //TUVWX
    this.out("substring: " + txt.substring(3, 6)); //Same as slice but can't take negative numbers
    this.out("substr: " + txt.substr(3, 6)); //Same as slice but 2nd arg is length. Can take negative numbers
    this.out("replace: " + txt.replace("ABC", "ZZZ")); //case sensitive, only one match
    this.out("replace regex: " + txt.replace(/[AR].{3}/gi, "zzz")); //use regex for case insensitive, add g for multiple matches
    this.out("toLowerCase: " + txt.toLowerCase());
    this.out("trim: " + txt.trim());
    this.out("charAt: " + txt.charAt(0)); //A
    this.out("charCodeAt: " + txt.charCodeAt(0)); //65
    this.out("split: " + txt.split("")); //"" splits a string at every char
    this.out("startsWith: " + txt.startsWith("AB"));
    this.out("padStart: " + txt.padStart(28, "x")); //adds xx to beginning 28-26 = 2
    this.out("repeat: " + txt.repeat(2));
  };

  numbers = () => {
    Number(true); // returns 1
    Number(false); // returns 0
    Number("10"); // returns 10
    Number("10.33"); // returns 10.33

    parseInt("10"); // returns 10
    parseInt("10.33"); // returns 10

    parseFloat("10"); // returns 10
    parseFloat("10.33"); // returns 10.33

    //Below returns the number of milliseconds since 1.1.1970.
    Number(new Date("2017-09-30")); // returns 1506729600000
  };
}
