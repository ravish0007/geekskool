
function bonAppetit(bill, k, b) {
    
    let total = bill.reduce((a,b) => a+b);
    let fair = (total - bill[k])/2 ;
    
    if(fair == b) console.log('Bon Appetit');
    else console.log(b - fair);

}
