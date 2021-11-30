function divisibleSumPairs(n, k, arr) {
    
    let count = 0;
    
    for(let j = 1; j < arr.length; j++) {
        for(let i = 0; i < j; i++) {
            if((arr[i]+arr[j])%k == 0) count++;
        }
    }
    
    return count;
    
}
