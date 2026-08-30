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
		// 入力が空の場合
		fmt.Println("count=0 sum=0")
		return
	}
	countStr := sc.Text()
	count, err := strconv.Atoi(strings.TrimSpace(countStr))
	if err != nil {
		// 1行目が整数でない場合は、読み取れた個数を0として処理する（仕様上は1行目が整数と仮定されるが、堅牢性を高める）
		fmt.Println("count=0 sum=0")
		return
	}

	var sum int64 = 0
	var actualCount int = 0

	// 2行目以降から整数を読み込む
	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue // 空行は無視
		}

		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // 整数として解釈できない行は無視
		}

		sum += num
		actualCount++

		// 読み取った個数が指定された個数を超えた場合、それ以降の読み取りは無視する（厳密には、読み取れた整数のみを対象とするため、ここでは読み取りを続ける）
		// ただし、問題文の「実際に読み取れた整数だけを対象とします」に従い、読み取れた整数を全て集計する。
	}

	// 実際に読み取れた個数と合計を出力
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
