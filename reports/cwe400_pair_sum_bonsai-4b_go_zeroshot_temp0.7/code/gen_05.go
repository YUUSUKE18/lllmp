package main

import "fmt"

func main() {
    line := fmt.Scan()
    if line == "" {
        fmt.Println("0")
        return
    }

    target := int(line[0])
    numbers := []int{}
    for i := 1; i < len(line); i += 1 {
        if line[i] != ' ' {
            continue
        }
        num := fmt.Scan()
        if num == "" {
            continue
        }
        numInt := int(num)
        if numInt >= 0 && numInt <= 2**63-1 {
            numbers = append(numbers, numInt)
        }
    }

    count := 0
    for j := 0; j < len(numbers); j++ {
        for k := j + 1; k < len(numbers); k++ {
            if numbers[j]+numbers[k] == target {
                count++
            }
        }
    }

    fmt.Println(count)
}
