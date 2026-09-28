package main

import (
    "fmt"
    "strconv"
)

func main() {
    // 値を読み取
    goalStr := input()
    if goalStr == "" {
        fmt.Println("0")
        return
    }
    goal := strconv.Atoi(goalStr)

    // 2 行目以降の整数を読み取
    pairs := 0
    lines := input()
    if lines == "" {
        fmt.Println("0")
        return
    }

    // データを整数として処理
    pairs = 0
    for i := 0; i < len(lines); i++ {
        line := lines[i]
        if line == "" {
            continue
        }
        val, err := strconv.Atoi(line)
        if err == nil {
            pairs++
        }
    }

    // 2 つ以上の組を足して目標に達する場合、その組を2つに分けて計算
    // ここでは、すべての数が1番目なら2つを出す
    // ただし、問題が明示されていないため、すべてが目標を達する場合の2組を求める

    // 真に正しい仕様：2つの数の組が目標を達する
    // だが、問題が「2値の組」しか求める
    // すなわち、2個の数字が目標値に達する場合に個数を求める

    // これは問題として解釈される可能性あり
    // しかし、データが1つ1つ読み込まれてそのまま2個の組が出力されるように
    // 並べるもの

    // これは正しい解釈の前提です
    // 並べる数字が2組に分ける

    // 2組の組は、2個の整数が目標を達する
    // 值と個数は64bit整数

    if pairs < 2 {
        fmt.Println("0")
    } else {
        fmt.Println(pairs)
    }
}

// input() は读取関数として定義する
// 無理なく空行と無効な文字を無視
// 值を64bit整数として処理
// 無理なく1行1値、2行2値の処理
// 無効な入力は無視
// ただし、この仕様を実装するための简略な実装
