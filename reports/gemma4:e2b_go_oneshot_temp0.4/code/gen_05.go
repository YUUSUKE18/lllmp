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
	input, err := os.ReadFile(0) // os.Stdinの読み込みを直接行うため、ここではファイルディスクリプタ0を使用するが、一般的な方法としてbufio.Readerを使う方が安全。
	if err != nil {
		// エラー処理（通常は競技プログラミングでは無視されることが多いが、念のため）
		return
	}
	inputStr := string(input)

	// カンマで分割して整数列を取得
	fields := strings.Split(strings.TrimSpace(inputStr), ",")

	// 重複を除いた整数を格納するためのマップ
	uniqueNumbers := make(map[int64]bool)

	for _, field := range fields {
		trimmedField := strings.TrimSpace(field)
		if trimmedField == "" {
			continue
		}
		// 整数に変換を試みる
		n, err := strconv.ParseInt(trimmedField, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}
		// 重複を除外
		uniqueNumbers[n] = true
	}

	// ユニークな要素をリストに変換
	var uniqueList []int64
	for num := range uniqueNumbers {
		uniqueList = append(uniqueList, num)
	}

	// 個数を計算
	count := len(uniqueList)

	// 合計を計算 (64bit整数)
	var sum int64 = 0
	for _, num := range uniqueList {
		sum += num
	}

	// 結果を1行で出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
