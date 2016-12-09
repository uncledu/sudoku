'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
class Sudoku {
  constructor() {}
  solve(puzzle) {
    let innerfunc = input => {
      let banlist = {};
      let unknow;
      //生成每项的value
      //value不确定的，可以是取值范围的数组
      let generateMatrixPossibleValue = matrix => {
        if (Array.isArray(matrix) && matrix.length === 9 && matrix[0].length === 9) {
          matrix.some((row, index) => {
            row.some((item, _index) => {
              if (item === 0 || Array.isArray(item)) {
                item = [1, 2, 3, 4, 5, 6, 7, 8, 9].difference(matrix.getRow(index), matrix.getCol(_index), matrix.get33Matrix(index, _index));
                matrix[index][_index] = item.length === 1 ? Number(item[0]) : item;
              }
            });
          });
        } else {
          console.error(`the input matrix ${ matix.printMatrix() } is not valued matrix`);
          return;
        }
      };
      do {
        unknow = input.printMatrix();
        generateMatrixPossibleValue(input);
      } while (unknow !== 0);
      return input;
    };

    function loop(input) {
      var output = innerfunc(input);
      if (output.haveArrayInRow()) {
        return loop(output);
      } else {
        return output;
      }
    }
    return loop(puzzle);
  }
}
exports.default = Sudoku;
Array.prototype.get33Matrix = function (row, col) {
  let ary = [];
  let temp;
  let genVal = array => {
    let m = array[0];
    let n = array[1];
    for (var i = row - m; i <= row + 2 - m; i++) {
      for (var k = col - n; k <= col + 2 - n; k++) {
        temp = this[i][k];
        if (temp > 0 && temp < 10) {
          ary.push(temp);
        }
        continue;
      }
    }
  };
  genVal([row % 3, col % 3]);
  //console.log(ary)
  return ary;
};
Array.prototype.union = function () {
  let result = [];
  result.push(this[0]);
  this.sort().reduce((m, n) => {
    if (m !== n) {
      result.push(n);
    }
    return n;
  }, this[0]);
  return result.slice();
};
Array.prototype.printMatrix = function () {
  let unknow = 0;
  this.map(ary => {
    let result = ary.map(i => {
      if (!Array.isArray(i) && i !== 0) {
        return i;
      } else {
        unknow++;
        return 0;
      }
    });
    console.log(result);
  });
  console.log(`unkonw value count : ${ unknow }`);
  return unknow;
};
Array.prototype.haveArrayInRow = function () {
  var args = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
  if (this && this.length > 0) {
    return this.some((item, index) => {
      return item.some(a => {
        if (Array.isArray(a)) {
          return true;
        }
        return false;
      });
    });
  }
};
Array.prototype.trim = function () {
  let re = [];
  this.map((i, index) => {
    if (i && i != "") {} else {
      re.push(index);
    }
  });
  let count = 0;
  re.some((i, index) => {
    this.splice(i - count, 1);
    count++;
  });
  return this;
};
Array.prototype.difference = function () {
  var args = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);

  this.some((i, index) => {
    return args.forEach(ary => {
      if (ary.indexOf && ary.indexOf(i) > -1) {
        if (!Array.isArray(this[index])) {
          this[index] = "";
        }
        return true;
      } else if (ary && ary === Number(i)) {
        this[index] = "";
        return true;
      }
      return false;
    });
  });
  return this.trim();
};
Array.prototype.getRow = function (row) {
  return this[row];
};
Array.prototype.getCol = function (col) {
  var args = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
  var result = [];
  this.map((ary, index) => {
    if (Array.isArray(ary)) {
      result.push(ary[col]);
    }
  });
  return result;
};
Array.prototype.getMinUnDetemingRow = function () {
  let pos = 0;
  this.reduce((m, n, index) => {
    let mL = 0;
    let nL = 0;
    m.map(i => {
      if (Array.isArray(i)) {
        mL++;
      }
    });
    n.map(i => {
      if (Array.isArray(i)) {
        nL++;
      }
    });
    if (nL !== 0 && mL >= nL || mL === 0) {
      pos = index;
      return n;
    } else {
      return m;
    }
  }, this[0]);
  return pos;
};
Array.prototype.getMinUnDetermin = function () {
  let mL = 0;
  let nL = 0;
  this.getCol(this.getMinUnDetemingCol()).map(i => {
    if (Array.isArray(i)) {
      mL++;
    }
  });
  this.getRow(this.getMinUnDetemingRow()).map(i => {
    if (Array.isArray(i)) {
      nL++;
    }
  });
  if (mL < nL) {
    return 'c' + this.getMinUnDetemingCol();
  } else {
    return 'r' + this.getMinUnDetemingRow();
  }
};
Array.prototype.getMinUnDetemingCol = function () {
  var self = this;
  var col = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => {
    return self.getCol(i);
  });
  let pos = 0;
  col.reduce((m, n, index) => {
    console.log(index);
    let mL = 0;
    let nL = 0;
    m.map(i => {
      if (Array.isArray(i)) {
        mL++;
      }
    });
    n.map(i => {
      if (Array.isArray(i)) {
        nL++;
      }
    });
    if (nL !== 0 && mL >= nL || mL === 0) {
      pos = index;
      return n;
    } else {
      return m;
    }
  });
  return pos;
};