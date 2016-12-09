'use strict'

export default class Sudoku {
  constructor() {
  }
  solve(puzzle) {
    let self=this
    let innerfunc = (input) => {
      let banlist = {}
      let unknow
      //生成每项的value
      //value不确定的，可以是取值范围的数组
      do {
        unknow = self._printMatrix(input)
        self.generateMatrixPossibleValue(input)
      } while (unknow !== 0)
      return input
    }

    return innerfunc(puzzle)
  }

  generateMatrixPossibleValue (matrix) {
    let self=this
    if (Array.isArray(matrix) && matrix.length === 9 && matrix[0].length === 9) {
      matrix.some((row, index) => {
        row.some((item, _index) => {
          if (item === 0 || Array.isArray(item)) {
            item = self._difference([1, 2, 3, 4, 5, 6, 7, 8, 9],self._getRow(matrix,index), self._getCol(matrix,_index), self._get33Matrix(matrix,index, _index))
            matrix[index][_index] = item.length === 1 ? Number(item[0]) : item
          }
        })
      })
    } else {
      return
    }
  }
  _difference(target) {
    let args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args=args.slice(1)
    target.some((i, index) => {
      return args.forEach(ary => {
        if (ary.indexOf && ary.indexOf(i) > -1) {
          if (!Array.isArray(target[index])) {
            target[index] = ""
          }
          return true;
        } else if (ary && ary === Number(i)) {
          target[index] = ""
          return true
        }
        return false
      })
    })
    return this._trim(target)
  }
  _trim(ary) {
    let re = []
    ary.map((i, index) => {
      if (i && i != "") {} else {
        re.push(index)
      }
    })
    let count = 0
    re.some((i, index) => {
      ary.splice(i - count, 1)
      count++
    })
    return ary
  }
  _get33Matrix(matrix,row,col){
    let ary = []
    let temp
    let genVal = (array) => {
      let m = array[0]
      let n = array[1]
      for (var i = row - m; i <= row + 2 - m; i++) {
        for (var k = col - n; k <= col + 2 - n; k++) {
          temp = matrix[i][k];
          if (temp > 0 && temp < 10) {
            ary.push(temp)
          }
          continue
        }
      }
    }
    genVal([row % 3, col % 3])
    return ary

  }
  _printMatrix (matrix) {
    let unknow = 0
    matrix.map(ary => {
      let result = ary.map(i => {
        if (!Array.isArray(i) && i !== 0) {
          return i
        } else {
          unknow++
          return 0
        }
      })
      console.log(result)
    })
    console.log(`unkonw value count : ${unknow}`)
    return unknow
  }

  _getRow (matrix,row) {
    return matrix[row]
  }
  _getCol (matrix,col) {
    var args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args=args.slice(1)
    var result = [];
    matrix.map((ary, index) => {
      if (Array.isArray(ary)) {
        result.push(ary[col])
      }
    })
    return result
  }
}
