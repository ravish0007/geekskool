function findMergeNode(headA, headB) {

    
    let cur1 = headA;
    let cur2 = headB;
    
    let len1, len2;
    
    len1 = len2 = 0;
    
    while (cur1) {
        len1 += 1;
        cur1 = cur1.next;
    }
    
    while (cur2){
        len2 += 1;
        cur2 = cur2.next;
    }
    
    let d = len1 - len2;
    
    if(d<0){
        d *= -1;
        
        [headA, headB] = [headB, headA];
    }
    
    cur1 = headA;
    cur2 = headB;
    
    for(let i = 0 ; i < d ; i++) {
        cur1 = cur1.next;
    }
    
    while(cur1 && cur2) {
        if (cur1 == cur2) return cur2.data;
        cur1 = cur1.next
        cur2 = cur2.next
    }
    
    
}
