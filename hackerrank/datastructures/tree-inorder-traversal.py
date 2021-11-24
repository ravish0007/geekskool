# No nodejs

a = []
def inOrder(root, level=0):
    if root:
        inOrder(root.left, level+1)
        a.append(root.info)
        inOrder(root.right, level+1)
    
    if level == 0:
        print(*a)
    
    



tree = BinarySearchTree()
t = int(input())

arr = list(map(int, input().split()))

for i in range(t):
    tree.create(arr[i])

inOrder(tree.root)
