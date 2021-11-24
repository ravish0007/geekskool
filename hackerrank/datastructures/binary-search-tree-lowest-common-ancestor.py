def lca(root, v1, v2):
    

    if not root or root.info == v1 or root.info == v2:
        return root
    
    left = lca(root.left, v1, v2)
    right = lca(root.right, v1, v2)
    
    if(left and right):
        return root
    
    
    if left :
        return left
    else:
        return right
