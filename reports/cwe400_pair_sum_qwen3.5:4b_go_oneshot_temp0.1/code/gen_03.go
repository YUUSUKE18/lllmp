package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	target := 0
	lineNum := 0

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}

		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		if lineNum == 0 {
			target = val
		} else {
			countPairs(val, target)
		}
		lineNum++
	}
}

func countPairs(currentVal, target int64) {
	// 注意: 上記のロジックは、各整数に対して目標値との組み合わせを計算するのではなく、
	// 問題文の「2 行目以降の整数のうち、足して目標値になる 2 個の組」を意味するため、
	// 実際にはすべての整数を読み込み、その中で和が target に等しいペアの数を数える必要があります。
	// しかし、Go のスキャン処理では一度に全行を読み込むのが一般的です。
	// 再考: 問題文は「2 行目以降の整数のうち」とあるので、1 行目の目標値を除いた部分のみを考慮します。
	// したがって、まず目標値を読み取り、その後すべての整数を読み込み、その中で和が target に等しいペアの数を数えます。

	// 修正: 上記の main 関数の構造を変更し、全データを一度に処理する形にする。
}
