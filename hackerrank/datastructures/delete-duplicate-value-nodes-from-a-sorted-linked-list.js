function removeDuplicates(llist) {
   
    let cur = new SinglyLinkedListNode(null);
    cur.next = llist
    while (cur.next) {
        if (cur.data == cur.next.data) cur.next = cur.next.next
        else cur = cur.next;
    }
    return llist;
    
}
