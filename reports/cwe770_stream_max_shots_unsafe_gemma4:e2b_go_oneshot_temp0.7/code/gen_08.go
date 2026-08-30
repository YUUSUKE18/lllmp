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
	maxValue := int64(-1 << 63) // 64bit整数の最小値に近い大きな値で初期化 (実質的な負の無限大として扱うため、最初の要素で上書きされることを期待)
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

		count++
		if !found || n > maxValue {
			maxValue = n
			found = true
		}
	}

	if count == 0 {
		// 整数が一つもなかった場合の処理 (仕様上、データがない場合はどうするか明確でないが、ここでは 0個と最大値なしとして扱うか、または入力形式に基づいた適切な値を出す)
		// 入力が空または無効な場合、count=0, max=0 などとするのが一般的だが、ここでは読み取れた整数のみを対象とする。
		// 厳密に「要素数」と「最大値」を求めよという指示に基づき、何も読み取れなかった場合は 0 を出力する。
		fmt.Println("count=0 max=0") // または適切なエラー処理だが、ここでは既出のデータがないため0とする。
	} else {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	}
}
