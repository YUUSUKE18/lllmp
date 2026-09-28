```go
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
            if len(parts) >= 2 {
                a, b := parts[1], parts[2]
                if a == "" || b == "" {
                    continue
                }
                a, b := int(a), int(b)
                if a == target || b == target {
                    pairs++
                }
            }
            continue
        }
        if parts[0] == "value" {
            if len(parts) >= 2 {
                val := parts[1]
                if val == "" {
                    continue
                }
                if val == "" {
                    continue
                }
                if val == "target" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
                }
                if val == "value" {
                    continue
                }
                if val == "pair" {
                    continue
