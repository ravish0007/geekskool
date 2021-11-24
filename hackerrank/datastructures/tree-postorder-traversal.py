a = []
def postOrder(root, level=0):
    
    if root:
        postOrder(root.left, level+1)
        postOrder(root.right, level+1)
        a.append(root.info)
        
    if level == 0:
        print(*a)



tree = BinarySearchTree()
t = int(input())

arr = list(map(int, input().split()))

for i in range(t):
    tree.create(arr[i])

postOrder(tree.root)
