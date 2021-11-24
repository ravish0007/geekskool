function getMax(operations) {
 
    let stack = [];
    let max = 0;
    let ans = [];

    let opcode, data;
    
    for(let op of operations) {
        
        [opcode, data] = op.split(' ');

        if ( opcode == '2') {
            stack.pop();
            max = stack.length ? stack[stack.length-1]:0 ;
        }
        
        else if(opcode == '1') {
            max = Math.max(Number(data), max);
            stack.push(max);
        } 
        else if(opcode == '3') ans.push(stack[stack.length-1])
    }
    return ans;
}
