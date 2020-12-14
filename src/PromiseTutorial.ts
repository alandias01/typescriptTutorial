interface Person {
  name: string;
  age: number;
}

export class PromiseTutorial {
  constructor() {
    this.start();
  }

  Alan: Person = { name: "Alan Dias", age: 30 };

  async start() {
    console.log(
      "**************************************** Start Promises Tutorial ****************************************"
    );

    /* A little about promises
    A Promise represents the eventual completion or failure of an asynchronous operation (action) and its resulting value.
    You can attach event handlers to an asynchronous actions eventual success or failure
    Instead of immediately returning a value like a synchronous operation does, an async operation immediately returns a 
    Promise to provide the value in the future

    A promise comes in different states, pending (initial state), fulfilled (completed with a value), or rejected (with a reason)
    When going from pending to fulfilled or rejected, it is called settled.
    The event handlers for .then and .catch get queued up to run after the promise gets fulfilled or rejected
    If the promise gets fulfilled or rejected before the handlers get queued up, the handlers will still run properly, a guarantee.  
    There is no race condition between an asynchronous operation completing and its handlers being attached.
    
    A promise will start once the constructor is invoked
    Once settled, it cannot be resettled because of the immutability of a settled promise so 
    calling resolve or reject will have no effect

    A promise that doesn't get settled and has no references to it is ok since it gets garbage collected
    Then event handlers will just never get called
     */

    // When you want to await a promise in the beginning of an application,
    // there may be no place to label a function as async
    // It is perfectly fine to use .then().catch()

    // Normal promise
    let promise01 = new Promise((resolve, reject) => {
      resolve("promise01");
    });

    let promise01Value = await promise01;
    promise01.then((value) => console.log(value)); //promise01
    console.log(promise01Value); //promise01

    /*EXCEPTION HANDLING
    Below will halt application, you need to handle exception
    let promise02P = new Promise((res, rej) => rej("promise02"));

    Throwing an exception and rejecting are the same thing inside a promise
    new Promise((res, rej) => rej("rejected promise!"));
    new Promise((res, rej) => { throw new Error("thrown promise!"); });
    */

    //A promise inside a try catch will not catch the error unless it is awaited
    //Reasons you don't await:
    // you do async activity that doesn't return a value
    // you don't need to know when it completes
    //Output: Error: Promise021, then displays stack.
    try {
      let promise021 = new Promise((res, rej) => {
        //Do some activity
        rej(new Error("promise021"));
      });

      let promise021Value = await promise021; //You must await or you will have unhandled exception
    } catch (error) {
      console.log(error); //If you don't await above, code doesn't reach here
    }

    //In the case you don't await, use Promise.Catch()
    //Output: Error: Promise022, then displays stack.
    let promise022 = new Promise((res, rej) => rej(new Error("promise022")))
      .then(() => console.log("promise022 success")) //Doesn't execute
      .catch((error) => console.log(error)); // Use this if not awaiting

    // When using an api like setTimeout where you place the operation inside of the promise
    // you can't catch the error because the action runs outside of the promise, a different execution stack
    let promise031 = new Promise((resolve, reject) => {
      // setTimeout(() => {
      //   throw new Error("Promise031 Error inside timeout");
      // }, 2000);
    });
    promise031
      .then(() => console.log("Promise031 .then() success works"))
      .catch((err) => console.log("Promise031 .catch() Problem caught"));

    let promise032 = new Promise((resolve, reject) => {
      // setTimeout(() => {
      //   throw new Error("Promise032 Error inside timeout");
      // }, 2000);
    });
    promise032
      .then(() => console.log("Promise032 .then() success works"))
      .catch((err) => console.log("Promise032 .catch() Problem caught"));

    // A promise must resolve or reject or it will await forever
    // If you attach a .then() or .catch(), they just won't run
    // To solve, always resolve or reject
    // You can also set a timer and put into Promise.Race()
    let promise04 = new Promise((resolve, reject) => {
      //resolve(undefined);
      //reject();
    });

    promise04
      .then((val) => console.log("promise04 reached")) //Won't get hit
      .catch((err) => console.log("promise04 err: " + err)); //Won't get hit

    let promiseReject = (timeout: number) =>
      new Promise((res, rej) =>
        setTimeout(() => rej(new Error("Promise Timeout 3000ms")), timeout)
      );

    Promise.race([promise04, promiseReject(3000)])
      .then(() => console.log("promise04 race .then() reached")) //Won't get hit
      .catch((err) => console.log(err)); //This gets hit

    //Promise.all([]);
    //Promise.allSettled([]);
    //Promise.any([]);
    // Promise chaining

    let func01aValue = await this.func01a();
    console.log(func01aValue);

    let func01bValue = await this.func01b();
    console.log(func01bValue);

    // func01c doesnt have a return statement so it returns a resolved promise with
    // a return value of undefined
    let func01cValue = await this.func01c();
    console.log("func01c value: ");
    console.log(func01cValue);

    let func01dValue = await this.func01d();
    console.log("func01d value: ");
    console.log(func01dValue);

    //this.func021(); //This halts application so you need to catch
    //this.func021().catch((err) => console.log(err));
    //Try Catch only works if you await
    try {
      await this.func021();
      //this.func021();  //Can't do this
    } catch (error) {
      console.log(error);
    }

    this.func022().catch((err) => console.log(err));

    console.log(
      "**************************************** END Promises Tutorial ******************************************"
    );
  } /************************** END OF async start() **************************/

