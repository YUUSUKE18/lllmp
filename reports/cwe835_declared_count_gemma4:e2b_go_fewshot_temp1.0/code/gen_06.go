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
	
	// 1行目から実際に読み取れる整数の個数を取得
	if !sc.Scan() {
		// 入力が空の場合
		fmt.Println("count=0 sum=0")
		return
	}
	
	// 1行目の値を取得し、整数としてパース
	line1 := strings.TrimSpace(sc.Text())
	countStr := ""
	if strings.HasPrefix(line1, "count=") {
		countStr = strings.TrimPrefix(line1, "count=")
	} else {
		// 1行目の値がそのまま個数として扱われる場合（課題の指示に基づき、1行目を個数として扱う）
		countStr = line1
	}

	count, err := strconv.ParseInt(countStr, 10, 64)
	if err != nil {
		// 1行目のパースに失敗した場合は、読み取れた行数を0として扱う（厳密には仕様に従うが、ここでは単純化のため終了）
		fmt.Println("count=0 sum=0")
		return
	}

	sum := int64(0)
	actualCount := 0
	
	// 2行目以降を読み取る
	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue // 空行は無視
		}

		// 整数としてパースを試みる
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // 整数として解釈できない行は無視
		}

		// 実際に読み取れた整数のみを対象とする
		sum += n
		actualCount++
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
