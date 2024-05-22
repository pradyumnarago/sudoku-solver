const N = 9;
const d= new Date();
let starttime;
let endtime;
let maxspace = 0;

function createTable() {
    const tableContainer = document.getElementById('tableContainer');
    const table = document.createElement('table');
    let x=[[0,0],[0,1],[0,2],[0,6],[0,7],[0,8],[1,0],[1,1],[1,2],[1,6],[1,7],[1,8],[2,0],[2,1],[2,2],[2,6],[2,7],[2,8],
            [3,3],[3,4],[3,5],[4,3],[4,4],[4,5],[5,3],[5,4],[5,5],
            [6,0],[6,1],[6,2],[6,6],[6,7],[6,8],[7,0],[7,1],[7,2],[7,6],[7,7],[7,8],[8,0],[8,1],[8,2],[8,6],[8,7],[8,8]
            ];

    for (let i = 0; i < N; i++) {
        const row = table.insertRow();

        for (let j = 0; j < N; j++) {
            const cell = row.insertCell();
            const input = document.createElement('input');
            input.type = 'number';
            input.id = `cell_${i}_${j}`;
            let found = false;

            for (let k = 0; k < x.length; k++) {
                if (x[k][0] === i && x[k][1] === j) {
                    found = true;
                    break;
                }
            }
            if (found) {
                input.classList.add('dark');
                console.log(i+' '+j+' dark');
            } else {
                input.classList.add('light');
                console.log(i+' '+j+' light');
            }                     
            input.min = 1;
            input.max = N;
            input.required = true;
            input.addEventListener('input', () => restrictInput(input));
            cell.appendChild(input);
        }
    }

    tableContainer.appendChild(table);
}

// Function to restrict input to valid range
function restrictInput(input) {
    if (input.value < 1) input.value = 1;
    if (input.value > N) input.value = N;
}

// Your existing JavaScript code, including takeInput function

// Initialize the table when the page loads
window.onload = createTable;

class Node {
    constructor(data) {
        this.data = data;
        this.done = false;
        this.next = null;
    }
}
let board = new Array(N).fill(0).map(() => new Array(N).fill(null));
function init() {
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            board[i][j] = null;
        }
    }
}

function count(ptr) {
    let count = 0;
    while (ptr !== null) {
        count++;
        ptr = ptr.next;
    }
    if(count==1){
        return true;
    }else{
        return false;
    }
}

function isValid(row, col, num) {
    for (let i = 0; i < N; i++) {
        if (board[row][i] !== null && board[row][i].data === num && board[row][i].done && i!=col) {
            console.log('Quiting while checking row ');
            return false;
        }
        if (board[i][col] !== null && board[i][col].data === num && board[i][col].done && i!=row) {
            console.log('Quiting while checking col');
            return false;
        }
    }

    let startRow = 3 * Math.floor(row / 3);
    let startCol = 3 * Math.floor(col / 3);

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[startRow + i][startCol + j] !== null &&
                board[startRow + i][startCol + j].data === num &&
                board[startRow + i][startCol + j].done &&
                !(startRow + i== row &&
                startCol + j== col)) {
                    console.log('Quiting while checking subsquare');
                return false;
            }
        }
    }

    return true;
}

