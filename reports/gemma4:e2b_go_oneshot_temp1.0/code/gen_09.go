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
	input, _ := os.ReadFile(0) // 標準入力全体を読み込む（実際にはScannerを使う方が効率的だが、ここではシンプルに）
	data := strings.TrimSpace(string(input))
	if data == "" {
		fmt.Println("count=0 sum=0")
		return
	}

	// カンマで分割
	parts := strings.Split(data, ",")

	// 重複を除いた整数を格納するセット（mapを使用）
	uniqueNumbers := make(map[int64]bool)

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}
		n, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}
		uniqueNumbers[n] = true
	}

	// 重複を除いた要素をリストに変換
	var uniqueList []int64
	for num := range uniqueNumbers {
		uniqueList = append(uniqueList, num)
	}

	// 個数を求める（重複除去済みなので、マップのサイズが個数になる）
	count := len(uniqueList)

	// 合計を求める
	var sum int64 = 0
	for _, num := range uniqueList {
		sum += num
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
