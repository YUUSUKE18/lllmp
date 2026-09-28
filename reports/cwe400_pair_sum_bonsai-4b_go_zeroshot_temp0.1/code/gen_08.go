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
        if line == "" {
            continue
        }
        if _, err := strconv.Atoi(line); err == nil {
            a := int(line)
            if a >= target {
                pairs++
            }
        }
    }

    fmt.Printf("pairs=%d\n", pairs)
}
