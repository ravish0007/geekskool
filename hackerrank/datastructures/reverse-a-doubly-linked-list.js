function reverse(llist) {

    let cur = llist;
    let prev;
    
    while(cur) {
        
        let temp = cur.next;
        cur.next = cur.prev;
        cur.prev = temp;
        prev = cur;
        cur = temp;

    }
    
    return prev ;
}
