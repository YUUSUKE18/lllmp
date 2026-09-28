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
	reader := bufio.NewReader(os.Stdin)
	input, err := reader.ReadString('\n')
	if err != nil && err.Error() != "EOF" {
		// エラー処理（EOFは正常終了として扱う）
		return
	}

	// 入力文字列をトリムし、カンマで分割する
	input = strings.TrimSpace(input)
	if input == "" {
		// 入力が空の場合は何も出力しない
		return
	}

	tokens := strings.Split(input, ",")

	// 重複を除いた整数を格納するためのセット（mapを使用）
	uniqueNumbers := make(map[int]struct{})

	// 各トークンを処理し、整数として検証する
	for _, token := range tokens {
		// トークンから前後の空白を削除
		trimmedToken := strings.TrimSpace(token)
		if trimmedToken == "" {
			continue
		}

		// 整数に変換を試みる
		num, err := strconv.Atoi(trimmedToken)
		if err != nil {
			// 整数として解釈できない場合は無視する
			continue
		}

		// セットに追加（重複を自動的に排除）
		uniqueNumbers[num] = struct{}{}
	}

	// 個数と合計を計算する
	count := len(uniqueNumbers)
	var sum int64 = 0

	for num := range uniqueNumbers {
		// 合計は64bit整数として計算する
		sum += int64(num)
	}

	// 結果を標準出力に出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
