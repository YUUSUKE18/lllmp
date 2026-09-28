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
	reader := bufio.NewReader(os.Stdin)
	input, err := reader.ReadString('\n')
	if err != nil && err.Error() != "EOF" {
		// エラーが発生した場合（EOF以外）は処理を終了
		return
	}

	// 読み込んだ文字列をトリムし、空白や改行を除去する
	input = strings.TrimSpace(input)

	if input == "" {
		// 入力が空の場合は何も出力しない
		fmt.Println("count=0 sum=0")
		return
	}

	// カンマで分割して整数列を得る
	parts := strings.Split(input, ",")

	// 重複を除いた整数を格納するためのセット（mapを使用）
	uniqueNumbers := make(map[int]struct{})
	var sum int64 = 0

	for _, part := range parts {
		// 各要素の前後の空白をトリム
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue // 空要素は無視
		}

		// 整数に変換を試みる
		num, err := strconv.Atoi(trimmedPart)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// 重複チェックと合計の計算
		if _, exists := uniqueNumbers[num]; !exists {
			uniqueNumbers[num] = struct{}{}
			// 合計は64bit整数で保持
			sum += int64(num)
		}
	}

	// 結果を出力
	count := len(uniqueNumbers)
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