function printBoard() {

    let x=[[0,0],[0,1],[0,2],[0,6],[0,7],[0,8],[1,0],[1,1],[1,2],[1,6],[1,7],[1,8],[2,0],[2,1],[2,2],[2,6],[2,7],[2,8],
            [3,3],[3,4],[3,5],[4,3],[4,4],[4,5],[5,3],[5,4],[5,5],
            [6,0],[6,1],[6,2],[6,6],[6,7],[6,8],[7,0],[7,1],[7,2],[7,6],[7,7],[7,8],[8,0],[8,1],[8,2],[8,6],[8,7],[8,8]
            ];
    const solutionDiv = document.getElementById('solution');
    solutionDiv.innerHTML = '';

    const table = document.createElement('table');

    for (let i = 0; i < N; i++) {
        const row = document.createElement('tr');

        for (let j = 0; j < N; j++) {
            const cell = document.createElement('td');
            if(board[i][j].done==true){
                cell.textContent = `${board[i][j] ? board[i][j].data : ''}`;
            }else{
                cell.textContent = ' ';
            }
            
            let found = false;
            for (let k = 0; k < x.length; k++) {
                if (x[k][0] === i && x[k][1] === j) {
                    found = true;
                    break;
                }
            }
            if (found) {
                cell.classList.add('dark');
                console.log(i+' '+j+' dark');
            } else {
                cell.classList.add('light');
                console.log(i+' '+j+' light');
            }             
            row.appendChild(cell);
        }

        table.appendChild(row);
    }
    solutionDiv.appendChild(table);
}

function push(head, newData) {
    const newNode = new Node(newData);
    newNode.next = head;
    return newNode;
}
function display(ptr) {
    let line='';
    while (ptr !== null) {
        console.log(ptr.data);
        line=`${line + ptr.data} `;
        ptr = ptr.next;
    }
    console.log(line);
}

function done() {
    for (let row = 0; row < N; row++) {
        for (let col = 0; col < N; col++) {
            if (!board[row][col].done||board[row][col]==null) {
                return true;
            }
        }
    }
    return false;
}

function printB() {
    let line='';
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (board[i][j] !== null && board[i][j].done !== false) {
                line=line+`${board[i][j].data} `;
            } else {
                line=line+'  ';
            }
        }
        console.log(line);
        line=''
    }
}

function deleteKey(head, key) {
    let ptr = head;

    if (count(ptr)==true||ptr.done==true||ptr.next==null) {
        display(ptr);
        console.log('deletekey func');
        return head;
    }

    
    if (head.data === key) {
        head = ptr.next;
        console.log(`Item deleted at the top: ${ptr.data}`);
        display(head);
        console.log('deletekey func');
        return head;
    }

    let prev = null;
    while (ptr !== null) {
        if (ptr.data === key) {
            prev.next = ptr.next;
            console.log(`Item deleted: ${ptr.data}`);
            display(head);
            console.log('deletekey func');
            break;
        }
        prev = ptr;
        ptr = ptr.next;
    }
    return head;
}


function takeInput() {
    /*const board = [];

    // Initialize the board with linked lists
    for (let i = 0; i < N; i++) {
        const row = [];
        for (let j = 0; j < N; j++) {
            row.push({ head: null, done: false }); // Each cell has a linked list head and a 'done' flag
        }
        board.push(row);
    }*/
    init();

    let isValidInput = true;
    let cellValue;

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            cellValue = parseInt(document.getElementById(`cell_${i}_${j}`).value, 10);
            if(isNaN(cellValue)){
                console.log('row:'+(i+1)+' col: '+(j+1)+' No Input');
            }else if (cellValue < 1 || cellValue > N) {
                console.log('row:'+(i+1)+' col: '+(j+1)+' num: '+cellValue);
                isValidInput = false;
                alert('Please enter valid numbers between 1 and 9.');
                //break;
            }else{
                console.log('row:'+(i+1)+' col: '+(j+1)+' num: '+cellValue);
                board[i][j] = { data: cellValue, done: true, next: null };
                maxspace = maxspace + 1;
            }
            
        }
        if (!isValidInput) {
            break;
        }
    }
    printB();
    /*let i,j;
	board[0][1]={data:9,done:true,next:null};
	board[0][4]={data:6,done:true,next:null};
	board[0][6]={data:7,done:true,next:null};
	board[1][3]={data:3,done:true,next:null};
	board[1][6]={data:2,done:true,next:null};
	board[2][1]={data:5,done:true,next:null};
	board[2][3]={data:1,done:true,next:null};
	board[2][4]={data:8,done:true,next:null};
	board[2][7]={data:6,done:true,next:null};
	board[3][3]={data:8,done:true,next:null};
	board[3][4]={data:4,done:true,next:null};
	board[3][7]={data:7,done:true,next:null};
	board[4][1]={data:8,done:true,next:null};
	board[4][2]={data:5,done:true,next:null};
	board[4][5]={data:3,done:true,next:null};
	board[4][7]={data:2,done:true,next:null};
	board[4][8]={data:4,done:true,next:null};
	board[5][0]={data:7,done:true,next:null};
	board[5][7]={data:8,done:true,next:null};
	board[6][2]={data:4,done:true,next:null};
	board[6][8]={data:9,done:true,next:null};
	board[7][2]={data:8,done:true,next:null};
	board[7][5]={data:6,done:true,next:null};
	board[7][7]={data:3,done:true,next:null};
	board[8][0]={data:1,done:true,next:null};
	board[8][1]={data:3,done:true,next:null};
	board[8][6]={data:6,done:true,next:null};
	for(i=0;i<N;i++){
		for(j=0;j<N;j++){
			if(count(board[i][j])){
				board[i][j].done=true;
			}
		}
	}
    printB();*/
    //alert('Input ready');

    if (isValidInput) {
        // Now 'board' contains the Sudoku puzzle values represented as linked lists
        solveSudoku(board);
    }
}

