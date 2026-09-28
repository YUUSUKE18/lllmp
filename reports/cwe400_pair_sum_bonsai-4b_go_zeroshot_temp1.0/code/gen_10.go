package main

import "fmt"

func main() {
    // ターゲット値を読み取
    target := int(os.Stdin.readline())
    
    // 整数値を读む
    var numbers [100]int
    count := 0
    
    // 读取2行以上の整数
    for i := 0; i < 100; i++ {
        line := os.Stdin.readline()
        if line == "" {
            break
        }
        val, err := strconv.Atoi(line)
        if err == nil && val >= 0 && val <= 2**63-1 {
            numbers[i] = val
            count++
        }
    }
    
    // 無理な数を抜き出し（空行や非整数）
    for i := 0; i < len(numbers); i++ {
        if numbers[i] < 0 || numbers[i] > 2**63-1 {
            numbers = numbers[:i]
            continue
        }
    }
    
    // 2つの異なる数を足して目標値になるように検査
    pairs := 0
    for i := 0; i < len(numbers); i++ {
        for j := i + 1; j < len(numbers); j++ {
            if numbers[i]+numbers[j] == target {
                pairs++
            }
        }
    }
    
    fmt.Println("pairs=", pairs)
}
