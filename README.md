# sudoku-solver
A website that can solve sudoku using heuristic and also backtracking if needed using matrix and linked list.
<br><br>
You can try using this website here :- https://pradyumnarago.github.io/sudoku-solver/
<br><br>
This page is designed with HTML, CSS, javascript to solve a sudoku puzzle with in 
seconds. But this is not the end. This application might be insignificant in real world.
But the data structure and the algorithms used in this application can be modified to 
assist us in tiring tasks like designing a time table for colleges where more number of 
batches are to be handled by few teachers.
<br><br>
Data structure and Algorithms used:
<br><br>
The data structure used in this application is a combination of 
matrix and linked list. Each element of the matrix acts as a pointer to the start of a
linked list. This linked list stores all the possible values that can be enter in the 
particular cell according to the current state of the sudoku. It can be visualised as shown
in the below figure.
<br><br>
Components of the used data structure are as follows:
<br><br>
<ol class="text1">
    <li>
        Structure that holds a number , Boolean value to show if the number is fixed
        for that particular position and a self-referencing pointer. This structure is named as node.
    </li>
    <li>
        9x9 2-D array of pointers to the structures defined above .
    </li>
    <li>
        Linked list that holds the value of all the possible numbers that can be
        entered in the particular position.
    </li>
</ol>
<br><br>
Working:
<br><br>
A function is designed to immitate a human solving a sudoku in a step by step 
manner. Steps involved are as below. 
<br><br>
<ol class="text1">
    <li>First, All the possible numbers that can be entered in each cell is pushed into a linked
        list.
    </li>
    <li>
        Then, it checks if any of the linked list has only one element.
    </li>
    <li>
        If it is found, a function is called that deletes all the nodes with that number if present in the row,
        column or its 3X3 region containing the element found in the previous step, if any exists.
    </li>
    <li>
        Then, it checks if an element in the linked list of a particular cell is unique in it 3x3 region
        differentiated with different colors in the image above.
    </li>
    <li>
        If it finds such an element,it deletes all the elements in the linked list except the element that 
        is unique in the previous step.Then the function called it step 3 is called again.
    </li>
    <li>
        Then, it checks if an element in the linked list of a particular cell is unique in the row or
        column containing a particular cell. If found , step 5 is repeated.
    </li>
</ol>