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

	// 1行目を読み込み、期待される整数個数を取得
	if !sc.Scan() {
		// 入力が空の場合は終了
		fmt.Println("count=0 sum=0")
		return
	}
	expectedCountStr := strings.TrimSpace(sc.Text())
	expectedCount, err := strconv.Atoi(expectedCountStr)
	if err != nil {
		// 1行目が不正な場合は、読み取れた整数を0として扱うか、エラー処理を行うが、
		// 仕様に基づき、読み取れた整数を対象とするため、ここではスキップまたはデフォルト処理を行う。
		// ただし、この課題では1行目の値が「実際に存在する個数」ではないため、読み取れた行数を基準とする。
		// ここでは、1行目を無視し、以降の行を対象とする（または、1行目を無視して0個とする）。
		// 仕様の「実際に読み取れた整数だけを対象とします」を重視し、
		// 1行目を期待値として使用せず、実際に読み取れた整数のみをカウントする。
	}

	actualCount := 0
	sum := int64(0)

	// 2行目以降を読み込み、整数を処理
	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue // 空行は無視
		}

		// 整数として解釈を試みる
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}

		// 実際に読み取れた整数を対象とする
		actualCount++
		sum += n
	}

	// 最終結果を出力
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
