function show(tree){
    tree.prettyPrint(tree.root);
    console.log(tree.getArray());
}

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const tree = new Tree(arr);
tree.buildTree();
show(tree);

console.log(tree.isBalanced());

// Print all elements in levelOrder
console.log("Level Order:");
tree.levelOrder(console.log);

// Print all elements in preOrder
console.log("Pre Order:");
tree.preOrder(console.log);

// Print all elements in postOrder
console.log("Post Order:");
tree.postOrder(console.log);

// Print all elements inOrder
console.log("In Order:");
tree.inOrder(console.log);

// Unbalance the tree
tree.insert(400);
console.log(tree.isBalanced());

// Rebalance the tree
tree.rebalance();
console.log(tree.isBalanced());

show(tree);