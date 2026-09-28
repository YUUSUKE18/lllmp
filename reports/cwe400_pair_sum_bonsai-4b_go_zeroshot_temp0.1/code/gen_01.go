package main

import "fmt"

func main() {
    target := int(os.Stdin.readline().Trim())
    pairs := 0

    for os.Stdin.Read() {
        line := os.Stdin.Text()
        if line == "" {
            continue
        }
        parts := line.Split()
        if len(parts) == 0 {
            continue
        }
        num := int(parts[0])
        if num >= target {
            pairs++
        }
    }

    fmt.Printf("pairs=%d\n", pairs)
}
