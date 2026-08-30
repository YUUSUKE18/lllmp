package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	if sc.Scan() {
		line := sc.Text()
		fields := strings.Split(line, ",")
		count := 0
		maxValue := int64(-9223372036854775808) // 64bit int64の最小値で初期化（安全のため）
		foundNumber := false

		for _, field := range fields {
			trimmedField := strings.TrimSpace(field)
			if trimmedField == "" {
				continue
			}

			n, err := strconv.ParseInt(trimmedField, 10, 64)
			if err != nil {
				// 整数として解釈できない要素は無視する
				continue
			}

			count++
			if n > maxValue {
				maxValue = n
			}
			foundNumber = true
		}

		if foundNumber {
			fmt.Printf("count=%d max=%d\n", count, maxValue)
		} else {
			// 整数要素が一つもなかった場合（全て無視された場合）の処理。
			// 仕様上、空の入力や数字がない場合の挙動は明記されていないが、
			// ここでは読み込んだ有効な要素数と最大値を報告する。
			fmt.Printf("count=%d max=%d\n", count, maxValue)
		}
	}
}
