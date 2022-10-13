/** @format */

// Handling Asyn await with a wrapper function

//promise 1
const isCow = function (name) {
  return new Promise((resolve, reject) => {
    if (name === "cow") {
      return resolve({ sucess: true, message: "yes is cow" });
    } else {
      return reject({ message: `sorry ${name} is not cow` });
    }
  });
};

//promise 2
const isMonkey = function (name) {
  return new Promise((resolve, reject) => {
    if (name === "monkey") {
      return resolve({ sucess: true, message: "yes is monkey" });
    } else {
      return reject({ message: `sorry ${name} is not monkey` });
    }
  });
};

//bad error handling - is defficult to handle each sync error this this approach
const getCowAndMonkeyMsg = async () => {
  try {
    const getIsCowMessage = await isCow("co");
    const getIsMonkeyMessage = await isMonkey("monke");
  } catch (error) {
    console.log(error);
  }
};

// getCowAndMonkeyMsg();

//asyn error handler
const sureThing = (promise) => {
  return promise
    .then((result) => ({
      ok: true,
      result,
    }))
    .catch((error) =>
      Promise.resolve({
        ok: false,
        error,
      })
    );
};

/**
    using our defined asyc handler wrapper
      test it by :
       1. replace the "coooow" to "cow" and run the script.
         do same for the next async call .
       2. replace the "monkeyy" to "monkey" and run the script.



*/
const getCowAndMonkeyMsg2 = async () => {
  let { ok, error, result } = await sureThing(isCow("coooow"));
  error &&
    //   "if error handle it here and continue with your next async request , happy coding "
    console.log(error);

  let getIsMonkeyMessage = await sureThing(isMonkey("monkeyy"));

  getIsMonkeyMessage.error &&
    "handle this next async error here is any and continue with your code, happy coding";
  console.log(getIsMonkeyMessage.error);

  return console.log("our asyn actions have no error");
};
getCowAndMonkeyMsg2();
