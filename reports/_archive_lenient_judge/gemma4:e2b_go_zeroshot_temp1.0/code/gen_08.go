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
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		return
	}

	input := scanner.Text()
	parts := strings.Split(input, ",")

	// 重複を除いた整数を格納するためのマップ
	uniqueNumbers := make(map[int]struct{})

	for _, part := range parts {
		// 前後の空白を除去
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数として解釈を試みる
		num, err := strconv.Atoi(trimmedPart)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 重複を除外するためにマップに格納
		uniqueNumbers[num] = struct{}{}
	}

	// ユニークな要素をスライスに変換
	var uniqueList []int
	for num := range uniqueNumbers {
		uniqueList = append(uniqueList, num)
	}

	// 個数と合計を計算するためにソート（任意だが、集計の順序が重要でないためここでは必須ではない。ただし、後続処理のために）
	sort.Ints(uniqueList)

	count := len(uniqueList)
	var sum int64 = 0

	for _, num := range uniqueList {
		// 合計は64bit整数に収まることが保証されているため、int64で加算する
		sum += int64(num)
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
