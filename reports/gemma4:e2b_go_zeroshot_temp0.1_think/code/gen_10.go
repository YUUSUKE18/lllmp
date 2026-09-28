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
		// エラー処理（EOFは正常終了として扱う）
		return
	}

	// 読み込んだ文字列をトリムし、空白や改行を除去する
	input = strings.TrimSpace(input)

	if input == "" {
		// 入力が空の場合は何も出力しない
		fmt.Println("count=0 sum=0")
		return
	}

	// カンマで分割してトークンを取得する
	tokens := strings.Split(input, ",")

	// 重複を除いた整数を格納するためのマップ
	uniqueNumbers := make(map[int]struct{})

	// 整数を処理する
	for _, token := range tokens {
		// トークンから前後の空白を除去
		trimmedToken := strings.TrimSpace(token)
		if trimmedToken == "" {
			continue
		}

		// 整数に変換を試みる
		num, err := strconv.Atoi(trimmedToken)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 重複チェックと格納
		uniqueNumbers[num] = struct{}{}
	}

	// 個数と合計を計算する
	count := len(uniqueNumbers)
	sum := int64(0)

	for num := range uniqueNumbers {
		sum += int64(num)
	}

	// 結果を出力する
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
