class _Node {
    constructor(value, next) {
        this.value = value;
        this.next = next;
        this.prev = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    insertFirst(item) {
        this.head = new _Node(item, this.head);
    }

    insertLast(item) {
        if(this.head === null) {
            this.insertFirst(item);
        }
        else {
            let tempNode = this.head;
            while(tempNode.next !== null) {
                tempNode = tempNode.next;
            }
            tempNode.next = new _Node(item, null);
        }
    }

    insertBefore(item, itemToFollow) {
        //if the item is to be inserted before the first item
        if(this.head.value === itemToFollow || this.head === null) {
            this.insertFirst(item);
        }
        //if itemToFollow doesn't exist in the list, return out of the function
        let currNode = this.head;

        let previousNode = this.head;
        while((currNode !== null) && (currNode.value !== itemToFollow)) {
            previousNode = currNode;
            currNode = currNode.next;
        }
        if(currNode === null) {
            console.log("Could not find desired position");
        }
        previousNode.next = new _Node(item, currNode);
    }

    insertAfter(item, key) {
        let currNode = this.head;

        let nextNode = this.head.next;

        while((currNode !== null) && (currNode.value !== key)) {
            currNode = currNode.next;
            nextNode = nextNode.next;
        }
        if(currNode === null) {
            console.log("Could not find desired position");
        }
        currNode.next = new _Node(item, nextNode);
    }

    insertAt(item, position) {
        let currNode = this.head;

        let nextNode = this.head.next;

        for(let i = 1; i < position; i ++) {
            currNode = currNode.next;
            nextNode = nextNode.next;
        }
        currNode.next = new _Node(item, nextNode);
    }

    remove(item) {
        if (!this.head) {
            return null;
        }

        if (this.head.value === item) {
            this.head = this.head.next;
            return;
        }

        let currNode = this.head;

        let previousNode = this.head;

        while ((currNode !== null) && (currNode.value !== item)) {
            previousNode = currNode;
            currNode = currNode.next;
        }
        if (currNode === null) {
            console.log('Item not found');
        }
        previousNode.next = currNode.next;
    }

    find(item) {
        let currNode = this.head;

        if(!this.head) {
            return null;
        }

        while (currNode.value !== item) {
            if(currNode.next === null) {
                return null;
            }
            else {
                currNode = currNode.next;
            }
        }

        return currNode;
    }

    printList() {
        let current = this.head;

        while (current !== null) {
            console.log(current.value);
            current = current.next;
        }
    }

}

function swap(array, i, j) {
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
};

function bubbleSort(array) {
    let swaps = 0;
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] > array[i + 1]) {
            swap(array, i, i + 1);
            swaps++;
        }
    }

    if (swaps > 0) {
        return bubbleSort(array);
    }
    return array;
};

function mergeSort(array) {
    if (array.length <= 1) {
        return array;
    }

    const middle = Math.floor(array.length / 2);
    let left = array.slice(0, middle);
    let right = array.slice(middle, array.length);

    left = mergeSort(left);
    right = mergeSort(right);
    return merge(left, right, array);
};

function merge(left, right, array) {
    let leftIndex = 0;
    let rightIndex = 0;
    let outputIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            array[outputIndex++] = left[leftIndex++];
        }
        else {
            array[outputIndex++] = right[rightIndex++];
        }
    }

    for (let i = leftIndex; i < left.length; i++) {
        array[outputIndex++] = left[i];
    }

    for (let i = rightIndex; i < right.length; i++) {
        array[outputIndex++] = right[i];
    }
    return array;
};

function quickSort(array, start = 0, end = array.length) {
    if (start >= end) {
        return array;
    }
    const middle = partition(array, start, end);
    debugger;
    array = quickSort(array, start, middle);
    array = quickSort(array, middle + 1, end);
    return array;
};

function partition(array, start, end) {
    const pivot = array[end - 1];
    let j = start;
    for (let i = start; i < end - 1; i++) {
        if (array[i] <= pivot) {
            swap(array, i, j);
            j++;
        }
    }
    swap(array, end-1, j);
    return j;
};

