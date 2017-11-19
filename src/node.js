class Node {
	constructor(data, priority) {
		this.parent = null;
		this.left = null;
		this.right = null;
		this.data = data;
		this.priority = priority;
	}

	appendChild(node) {
		if(this.left === null){
			this.left = node;
			this.left.parent = this;
		}

		else if(this.right === null){
			this.right = node;
			this.right.parent = this;
		}
	}

	removeChild(node) {
		if(this.left === node){
			this.left.parent = null;
			this.left = null;
		}

		else if(this.right === node){
			this.right.parent = null;
			this.right = null;
		}
		else throw Error();
	}

	remove() {
		if(this.parent !== null){
			this.parent.removeChild(this);
		}
	}

	
	swapWithParent() {
		if(this.parent !== null){
			const parent = {};
			const buffer1 = {};

			parent.left = this.parent.left;
			parent.right = this.parent.right;
			parent.parent = this.parent.parent;
			parent.data = this.parent.data;
			parent.priority = this.parent.priority;

			buffer1.left = this.left;
			buffer1.right = this.right;
			buffer1.parent = this.parent;
			buffer1.data = this.data;
			buffer1.priority = this.priority;

			if(this.parent.left === this){
				this.parent.left = buffer1.left;
				this.parent.right = buffer1.right;
				this.parent.parent = this;
				this.right = parent.right;
				this.left = this.parent;
				this.parent = parent.parent;
				if(this.parent !== null && parent.data === this.parent.left.data 
					&& parent.priority === this.parent.left.priority){
					this.parent.left = this;
				}
				else if(this.parent !== null && parent.data === this.parent.right.data 
					&& parent.priority === this.parent.right.priority){
					this.parent.right = this;
				}
				if(this.right !== null){
					this.right.parent = this;
				}
				if(this.left.left !== null){ 
					this.left.left.parent = this.left;
				}
				if(this.left.right !== null){ 
					this.left.right.parent = this.left;
				}
			}

			else if(this.parent.right === this){
				this.parent.left = buffer1.left;
				this.parent.right = buffer1.right;
				this.parent.parent = this;
				this.left = parent.left;
				this.right = this.parent;
				this.parent = parent.parent;
				if(this.parent !== null && parent.data === this.parent.left.data 
					&& parent.priority === this.parent.left.priority){
					this.parent.left = this;
				}
				else if(this.parent !== null && parent.data === this.parent.right.data 
					&& parent.priority === this.parent.right.priority){
					this.parent.right = this;
				}
				if(this.left !== null){
					this.left.parent = this;
				}
				if(this.right.left !== null){ 
					this.right.left.parent = this.right;
				}
				if(this.right.right !== null){ 
					this.right.right.parent = this.right;
				}
			}
		}
	}
}

module.exports = Node;
