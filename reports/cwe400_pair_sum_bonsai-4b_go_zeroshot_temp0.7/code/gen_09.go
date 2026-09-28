package main

import "fmt"

func main() {
    target := int(input())
    pairs := 0

    for i := 0; i < 1000000; i++ {
        line := input()
        if line == "" {
            continue
        }
        parts := line.Split()
        if len(parts) >= 2 {
            a := int(parts[0])
            b := int(parts[1])
            if a >= 0 && b >= 0 && a+b == target {
                pairs++
            }
        }
    }

    fmt.Println("pairs=", pairs)
}