/**
 * 1) Given the following list of numbers 21, 1, 26, 45, 29, 28, 2, 9, 16, 49, 39, 27, 43, 34, 46, 40
        What is the resulting list that will be sorted after 3 recursive calls to mergesort?
        [[[21, 1,] 26, 45,] 29, 28, 2, 9,] 16, 49, 39, 27, 43, 34, 46, 40
        A: [21, 1]
        Pay no attention to this -> [1, 21, 26, 45, 28, 29, 2, 9, 16, 49, 27, 39, 34, 43, 40, 46]

        What is the resulting list that will be sorted after 16 recursive calls to mergesort?
        [[[[21,] [1,]] [[26,] [45,]]] [[[29,] [28,]] [[2,] [9,]]]] [16, 49, 39, 27, 43, 34, 46, 40]
        A: [16, 49, 39, 27, 43, 34, 46, 40]

        What are the first 2 lists to be merged?
        A: [21] and [1]
        
        Which two lists would be merged on the 7th merge?
        A: [1, 21, 26, 45] and [2, 9, 28, 29] would be merged 7th

    2) Suppose you are debugging a quicksort implementation that is supposed to sort an array in ascending order. 
    After the first partition step has been completed, the contents of the array is in the following order: 
    3 9 1 14 17 24 22 20. 
    Which of the following statements is correct about the partition step? Explain your answer.
        2) The pivot could have been either 14 or 17
        A: I think this is the correct one, because every value below 14 is less than it, and every value to the right of 17 is greater than it.
    
    Given the following list of numbers 14, 17, 13, 15, 19, 10, 3, 16, 9, 12 show the resulting list after the second partitioning according to the quicksort algorithm.
    A w/ last as pivot: [3, 9, 10, 12, 19, 14, 17, 16, 13, 15]
    A w/ first as pivot: [14, 13, 10, 3, 9, 12, 15, 16, 19, 17]
*/

let numbers = [14, 17, 13, 15, 19, 10, 3, 16, 9, 12];

//quickSort(numbers);

//QUESTION 3
let data = [89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 13, 40, 48, 32, 26, 2, 14, 33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93, 98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16, 85, 63, 23, 69, 64, 91, 9, 70, 81, 27, 97, 82, 6, 88, 3, 7, 46, 13, 11, 64, 76, 31, 26, 38, 28, 13, 17, 69, 90, 1, 6, 7, 64, 43, 9, 73, 80, 98, 46, 27, 22, 87, 49, 83, 6, 39, 42, 51, 54, 84, 34, 53, 78, 40, 14, 5];

//console.log(quickSort(data));

/*A: [
   1,  2,  3,  5,  6,  6,  6,  7,  7,  9,  9, 11,
   13, 13, 13, 14, 14, 15, 16, 16, 17, 21, 22, 23,
   24, 25, 25, 26, 26, 27, 27, 27, 28, 28, 28, 30,
   31, 32, 32, 33, 34, 38, 38, 39, 40, 40, 42, 42,
   43, 44, 45, 46, 46, 46, 48, 49, 50, 51, 51, 53,
   53, 54, 55, 56, 62, 63, 64, 64, 64, 65, 67, 68,
   69, 69, 70, 70, 72, 72, 73, 73, 76, 78, 78, 80,
   81, 82, 83, 84, 85, 87, 87, 88, 88, 89, 90, 91,
   93, 97, 98, 98
 ]*/

//QUESTION 4

//console.log(mergeSort(data));

/**
[
   1,  2,  3,  5,  6,  6,  6,  7,  7,  9,  9, 11,
  13, 13, 13, 14, 14, 15, 16, 16, 17, 21, 22, 23,
  24, 25, 25, 26, 26, 27, 27, 27, 28, 28, 28, 30,
  31, 32, 32, 33, 34, 38, 38, 39, 40, 40, 42, 42,
  43, 44, 45, 46, 46, 46, 48, 49, 50, 51, 51, 53,
  53, 54, 55, 56, 62, 63, 64, 64, 64, 65, 67, 68,
  69, 69, 70, 70, 72, 72, 73, 73, 76, 78, 78, 80,
  81, 82, 83, 84, 85, 87, 87, 88, 88, 89, 90, 91,
  93, 97, 98, 98
]
 */

//QUESTION 5

// Use the Merge Sort method, but replace everything that refers to an array with a Linked List,
// and adjust the code accordingly
function mSortList (list) {
    let currNode = list.head;
    // If you're at the end of a list, you've broken it down as far as you can go
    if (currNode.next === null) {
      return list;
    }

    // count how long the list is. Start at one, and increment the length until you reach the end
    let length = 1;
    while (currNode.next !== null) {
      length++;
      currNode = currNode.next;
    }
    const middle = Math.floor(length / 2);
    
    // make a new left-hand list
    let leftList = splitList(list, 0, middle);
    // make a new right-hand list with the second half of the nodes in the list
    let rightList = splitList(list, middle, length);

    //add all of the values up to and including the middle node to leftList
    leftList = mSortList(leftList);
    rightList = mSortList(rightList);
    return mergeLists(leftList, rightList);
    
}

