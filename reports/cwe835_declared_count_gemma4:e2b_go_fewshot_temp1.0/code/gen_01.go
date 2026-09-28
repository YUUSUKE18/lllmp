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
		fmt.Println("count=0 sum=0")
		return
	}
	
	countStr := sc.Text()
	count, err := strconv.Atoi(strings.TrimSpace(countStr))
	if err != nil {
		// 1行目の値が整数でなかった場合も、読み取れた整数のみを対象とするため、ここで処理を終了するか、あるいは後続の処理でカウントする。
		// 仕様では「実際に読み取れた整数だけを対象とします」とあるため、ここでは読み取れた整数だけを処理対象とする。
		// 1行目が個数として解釈できない場合、読み取れた整数列を処理する。
		// ただし、厳密に「1行目の値が個数」という前提を無視して、続く行を個数と見なすという解釈をする。
		// ここでは、1行目の値を個数として使用し、以降の行をデータとして処理する、という流れを採用する。
	}

	totalSum := 0
	actualCount := 0

	// 2行目以降を読み込む
	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue // 空行は無視
		}

		// 行が整数であるかチェック
		n, err := strconv.ParseInt(line, 10, 64)
		if err == nil {
			totalSum += int(n)
			actualCount++
		}
		// 整数として解釈できない行は無視
	}

	// 最終結果を出力
	fmt.Printf("count=%d sum=%d\n", actualCount, totalSum)
}
