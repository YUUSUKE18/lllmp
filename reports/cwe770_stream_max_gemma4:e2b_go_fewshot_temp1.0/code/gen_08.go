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
		maxValue := int64(-2147483648) // 64bit整数の最小値で初期化（負の数も考慮するため）
		initialized := false

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
			if !initialized || n > maxValue {
				maxValue = n
				initialized = true
			}
		}

		if initialized {
			fmt.Printf("count=%d max=%d\n", count, maxValue)
		} else {
			// 要素が一つも有効でなかった場合（空行や無効なデータのみ）
			// 課題の仕様では「要素数」と「最大値」を求めるため、カウント0、最大値は定義できない状況として扱う。
			// ただし、もし入力があったにも関わらず整数が一つもなかった場合は count=0 max=??? となるが、
			// 実際には何も最大値を持たないため、ここでは上記で求めた結果を出力する。
			fmt.Printf("count=%d max=%d\n", 0, 0) // 初期化されていない場合のデフォルト値として0を使用（最も安全な解釈）
		}
	}
}