function clearNotes(row, col) {
    const r = (row + 1) % 3;
    const c = (col + 1) % 3;
    const startRow = 3 * Math.floor(row / 3);
    const startCol = 3 * Math.floor(col / 3);

    board[row][col].done = true;
    const num = board[row][col].data;

    for (let i = 0; i < N; i++) {
        if (i !== col) {
            console.log('Deleting at location '+'row:'+row+'col: '+i);
            board[row][i]=deleteKey(board[row][i], num);
            display(board[row][i]);
        }
        console.log('Deleting at location '+'row:'+i+'col: '+col);
        if (i !== row) {
            console.log('row: '+i);
            console.log('Deleting at location '+'row:'+i+'col: '+col);
            board[i][col]=deleteKey(board[i][col], num);
            display(board[i][col]);
            console.log('clear notes func');
        }
    }

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (i !== r - 1 || j !== c - 1) {
                board[startRow + i][startCol + j]=deleteKey(board[startRow + i][startCol + j], num);
                display(board[startRow + i][startCol + j]);
            }
        }
    }

    console.log('Cleared notes at the rows and cols');
}

function backtracking(row,col){
    if(row>N-1){
        printBoard(board);
        const endTime = performance.now()/1000;
    //alert(endTime);
    //endtime=(d.getHours())*3600+(d.getMinutes())*60+(d.getSeconds());
        const list = document.getElementById("end");
        const time=endtime-starttime;
        //alert(time);
        //alert("Time taken to solve: "+`${time}`+" s");
        list.innerHTML = "Time taken to solve: "+`${time}`+" s";
        printBoard();
        return true;
    }
    let ptr=board[row][col];
    let ptr2=board[row][col];
    console.log('backtraking at '+row+' '+col);
    display(ptr);
    let rown,coln;
    rown=0;
    coln=0;
    if(col==8){
        rown=row+1;
        coln=0;
        console.log('row complete:next: '+rown+' '+coln);
    }else{
        rown=row;
        coln=col+1;
        console.log('row complete:next: '+rown+' '+coln);
    }
    board[row][col]=null;
    console.log('backtraking at '+row+' '+col);
    while(ptr!=null){
        console.log('trying for '+ptr.data);
        console.log('backtraking at '+row+' '+col);
        board[row][col] = ptr;
        board[row][col].done=true;
        if(isValid(row,col,board[row][col].data)){
            console.log('backtraking at '+row+' '+col);
            console.log('validated');
            printB(board);
            console.log('backtraking at '+row+' '+col);
            //alert('Fixing '+board[row][col].data+' at '+row+' '+col);
            if(backtracking(rown,coln)){
                //if(row==0 && col==0)
                    //alert('done');
                return true;
            }
        }
        if(!count(ptr2))
            board[row][col].done=false;
        ptr=ptr.next;
    }
    board[row][col]=ptr2;
    //if(row==0 && col==0)
        //alert('backtracking unsuccessful.');
    return false;
}

