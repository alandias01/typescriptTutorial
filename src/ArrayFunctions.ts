export class ArrayFunctions {
  constructor() {
    this.basic();
  }

  out = (x: any) => x && console.log(x);

  basic = () => {
    const arr = ["Alan", "Sybil", "Mike", "Ophelia"];
    arr.push("new element"); //adds to end
    arr.pop(); //removes from end
    arr.unshift("shift element"); //adds element to beginning and shifts everything right
    arr.shift(); //removes from beginning and shifts everything left.  Returns item
    //delete arr[0]; //Changes the first element to undefined.  This leaves holes, consider pop or shift

    //does not change the existing arrays. It returns a new array.
    var arr1 = ["Cecilie", "Lone"];
    var arr2 = ["Emil", "Tobias", "Linus"];
    var arr3 = ["Robin", "Morgan"];
    var myChildren = arr1.concat(arr2, arr3);

    this.out("toString: " + arr.toString());

    arr.forEach((x) => this.out(x + ":" + x.length));

    var arrFiltered = arr.filter((x) => x.length < 5);
    this.out("filter: " + arrFiltered);
    this.out("find: " + arr.find((x) => x.length == 4));
    this.out("every: Length<8: " + arr.every((x) => x.length < 8));
    this.out("join: Create string from array with delimiter: " + arr.join("-"));
    this.out("map: " + arr.map((x) => x + "X"));

    //some tests whether at least one element in the array passes the test.  Returns bool
    this.out("some: " + arr.some((x) => x.length == 5));
    this.out("indexOf: " + arr.indexOf("Mike"));

    //slice(begin, end) return shallow copy of elements starting from begin
    this.out("slice: begin=1: " + arr.slice(1));

    //splice modifies original array
    //splice(begin, number of items to delete, items to add comma separated)
    //If you set delete to 0, then item only gets added
    //removes 2nd item Sybil and adds Spike
    let tmp = ["Alan", "Sybil", "Mike", "Ophelia"];
    this.out(
      "splice: value returned from splice: " + tmp.splice(1, 1, "Spike")
    );
    this.out("splice: array modified by splice: " + tmp);

    this.out("original: " + arr);
  };
}
