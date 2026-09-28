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

	inputLine := scanner.Text()
	parts := strings.Split(inputLine, ",")

	// 重複を除いた整数を格納するためのマップ
	uniqueNumbers := make(map[int]bool)
	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}
		num, err := strconv.Atoi(trimmedPart)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}
		uniqueNumbers[num] = true
	}

	// 重複を除いた整数をスライスに変換
	var uniqueList []int
	for num := range uniqueNumbers {
		uniqueList = append(uniqueList, num)
	}

	// 個数と合計を計算するためにソートする（必須ではないが、処理の明確化と念のため）
	sort.Ints(uniqueList)

	count := len(uniqueList)
	var sum int64 = 0

	for _, num := range uniqueList {
		// 合計は64bit整数の範囲に収まることが保証されているが、sum自体はint64で保持する
		sum += int64(num)
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
