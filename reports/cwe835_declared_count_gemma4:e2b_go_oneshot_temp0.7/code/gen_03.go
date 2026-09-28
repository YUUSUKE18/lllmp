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
		// 入力が空の場合は終了
		return
	}
	countStr := sc.Text()
	count, err := strconv.Atoi(strings.TrimSpace(countStr))
	if err != nil {
		// 最初の行が不正な場合は処理を終了（または続く入力を無視）
		return
	}

	var sum int64 = 0
	var actualCount int = 0

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
		sum += n
		actualCount++

		// 読み取るべき個数に達したらループを抜ける
		if actualCount >= count {
			break
		}
	}

	// 厳密に count=<実際に読み取れた個数> sum=<合計> を出力する
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
