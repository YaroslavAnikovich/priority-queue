const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
	}

	push(data, priority) {
		this.insertNode(new Node(data, priority));
		const newElement = this.parentNodes[this.parentNodes.length -1];
		this.shiftNodeUp(newElement);

	}

	pop() {
		if(!this.isEmpty()){
			const detached = this.detachRoot();
			if(this.parentNodes.length !== 0){ 
				this.restoreRootFromLastInsertedNode(detached);
				this.shiftNodeDown(this.root);
			}
			return detached.data;
		}
	}

	detachRoot() {
		if(this.root !== null){
			const result = this.root;
			if(this.root.right === null){
				this.parentNodes.shift()
			}
			this.root = null;
			return result;
		}
	}

	restoreRootFromLastInsertedNode(detached) {
		let last = this.parentNodes[this.parentNodes.length - 1];
		if(last.parent !== null && last.parent.right !== null){
			this.parentNodes.unshift(last.parent);
		}
		last.remove();
		this.parentNodes.pop();
		if(detached.left){
			last.left = detached.left;
			last.left.parent = last;
		}
		if(detached.right){
			last.right = detached.right;
			last.right.parent = last;
		}
		this.root = last;
		if(this.parentNodes.indexOf(detached) !== -1){
			this.parentNodes[this.parentNodes.indexOf(detached)] = last;
		}
		else if(detached.right === null){
			this.parentNodes.unshift(last);
		} 
	}

	size() {
		if(this.parentNodes.length === 0){
			return 0;
		}
		else {
			if(this.parentNodes[0].left === null){
				return 2 * this.parentNodes.length - 1;
			}
			else return 2 * this.parentNodes.length - 2;
		}
	}

	isEmpty() {
		return this.root === null;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
	}

	insertNode(node) {
		this.parentNodes.push(node);
		const first = this.parentNodes[0];
		if(this.root === null){
			this.root = node;
		}
		else {
			if(first.left === null){
					first.appendChild(node);
			}
			else{
				first.appendChild(node);
				this.parentNodes.shift();
			}
		}
	}

	shiftNodeUp(node) {
		if(node.parent !== null){
			if(node.parent.priority < node.priority){
				if(node.right === null){
					this.parentNodes[this.parentNodes.indexOf(node)] = node.parent;
				}
				if(node.parent.right === null){
					this.parentNodes[this.parentNodes.indexOf(node.parent)] = node;
				}
				node.swapWithParent();
				this.shiftNodeUp(node);
			}
		}
		else this.root = node;
	}	

	shiftNodeDown(node) {
		let buffer;
		if(node.right !== null){
			if (node.right.priority < node.left.priority) {
				buffer = node.left;
			} else {
				buffer = node.right;
			}
			if(buffer.priority > node.priority){
				if(this.root === node){
					this.root = buffer;
				}

				if(node.right === null){
					this.parentNodes[this.parentNodes.indexOf(node)] = buffer;
				}
				if(buffer.right === null){ 
					this.parentNodes[this.parentNodes.lastIndexOf(buffer)] = node;
				}
				buffer.swapWithParent();
				return this.shiftNodeDown(node);
			}
		} else if(node.left !== null && node.left.priority > node.priority){
			if(this.root === node){
				this.root = node.left;
			}
			node.left.swapWithParent();
			if(node.right === null){
				this.parentNodes[this.parentNodes.indexOf(node)] = node.parent;
				this.parentNodes[this.parentNodes.lastIndexOf(node.parent)] = node;
			}
			return this.shiftNodeDown(node);
		}
	}
}

module.exports = MaxHeap;
