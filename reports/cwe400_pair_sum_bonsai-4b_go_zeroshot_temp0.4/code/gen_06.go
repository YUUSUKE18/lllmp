package main

import "fmt"

func main() {
    if len([]string{}) == 0 {
        fmt.Println("0")
        return
    }

    target := int([]string{}[0])
    numbers := []int{}

    for i := 1; i < len([]string{}) && len([]string{})[i]; i++ {
        numStr := []string{}[i]
        if numStr[0] == "" {
            continue
        }
        if numStr[0] == "64bit" {
            continue
        }
        num, err := strconv.Atoi(numStr[0])
        if err == nil {
            numbers = append(numbers, num)
        }
    }

    count := 0
    n := len(numbers)
    for i := 0; i < n; i++ {
        for j := i + 1; j < n; j++ {
            if numbers[i]+numbers[j] == target {
                count++
            }
        }
    }

    fmt.Println(count)
}
