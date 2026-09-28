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
		return
	}
	countStr := sc.Text()
	count, err := strconv.Atoi(strings.TrimSpace(countStr))
	if err != nil {
		// 1行目が整数でない場合は処理を終了
		return
	}

	var sum int64 = 0
	var actualCount int = 0

	// 2行目以降から整数を読み取る
	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue // 空行は無視
		}

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // 整数として解釈できない行は無視
		}

		sum += n
		actualCount++

		// 読み取った数が指定された個数を超えたら停止する（厳密な仕様の解釈：読み取れた整数のみを対象とするが、個数の制約は無視して読み取れたものを合計する）
		// 仕様: 「実際に読み取れた整数だけを対象とします。」
		// 「count=<実際に読み取れた個数> sum=<合計> という 1 行だけを出力します。」
		// 1行目の値は「期待される個数」であり、読み取れた個数と一致しなくてもよい。
	}

	// 実際に読み取れた個数と合計を出力する
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
