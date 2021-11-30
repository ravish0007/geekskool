function kangaroo(x1, v1, x2, v2) {
    
    if(v2 >= v1)  return 'NO';
    
    
    let n = (x2 - x1)/(v1 - v2);
    
    if (Number.isInteger(n)) return 'YES';
    else return 'NO';
    
    

}
