function birthday(s, d, m) {
    
    let sum = 0;
    let count = 0;
    
    for(let i = 0; i < m; i++) sum += s[i];
    
    if (sum == d) count++;
    
    let j = m;
    let i = 0;
    
    while( j < s.length) {
        
        sum += s[j];
        sum -= s[i];
        
        if (sum == d) count++;
        
        i++;
        j++;
        
    }
    
    return count;

}

