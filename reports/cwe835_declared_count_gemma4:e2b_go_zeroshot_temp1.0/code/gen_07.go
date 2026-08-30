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

	// 1行目を読み込む (期待される個数)
	if !scanner.Scan() {
		// 入力が空の場合
		return
	}
	line1 := scanner.Text()
	
	// 1行目の値は、実際に読み取った個数とは一致しない可能性があるため、ここでは無視し、
	// 2行目以降の整数を読み取る際に、読み取れた個数として扱うことに注力する。

	var actualCount int = 0
	var sum int64 = 0
	
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

		// 読み取れた整数を対象とする
		sum += num
		actualCount++
	}

	// 最終結果を出力する
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
