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
	// 標準入力からデータを読み込む
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		// 入力が空の場合は終了
		return
	}
	line := scanner.Text()

	// カンマで分割して文字列のスライスを取得
	parts := strings.Split(line, ",")

	// 重複を除いた整数を格納するためのマップ（セットとして機能させるため）
	uniqueNumbers := make(map[int]bool)

	// 整数を処理する
	for _, part := range parts {
		// 前後の空白をトリム
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数に変換を試みる
		num, err := strconv.Atoi(trimmedPart)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 重複を除外して格納
		uniqueNumbers[num] = true
	}

	// ユニークな整数をスライスに変換
	var uniqueList []int
	for num := range uniqueNumbers {
		uniqueList = append(uniqueList, num)
	}

	// 個数と合計を計算するためにソートする（必須ではないが、処理の安定性を高める）
	sort.Ints(uniqueList)

	count := len(uniqueList)
	var sum int64 = 0

	// 合計を計算
	for _, num := range uniqueList {
		// 合計は64bit整数の範囲に収まる（Atoiで読み込んだ値がint型なので、int64にキャストして加算する）
		sum += int64(num)
	}

	// 結果を標準出力に出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
