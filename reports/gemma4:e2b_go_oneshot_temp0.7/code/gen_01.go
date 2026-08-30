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
	input, err := os.ReadFile(0) // os.Stdin をファイルディスクリプタ 0 として読み込む
	if err != nil {
		return
	}
	data := strings.TrimSpace(string(input))

	if data == "" {
		fmt.Println("count=0 sum=0")
		return
	}

	// カンマで分割し、各要素を処理する
	parts := strings.Split(data, ",")
	
	// 重複を除いた整数を格納するためのマップ
	uniqueNums := make(map[int64]bool)
	var sum int64 = 0

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}
		
		// 整数に変換を試みる
		n, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 重複チェックと合計の計算
		if !uniqueNums[n] {
			uniqueNums[n] = true
			sum += n
		}
	}

	// 個数を取得
	count := int64(len(uniqueNums))

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
