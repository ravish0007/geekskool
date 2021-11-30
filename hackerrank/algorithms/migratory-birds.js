function migratoryBirds(arr) {
    
    
    let store = new Map();
    for(let x of arr) {
        
        if (store.has(x)) store.set(x, store.get(x)+1);
        else store.set(x, 1);
        
    }
        
    let max = -Infinity;
    
    for(let [key, value] of store) {
        
        // console.log(max, key, value);
        max = Math.max(max, value);
        console.log('here');
        
    }
    
    let ans = [];
    
    for(let [key, value] of store) {
        
        if(max == value) ans.push(key);
        
        
    }
    
    ans.sort();
    return ans[0];
    

}
