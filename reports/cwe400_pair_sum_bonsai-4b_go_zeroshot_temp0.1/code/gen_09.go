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
        if parts[0] == "" {
            continue
        }
        if parts[0] == "target" {
            target = int(parts[1])
            continue
        }
        if parts[0] == "pair" {
            if len(parts) >= 3 {
                a := int(parts[1])
                b := int(parts[2])
                if a + b == target {
                    pairs++
                }
            }
            continue
        }
    }

    fmt.Printf("pairs=%d\n", pairs)
}
