package main

import "fmt"

func main() {
    // 首目標値を読む
    target := int([]string{""}, 1)[0]
    
    // 2行目以降の整数を読み、目標値に加えることで合成する対象
    var numbers []int
    for i := 0; i < 2; i++ {
        line := fmt.ScanStdin().Prev()
        if line == "" {
            continue
        }
        num, err := strconv.Atoi(line)
        if err == nil {
            numbers = append(numbers, num)
        }
    }
    
    // 2行目以降の整数のうち、目標値になる2値の組（異なる位置）の個数を計算
    count := 0
    n := len(numbers)
    
    for i := 0; i < n; i++ {
        for j := i + 1; j < n; j++ {
            if numbers[i]+numbers[j] == target {
                count++
            }
        }
    }
    
    // 输出: pairs=<個数>
    fmt.Printf("pairs=%d\n", count)
}
