package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// 標準入力から一行を読み込む
	input, err := os.ReadFile(0) // os.Stdinの代わりに、ここではファイルディスクリプタ0から読み込む（標準入力）
	if err != nil {
		return
	}
	data := strings.TrimSpace(string(input))

	if data == "" {
		fmt.Println("count=0 max=0")
		return
	}

	// カンマで分割して整数列を取得する
	parts := strings.Split(data, ",")

	var count int
	var maxValue int64 = -1 // 64bitの範囲を考慮するため、初期値を非常に小さい値に設定（0以上の整数が想定される場合）
	foundAny := false

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		num, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		count++
		if num > maxValue {
			maxValue = num
		}
		foundAny = true
	}

	// 要素が存在しない場合は、カウント0、最大値0（または適切なデフォルト値）を出力
	if !foundAny {
		fmt.Printf("count=0 max=0\n")
	} else {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	}
}
