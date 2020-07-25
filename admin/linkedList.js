class Node{
    constructor(element){
        this.element = element;
        this.next = null;
    }
}

class linkedList{
    constructor(){
        this.head = null;
        this.size = 0;
    }

    //add function
    add(element){ 
    let node = new Node(element); 

    let current; 
        if (this.head == null) this.head = node; 
        else { 
            current = this.head; 
            while (current.next) { 
                current = current.next; 
            }
            current.next = node; 
        } 
    this.size++; 
    }

    // remove function
    remove(){
        let current = this.head;
        this.head = current.next;
        current.next = null;

        this.size--;
    }

    //size function
    length(){
        return this.size
    }

    // head function
    top(){
        return this.head
    }

    printList() 
    { 
        let curr = this.head; 
        let str = ""; 
        while (curr) { 
            str += curr.element + " "; 
            curr = curr.next; 
        } 
        console.log(str); 
    } 
}