// Since you can't splice a Linked list like an array, we need a helper function to manually split one,
// returning a smaller portion of a given Linked List with desired start and end indecies
function splitList (list, start, end) {
    let currNode = list.head;
    if (currNode === null) {
        return;
    }

    const returnList = new LinkedList();
    let i = 0;
    while (currNode !== null) {
        if (i >= start && i < end) {
            returnList.insertLast(currNode.value);
        }    
        i++;
        currNode = currNode.next;
    }
    return returnList;
}
  
function mergeLists (leftList, rightList) {
    // implement the merge function with Linked Lists

    const mergedList = new LinkedList();
    let currLeft = leftList.head;
    let currRight = rightList.head;

    while (currLeft && currRight) {
        // if the value of the current node on the left list is lower, append it to the end of mergedList
        // and move currLeft forward one node
        if (currLeft.value <= currRight.value) {
            mergedList.insertLast(currLeft.value);
            currLeft = currLeft.next;
        }
        // else, do the same with the right
        else {
            mergedList.insertLast(currRight.value);
            currRight = currRight.next;
        }
    }
    // if one of the lists still has values while the other doesn't (in theory only one item), append that item
    while (currLeft) {
        mergedList.insertLast(currLeft.value);
        currLeft = currLeft.next;
    }
    while (currRight) {
        mergedList.insertLast(currRight.value);
        currRight = currRight.next;
    }
    return mergedList;
}
  

//QUESTION 6 Write an O(n) algorithm to sort an array of integers, where you know in advance what the lowest and highest values are. 
//You can't use array.splice(), shift() or unshift() for this exercise.

function mySort(array, lowest, highest) {
    let count = {};
    for (let i = lowest; i <= highest; i++) {
        count[i] = 0;
    }

    for(let i = 0; i< array.length; i++) {
        count[array[i]] += 1;
    }

    let sortedArray = [];
    for (let i = lowest; i <= highest; i++) {
        while(count[i] > 0) {
            sortedArray.push(i)
            count[i]--;
        }
    }
    return sortedArray;
}

//console.log(mySort(data, 1, 98));

function shuffleArray(array) {
    for (let i = 0; i < array.length; i++) {
        let randomIndex = Math.floor(Math.random() * array.length);
        swap(array, i, randomIndex);
    }
    return array;
}

//console.log(shuffleArray(data));

//QUESTION 8 Imagine that I gave you 20 books to sort in alphabetical order. 
//Express this as an algorithm and then implement your algorithm.

// Assuming this is an array of strings (i.e. book titles), we would just check the first character and sort, 
// if first characters are equal, go to the next character to sort

function sortBooks (string1, string2, index=0) {
    if (string1 === string2) {
      return true;
    }
    if (string1.toLowerCase().charCodeAt([index]) < string2.toLowerCase().charCodeAt([index])) {
      return true;
    }
    else if (string1.toLowerCase().charCodeAt([index]) > string2.toLowerCase().charCodeAt([index])) {
      return false;
    }
    else {
      return sortBooks (string1, string2, index + 1);
    }
}
  
function mSortStrings (array) {
    if (array.length <= 1) {
        return array;
    }
    const middle = Math.floor(array.length/2);
    let left = array.slice(0, middle);
    let right = array.slice(middle, array.length);

    left = mSortStrings (left);
    right = mSortStrings (right);
    return mergeStringArr (left, right, array);
}
  
function mergeStringArr (left, right, array) {
    let leftI = 0;
    let rightI = 0;
    let outputI = 0;
    while (leftI < left.length && rightI < right.length) {
        if (sortBooks(left[leftI], right[rightI])) {
        array[outputI++] = left[leftI++];
        }
        else {
        array[outputI++] = right[rightI++];
        }
    }
    for (let i = leftI; i < left.length; i++) {
        array[outputI++] = left[i];
    }
    for (let i = rightI; i < right.length; i++) {
        array[outputI++] = right[i];
    }
    return array;
}

let books = [
    'Lord of the Rings',
    'Land Before Time',
    'A Book that Starts With A',
    'Another Book that Stars with A',
    'Star Wars',
    'Hunger Games'
];

console.log(mSortStrings(books));

