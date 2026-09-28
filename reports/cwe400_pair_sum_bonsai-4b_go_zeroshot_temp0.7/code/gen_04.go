package main

import "fmt"

func main() {
    if len([]string{}) == 0 {
        fmt.Println("0")
        return
    }

    target := int([]string{}[0])
    pairs := 0

    for i := 1; i < len([]string{}) && len([]string{})[i] != "" ; i++ {
        num := int([]string{}[i])
        if num == target {
            pairs++
        }
    }

    fmt.Println(pairs)
}
