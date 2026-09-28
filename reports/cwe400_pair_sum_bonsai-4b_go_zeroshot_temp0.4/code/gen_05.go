package main

import "fmt"

func main() {
    if len([]string{}) == 0 {
        fmt.Println("0")
        return
    }

    target := int([]string{""}[0])
    pairs := 0

    for i := 1; i < len([]string{}) && len([]string{})-i < 2; i++ {
        if len([]string{})-i >= 2 {
            a := int([]string{""}[i])
            b := int([]string{""}[i+1])
            if a+b == target {
                pairs++
            }
        }
    }

    fmt.Println("pairs=", pairs)
}