  //When you label a function as async and you don't return a promise explicitly,
  //javascript will implicitly wrap the return value into a resolved promise
  //The point is to use await to get the return value
  async func01a() {
    //await Promise.resolve(1)
    return "func01a";
    //return Promise.resolve("func01");
  }

  //You return the promise.  You don't have to label this as async
  async func01b() {
    let prom = new Promise((resolve, reject) => {
      resolve("func01b");
    });
    return prom;
  }

  //Since you don't return the created Promise, this returns a Promise<void> which resolves to undefined
  //You don't have access to the inside promise so you won't get the resolved value
  //You won't know insidePromise is done unless you await inside the function
  //Without await
  async func01c() {
    console.log("inside func01c");
    let insidePromise = new Promise((resolve, reject) => {
      resolve("func01c");
    });
  }

  //With await
  async func01d() {
    console.log("inside func01d");
    let insidePromise = new Promise((resolve, reject) => {
      resolve("inside func01d resolve value");
    });
    const result = await insidePromise;
    console.log(result);
  }

  //Exceptions inside async functions
  async func021() {
    throw new Error("func021");
  }

  async func022() {
    try {
      throw new Error("func022");
    } catch (error) {
      throw error;
    }
  }

  async func0_todo03() {
    setTimeout(() => {
      throw new Error("func05");
    }, 2000);
  }

  async func0_todo04() {
    try {
      setTimeout(() => {
        throw new Error("func06");
      }, 2000);
    } catch (error) {}
  }

  async func0_todo05() {
    setTimeout(() => {
      try {
        throw new Error("func07");
      } catch (error) {}
    }, 2000);
  }

  //If a function can return a promise, always return a Promise
  //Otherwise you will have to test it with if (typeof funco8 === 'object')
  func0_todo06(tester: boolean) {
    if (tester) {
      return new Promise((res, rej) => {
        res(42);
      });
    } else {
      //return 42;  //Don't do this
      return Promise.resolve(42);
    }
  }
} /************************** END OF CLASS **************************/

//Suggested Promise Timeout
const promiseWithTimeout = <T>(
  timeoutMs: number,
  promise: () => Promise<T>,
  failureMessage?: string
) => {
  let timeoutHandle: NodeJS.Timeout;
  const timeoutPromise = new Promise<never>((resolve, reject) => {
    timeoutHandle = setTimeout(
      () => reject(new Error(failureMessage)),
      timeoutMs
    );
  });

  return Promise.race([promise(), timeoutPromise]).then((result) => {
    clearTimeout(timeoutHandle);
    return result;
  });
};
