function insertNodeAtTail(head, data) {

    let node = new SinglyLinkedListNode(data);
    let cur = head;
    
    if(!head) return node;
    
    while(cur.next){
        cur = cur.next;
    }
    
    cur.next = node;
    
    return head;
 
}
