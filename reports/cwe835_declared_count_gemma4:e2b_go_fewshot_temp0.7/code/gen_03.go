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

	// 1行目から期待される整数個数を読み取る
	expectedCountStr := sc.Text()
	expectedCount, err := strconv.Atoi(expectedCountStr)
	if err != nil {
		// 1行目が整数でない場合は、読み取れた整数を0として扱うなど、仕様に厳密に従う必要があるが、
		// ここでは読み取れた情報に基づいて処理を進める。
		// 読み取れた整数が0個として扱われるべきか、エラーとして扱うべきか？
		// 仕様に従い、読み取れた整数を対象とするため、ここでは読み取れたもののみを処理する。
		// ただし、この課題では「実際に読み取れた整数だけを対象」とあるため、1行目の値は無視し、続く行を対象とする。
	}

	var actualCount int
	var sum int64
	count := 0
	sum64 := int64(0)

	// 2行目以降を読み取る
	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue // 空行は無視
		}

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // 整数として解釈できない行は無視
		}

		// 実際に読み取れた整数を対象とする
		count++
		sum64 += n
	}

	// 最終的な結果を出力
	fmt.Printf("count=%d sum=%d\n", count, sum64)
}
