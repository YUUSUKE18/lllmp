package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)

	// 1行目: 続く整数の個数
	if !scanner.Scan() {
		// 入力が空の場合
		fmt.Println("count=0 sum=0")
		return
	}
	countStr := scanner.Text()
	count, err := strconv.Atoi(strings.TrimSpace(countStr))
	if err != nil {
		// 個数が不正な場合、読み取れた個数を0として扱うか、エラー処理を行うが、
		// 仕様に従い、実際に読み取れた整数のみを対象とするため、ここでは0として扱う
		fmt.Println("count=0 sum=0")
		return
	}

	var sum int64 = 0
	actualCount := 0

	// 2行目以降: 整数を読み取る
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // 空行は無視
		}

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // 整数として解釈できない行は無視
		}

		// 読み取れた整数を対象とする
		sum += n
		actualCount++

		// 読み取った個数が指定された個数を超えた場合でも、読み取れたものだけをカウントする
		// ただし、仕様では「実際に読み取れた整数だけを対象」とあるため、読み取りを続行する
	}

	// 最終結果を出力
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
