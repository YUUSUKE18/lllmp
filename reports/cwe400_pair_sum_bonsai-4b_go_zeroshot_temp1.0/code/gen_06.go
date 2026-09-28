package main

import "fmt"

func main() {
    target := int(os.Stdin.readline())
    pairs := 0

    for {
        line := os.Stdin.readline()
        if line == "" {
            break
        }
        if _, err := line.Parseint(64); err == nil {
            a := int(line)
            if target-a == 0 {
                pairs++
            }
        }
    }

    fmt.Println("pairs=", pairs)
}
