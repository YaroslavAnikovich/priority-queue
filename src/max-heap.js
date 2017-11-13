const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
	}

	push(data, priority) {
		this.insertNode(new Node(data, priority));
		const newElement = this.parentNodes.pop();
		this.shiftNodeUp(newElement);
	}

	pop() {
		
	}

	detachRoot() {
		
	}

	restoreRootFromLastInsertedNode(detached) {
		
	}

	size() {
		
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
		if(this.root === null){
			this.root = node;
		}
		else {
			if(this.parentNodes[0].left === null){
					this.parentNodes[0].appendChild(this.parentNodes[this.parentNodes.length - 1]);
			}
			else{
				this.parentNodes[0].appendChild(this.parentNodes[this.parentNodes.length - 1]);
				this.parentNodes.shift();
			}
		}
	}

	shiftNodeUp(node) {
		let value = true;
		let index;
		let indexOfParent;
			if(this !== null && this.root !== node){
				value = this.root.shiftNodeUp(node);
				index = this.parentNodes.indexOf(node);
				indexOfParent = this.parentNodes.indexOf(value)
				if(index !== -1){
					this.parentNodes[index] = value;
				}

				if(indexOfParent !== -1){
					this.parentNodes[indexOfParent] = value.parent;
				}
				while(value){
					if(value === this.root){
						this.root = value.parent;
					}
					else{ 
						value = this.shiftNodeUp(value.parent);
						if(value !== undefined){ 
							indexOfParent = this.parentNodes.indexOf(value);
							index = this.parentNodes.indexOf(value.parent)
							if(index !== -1){
								this.parentNodes[index] = value;
							}
		
							if(indexOfParent !== -1){
								this.parentNodes[indexOfParent] = value.parent;
							}
						}
					}
				}
			}
			else value = undefined;
		}	

	shiftNodeDown(node) {
		
	}
}

module.exports = MaxHeap;
