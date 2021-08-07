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
    
		stacks[from] = [...Array(n)].map((el, i) => n - i);
        return stacks;
    }


    // step 1 in explanations above
    function moveStack(from, to, ptr) {
        
        if(isTopOfStack(ptr, stacks[from])) {
            moveTopmostElem(from, to);

            // stop the recursion
            return;
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