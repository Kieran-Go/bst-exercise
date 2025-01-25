class Tree {
    constructor(arr = []){
        this.arr = arr;
        this.root = null;
    }

    // Build a balanced binary tree
    buildTree() {
        this.removeDuplicates();

        // Recursively build the tree
        const buildBalancedTree = (start, end) => {
            if (start > end) return null; // Base case: no elements left

            // Find the middle element
            const mid = Math.floor((start + end) / 2);

            // Create a new Node with the middle element
            const node = new Node(this.arr[mid]);

            // Recursively build the left and right subtrees
            node.left = buildBalancedTree(start, mid - 1);
            node.right = buildBalancedTree(mid + 1, end);

            return node; // Return the root node of this subtree
        };
        this.root = buildBalancedTree(0, this.arr.length - 1);
        return this.root;
    }

    // Sort the array and remove any duplicates
    removeDuplicates() {
        this.arr.sort((a, b) => a - b);
        let writeIndex = 1; // Position to overwrite duplicates
    
        for (let readIndex = 1; readIndex < this.arr.length; readIndex++) {
            if (this.arr[readIndex] !== this.arr[readIndex - 1]) {
            this.arr[writeIndex] = this.arr[readIndex]; // Move unique element forward
            writeIndex++;
            }
        }
        this.arr.length = writeIndex; // Truncate this.arr to remove excess duplicates
    }

    insert(value) {
        const insertNode = (node, value) => {
            // If value is less than the node's data, go left
            if (value < node.data) {
                if (node.left === null) {
                    node.left = new Node(value); // Insert as a left child
                } else {
                    insertNode(node.left, value); // Recur on the left subtree
                }
            }
            // If value is greater than the node's data, go right
            else if (value > node.data) {
                if (node.right === null) {
                    node.right = new Node(value); // Insert as a right child
                } else {
                    insertNode(node.right, value); // Recur on the right subtree
                }
            }
            // If value === node.data, do nothing (no duplicates allowed)
        }

        if(!this.root) this.root = new Node(value);
        else insertNode(this.root, value);

        // Push the value to the array
        this.arr.push(value);
        this.arr.sort((a, b) => a - b); // Keep the array sorted after insertion
    }

    delete(value) {
        const delNode = (value, node, parent = null) => {
            if (!node) return null; // Node not found
    
            if (value < node.data) {
                // Traverse the left subtree
                return delNode(value, node.left, node);
            } 
            else if (value > node.data) {
                // Traverse the right subtree
                return delNode(value, node.right, node);
            } 
            else {
                // Node to delete found
                if (node.left === null && node.right === null) {
                    // Case 1: Node is a leaf
                    if (parent) {
                        if (parent.left === node) parent.left = null;
                        else if (parent.right === node) parent.right = null;
                    } else {
                        this.root = null;
                    }
                } 
                else if (node.left && !node.right) {
                    // Case 2: Node has only a left child
                    if (parent) {
                        if (parent.left === node) parent.left = node.left;
                        else if (parent.right === node) parent.right = node.left;
                    } 
                    else {
                        this.root = node.left;
                    }
                } 
                else if (node.right && !node.left) {
                    // Case 3: Node has only a right child
                    if (parent) {
                        if (parent.left === node) parent.left = node.right;
                        else if (parent.right === node) parent.right = node.right;
                    } 
                    else {
                        this.root = node.right;
                    }
                } 
                else {
                    // Case 4: Node has two children
                    const successor = this.getSuccessor(node);
                    node.data = successor.data;
                    delNode(successor.data, node.right, node);
                }
                return node; // Return the deleted node
            }
        };
    
        const deleted = delNode(value, this.root);
        if(deleted) {
            this.arr.splice(this.arr.indexOf(value), 1);
        }
    }

    getSuccessor(curr) {
        curr = curr.right;
        while (curr !== null && curr.left !== null) {
            curr = curr.left;
        }
        return curr;
    }

    find(value) {
        const findNode = (value, root) => {
            if(value === root.data) return root;

            if(value < root.data) {
                if(!root.left) return null;
                else return findNode(value, root.left);
            }
            if(value > root.data) {
                if(!root.right) return null;
                else return findNode(value, root.right);
            }
        }
        return findNode(value, this.root);
    }

    // Traverse the tree in level order (breadth-first) and apply a callback function to each node
    levelOrder(callback = null) {
        if(!this.root) return null;
        if(!callback) console.error("A callback is required");

        const queue = [];
        const formQueue = (root, level) => {
            if(!root) return;

            // Add new level
            if(queue.length <= level) queue.push([]);

            // Add current node's data to the corresponding level
            queue[level].push(root.data);

            // Recur for left and right children
            formQueue(root.left, level+1);
            formQueue(root.right, level+1);
            
        }
        formQueue(this.root, 0);

        queue.forEach((level) => {
            for(let i = 0; i < level.length; i++){
                callback(level[i]);
            }
        });
    }

    // Traverse the tree in order (depth-first) and apply a callback function to each node
    inOrder(callback = null) {
        if(!this.root) return null;
        if(!callback) console.error("A callback is required");

        const traverse = (node) => {
            if(!node) return;

            traverse(node.left);
            callback(node.data);
            traverse(node.right);
        }
        traverse(this.root);
    }

    // Traverse the tree in pre order (depth-first) and apply a callback function to each node
    preOrder(callback = null) {
        if(!this.root) return null;
        if(!callback) console.error("A callback is required");

        const traverse = (node) => {
            if(!node) return;

            callback(node.data);
            traverse(node.left);
            traverse(node.right);
        }
        traverse(this.root);
    }

     // Traverse the tree in post order (depth-first) and apply a callback function to each node
     postOrder(callback = null) {
        if(!this.root) return null;
        if(!callback) console.error("A callback is required");

        const traverse = (node) => {
            if(!node) return;

            traverse(node.left);
            traverse(node.right);
            callback(node.data);
        }
        traverse(this.root);
    }

    height(node) {
        if (node === null) return -1; 
    
        // Recursively find the height of left and right subtrees
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
    
        // Height of the current node is the maximum of the heights of its subtrees plus 1
        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(node) {
        if (node === null || this.root === null) return -1;
    
        let current = this.root;
        let depthCount = 0;
    
        // Traverse the tree from the root to the target node
        while (current !== null) {
            if (node.data === current.data) {
                return depthCount; // Found the node, return the depth
            } else if (node.data < current.data) {
                current = current.left; // Go to the left subtree
            } else {
                current = current.right; // Go to the right subtree
            }
            depthCount++; // Increment depth at each level
        }
    
        return -1; // If the node is not found, return -1
    }

    isBalanced(node = this.root) {
        if (node === null) return true; // An empty tree is balanced
    
        // Calculate the heights of the left and right subtrees
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
    
        // Check if the current node is balanced
        const isBalanced = Math.abs(leftHeight - rightHeight) <= 1;
    
        // Recursively check if the left and right subtrees are balanced
        const isLeftBalanced = this.isBalanced(node.left);
        const isRightBalanced = this.isBalanced(node.right);
    
        // The tree is balanced if the current node and both subtrees are balanced
        return isBalanced && isLeftBalanced && isRightBalanced;
    }

    rebalance() {
        this.buildTree();
    }
    
    
    getArray() {
        return this.arr;
    }

    prettyPrint (node, prefix = "", isLeft = true) {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }
     
}
