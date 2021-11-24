    def insert(self, val):
        
        def recursive_insert(val, root):
            
            if not root:
                return Node(val)
            
            if(val > root.info):
                root.right = recursive_insert(val, root.right)
                    
            elif( val < root.info) :
                root.left = recursive_insert(val, root.left)
                
            return root
        
        self.root = recursive_insert(val, self.root)
