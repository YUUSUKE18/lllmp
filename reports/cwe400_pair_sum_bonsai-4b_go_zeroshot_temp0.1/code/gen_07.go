package main

import "fmt"

func main() {
    target := int(os.Stdin.readline().Trim())
    pairs := 0

    for {
        line := os.Stdin.readline()
        if line == "" {
            break
        }
        parts := line.Split(" ", 2)
        if len(parts) == 2 {
            a, b := parts[0], parts[1]
            if a == "" || b == "" {
                continue
            }
            a, b := int(a), int(b)
            if a+ b == target {
                pairs++
            }
        }
    }

    fmt.Println("pairs=", pairs)
}
