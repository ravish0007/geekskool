function insertNodeAtPosition(llist, data, position) {
    let current = llist;
    let current_position = 1;
    
    while(current && current_position < position) {
        current_position += 1
        current = current.next;
    }
    
    let node = new SinglyLinkedListNode(data);
    
    let temp = current.next;
    current.next = node;
    node.next = temp;
    
    return llist;
}
