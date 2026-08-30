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

	// 1行目から整数を読み取る (実際に存在する個数は無視する)
	if !scanner.Scan() {
		// 入力が空の場合は終了
		return
	}
	line1 := scanner.Text()
	// 1行目の値は、実際に読み取る個数の「期待値」として扱うが、
	// 実際には2行目以降のデータに基づいて処理を行うため、この値は直接使わない
	// ただし、仕様上は「実際に読み取れた個数」を答える必要がある。
	// ここでは、仕様に従い、読み取れた個数を最終結果として出力する。

	var actualCount int = 0
	var totalSum int64 = 0
	
	// 2行目以降を読み取る
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // 空行は無視
		}

		// 整数として解釈できるか試みる
		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}

		// 読み取れた整数を対象とする
		actualCount++
		totalSum += num
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", actualCount, totalSum)
}
