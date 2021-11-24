function reverseArray(a) {
    
    let i = 0;
    let j = a.length - 1;
    
    while(i < j) {
        
        let temp = a[i];
        a[i] = a[j];
        a[j] = temp;
         
        i++;
        j--;
    }
    
    return a;

}
