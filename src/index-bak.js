'use strict'
let sudoku = (puzzle) => {
  let innerfunc = (input) => {
    let banlist = {}
    //生成每行每列的banlist
    input.forEach((ary, index) => {
      banlist['r' + index] = banlist['r' + index] || []
      ary.forEach((i, aIndex) => {
        banlist['c' + aIndex] = banlist['c' + aIndex] || []
        if (i !== 0 && !Array.isArray(i)) {
          banlist['c' + aIndex] = banlist['c' + aIndex] || 0
          banlist['c' + aIndex]++
          banlist['r' + index] = banlist['r' + index] || 0
          banlist['r' + index]++
          banlist['r' + index].push(i)
          banlist['c' + aIndex].push(i)
        }
      })
    })
    let refreshPossibleValue = (row, col, val) => {
      input[row].some((ary, index) => {
        if (Array.isArray(ary)) {
          let pos = input[row][index].join('').indexOf(val)
          pos > -1 && input[row][index].splice(pos, 1)
        }
      })
      input.some((ary, index) => {
        if (Array.isArray(ary[col])) {
          let pos = input[index][col].join('').indexOf(val)
          pos > -1 && input[index][col].splice(pos, 1)
        }
      })
    }
    //生成可能值范围
    input.forEach((ary, index) => {
      ary.some((i, aIndex) => {
        if (i === 0) {
          ary[aIndex] = [1, 2, 3, 4, 5, 6, 7, 8, 9].difference(banlist["r" + index], banlist["c" + aIndex])
          if (ary[aIndex].length === 1) {
            ary[aIndex] = +ary[aIndex][0]
            refreshPossibleValue(index, aIndex, ary[aIndex])
          }
        }
        //需要与列里的所有数组作比较
        if (Array.isArray(i)) {
          let level2Banlist = []
          for (var sIndex = 0; sIndex <= 8; sIndex++) {
            sIndex !== aIndex && !Array.isArray(ary[sIndex]) ? level2Banlist.push(ary[sIndex]) : void(0)
            sIndex !== index && !Array.isArray(input[sIndex][aIndex]) ? level2Banlist.push(input[sIndex][aIndex]) : void(0)
          }
          var temp = [].difference.apply(i.slice(), level2Banlist)
          if (temp.length === 1) {
            ary[aIndex] = +temp[0]
            refreshPossibleValue(index, aIndex, ary[aIndex])
          } else {
            ary[aIndex] = temp
          }
        }
      })
    })
    let confirm = () => {}
    input.getMinUnDetemingCol()
    return input
  }

  function loop(input) {
    var output = innerfunc(input);
    if (output.haveArrayInRow()) {
      return loop(output)
    } else {
      return output
    }
  }
  console.log(loop(puzzle))
}
Array.prototype.printMatrix = function() {
  this.map(ary => {
    let result = ary.map(i => {
      if (!Array.isArray(i)) {
        return i
      } else {
        return 0
      }
    })
    console.log(result)
  })
}
Array.prototype.haveArrayInRow = function() {
  var args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
  if (this && this.length > 0) {
    return this.some((item, index) => {
      return item.some(a => {
        if (Array.isArray(a)) {
          return true
        }
        return false
      })
    })
  }
}
Array.prototype.difference = function() {
  //console.log("array:" + this)
  var args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));

  this.some((i, index) => {
    return args.forEach(ary => {
      if (ary.indexOf && ary.indexOf(i) > -1) {
        if (!Array.isArray(this[index])) {
          this[index] = ""
        }
        return true;
      } else if (ary && ary === Number(i)) {
        this[index] = ""
        return true
      }
      return false
    })
    //console.log(this.join("").split(""))
  })
  return this.join("").split("")
}
Array.prototype.getRow = function(row) {
  return this[row]
}
Array.prototype.getCol = function(col) {
  var args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
  var result = [];
  this.map((ary, index) => {
    if (Array.isArray(ary)) {
      result.push(ary[col])
    }
  })
  return result
}
Array.prototype.getMinUnDetemingRow = function() {
  return this.reduce((m, n) => {
    let mL = 0
    let nL = 0
    m.map(i => {
      if (Array.isArray(i)) {
        mL++
      }
    })
    n.map(i => {
      if (Array.isArray(i)) {
        nL++
      }
    })
    if (mL >= nL) {
      return n
    } else {
      return m
    }
  }, this[0])
}
Array.prototype.getMinUnDetemingCol = function() {
  var self = this
  var col = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => {
    return self.getCol(i)
  })
  var result = 0
  return col.reduce((m, n) => {
    let mL = 0
    let nL = 0
    m.map(i => {
      if (Array.isArray(i)) {
        mL++
      }
    })
    n.map(i => {
      if (Array.isArray(i)) {
        nL++
      }
    })
    if (mL >= nL) {
      return n
    } else {
      return m
    }
  })
}
var puzzle = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

var solution = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9]
];
var mid = [
  [5, 3, ["1", "2", "4", "6", "9"],
    ["2", "6", "9"], 7, ["1", "2", "4", "6", "8"],
    ["1", "4", "6", "8", "9"],
    ["1", "2", "4", "9"],
    ["2", "4", "8"]
  ],
  [6, ["2", "4", "7", "8"],
    ["2", "3", "4", "7"], 1, 9, 5, ["3", "4", "7", "8"],
    ["2", "3", "4"],
    ["2", "4", "7", "8"]
  ],
  [
    ["1", "2", "3"], 9, 8, ["2", "3", "5", "7"],
    ["3", "4", "5"],
    ["1", "2", "4", "7"],
    ["1", "3", "4", "5", "7"], 6, ["2", "4", "7"]
  ],
  [8, ["1", "2", "4", "5", "7"],
    ["1", "2", "4", "5", "7", "9"],
    ["2", "5", "7", "9"], 6, ["1", "2", "4", "7"],
    ["1", "4", "5", "7", "9"],
    ["1", "2", "4", "5", "9"], 3
  ],
  [4, ["2", "5", "7"],
    ["2", "5", "6", "7", "9"], 8, ["5"], 3, ["5", "6", "7", "9"],
    ["2", "5", "9"], 1
  ],
  [7, ["1", "4", "5", "8"],
    ["1", "3", "4", "5", "9"],
    ["3", "5", "9"], 2, ["1", "4", "8"],
    ["1", "3", "4", "5", "8", "9"],
    ["1", "3", "4", "5", "9"], 6
  ],
  [
    ["1", "3", "9"], 6, ["1", "3", "4", "5", "7", "9"],
    ["3", "5", "7", "9"],
    ["3", "4", "5"],
    ["1", "4", "7"], 2, 8, ["4", "7"]
  ],
  [
    ["2", "3"],
    ["2", "7", "8"],
    ["2", "3", "6", "7"], 4, 1, 9, ["3", "6", "7", "8"],
    ["2", "3"], 5
  ],
  [
    ["1", "2", "3"],
    ["1", "2", "4", "5"],
    ["1", "2", "3", "4", "5", "6"],
    ["2", "3", "5", "6"], 8, ["1", "2", "4", "6"],
    ["1", "3", "4", "5", "6"], 7, 9
  ]
];
sudoku(puzzle)

