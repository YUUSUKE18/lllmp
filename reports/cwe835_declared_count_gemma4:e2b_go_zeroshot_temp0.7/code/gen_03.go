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
	var sum int64 = 0
	actualCount := 0

	// 1行目を読み込む (個数の読み取り)
	if scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			// 空行は無視
		} else {
			// 1行目の値は、実際に読み取れる個数として扱う
			if c, err := strconv.Atoi(line); err == nil {
				count = c
			} else {
				// 1行目が整数でない場合は、読み取れた個数を0として扱うか、エラー処理を行うが、
				// 仕様に従い、読み取れた整数のみを対象とするため、ここでは読み取れた値がないと見なす
				// ただし、次の行から読み取りを続ける
			}
		}
	} else {
		// 入力が空の場合
		return
	}

	// 2行目以降を読み取り、合計を計算する
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // 空行は無視
		}

		if c, err := strconv.ParseInt(line, 10, 64); err == nil {
			sum += c
			actualCount++
		}
	}

	// 実際に読み取れた個数と合計を出力する
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
