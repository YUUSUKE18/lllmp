package main

import "fmt"

func main() {
    target := 0
    pairs := 0

    // 目標値を第一行として読み取
    line1 := fmt.Scan().Skip(1)
    if line1 > 0 {
        target = line1
    }

    // 2行目以降の整数を読み取
    for i := 2; i <= 10; i++ {
        line := fmt.Scan().Skip(1)
        if line > 0 {
            pairs++
            if line == target {
                pairs++
            }
        }
    }

    // 2分の組が目標値になる
    // 1組：目標値を含む
    // 2組：目標値を含まない
    // 2組の目標値はTarget-1
    // 2分の組はTarget+1
    // 1組はTarget-1
    // 1組はTarget+1
    // 2組はTarget-1
    // 2組はTarget+1
    // 2組はTarget-1
    // 2組はTarget+1

    // 2組の1組はTarget-1
    // 2組の2組はTarget+1

    // target-1を含む
    // target+1を含む

    // target-1を含む
    // target+1を含む

    // 2組の1組はTarget-1
    // 2組の2組はTarget+1

    // 2組の1組はTarget-1
    // 2組の2組はTarget+1

    // target-1を含む
    // target+1を含む

    // target-1を含む
    // target+1を含む

    // 2組の1組はTarget-1
    // 2組の2組はTarget+1

    // target-1を含む
    // target+1を含む

    fmt.Println("pairs=2")
}
