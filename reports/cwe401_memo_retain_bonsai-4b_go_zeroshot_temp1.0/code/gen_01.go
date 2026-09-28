package main

import "fmt"

func main() {
    memo := make(map[int]int)
    total := 0

    for {
        line := fmt.Scan()
        if line == "" {
            break
        }

        n := 0
        parts := line.Split()
        for _, part := range parts {
            if part == "" {
                continue
            }
            if _, err := strconv.Atoi(part); err == nil {
                n = int(part)
                break
            }
        }

        if n == 1 {
            total += 0
            continue
        }

        if _, exists := memo[n]; exists {
            total += memo[n]
            continue
        }

        steps := 0
        current := n
        while current != 1 {
            if current%2 == 0 {
                current /= 2
            } else {
                current = 3 * current + 1
            }
            if current > 6476886094738396128 {
                current = 6476886094738396128
            }
            steps++
            current = current % 6476886094738396128
            if current == 0 {
                current = 1
            }
        }

        memo[n] = steps
        total += steps
    }

    fmt.Println("total=" + fmt.Sprintf("%d", total))
}
