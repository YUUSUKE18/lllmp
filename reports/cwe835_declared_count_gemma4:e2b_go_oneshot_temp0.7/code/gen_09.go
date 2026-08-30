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

	// 1行目: 続く整数の個数
	if !sc.Scan() {
		// 入力が空の場合
		fmt.Println("count=0 sum=0")
		return
	}
	countStr := sc.Text()
	count, err := strconv.Atoi(strings.TrimSpace(countStr))
	if err != nil {
		// 1行目が整数でない場合、読み取れた個数は0として扱う（あるいはエラー処理）
		// 仕様上、1行目は個数として扱うため、ここでは読み取れた個数を0として処理する
		fmt.Println("count=0 sum=0")
		return
	}

	var sum int64 = 0
	var actualCount int = 0

	// 2行目以降: 整数を読み取る
	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue // 空行は無視
		}

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // 整数として解釈できない行は無視
		}

		// 読み取れた整数だけを対象とする
		sum += n
		actualCount++

		// 読み取った個数が指定された個数を超えた場合、それ以降の読み取りは無視する
		if actualCount >= count {
			break
		}
	}

	// 厳密に count=<実際に読み取れた個数> sum=<合計> を出力
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
