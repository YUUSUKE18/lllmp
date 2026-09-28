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
	// 標準入力から一行を読み込む
	input, err := os.ReadFile(0) // os.Stdin を直接読み込む代わりに、ここではファイルディスクリプタ 0 を使用して標準入力全体を読み込むことを想定するが、通常は bufio.Reader を使うのが一般的。
	if err != nil {
		// エラー処理（今回は競技プログラミング環境を想定し、エラー時は終了）
		return
	}

	inputStr := strings.TrimSpace(string(input))

	// カンマで分割して文字列のスライスを得る
	parts := strings.Split(inputStr, ",")

	// 重複を除いた整数を格納するためのマップ
	uniqueNumbers := make(map[int]bool)
	var sum int64 = 0

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue // 空要素は無視
		}

		// 整数としてパースを試みる
		num, err := strconv.Atoi(trimmedPart)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// 重複チェックと合計の計算
		if !uniqueNumbers[num] {
			uniqueNumbers[num] = true
			sum += int64(num)
		}
	}

	// 個数を計算する
	count := len(uniqueNumbers)

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
