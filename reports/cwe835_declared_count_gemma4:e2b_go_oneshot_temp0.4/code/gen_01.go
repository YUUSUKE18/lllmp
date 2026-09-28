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

	// 1行目: 続く整数の個数
	if !scanner.Scan() {
		// 入力が空の場合は終了
		return
	}
	countStr := scanner.Text()
	count, err := strconv.Atoi(strings.TrimSpace(countStr))
	if err != nil {
		// 1行目が数値でない場合は処理を終了（仕様上は入力がある前提だが安全のため）
		return
	}

	var sum int64 = 0
	var actualCount int = 0

	// 2行目以降の整数を読み取る
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // 空行は無視
		}

		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // 整数として解釈できない行は無視
		}

		sum += num
		actualCount++

		// 読み取るべき個数に達したら停止する（ただし、読み取れた整数だけを対象とするため、
		// 読み取れた個数と指定された個数が異なる場合も考慮する）
		if actualCount >= count {
			break
		}
	}

	// 厳密に count=<実際に読み取れた個数> sum=<合計> を出力する
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
