package main

import "fmt"

func main() {
    goal := 0
    pairs := 0

    // 1行目に目標値を読み
    line1 := fmt.Scan().WantNewline()
    if line1 {
        s, _ := line1.String()
        if s == "" {
            // 空行は無視
            return
        }
        goal = int(s)
    }

    // 2行目以降に整数を1行に1値ずつ読み
    for i := 2; i <= 1000; i++ {
        line := fmt.Scan().WantNewline()
        if line {
            s, _ := line.String()
            if s == "" {
                continue
            }
            val := int(s)
            if val >= 0 {
                if goal == val {
                    pairs++
                } else if val < goal {
                    pairs++
                }
            }
        }
    }

    // 無理でないように空行も無視
    fmt.Printf("%d\n", pairs)
}
