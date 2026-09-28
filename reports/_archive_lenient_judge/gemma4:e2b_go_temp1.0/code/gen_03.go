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
	// 標準入力からデータを読み込む
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		// 入力がなかった場合は終了
		return
	}
	inputLine := scanner.Text()

	// カンマで分割し、各要素を処理する
	parts := strings.Split(inputLine, ",")

	// 重複を除いた整数を格納するためのマップを使用（64bit整数の合計のため）
	uniqueNumbers := make(map[int]struct{})
	var sum int64 = 0

	for _, part := range parts {
		// 前後の空白を削除
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数に変換を試みる
		num, err := strconv.Atoi(trimmedPart)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 重複チェックと合計の計算
		if _, exists := uniqueNumbers[num]; !exists {
			uniqueNumbers[num] = struct{}{}
			sum += int64(num)
		}
	}

	// 個数を取得（マップの要素数）
	count := len(uniqueNumbers)

	// 結果を標準出力に出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
