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
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			// 空行の場合は続行
		} else {
			// 1行目の値が整数の個数
			if num, err := strconv.Atoi(line); err == nil {
				count = num
			} else {
				// 1行目が整数でなかった場合は、以降の読み取りをスキップまたはエラー処理が必要だが、
				// 仕様に従い、読み取れた整数のみを対象とするため、ここでは単に続行する。
			}
		}
	}

	// 2行目以降を読み取る
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // 空行は無視
		}

		if num, err := strconv.ParseInt(line, 10, 64); err == nil {
			// 整数として読み取れた場合、合計に加算し、実際に読み取れた個数をカウントする
			sum += num
			actualCount++
		}
		// 整数として解釈できない行は無視される
	}

	// 結果を出力する
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