function solveSudoku() {
    const startTime = performance.now()/1000;
    //alert(startTime);
    //starttime=(d.getHours())*3600+(d.getMinutes())*60+(d.getSeconds());
    printB();
    const inputs = maxspace;
    for (let row = 0; row < N; row++) {
        for (let col = 0; col < N; col++) {
            if (board[row][col] === null) {
                for (let num = 1; num <= N; num++) {
                    if (isValid(row, col, num)) {
                        maxspace = maxspace + 1;
                        if(board[row][col]==null){
                            board[row][col] = { data: num, done: false, next: null };
                        }else{
                            board[row][col]=push(board[row][col],num);
                        }
                    }
                }
                console.log('row:'+(row+1)+' col: '+(col+1));
                display(board[row][col]);
            }
        }
    }
    printB();
    const list = document.getElementById("end");

    list.innerHTML = "Maximum number of locations required to solve this sudoku with " +  `${inputs}` + " is " + `${maxspace}`;
    
    while (done()) {
        
        let op=true
        for (let row = 0; row < N; row++) {
            for (let col = 0; col < N; col++) {
                const r = (row + 1) % 3;
                const c = (col + 1) % 3;
                const startRow = 3 * Math.floor(row / 3);
                const startCol = 3 * Math.floor(col / 3);
                if (count(board[row][col])) {
                    if(board[row][col].done==false){
                        op=false;
                    }
                    clearNotes(row, col);
                    board[row][col].done=true;
                    printB();
                    let num=board[row][col].data;
                    //alert('1fixed:' +num);
                } else {
                    console.log('Entered else: '+row+' '+col);
                    let f = 4;
                    let ptr = board[row][col];
                    
                    while (ptr !== null) {
                        const num = ptr.data;
                        console.log('searching for:'+num);
                        for (let i = 0; i < 3; i++) {
                            for (let j = 0; j < 3; j++) {
                                if (!(startRow + i == row && startCol + j == col)) {
                                    let abc=board[startRow + i][startCol + j];
                                    display(abc);
                                    while(abc!==null){
                                        console.log('comparing: '+num+' '+abc.data);
                                        if(num==abc.data){
                                            f=0;
                                        }
                                        abc=abc.next;
                                    }
                                    
                                }
                            }
                        }
                        
                        

                        if (f === 4) {
                            if (ptr !== null) {
                                let ptr3 = board[row][col];
                                let ptr10;

                                while (ptr3 !== null) {
                                    ptr10 = ptr3.next;
                                    if (ptr3.data !== num) {
                                        board[row][col]=deleteKey(board[row][col], ptr3.data);
                                        display(board[row][col]);
                                    }
                                    ptr3 = ptr10;
                                }
                            }

                            if (count(board[row][col])) {
                                console.log('*************************');
                                clearNotes(row, col);
                            }
                            op=false
                            ptr.done = true;
                            console.log(num+' '+ptr.done);
                            printB();
                            //alert('2fixed: '+num);;
                            break;
                        }

                        ptr = ptr.next;
                        f = 4;
                    }
                    //alert('Entered else: '+row+' '+col);
                }
                //alert(row+' '+col);
            }
            //alert(row);
        }
        printB();
        //alert('first stage completed')

        let f, num, k, lol = 0;
        for (let row = 0; row < N; row++) {
            for (let col = 0; col < N; col++) {
                console.log(row+' '+col);
                //alert(row+' '+col+' '+board[row][col].done);
                if (board[row][col].done == false) {
                    //alert('Entered if');
                    let ptr = board[row][col];

                    while (ptr !== null) {
                        for (k = 0; k < N; k++) {
                            if (k !== col) {
                                let ptr100 = board[row][k];

                                while (ptr100 !== null) {
                                    console.log('Comparing: '+ptr100.data+' '+ptr.data);
                                    if (ptr100.data === ptr.data) {
                                        lol = 1;
                                        break;
                                    }
                                    ptr100 = ptr100.next;
                                }
                            }

                            if (lol === 1) {
                                break;
                            }
                        }

                        if (lol === 0) {
                            num = ptr.data;
                            if (ptr !== null) {
                                let ptr3 = board[row][col];
                                let ptr10;

                                while (ptr3 !== null) {
                                    ptr10 = ptr3.next;
                                    if (ptr3.data !== num) {
                                        board[row][col]=deleteKey(board[row][col], ptr3.data);
                                        display(board[row][col]);
                                    }
                                    ptr3 = ptr10;
                                }
                            }

                            if (count(board[row][col])) {
                                clearNotes(row, col);
                            }
                            op=false;
                            ptr.done = true;
                            console.log(num+' '+ptr.done);
                            printB();
                            //alert('3fixed: '+num);
                            break;
                        } else {
                            lol = 0;
                        }

                        ptr = ptr.next;
                    }
                }
            }
        }
        printB();
        //alert('second stage completed');

        lol = 0;
        for (let row = 0; row < N; row++) {
            for (let col = 0; col < N; col++) {
                console.log(row+' '+col);
                //alert(row+' '+col+' '+board[row][col].done);
                if (board[row][col].done === false) {
                    //alert('Entered if');
                    let ptr = board[row][col];

                    while (ptr !== null) {
                        for (k = 0; k < N; k++) {
                            if (k !== row) {
                                let ptr100 = board[k][col];
                                console.log('row: '+k);
                                display(board[k][col]);

                                while (ptr100 !== null) {
                                    console.log('Comparing: '+ptr100.data+' '+ptr.data);
                                    if (ptr100.data === ptr.data) {
                                        lol = 1;
                                        break;
                                    }
                                    ptr100 = ptr100.next;
                                }
                            }
                        }

                        if (lol === 0) {
                            num = ptr.data;
                            if (ptr !== null) {
                                let ptr3 = board[row][col];
                                let ptr10;

                                while (ptr3 !== null) {
                                    ptr10 = ptr3.next;
                                    if (ptr3.data !== num) {
                                        board[row][col]=deleteKey(board[row][col], ptr3.data);
                                        display(board[row][col]);
                                    }
                                    ptr3 = ptr10;
                                }
                            }

                            if (count(board[row][col])) {
                                clearNotes(row, col);
                            }
                            op=false;
                            ptr.done = true;
                            console.log(num+' '+ptr.done);
                            printB();
                            //alert('4fixed: '+num);
                            break;
                        } else {
                            lol = 0;
                        }

                        ptr = ptr.next;
                    }
                }
            }
        }
        printB();
        //alert('3rd stage completed');

        console.log('Reached the end of the loop');
        printB();
        //alert('Reached the end of the loop');
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                console.log(`row: ${i} col: ${j}`);
                let ptr99 = board[i][j];

                while (ptr99 !== null) {
                    console.log(`${ptr99.data} `);
                    ptr99 = ptr99.next;
                }
                
            }
        }
        for(num=1;num<10;num++){
            for(k=0;k<3;k++){
                console.log('k: '+k);
                for(l=0;l<3;l++){
                    console.log('l: '+l);
                    let f=-2;
                    for(i=0;i<3;i++){
                        console.log('i: '+i);
                        for(j=0;j<3;j++){
                            let ptr=board[3*k+i][3*l+j];
                            while(ptr!=null){
                                console.log('comparing:'+ptr.data+' '+num);
                                if(ptr.data==num && ptr.done==false){
                                    //alert(num+' found at '+(3*k+i)+' '+(3*l+j));
                                    if(f==0){
                                        f=k*3+i;
                                        break;
                                    }else{
                                        f=-1
                                        break;
                                    }
                                }
                                ptr=ptr.next;
                            }
                            if(f==-1){
                                break;
                            }
                        }
                        if(f==-1){
                            break;
                        }
                    }
                    console.log('f:'+f);
                    if(f==-1||f==-2){
                        f=-2;
                    }else{
                        printB();
                        console.log('k: '+k+' l: '+l+' rowwise');
                        console.log('Clearing notes of '+num+' in the row: '+f);
                        //alert('Clearing');
                        for (let a = 0; a < N; a++) {
                            if (Math.floor(a/3) !== l) {
                                console.log('row: '+a);
                                console.log('Deleting at location '+'row:'+f+'col: '+a);
                                board[f][a]=deleteKey(board[f][a], num);
                                op=false;
                                display(board[f][a]);
                            }
                        }
                        //alert('cleared');
                    }
                    //alert('box over');
                    f=-2;
                    for(j=0;j<3;j++){
                        for(i=0;i<3;i++){
                            let ptr=board[3*k+i][3*l+j];
                            while(ptr!=null){
                                if(ptr.data==num){
                                    if(f==0){
                                        f=3*l+j;
                                        break;
                                    }else{
                                        f=-1
                                        break;
                                    }
                                }
                                ptr=ptr.next;
                            }
                            if(f==-1){
                                break;
                            }
                        }
                        if(f==-1){
                            break;
                        }
                    }
                    if(f==-1||f==-2){
                        f=-2;
                    }else{
                        printB();
                        console.log('k: '+k+' l: '+l+' columnwise');
                        console.log('Clearing notes of '+num+' in the col: '+f);
                        //alert('Clearing');
                        for (let a = 0; a < N; a++) {
                            if (Math.floor(a/3) !== k) {
                                console.log('row: '+a);
                                console.log('Deleting at location :'+'row: '+a+' col: '+f);
                                board[a][f]=deleteKey(board[a][f], num);
                                op=false;
                                display(board[a][f]);
                            }
                        }
                        //alert('cleared');
                    }
                    f=-2;
                }
            }
        }
        

        printB();
        //alert('Reached the end of the loop');
        if(op){
            const list = document.getElementById("end");

            list.innerHTML = "Either this is impossible to solve or this requires tactic that i don't have. Any way, this is the maximum I could find out.";
            console.log('Cannot solve this sudoku!!!!');
            break;
        }else{
            op=true;
        }
        
    }
    //printBoard(board);
    if(done()){
        /*let board2 = new Array(N).fill(0).map(() => new Array(N).fill(null));
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                board2[i][j] = null;
            }
        }
        for(let row=0;row<N;row++){
            for(let col=0;col<N;col++){
                let ptr=board[row][col];
                while(ptr!=null){
                    if(board2[row][col]==null){
                        board2[row][col] = { data: ptr.data, done: false, next: null };
                    }else{
                        board2[row][col]=push(board2[row][col],ptr.data);
                    }
                    ptr=ptr.next;
                }
                if(count(board2[row][col])){
                    board2[row][col].done=true;
                }
            }
        }*/
        for(let a=0;a<N;a++){
            for(let b=0;b<N;b++){
                if(board[a][b]==null)
                    alert('Found a null at '+a+' '+b);
            }
        }
        //alert('backtracking');
        if(!backtracking(0,0)){
            const list = document.getElementById("end");

            list.innerHTML = "Either this is impossible to solve or this requires tactic that i don't have. Any way, this is the maximum I could find out.";
            console.log('Cannot solve this sudoku!!!!');
        }else{
            
        }
    }
    if(!done()){
        const endTime = performance.now()/1000;
        //alert(endTime);
        //endtime=(d.getHours())*3600+(d.getMinutes())*60+(d.getSeconds());
        const list = document.getElementById("end");
        const time=endTime-startTime;
            //alert(time);
            //alert("Time taken to solve: "+`${time}`+" s");
        list.innerHTML = "Time taken to solve: "+`${time}`+" s";
        printBoard();
    }
}