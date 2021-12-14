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

_.reverse = (arr) => {
  for (let i = 0; i < Math.floor(arr.length / 2); i++) {
    [arr[i], arr[arr.length - 1 - i]] = [arr[arr.length - 1 - i], arr[i]];
  }
  return arr;
};

_.flattenDeep = (arr) => {
  let flattenedArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].constructor === Array) {
      flattenedArr.push(..._.flattenDeep(arr[i]));
    } else {
      flattenedArr.push(arr[i]);
    }
  }
  return flattenedArr;
};

// not recursive but... it works lmao
_.flattenDepth = (arr, depth) => {
  const length = Array.isArray(arr) ? arr.length : 0;
  if (!length) return [];
  depth = depth === undefined ? 1 : +depth;
  let output = [...arr];

  flattenOnce = (arr) => {
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

  do {
    depth--;
    output = flattenOnce(output);
  } while (depth > 0);
  return output;
};

// gets the most nested array (arguments: arr, depth)
// let temp = [...arr];
//   for (let i = 0; i < temp.length; i++) {
//     if (Array.isArray(temp[i])) temp = [..._.flattenDepth(temp[i], depth - 1)];
//   }
//   return temp;

module.exports = _;
