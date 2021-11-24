def levelOrder(root):
    
    ans = []
    queue = [root]
    
    while queue:
        node = queue.pop(0)
        ans.append(node.info)
        if node.left:
            queue.append(node.left)
        if node.right:
            queue.append(node.right)
            
    print(*ans)
