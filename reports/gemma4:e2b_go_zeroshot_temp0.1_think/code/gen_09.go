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
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		// 入力がない場合は終了
		return
	}
	inputLine := scanner.Text()

	// カンマで分割してトークンを取得する
	tokens := strings.Split(inputLine, ",")

	// 重複を除いた整数を格納するためのセット（mapを使用）
	uniqueNumbers := make(map[int]struct{})
	var sum int64 = 0

	for _, token := range tokens {
		// トークンから前後の空白を削除する
		trimmedToken := strings.TrimSpace(token)

		// 空のトークンは無視する
		if trimmedToken == "" {
			continue
		}

		// 整数に変換を試みる
		num, err := strconv.Atoi(trimmedToken)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 重複チェックと合計の計算
		if _, exists := uniqueNumbers[num]; !exists {
			uniqueNumbers[num] = struct{}{}
			// 合計は64bit整数として計算する
			sum += int64(num)
		}
	}

	// 結果を出力する
	count := len(uniqueNumbers)
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
