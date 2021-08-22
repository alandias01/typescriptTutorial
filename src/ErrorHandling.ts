export class ErrorHandling {
  constructor() {
    //this.strCheck();
    //this.strCheck(null);
    //this.strCheck("");
    //this.strToInt("r");
    //this.strTest("");

    // const ee = new EventCustom();
    // ee.onComplete = () => console.log("done");
    // ee.start();
    const e2 = new EventFromEventTarget();
    e2.addEventListener("complete", () => console.log("Event emitted"));
    e2.start1();
    e2.addEventListener("finish", (e: CustomEvent) => console.log(e.detail));
    e2.start2();
  }

  //Truthiness narrowing
  //0, NaN, "", null, and undefined coerce to false when put inside if statement
  private strTest1(str: string) {
    //checks str is not empty or whitespace, null, or undefined
    if (str && str.trim()) {
      console.log(str);
    }
  }
  private strTest2(str: string | string[]) {
    //checks str is an array
    if (str && str === "object") {
      console.log();
    }
  }

  //undefined is when a variable is not assigned a value
  //null is when a value is unavailable
  public strCheck(str: string | undefined | null) {
    if (str === undefined) console.log("undef");

    //Standard equality checks for null or undefined.  Standard equality check for null is preferred
    if (str == null) console.log("undef or null");
    if (str == undefined) console.log("undef or null");

    //checks if string
    if (str != null) console.log("str");

    //benefit of typeof doesn't throw error if str isn't defined
    if (typeof str === "undefined") console.log("undef or null");

    if (str) console.log(str);
    else console.log("no good");

    //? after variable is optional chaining.  Checks if str exists.  If it doesn't, returns undefined
    console.log(str?.charAt(2));

    console.log(str ?? "null coalesce");
  }

  private typeguard01(str: string | string[] | null) {
    if (typeof str === "object") {
      //str  str here is now string[] | null since null is an object
    }
  }

  //good function
  private strToInt(str: string): { valid: boolean; num?: number } {
    const num = parseInt(str);
    if (isNaN(num)) return { valid: false };
    else return { valid: true, num };
  }
}

/* Events Put in another file
If you want notification from a method, use a callback
If you want notification from a class, create a method that people can assign a method to
If you want multiple listeners, extend EventTarget for FrontEnd and EventEmitter for Node

*/

export class EventCustom {
  public onComplete?: () => void;

  public start = async () => {
    await new Promise((res, rej) => setTimeout(res, 2000));
    this.onComplete && this.onComplete();
  };
}

class EventFromEventTarget extends EventTarget {
  constructor() {
    super();
  }

  private _complete: Event = new Event("complete");

  public start1() {
    setTimeout(() => this.dispatchEvent(this._complete), 5000);
  }

  public start2() {
    setTimeout(() => {
      this.dispatchEvent(
        new CustomEvent<{ employee: string }>("finish", {
          detail: { employee: "Alan" },
        })
      );
    }, 3000);
  }
}
