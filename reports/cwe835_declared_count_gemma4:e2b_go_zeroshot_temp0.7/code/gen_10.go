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
	var count int
	var sum int64
	actualCount := 0

	// 1行目から個数を読み取る
	if scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			// 空行の場合は続行
		} else {
			// 1行目の値が続く整数の個数と解釈される
			if c, err := strconv.Atoi(line); err == nil {
				count = c
			} else {
				// 1行目が整数でない場合は処理を終了しない（仕様上、続く行を読み取る必要があるため）
				// ただし、続く行がデータとして読み取れるかどうかに依存する
			}
		}
	}

	// 2行目以降の整数を読み取る
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // 空行は無視
		}

		if actualCount < count {
			if val, err := strconv.ParseInt(line, 10, 64); err == nil {
				sum += val
				actualCount++
			}
			// 読み取れた数がcountに達したら、それ以降の行は無視する（または読み取り続ける）
		}
	}

	// 最終的な結果を出力する
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
