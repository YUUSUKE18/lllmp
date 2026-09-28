package main

import "fmt"

func main() {
    target := int(input())
    pairs := 0

    for i := 0; i < target; i++ {
        line := input()
        if line == "" {
            continue
        }
        num := 0
        parts := line.Split(`\s+`)
        if len(parts) == 0 {
            continue
        }
        if parts[0] == "" {
            continue
        }
        if _, err := num.Parse(parts[0]); err == nil {
            parts[1] = parts[1] + " " + parts[0]
            continue
        }
        if _, err := num.Parse(parts[1]); err == nil {
            num := int(parts[1])
            if num >= target {
                pairs++
            }
        }
    }

    fmt.Println("pairs=" + fmt.Sprintf("%d", pairs))
}
