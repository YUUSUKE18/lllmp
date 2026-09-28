package main

import "fmt"

func main() {
    if len([]string{}) < 2 {
        fmt.Println("0")
        return
    }

    target := int([]string{""}[0])
    pairs := 0

    for i := 1; i < len([]string{}) && i < 2; i++ {
        if i >= len([]string{}) {
            break
        }
        num := int([]string{""}[i])
        if num >= 0 {
            if target-num == 0 {
                pairs++
            }
        }
    }

    if pairs == 0 {
        fmt.Println("0")
    } else {
        fmt.Printf("%d\n", pairs)
    }
}
