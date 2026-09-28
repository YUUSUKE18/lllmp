package main

import "fmt"

func main() {
    target := 0
    pairs := 0

    for i := 0; i < 100; i++ {
        line := fmt.Scan().String()
        if line == "" {
            continue
        }
        if _, err := strconv.Atoi(line); err == nil {
            num := int(line)
            if num >= 0 && num <= 2**63-1 {
                if target+num == 0 {
                    pairs++
                }
            }
        }
    }

    fmt.Println("pairs=", pairs)
}
