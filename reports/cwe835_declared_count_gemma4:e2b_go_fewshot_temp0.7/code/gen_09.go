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
	if !sc.Scan() {
		// 入力が空の場合は終了
		fmt.Println("count=0 sum=0")
		return
	}

	// 1行目から整数個数を読み込む
	line1 := sc.Text()
	count, err := strconv.Atoi(strings.TrimSpace(line1))
	if err != nil {
		// 1行目が整数でない場合は、読み取れた個数を0として扱うか、エラー処理を行うが、
		// 仕様に従い、読み取れた整数のみを対象とするため、ここでは0として処理を進める。
		// 厳密には「実際に読み取れた整数だけを対象」なので、countの読み取りに失敗した場合は、
		// それ以降の処理は行わない、または0個として扱うべきだが、ここでは最初の読み取りを基準とする。
		// ただし、後の行を読み取るフェーズで、実際に読み取れた個数と合計を計算する。
	}

	sum := 0
	actualCount := 0

	// 2行目以降を読み取る
	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue // 空行は無視
		}

		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // 整数として解釈できない行は無視
		}

		// 実際に読み取れた整数のみを対象とする
		sum += int(num)
		actualCount++
	}

	// 最終結果を出力
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
