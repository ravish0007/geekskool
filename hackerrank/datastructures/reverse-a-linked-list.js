function reverse(llist) {
    
    let current = llist;
    let previous = null;
    let temp = null; 

    
    while(current){
        temp = current.next;
        current.next = previous;
        previous = current;
        current = temp;
    }
    
    return previous;
    

}
