function sortedInsert(llist, data) {
    
    let node = new DoublyLinkedListNode(data);
    
    if(!llist) {
        return node;
    }
    
    if(data < llist.data) {
        node.next = llist;
        llist.prev = node;
        return node;
    }
    
    let cur = llist;
    while( cur.next && cur.data < data ) {
        cur = cur.next;
    }
    
    if(cur.data < data) {
        cur.next = node;
        node.prev = cur;
    }
    else {
            
        cur.prev.next = node;
        node.prev = cur.prev;    
        node.next = cur;
        cur.prev = node;
    }
    

    return llist;

}
