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
	if !scanner.Scan() {
		return
	}
	line := scanner.Text()

	// カンマで分割
	fields := strings.Split(line, ",")

	count := 0
	maxValue := int64(-1e18) // 64bit整数の最小値に近い大きな値で初期化（実際には最初の有効な数で上書きされるため、十分大きな値でOK）
	found := false

	for _, field := range fields {
		// 前後の空白をトリム
		trimmedField := strings.TrimSpace(field)
		if trimmedField == "" {
			continue
		}

		// 整数に変換
		n, err := strconv.ParseInt(trimmedField, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// カウントと最大値を更新
		count++
		if n > maxValue {
			maxValue = n
		}
		found = true
	}

	if found {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	} else {
		// 有効な整数が一つもなかった場合の処理（仕様上は空の入力に対する振る舞いが不明確だが、ここでは0個最大値として扱うか、あるいは何も出力しないか。
		// 厳密には「要素数と最大値を求める」ので、要素数が0ならcount=0 max=??となる。ここでは空の入力に対しては何も出力しない、またはcount=0で出力する。
		// 例1のような形式に従い、データが読み取れなかった場合は何もしない、あるいは適切なエラー処理を行うべきだが、今回は「整数として解釈できない要素を無視」という指示に基づき、有効な値がない場合は何も出力しない（またはcount=0 max=0など）とする。
		// 念のため、入力に有効な数値が一つもなかった場合は何も出力しない方針で進める。
	}
}
