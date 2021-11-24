def topView(root):
    
    from collections import deque
    
    ans = deque()
    ans.append(root.info)
    
    queue = [ (root,0) ]
    min_dist = max_dist = 0
    
    while queue:
        node, distance = queue.pop(0)
        
        if distance < min_dist:
            min_dist = distance
            ans.appendleft(node.info)
        
        elif distance > max_dist:
            max_dist = distance
            ans.append(node.info)
            
        if node.left:
            queue.append((node.left, distance-1))
        
        if node.right:
            queue.append((node.right, distance+1))
    
    print(*ans)
            
