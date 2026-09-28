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
	
	// 1行目: 読み取れた整数の個数
	if !sc.Scan() {
		// 入力が空の場合
		fmt.Println("count=0 sum=0")
		return
	}
	countStr := sc.Text()
	count, err := strconv.Atoi(countStr)
	if err != nil {
		// 1行目が整数でない場合は、読み取れた整数は0とみなす（またはエラー処理を厳密に行うが、ここでは入力形式を仮定して進める）
		// 仕様に基づき、実際に読み取れた整数のみを対象とするため、最初の行の解釈が重要。
		// ここでは、1行目が個数を示すが、読み取り失敗時は0個として扱う。
		fmt.Println("count=0 sum=0")
		return
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

		// 読み取れた整数のみを対象とする
		totalSum += int(n)
		actualCount++
	}

	// 厳密に count=<実際に読み取れた個数> sum=<合計> を出力
	fmt.Printf("count=%d sum=%d\n", actualCount, totalSum)
}
