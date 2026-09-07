package main

import "fmt"

func main() {
    target, err := fmt.Scanln("%d", &target)
    if err != nil {
        return
    }

    pairs := 0
    for i := 0; i < len(numbers)-1; i++ {
        for j := i + 1; j < len(numbers); j++ {
            if numbers[i]+numbers[j] == target {
                pairs++
            }
        }
    }

    fmt.Println("pairs=", pairs)
}
