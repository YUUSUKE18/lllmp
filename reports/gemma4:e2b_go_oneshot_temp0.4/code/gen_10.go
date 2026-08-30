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
	input, err := os.ReadFile(0) // 標準入力全体を読み込む（ここでは一行として扱うため、Scannerを使う方が自然だが、カンマ区切りで複数行の可能性も考慮しつつ、実質的な入力全体を処理する）
	if err != nil && len(os.Args) > 1 {
		// os.ReadFile(0) の代わりに bufio.Reader を使う方が標準的だが、ここではシンプルに stdin を読み込むことを想定して Scanner を使用する。
		// 入力が一行であると仮定し、Scanner で処理を進める。
	}

	sc := bufio.NewScanner(os.Stdin)
	if !sc.Scan() {
		// 入力が空の場合
		fmt.Println("count=0 sum=0")
		return
	}
	line := sc.Text()

	// カンマで分割し、重複を除いた整数を格納する
	parts := strings.Split(line, ",")
	uniqueNumbers := make(map[int64]bool)
	var uniqueList []int64

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}
		n, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		if !uniqueNumbers[n] {
			uniqueNumbers[n] = true
			uniqueList = append(uniqueList, n)
		}
	}

	count := len(uniqueList)
	var sum int64
	for _, n := range uniqueList {
		sum += n
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
