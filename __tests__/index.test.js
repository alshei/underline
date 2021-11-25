const _ = require("../src/index");

describe("#identity", () => {
  test("returns the first argument passed", () => {
    expect(_.identity(3)).toBe(3);
    expect(_.identity("hello")).toBe("hello");
    expect(_.identity(true)).toBeTruthy();
  });
  test("doesn't create a copy of arguments, just returns the same reference in memory", () => {
    const testArray = [];
    const testObject = {};
    expect(_.identity(testArray)).toBe(testArray);
    expect(_.identity(testObject)).toBe(testObject);
  });
});

describe("#fromPairs", () => {
  test("returns a new object", () => {
    expect(_.fromPairs([])).toEqual({});
  });
  test("returns key-value pairs from an array", () => {
    expect(_.fromPairs(["a", 1])).toEqual({ a: 1 });
    expect(_.fromPairs(["a", 1], ["b", 2])).toEqual({ a: 1, b: 2 });
    expect(_.fromPairs(["a", 1], ["b", 2], ["c", 3])).toEqual({
      a: 1,
      b: 2,
      c: 3,
    });
  });
  test("edge cases", () => {
    expect(_.fromPairs(["a", 1], "alina smells", true, ["b", 2])).toEqual({
      a: 1,
      b: 2,
    });
    expect(_.fromPairs(["a", 1, "b", 2, "c", 3], ["d", 4, "e", 5])).toEqual({
      a: 1,
      d: 4,
    });
    expect(_.fromPairs(true)).toEqual({});
  });
});

describe("#times", () => {
  test("returns a new array", () => {
    expect(_.times(0)).toEqual([]);
  });
  test("return argument n number of times in an array", () => {
    let input = _.times(3, "alina");
    let output = ["alina", "alina", "alina"];
    expect(input).toEqual(output);
  });
  test("returns iteratee n number of times in an array", () => {
    /*
      Mock functions can be used to make sure that our
      iteratee / argument function has been called (n) times.
    */
    const inputFunc = jest.fn((n) => {
      return n * 2;
    });
    let input = _.times(5, inputFunc);
    let output = [0, 2, 4, 6, 8];
    expect(input).toEqual(output);
    expect(_.times(3, String)).toEqual(["0", "1", "2"]);
    expect(inputFunc).toBeCalledTimes(5);
  });
  test("returns n number of undefined if iteratee argument is not set", () => {
    let input = _.times(3);
    let output = [undefined, undefined, undefined];
    expect(input).toEqual(output);
  });
});

describe("#invert", () => {
  test("returns a new object", () => {
    expect(_.invert({})).toEqual({});
  });
  test("return inverted keys and values of object in an object; duplicate values are overwritten by subsequent values", () => {
    expect(_.invert({ a: 1, b: 2, c: 1 })).toEqual({ 1: "c", 2: "b" });
  });
  test("returns a new object, not a clone", () => {
    const input = { a: 1, b: 2, c: 1 };
    const output = _.invert(input);
    expect(output).not.toBe(input);
  });
});

describe("#map", () => {
  test("returns a new array", () => {
    expect(_.map([], (value, index) => value)).toEqual([]);
  });
  test("returns a new array of values returned by the callback", () => {
    let callbackFunc = jest.fn((value, index, array) => {
      return value;
    });
    const input = [2, 4, 6];
    const output = _.map(input, callbackFunc);
    expect(output).not.toBe(input);
    expect(_.map(input, callbackFunc)).toEqual([2, 4, 6]);
    callbackFunc = jest.fn((value, index, array) => {
      return value * index;
    });
    expect(_.map(input, callbackFunc)).toEqual([0, 4, 12]);
    expect(callbackFunc).toBeCalledTimes(input.length);
  });
});

describe("#filter", () => {
  test("returns a new array", () => {
    expect(_.filter([], (value, index) => value)).toEqual([]);
  });
  test("returns a new array of values filtered by the callback", () => {
    let callbackFunc = jest.fn((value, index, array) => {
      return value;
    });
    let input = [2, 4, 6];
    let output = _.filter(input, callbackFunc);
    expect(output).not.toBe(input);
    expect(input).toEqual(output);
    callbackFunc = jest.fn((value, index, array) => {
      return value % 2 === 0;
    });
    input = [1, 2, 3, 4, 5, 6, 7, 8];
    output = _.filter(input, callbackFunc);
    expect(callbackFunc).toBeCalledTimes(8);
    expect(output).toEqual([2, 4, 6, 8]);
  });
});

describe("#zip", () => {
  test("returns a nested array from pairs of arrays", () => {
    expect(_.zip(["a", "b"], [1, 2], [true, false])).toEqual([
      ["a", 1, true],
      ["b", 2, false],
    ]);
  });
});

describe("#fill", () => {
  test("returns same array", () => {
    const input = [1, 2, 3, 4];
    const output = _.fill(input, "Alina is cute");
    expect(output).toBe(input);
  });
  test("returns array with values replaced with the argument", () => {
    const input = [1, 2, 3, 4];
    const output = _.fill(input, "a");
    expect(output).toEqual(["a", "a", "a", "a"]);
    expect(output).toBe(input);
  });
  test("returns array with values replaced with argument at start and end index", () => {
    const input = [1, 2, 3, 4, 5];
    const output = _.fill(input, "a", 1, 4);
    expect(output).toEqual([1, "a", "a", "a", 5]);
    expect(output).toBe(input);
  });
});

describe("#find", () => {
  test("returns a value", () => {
    expect(_.find([1], (value) => value)).toEqual(1);
  });
  test("returns the first element that is true for the callback", () => {
    const callbackFunc = jest.fn((value) => {
      return value % 2 === 0;
    });
    const input = [1, 2, 3, 4, 5, 6];
    const output = _.find(input, callbackFunc);
    expect(output).toBe(2);
    expect(callbackFunc).toBeCalledTimes(2);
  });
});
