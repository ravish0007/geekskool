function mergeLists(head1, head2) {

    let head3 = new SinglyLinkedListNode();
    let cur = head3;
    
    while(head1 && head2) {
        
        if (head1.data < head2.data) {
            cur.next = new SinglyLinkedListNode(head1.data);
            head1 = head1.next;
        }
        
        else {
            cur.next = new SinglyLinkedListNode(head2.data);
            head2 = head2.next;
        }
        cur = cur.next;
    }
    
    if(head1 != null) cur.next = head1;
    else if(head2 != null) cur.next = head2;
    
    return head3.next;

}
