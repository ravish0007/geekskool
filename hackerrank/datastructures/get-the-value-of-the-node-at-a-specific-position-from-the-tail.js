function getNode(llist, positionFromTail) {
    
    let runner, current;
    runner = current = llist;
    
    for( let i = 0 ; i < positionFromTail; i++, runner = runner.next);
    
    while(runner.next) {
        runner = runner.next;
        current = current.next;
    }
    return current.data;
    
}
