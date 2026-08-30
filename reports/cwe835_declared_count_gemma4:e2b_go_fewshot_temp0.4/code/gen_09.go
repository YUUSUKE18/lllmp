package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	
	// 1行目から整数個数を読み込む
	if !sc.Scan() {
		// 入力が空の場合は終了
		fmt.Println("count=0 sum=0")
		return
	}
	
	// 1行目の値（整数個数）を読み取る
	line1 := strings.TrimSpace(sc.Text())
	numCount, err := strconv.Atoi(line1)
	if err != nil {
		// 1行目が整数でない場合は、読み取れた整数を0として扱うか、エラー処理を行うが、
		// 仕様に従い、読み取れた整数のみを対象とするため、ここでは読み取れた整数を基に処理を進める。
		// ただし、ここでは1行目を個数として扱うため、エラー時は0とする。
		numCount = 0
	}

	totalSum := 0
	actualCount := 0

	// 2行目以降の整数を読み取る
	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue // 空行は無視
		}

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // 整数として解釈できない行は無視
		}

		// 実際に読み取れた整数のみを対象とする
		totalSum += int(n)
		actualCount++
	}

	// 最終結果を出力
	fmt.Printf("count=%d sum=%d\n", actualCount, totalSum)
}
