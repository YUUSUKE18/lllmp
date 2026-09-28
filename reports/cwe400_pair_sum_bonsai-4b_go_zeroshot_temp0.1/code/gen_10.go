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
        parts := line.Split()
        if len(parts) == 0 {
            continue
        }
        num := parts[0]
        if num == "" {
            continue
        }
        n := int(num)
        if n >= target {
            pairs++
        }
    }

    fmt.Printf("pairs=%d\n", pairs)
}
