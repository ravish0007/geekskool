function diagonalDifference(arr) {
    
    let sum1 = 0
    let sum2 = 0
    
    for(let i = 0, j = 0; i < arr.length; i++, j++)  sum1 += arr[i][j];
    for(let i = arr.length-1, j = 0; i > -1; i--, j++) sum2 += arr[i][j];
    
    
    return Math.abs(sum1 - sum2);

}
