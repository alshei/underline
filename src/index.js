const _ = {};

/*
    Underline is a clone of lodash, I want you to make me functions from the lodash documentation.
    https://lodash.com/docs

    The functions I want you to create are:

    _.identity = () => {}
    _.fromPairs = () => {}
    _.times = () => {}
    _.map = () => {}
    _.filter = () => {}
    _.invert = () => {}
     _.zip = () => {}
    _.fill = () => {}
    _.find = () => {}
    _.shuffle = () => {}
     _.flatten = () => {}

    _.reverse = () => {}
    _.flattenDeep = () => {}
    _.flattenDepth = () => {}

*/

_.identity = (x) => {
  return x;
};

_.fromPairs = (...arr) => {
  let obj = {};
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].constructor === Array) {
      obj[arr[i][0]] = arr[i][1];
    }
  }

  return obj;
};

_.times = (n, iteratee = undefined) => {
  let arr = [];
  for (let i = 0; i < n; i++) {
    if (typeof iteratee === "function") {
      arr.push(iteratee(i));
    } else arr.push(iteratee);
  }
  return arr;
};

_.invert = (obj) => {
  let invertedObj = {};
  for (let key in obj) {
    invertedObj[obj[key]] = key;
  }
  return invertedObj;
};

_.map = (arr, callback = (value, index, collection) => {}) => {
  let mappedArr = [];
  for (let i = 0; i < arr.length; i++) {
    mappedArr.push(callback(arr[i], i, arr));
  }
  return mappedArr;
};

_.filter = (arr, callback = (value, index, collection) => {}) => {
  let filteredArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[i], i, arr)) {
      filteredArr.push(arr[i]);
    }
  }
  return filteredArr;
};

_.zip = (...arr) => {
  let arr1 = [];
  let arr2 = [];
  for (let i = 0; i < arr.length; i++) {
    arr1.push(arr[i][0]);
    arr2.push(arr[i][1]);
  }
  return [arr1, arr2];
};

_.fill = (array, value, startIndex, endIndex) => {
  for (let i = 0; i < array.length; i++) {
    if (startIndex !== undefined && endIndex !== undefined) {
      if (i >= startIndex && i < endIndex) {
        array[i] = value;
      }
    } else {
      array[i] = value;
    }
  }
  return array;
};

_.find = (array, callback = (value) => {}) => {
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i])) return array[i];
  }
};

_.shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let rand = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[rand]] = [arr[rand], arr[i]];
  }
  return arr;
};

_.flatten = (arr) => {
  let flattenedArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].constructor !== Array) {
      flattenedArr.push(arr[i]);
    } else {
      for (let j = 0; j < arr[i].length; j++) {
        flattenedArr.push(arr[i][j]);
      }
    }
  }
  return flattenedArr;
};

_.reverse = () => {};

module.exports = _;
