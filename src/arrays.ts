export class Arrays {
  constructor() {
    this.basic();
  }

  out = (x: any) => x && console.log(x);

  basic = () => {
    const arr = ["Alan", "Sybil", "Mike", "Ophelia"];

    arr.forEach((x) => this.out(x + ":" + x.length));

    var arrFiltered = arr.filter((x) => x.length < 5);
    this.out(arrFiltered);

    var arrFind = arr.find((x) => x.length == 4);
    this.out(arrFind);

    var arrEvery = arr.every((x) => x.length < 8);
    this.out("Length<8: " + arrEvery);

    var arrEvery = arr.every((x) => x.length < 5);
    this.out("Length<5: " + arrEvery);

    this.out("");
    this.out("Arr Join creates a string from array with a delimiter");
    this.out(arr.join("-"));

    this.out("");
    this.out(
      "Arr Map runs a function on each arr item and returns a new array"
    );
    var arrMap = arr.map((x) => x + "X");
    this.out(arrMap);

    this.out("");
    this.out(
      "Arr Some checks if at least 1 element in the array passes the test"
    );

    this.out("Length = 5: " + arr.some((x) => x.length == 5));
    this.out("Length = 6: " + arr.some((x) => x.length == 6));

    this.out("");
    this.out("Arr to remove item Mike");
    var arrRemove = arr.slice();

    var index = arrRemove.indexOf("Mike");
    if (index > -1) {
      arrRemove.splice(index, 1);
    }
    this.out(arrRemove);

    this.out("");
    this.out("We can add items between 2 items");
    arrRemove.splice(1, 0, "Ben");
    this.out(arrRemove);

    this.out("");
    this.out("We can replace 2 items for 1 item");
    arrRemove.splice(0, 2, "Jesse");
    this.out(arrRemove);

    this.out("");
    this.out("Arr ");
  };
}
