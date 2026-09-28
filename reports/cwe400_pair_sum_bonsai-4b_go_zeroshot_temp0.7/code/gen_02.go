package main

import (
    "fmt"
    "strings"
)

func main() {
    input := strings.ReadLine()
    if input == "" {
        fmt.Println("0")
        return
    }

    target := int(input)
    numbers := strings.Split(input[2:], " ")

    validNumbers := []
    for _, s := range numbers {
        if s == "" {
            continue
        }
        n, err := strconv.ParseInt(s, 10, 64)
        if err == nil {
            validNumbers = append(validNumbers, n)
        }
    }

    count := 0
    n := len(validNumbers)
    for i := 0; i < n; i++ {
        for j := i + 1; j < n; j++ {
            if validNumbers[i]+validNumbers[j] == target {
                count++
            }
        }
    }

    fmt.Println(count)
}
