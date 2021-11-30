function getMoneySpent(keyboards, drives, b) {
  
    let max = -1;
    for(let i = 0 ; i < keyboards.length; i++) {
        for(let j = 0; j < drives.length; j++) {
            
            let x = keyboards[i]+drives[j];
            if(x <= b && x > max){
                max = x
            }
            
        }
    }
   
    return max;
    
}
