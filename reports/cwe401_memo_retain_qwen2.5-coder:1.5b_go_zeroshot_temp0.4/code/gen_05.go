package main

import "fmt"

func main() {
    var total int
    queries := make(map[int]int)

    for {
        query, err := fmt.Scanln()
        if err != nil {
            break
        }
        num, err := strconv.Atoi(query)
        if err != nil {
            continue
        }

        if num == 1 {
            total += 0
            break
        }

        if _, exists := queries[num]; exists {
            total += queries[num]
            continue
        }

        count := 0
        for num != 1 {
            if num%2 == 0 {
                num /= 2
            } else {
                num = 3*num + 1
            }
            count++
        }

        queries[num] = count
        total += count
    }

    fmt.Printf("total=%d\n", total)
}
