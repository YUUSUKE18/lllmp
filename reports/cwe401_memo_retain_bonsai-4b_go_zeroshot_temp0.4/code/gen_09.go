package main

import "fmt"

var memo = make(map[int]int)

func solve(n int) int {
    if memo[n] != 0 {
        return memo[n]
    }

    if n == 1 {
        memo[n] = 0
        return 0
    }

    if n%2 == 0 {
        next := n / 2
    } else {
        next := 3 * n + 1
    }

    steps := 1 + solve(next)
    memo[n] = steps
    return steps
}

func main() {
    var line string
    for {
        line = fmt.Scanln()
        if line == "" {
            break
        }
        numStr := line
        if numStr == "" {
            continue
        }
        n, err := strconv.Atoi(numStr)
        if err != nil {
            continue
        }
        if n <= 0 {
            continue
        }
        steps := solve(n)
        fmt.Printf("%d", steps)
    }
    fmt.Printf("%d\n", 0)
}
