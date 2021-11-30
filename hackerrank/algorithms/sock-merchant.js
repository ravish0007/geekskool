function sockMerchant(n, ar) {
    
    let socks = new Map();
    
    for(let x of ar) {
        
        if(socks.has(x)) socks.set(x, socks.get(x)+1);
        else socks.set(x, 1);
        
    }
    
    console.log(socks);
    let count = 0;
    for(let [key, value] of socks) {
        
        count += Math.floor(value/2);
        
    }
    
    return count;
    
}
