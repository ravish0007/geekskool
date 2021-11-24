def height(root):
    
    if not root:
        return -1
    
    return 1 + max(height(root.left), height(root.right))
    
