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
		return
	}

	// 1行目から実際の整数の個数を読み取る
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

		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // 整数として解釈できない行は無視
		}

		// 読み取れた整数を対象とする（実際に読み取れた整数だけを対象）
		sum += num
		actualCount++

		// 読み取るべき個数に達したらループを抜ける（もし厳密にcount個だけを読み込む必要がある場合。
		// 仕様では「実際に読み取れた整数だけを対象」とあるため、ここでは読み取れたものを全て合計する）
		// ただし、もし1行目のcountが上限として機能する場合、以下を追加する
		if actualCount >= count {
			break
		}
	}

	// 厳密に「実際に読み取れた整数だけ」を対象とするため、actualCountを使用する
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
