function countApplesAndOranges(s, t, a, b, apples, oranges) {
    
    let apple = 0;
    for(let x of apples) {
        
        x = a+x;
        if( x >= s &&  x <=t ) apple++;
        
    }
    
    
    let orange = 0;
    for(let x of oranges) {
        
        x = b+x;
        if( x >= s &&  x <=t ) orange++;
        
    }
    
    console.log(apple);
    console.log(orange);

}
