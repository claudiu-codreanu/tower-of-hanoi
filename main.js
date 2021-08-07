
/*
    Finds and displays the moves which solve the Tower of Hanoi puzzle.

      n:       number of disks
      from:    the initial peg, where disks are stacked on top of each other
      to:      the destination peg, where disks must be moved

    Restrictions:
    
      - disks must be moved one at a time
      - you can pick a disk from the top of any pile, and place it on top of any other pile
      - but you cannot place a disk on top of a smaller disk
      - you must place it on top of a larger disk
      - so at any time, all piles are sorted pyramid-like: from larger at bottom, to smaller at top

    Algorithm:

    Once you understand the main idea, the implementation is quite simple.
    
      1. To move a stack of N disks from source peg to destination peg...
      2. You need to move the top N - 1 disks to the other, helper peg...
      3. Which releases the largest Nth disk at the bottom, so you can move it to destination peg...
      4. Then you move the N - 1 pile from helper peg, to the destination peg

    Steps 2 and 4 are more of the same: you need to move a stack of M = N - 1 disks.
    So the recursion is quite evident.

    The recursion stops for N == 1, when there's no need to drill any further.

    Also, the puzzle can be solved in a minimum number of moves, which is N-dependent:
    Min number of moves = 2 ** N - 1 (two to the power of N, minus 1)
*/

function hanoi(n, from, to) {
    from--;
    to--;

    let stacks = initStacks(n, from),
        moves = [];

    logBeginState(stacks);

    if(from != to) {
        moveStack(from, to, 0);
        assertMinMoves(n);
    }

    logEndState(stacks);
    displaySolution(moves);


    function initStacks(n, from) {
        let stacks = [
            [],
            [],
            []
        ];
    
		stacks[from] = Array(n).fill(1).map((el, i) => n - i);
        return stacks;
    }


    // step 1 in explanations above
    function moveStack(from, to, ptr) {
        
        if(isTopOfStack(ptr, stacks[from])) {
            moveTopmostElem(from, to);
            return; // stop the recursion
        }

        let other = getOtherStack(from, to),
            otherPtr = stacks[other].length;

        // step 2 in explanations above
        moveStack(from, other, ptr + 1);

        // step 3 in explanations above
        moveTopmostElem(from, to);

        // step 4 in explanations above
        moveStack(other, to, otherPtr);
    }


    function getOtherStack(from, to) {
        return [0, 1, 2].find(el => el != from && el != to);
    }


    function isTopOfStack(ptr, stack) {
        return ptr == stack.length - 1;
    }


    function moveTopmostElem(from, to) {
        let top = stacks[from].pop();
        assertSize(top, to);

        stacks[to].push(top);
        moves.push([from, to]);
    }


    function assertSize(top, dest) {
        let stack = stacks[dest],
            len = stack.length;

        if(len > 0) {
            console.assert(top < stack[len - 1]);
        }
    }


    function assertMinMoves(n) {
        let minMoves = (1 << n) - 1;
        console.assert(moves.length == minMoves);
    }
}


window.onload = () => {
    hanoi(5, 1, 3);
}


function play() {
    let numDisks = getComboValue("numDisks"),
        from = getComboValue("fromPeg"),
        to = getComboValue("toPeg");

    clearConsole();
    hanoi(numDisks, from, to);
}

function clearConsole() {
    let el = document.getElementById("console");
    el.innerText = "";
}

function getComboValue(id) {
    let el = document.getElementById(id);
    return parseInt(el.value);
}

function logBeginState(stacks) {
    log("> Begin state:");
    log("");

    displayPegs(stacks);
    log("");
    log("");
}

function logEndState(stacks) {
    log("> End state:");
    log("");

    displayPegs(stacks);
    log("");
    log("");
}

function log(msg) {
    let el = document.getElementById("console");
    el.innerText += msg + "\r\n";
}


function displaySolution(moves) {
    log(`> Finished in ${moves.length} moves:`);
    log("");

    let msg = moves.reduce((acc, move, i) => {
        let [from, to] = move;
        return acc + `\tMove ${i + 1}: ${from + 1} --> ${to + 1}\r\n`
    }, "");

    log(msg);
}

function arrayToString(a) {
    return `[${a.join(", ")}]`;
}

function displayPegs(stacks) {

    let [peg1, peg2, peg3] = stacks,
        numDisks = Math.max(peg1.length, peg2.length, peg3.length);

    let paddingOut = 4,
        paddingIn = 8;

    let spaceOut = " ".repeat(paddingOut);

    for(let i = numDisks - 1; i >= 0; i--) {
        let line =  `${spaceBefore(paddingOut, i, peg1)}${diskAt(i, peg1)}` + 
                    `${spaceBefore(paddingIn, i, peg2)}${diskAt(i, peg2)}` + 
                    `${spaceBefore(paddingIn, i, peg3)}${diskAt(i, peg3)}`  +
                    `${spaceOut}`;
        
        log(line);
    }

    let groundLine = "=".repeat(2*paddingOut + 2*paddingIn + 3);
    log(groundLine);



    function diskAt(index, peg) {
        if(index < 0 || index >= peg.length) {
            return "|";
        }
        
        return peg[index].toString();
    }

    function spaceBefore(padding, index, peg) {
        let value = diskAt(index, peg);
        return " ".repeat(padding - (value.length - 1));
    }
}