function dynamicArray(n, queries) {

    let arr = [];
    for(let i = 0; i < n; i++){  
        arr.push([]);
    }
    
    let num, x, y;
    
    let lastAnswer = 0;
    let ansArray = []
    
    for(let query of queries) {
        
        [num, x, y] = query;

        let idx = (x ^ lastAnswer)%n;
        
        if(num == 1) {
            
            arr[idx].push(y);
            
        } else if(num == 2) {
            
            lastAnswer = arr[idx][y % arr[idx].length];  
            ansArray.push(lastAnswer);
        }
        
    }
    return ansArray;
    
}
