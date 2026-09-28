package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)

	// 1行目: 続く整数の個数 (これは無視する)
	if !scanner.Scan() {
		// 入力が空の場合
		return
	}
	// count := 0 // 1行目の値は実際に読み取れた個数と一致しない可能性があるため、ここでは使用しない

	var sum int64 = 0
	var actualCount int = 0

	// 2行目以降を読み取る
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // 空行は無視
		}

		// 整数として解釈を試みる
		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}

		// 読み取れた整数を合計に加算し、個数をカウントする
		sum += num
		actualCount++
	}

	// 最終結果を出力
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
