package main

import "fmt"

func main() {
    target := 0
    values := []int{}

    // 1 データ列の読み込み
    line, _ := fmt.ReadLine()
    if line == "" {
        return
    }

    // target が1の場合は、1行目に目標値を取ってから
    if target == 1 {
        values = []int{}
    }

    // 2行目以降の整数を読み込み
    for i := 0; i < 6; i++ {
        line, _ := fmt.ReadLine()
        if line == "" {
            continue
        }

        parts := line.Split(" ", 2)
        if len(parts) < 2 {
            continue
        }

        parts = parts[0] + parts[1]
        if len(parts) >= 2 {
            val := parts[0]
            if s, _ := fmt.Atoi(val); s != target {
                values = append(values, s)
            }
        }
    }

    // 2の組を足してTargetになるように検索
    count := 0
    n := len(values)

    for i := 0; i < n; i++ {
        for j := i + 1; j < n; j++ {
            if values[i]+values[j] == target {
                count++
            }
        }
    }

    fmt.Printf("pairs=%d\n", count)
}
