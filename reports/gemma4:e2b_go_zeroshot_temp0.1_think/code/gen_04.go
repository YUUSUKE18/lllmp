package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// 標準入力からデータを読み込む
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		// 入力がない場合は終了
		return
	}
	inputLine := scanner.Text()

	// カンマで分割してトークンを取得
	tokens := strings.Split(inputLine, ",")

	// 重複を除いた整数を格納するためのセット（mapを使用）
	uniqueNumbers := make(map[int]bool)
	var sum int64 = 0

	// 各トークンを処理
	for _, token := range tokens {
		// 前後の空白をトリム
		trimmedToken := strings.TrimSpace(token)

		// 空でないことを確認
		if trimmedToken == "" {
			continue
		}

		// 整数に変換を試みる
		num, err := strconv.Atoi(trimmedToken)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// 重複チェックと合計の計算
		if !uniqueNumbers[num] {
			uniqueNumbers[num] = true
			// 合計は64bit整数として計算
			sum += int64(num)
		}
	}

	// 結果を出力
	count := len(uniqueNumbers)
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
