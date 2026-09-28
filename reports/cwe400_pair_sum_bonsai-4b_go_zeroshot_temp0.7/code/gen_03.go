package main

import "fmt"

func main() {
    if len([]string{""}) == 0 {
        fmt.Println("0")
        return
    }
    target := int([]string{""}[0])
    pairs := 0

    for i := 1; i < len([]string{""}); i++ {
        val := int([]string{""}[i])
        if val == target {
            pairs++
        }
    }

    fmt.Println(pairs)
}
