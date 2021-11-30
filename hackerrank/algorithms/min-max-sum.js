function miniMaxSum(arr) {
    
    arr.sort()
    
    let sum_indices = (x,y) => arr.slice(x,y).reduce((a,b) => a+b);
    
    console.log(sum_indices(0, 4), sum_indices(1, 5));

}
