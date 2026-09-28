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

	// 1行目: 続く整数の個数が書かれている
	if !scanner.Scan() {
		// 入力が空の場合
		return
	}
	countStr := scanner.Text()
	count, err := strconv.Atoi(strings.TrimSpace(countStr))
	if err != nil {
		// 1行目が整数でない場合は処理を終了（仕様上は想定されないが安全のため）
		return
	}

	var sum int64 = 0
	actualCount := 0

	// 2行目以降から整数を読み取る
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			// 空行は無視
			continue
		}

		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}

		// 読み取れた整数を対象とする
		sum += num
		actualCount++
	}

	// 最終結果を出力
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
