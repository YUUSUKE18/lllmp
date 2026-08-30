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
	var count int
	var sum int64 = 0
	actualCount := 0

	// 1行目を読み取り、続く整数の個数を取得
	if sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			// 1行目が空の場合は処理を終了（あるいはエラーとするが、ここでは読み取れた個数を0とする）
			fmt.Printf("count=0 sum=0\n")
			return
		}
		// 1行目の値が整数であることを確認し、個数を取得
		parsedCount, err := strconv.Atoi(line)
		if err != nil {
			// 1行目が整数でない場合は、読み取れた個数を0として処理を終了
			fmt.Printf("count=0 sum=0\n")
			return
		}
		count = parsedCount
	} else {
		// 入力が空の場合
		fmt.Printf("count=0 sum=0\n")
		return
	}

	// 2行目以降を読み取り、合計を計算
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
	}

	// 実際に読み取れた個数と合計を出力
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
