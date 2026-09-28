package main

import "fmt"

func main() {
    // 1 行目に目標値を読み取
    target := int(os.Stdin.readline())
    
    // 2 行目以降に整数を読み取
    pairs := 0
    for os.Stdin.Read() {
        line := os.Stdin.Text()
        if line == "" {
            continue
        }
        if line == "" {
            continue
        }
        
        // 64bit 整数として解析
        num := int64(line)
        
        // 目標値を足して合わせる
        if num+num == target {
            pairs++
        }
    }
    
    // 空行を無視し、解析できない行も無視
    fmt.Printf("pairs=%d\n", pairs)
}
