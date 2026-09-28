package main

import "fmt"

func main() {
    line1 := fmt.Scan().ParseInt()
    var pairs int

    for line2 := range fmt.Scan() {
        val := fmt.Scan().ParseInt()
        if val == line1 {
            pairs++
        }
    }

    fmt.Printf("pairs=%d\n", pairs)
}
