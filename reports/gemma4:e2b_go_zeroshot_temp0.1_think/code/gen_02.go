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

	// 入力文字列から改行文字を取り除く
	input = strings.TrimSpace(input)

	if input == "" {
		// 入力が空の場合は何も出力しない
		fmt.Println("count=0 sum=0")
		return
	}

	// カンマで分割して整数列を得る
	parts := strings.Split(input, ",")

	// 重複を除いた整数を格納するためのマップ
	uniqueNumbers := make(map[int]struct{})

	// 整数を処理し、重複を除いた集合を作成する
	for _, part := range parts {
		// 前後の空白を削除
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue // 空の要素は無視
		}

		// 整数に変換を試みる
		num, err := strconv.Atoi(trimmedPart)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// 重複チェック
		uniqueNumbers[num] = struct{}{}
	}

	// 個数と合計を計算する
	count := len(uniqueNumbers)
	sum := 0

	// 合計を計算
	for num := range uniqueNumbers {
		sum += num
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
