package main

import "fmt"

func main() {
    target := int(os.Stdin.readline().String())
    pairs := 0

    for os.Stdin.Read() {
        line := os.Stdin.ReadLine()
        if line == "" {
            continue
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

    fmt.Println("pairs=", pairs)
}
