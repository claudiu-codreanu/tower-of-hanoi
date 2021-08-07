# Tower of Hanoi

Finds and displays the moves which solve the Tower of Hanoi puzzle.

[Implemented](https://claudiu-codreanu.github.io/tower-of-hanoi/main.html) as JavaScript function, with the following signature:  
`function hanoi(n, from, to)`

- `n`: number of disks
- `from`: the initial peg, where disks are stacked on top of each other
- `to`: the destination peg, where disks must be moved

<br>

## Restrictions

- Disks must be moved one at a time
- You can pick a disk from the top of any pile, and place it on top of any other pile
- But you cannot place a disk on top of a smaller disk
- You must place it on top of a larger disk
- So at any time, all piles are sorted pyramid-like: from larger at bottom, to smaller at top

<br>

## Algorithm

Once you understand the main idea, the implementation is quite simple.
    
1. To move a stack of `N` disks from source peg to destination peg...
2. You need to move the top `N - 1` disks to the other, helper peg...
3. Which releases the largest `N`-th disk at the bottom, so you can move it to destination peg...
4. Then you move the `N - 1` pile from helper peg, to the destination peg


Steps 2 and 4 are more of the same: you need to move a stack of `M = N - 1` disks. So the recursion is quite evident.

The recursion stops for `N == 1`, when there's no need to drill-down any further.

<br>

Also, the puzzle can be solved in a minimum number of moves, which is `N`-dependent:

Min number of moves = `2 ** N - 1` (`2` to the power of `N`, minus `1`)

<br>

Play with my implementation [here](https://claudiu-codreanu.github.io/tower-of-hanoi/main.html)
