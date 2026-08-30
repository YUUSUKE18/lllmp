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
		// 入力が空の場合は終了
		return
	}
	countStr := strings.TrimSpace(sc.Text())
	count, err := strconv.Atoi(countStr)
	if err != nil {
		// 1行目が整数でない場合は処理を終了（仕様上は想定されないが堅牢性のため）
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

		// 読み取った個数を超えたら終了
		if actualCount >= count {
			break
		}

		// 整数として解釈を試みる
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // 整数として解釈できない行は無視
		}

		// 読み取れた整数を対象とする
		sum += n
		actualCount++
	}

	// 厳密に count=<実際に読み取れた個数> sum=<合計> を出力する
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
