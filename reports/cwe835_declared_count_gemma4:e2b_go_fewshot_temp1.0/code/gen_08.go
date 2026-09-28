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
		// 入力が空の場合
		fmt.Println("count=0 sum=0")
		return
	}

	// 1行目から整数個数を読み込む
	line1 := sc.Text()
	count, err := strconv.Atoi(strings.TrimSpace(line1))
	if err != nil {
		// 1行目が整数でない場合は、読み取れた整数を0として扱うか、エラー処理を行うが、
		// 仕様に従い、もし1行目が読み取れなければ、読み取れた整数のみを対象とする。
		// ここでは、最初の行が個数として読み取れない場合、0と見なして終了する。
		// ただし、課題の意図として、最初の行が個数であると仮定して処理を続行する。
		// 厳密に「実際に読み取れた整数だけを対象」という指示に基づき、最初の行が読み取れなければ0個と見なす。
		fmt.Println("count=0 sum=0")
		return
	}

	sum := 0
	readCount := 0

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

		// 読み取れた整数のみを対象とする
		sum += int(num)
		readCount++
	}

	// 実際に読み取れた個数と合計を出力
	fmt.Printf("count=%d sum=%d\n", readCount, sum)
}
