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

	shiftNodeUp(node){
		let valueLeft;
		let valueRight;
		if(this !== null){
			if(this.left !== null && this.left === node){
				if(this.priority < this.left.priority){
					this.left.swapWithParent();
					return this;
				}
			}
			else if(this.left !== null && this.left !== node){
				const stepLeft = this.shiftNodeUp.bind(this.left);
				valueLeft = stepLeft(node);
			}

			if(this.right !== null && this.right === node){
				if(this.priority < this.right.priority){
					this.right.swapWithParent();
					return this;
				}
			}
			else if(this.right !== null && this.right !== node){ 	
				const stepRight = this.shiftNodeUp.bind(this.right);
				valueRight = stepRight(node);
			}
			return valueRight ? valueRight : valueLeft;
		}
	}

	swapWithParent() {
		if(this.parent !== null){
			const buffer = {};
			const buffer1 = {};

			buffer.left = this.parent.left;
			buffer.right = this.parent.right;
			buffer.parent = this.parent.parent;
			buffer.data = this.parent.data;
			buffer.priority = this.parent.priority;

			buffer1.left = this.left;
			buffer1.right = this.right;
			buffer1.parent = this.parent;
			buffer1.data = this.data;
			buffer1.priority = this.priority;

			if(this.parent.left === this){
				this.parent.left = buffer1.left;
				this.parent.right = buffer1.right;
				this.parent.parent = this;
				this.right = buffer.right;
				this.left = this.parent;
				this.parent = buffer.parent;
				if(this.parent !== null && buffer.data === this.parent.left.data 
					&& buffer.priority === this.parent.left.priority){
					this.parent.left = this;
				}
				else if(this.parent !== null && buffer.data === this.parent.right.data 
					&& buffer.priority === this.parent.right.priority){
					this.parent.right = this;
				}
				if(this.left !== null){
					this.left.parent = this;
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
				this.left = buffer.left;
				this.right = this.parent;
				this.parent = buffer.parent;
				if(this.parent !== null && buffer.data === this.parent.left.data 
					&& buffer.priority === this.parent.left.priority){
					this.parent.left = this;
				}
				else if(this.parent !== null && buffer.data === this.parent.right.data 
					&& buffer.priority === this.parent.right.priority){
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
