function compareTriplets(a, b) {
    
    let alice = 0;
    let bob = 0;
    
    for(let i = 0 ; i < 3; i++) {
        if (a[i] > b[i]) {
            alice++;
        } else if( b[i] > a[i] ) {
            bob++;
        }
    }
    
    return [alice, bob];
        
}
