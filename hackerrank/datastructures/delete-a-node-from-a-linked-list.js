function deleteNode(llist, position) {
       
    let prev, cur;
    prev = cur = llist;
    
    if(position == 0) return llist.next;
    
    for(let i = 0; i < position ; i++) {
        prev = cur;
        cur = cur.next;
    }
    
    prev.next = cur.next;
    return llist;

}
