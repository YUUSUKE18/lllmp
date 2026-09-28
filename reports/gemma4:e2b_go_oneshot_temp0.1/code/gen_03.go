package main

import (
	"bufio"
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"
)

func main() {
	input, err := os.ReadFile(0) // 標準入力全体を読み込む（ここでは一行として扱うため、実際にはbufio.Scannerを使う方が適切だが、仕様に合わせて調整する）
	if err != nil {
		// エラー処理は省略し、競技プログラミングの文脈では通常発生しないと仮定する
		return
	}

	data := strings.TrimSpace(string(input))
	if data == "" {
		fmt.Println("count=0 sum=0")
		return
	}

	// カンマで分割して整数列を得る
	parts := strings.Split(data, ",")

	// 重複を除いた整数を格納するためのマップ
	uniqueNumbers := make(map[int64]bool)
	var sum int64 = 0

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		n, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 重複を除外
		if !uniqueNumbers[n] {
			uniqueNumbers[n] = true
			sum += n
		}
	}

	count := len(uniqueNumbers)

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
