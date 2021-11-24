
function equalStacks(h1, h2, h3) {
    
    
    h1.reverse();
    h2.reverse();
    h3.reverse();
    
    const sum = (arr)=>{
       return arr.reduce((a, b) => a+b);
    }
   
   let sum1 = sum(h1);
   let sum2 = sum(h2);
   let sum3 = sum(h3);
    
   while(true) {
        
       let min = Math.min(sum1,sum2,sum3); 
        
       if(sum1>min) sum1 -= h1.pop();
       if(sum2>min) sum2 -= h2.pop();
       if(sum3>min) sum3 -= h3.pop();
       
       if(sum1 == sum2 && sum2 == sum3){
          return min; 
       }
   } 

}
