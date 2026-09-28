package main

import (
	"fmt"
	"os"
	"regexp"
)

func main() {
	// コンテキストに応じて行を読み込む
	input := os.Args[1]
	if input == "" {
		fmt.Println("invalid")
		return
	}

	// カンマ区切りの整数列の正規表現を定義
	// - 1〜1000000000000 の整数をカタカタで区切り、それぞれの数字列が正則表現に合う
	// - パンダントや空格は無視
	// - 末尾のカンマは許容
	// - 空行は無視
	// - 数値が正規表現に合うかを検証
	re := regexp.MustCompile(`^([0-9]+)([,\s]+)?([0-9]+)([,\s]+)?([0-9]+)([,\s]+)?([0-9]+)([,\s]+)?([0-9]+)([,\s]+)?([0-9]+)$`)

	var validCount int
	for line := range input {
		// ラインを無視する
		if len(line) == 0 {
			continue
		}

		// ラインを前後に洗い、後にも空格を除く
		line = regexp.MustCompile(`^\s+|\s+$`).ReplaceAllString(line, "")

		// 正規表現に合致するかを検証
		if re.MatchString(line) {
			// 数値が正規表現に合致した場合、割り切りされた数字列の数をカウント
			// split on commas
			parts := strings.Split(line, ",")
			validCount++
		}
	}

	// 最大1行出力
	fmt.Println("valid=" + fmt.Sprintf("%d", validCount))
}
