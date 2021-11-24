a = []
def preOrder(root, level=0):
    if root:
        a.append(root.info)
        preOrder(root.left, level+1)
        preOrder(root.right, level+1)
    
    if level == 0:
        print(*a)
    
    



tree = BinarySearchTree()
t = int(input())

arr = list(map(int, input().split()))

for i in range(t):
    tree.create(arr[i])

preOrder(tree.root)
