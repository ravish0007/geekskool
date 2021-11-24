function reversePrint(llist) {
    // Write your code here
    if(llist){
        reversePrint(llist.next);
        console.log(llist.data);
    }
 
}
