function utopianTree(n) {
    
    let height = 1;
    for(let i = 1; i <= n ; i++) {
        
        if( i%2 == 0) height++;
        else height *= 2;
    }
    
    return height;
}
