package main

import "fmt"

var memo = make(map[int]int)

func compute(n int) int {
    if n == 1 {
        return 0
    }
    if memo[n] != 0 {
        return memo[n]
    }
    var result = 0
    for i := 0; i < n; i++ {
        if i%2 == 0 {
            result += compute(i/2)
        } else {
            result += compute(3*i + 1)
        }
    }
    memo[n] = result
    return result
}

func main() {
    var line string
    for {
        line = fmt.Scan().String()
        if line == "" {
            break
        }
        parts := line.Split(" ")
        if len(parts) == 0 {
            continue
        }
        var nums []int
        for _, s := range parts {
            val, _ := strconv.Atoi(s)
            if val > 0 {
                nums = append(nums, val)
            }
        }
        if len(nums) == 0 {
            continue
        }
        total := 0
        for _, n := range nums {
            total += compute(n)
        }
        fmt.Printf("%d\n", total)
    }
}
