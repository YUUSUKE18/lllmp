package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	r := bufio.NewReader(os.Stdin)
	input, _ := r.ReadString('\n')
	
	// カンマで分割
	parts := strings.Split(strings.TrimSpace(input), ",")
	
	count := 0
	maxValue := int64(-9223372036854775808) // 64bitの最小値に初期化（または-infinity相当）
	found := false

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}
		
		// 整数としてパースを試みる
		val, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}
		
		count++
		if !found || val > maxValue {
			maxValue = val
			found = true
		}
	}

	// 処理された要素が一つもなかった場合（空入力など）の対応。問題文の制約から、少なくとも1行は出力する必要があるため、0と最小値を出力する。
	if !found {
		fmt.Printf("count=0 max=%d\n", 0) // どの値もパースされなかった場合は、maxを適切に設定する必要があるが、ここでは便宜的に0とするか、仕様に従い適切な値を出す。もし入力がないなら count=0, max=?となる。ここでは最大値が定義されないため、入力がない場合はcount=0で終了させる。（ただし、この問題は「整数列を受け取る」ので、実際には最低限の出力が必要）
		// 厳密に「最大値」を求めなければならないため、もし入力が存在しないなら最大値をどう扱うか？通常は空集合の場合は定義されない。
		// 例として、入力を処理しなかった場合は count=0, max=適切なデフォルト値とするが、ここでは入力から得られた値のみを考慮する。
		// もし何も読み込まれなかった場合、count=0、maxの初期値（-9223372036854775808）を出力するべきだが、簡潔のため、パースされた値に基づいて判断する。
	}

	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
