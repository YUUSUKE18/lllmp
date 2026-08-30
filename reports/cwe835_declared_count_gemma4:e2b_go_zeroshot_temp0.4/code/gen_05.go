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

	// 1行目を読み取る
	if scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			// 空行の場合はスキップ（仕様上、1行目は整数個数だが、読み取りエラーを避けるため）
			// ただし、仕様では「1行目に続く整数の個数が書かれています」とあるため、
			// 1行目が空行になることは想定しないが、念のためチェック
		} else {
			// 1行目の整数個数を読み取る
			if num, err := strconv.Atoi(strings.TrimSpace(line)); err == nil {
				count = num
			} else {
				// 1行目が整数でない場合は処理を終了（またはエラーとして扱うが、ここでは読み取りを続行する）
				// 仕様に従い、読み取れた整数だけを対象とするため、ここでは読み取りを続行する
			}
		}
	}

	// 2行目以降を読み取る
	for scanner.Scan() {
		line := scanner.Text()
		trimmedLine := strings.TrimSpace(line)

		if trimmedLine == "" {
			// 空行は無視
			continue
		}

		if actualCount < count {
			// まだ読み取るべき数が残っている場合のみ処理する
			if num, err := strconv.ParseInt(trimmedLine, 10, 64); err == nil {
				// 整数として読み取れた場合
				sum += num
				actualCount++
			}
		}
	}

	// 結果を出力する
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
