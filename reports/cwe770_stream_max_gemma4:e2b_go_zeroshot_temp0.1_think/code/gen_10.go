package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// 標準入力から一行を読み込む
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		// 入力がない場合は終了
		return
	}
	inputLine := scanner.Text()

	// カンマで分割してトークンを取得する
	tokens := strings.Split(inputLine, ",")

	var count int
	var maxValue int64 = -1 << 63 // 64bit整数の最小値に近い大きな値で初期化 (最小値として扱うため)
	found := false

	for _, token := range tokens {
		// 前後の空白をトリムする
		trimmedToken := strings.TrimSpace(token)

		if trimmedToken == "" {
			continue // 空の要素は無視
		}

		// 整数としてパースを試みる
		val, err := strconv.ParseInt(trimmedToken, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// 有効な整数が見つかった場合
		count++
		if val > maxValue {
			maxValue = val
		}
		found = true
	}

	// 処理された要素が一つもなかった場合は、count=0, max=（定義されないが、ここでは0または適切な値）
	// 仕様上、要素が存在しない場合の最大値の扱いは明記されていないが、
	// 少なくともcount=0として出力する。最大値は、有効な値が存在しない場合は、
	// 処理された値に基づいて決定する。
	if !found {
		// 要素が一つもなかった場合、count=0。最大値は定義できないが、
		// 0を出力するか、あるいは最大値の制約を考慮して適切な値を設定する。
		// ここでは、要素が存在しない場合は最大値を0とする（または、問題の文脈に応じて適切な値）。
		// 整数列が空の場合、最大値は通常定義されないが、ここでは0とする。
		fmt.Println("count=0 max=0")
	} else {
		// 結果を出力
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	}
}
