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
		parts := strings.Split(line, ",")
		count := 0
		maxValue := int64(-2147483648) // 64bit整数の最小値で初期化 (負の数を考慮するため)
		found := false

		for _, part := range parts {
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart == "" {
				continue
			}

			n, err := strconv.ParseInt(trimmedPart, 10, 64)
			if err != nil {
				// 整数として解釈できない要素は無視
				continue
			}

			count++
			if !found || n > maxValue {
				maxValue = n
				found = true
			}
		}

		if found {
			fmt.Printf("count=%d max=%d\n", count, maxValue)
		} else {
			// 整数として有効な要素が一つもなかった場合（空の入力や全て無効な入力の場合）
			// この仕様では、例えば0個かつ最大値は未定義となる。
			// 一般的に、データが存在しない場合はcount=0, max=適切なデフォルト値とする。
			// ここでは、有効な要素が一つもなかった場合は count=0 とし、maxは初期値のまま出力する（または仕様に合わせて調整）。
			// 厳密には「最大値」がないため、ここでは空の場合にどうするかを定義する必要があるが、
			// 読み取ったデータから算出した結果として、count=0, max=初期値となる。
			fmt.Printf("count=%d max=%d\n", 0, maxValue)
		}
	}
}
