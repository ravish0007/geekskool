function staircase(n) {
    
    let i = 1;
    
    while( i <= n) {
        
        let temp = [];
        for(let j = 1; j <= (n-i); j++) temp.push(' ');
        
        for(let j = 1; j <=i ; j++) temp.push('#');
        
        console.log(temp.join(''));
        
        i++;
        
    }
    

}
