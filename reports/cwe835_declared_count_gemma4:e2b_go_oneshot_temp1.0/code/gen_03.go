package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)

	// 1行目から整数個数を読み込む
	if !scanner.Scan() {
		// 入力が空の場合は終了
		return
	}
	countStr := scanner.Text()
	count, err := strconv.Atoi(strings.TrimSpace(countStr))
	if err != nil {
		// 最初の行が不正な場合は処理を終了（仕様上、countは存在すると仮定）
		return
	}

	var sum int64 = 0
	var actualCount int = 0

	// 2行目以降から整数を読み込む
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // 空行は無視
		}

		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // 整数として解釈できない行は無視
		}

		// 実際に読み取れた整数のみを対象とする
		sum += num
		actualCount++

		// 読み取るべき個数に達したらループを抜ける (ただし、実際の読み取り数はそれに依存する)
		// 仕様：「実際に読み取れた整数だけを対象とします」となっているため、countの制約は読み取り操作のトリガーとして使用するのではなく、
		// 読み取り可能な行をすべて処理する方針で進める。
		// もし「count」が厳密な読み取り行数を意味するなら、以下のように修正が必要になるが、
		// 「実際に読み取れた整数だけ」を重視し、入力ストリームの終了まで読み取る。
	}

	// 厳密に「読み取れた整数だけ」を対象とするため、実際の読み取り数をcountとして出力する
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
