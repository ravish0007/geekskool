function plusMinus(arr) {

    let positive = 0;
    let negative = 0;
    let zero = 0;
    
    
    for(let element of arr) {
        
        if(element > 0) positive++;
        else if(element < 0) negative++;
        else zero++;
        
    }
    
    console.log(positive/arr.length);
    console.log(negative/arr.length);
    console.log(zero/arr.length);


}
