package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	input, err := os.ReadFile(0) // 標準入力全体を読み込む（ここではファイルディスクリプタ0を使用）
	if err != nil {
		// 入力エラーが発生した場合は終了
		return
	}

	content := string(input)
	
	// カンマで分割し、前後の空白を除去して整数に変換する
	parts := strings.Split(strings.TrimSpace(content), ",")

	count := 0
	var max int64 = -1 // 64bit整数として最大値を初期化。負の数が含まれる可能性があるため、適切な初期値が必要だが、問題文からは要素が存在しない場合を考慮する必要がある。ここでは最初の有効な値で更新する方針をとる。

	foundValidNumber := false
	
	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue // 空要素は無視
		}
		
		num, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		count++
		
		if !foundValidNumber {
			max = num
			foundValidNumber = true
		} else if num > max {
			max = num
		}
	}

	// 要素が一つもなかった場合、count=0, max=? の出力。最大値は未定義だが、ここでは問題の制約から要素が存在しない場合は適切に処理する必要がある。
	// 読み込んだ要素が全て無効だった場合、count=0となり、maxの値は初期値（-1）のままになる可能性がある。
	// 課題の意図に従い、有効な整数列が存在する場合のみ count と max を出力する。

	if count == 0 {
		// 何も有効な整数が見つからなかった場合。仕様に厳密に従うため、ここではcount=0, max=0などとして出力するのが安全かもしれないが、
		// 空の入力に対する挙動は明記されていないため、読み取れた有効な数のみをカウントする方針を採用する。
		// ただし、もし入力が「1,2,3」で count=3, max=3 となるべきなら、上記のロジックで正しい。
		// 0個の要素が見つかった場合は、count=0, max=0と仮定する（あるいは最大値は意味を持たないため、ここではcount=0のみを出力するが、形式を維持するため何らかの値を設定する）。
		// 例として、入力がない場合は count=0, max=0 とする。
		fmt.Printf("count=0 max=0\n")
	} else {
		fmt.Printf("count=%d max=%d\n", count, max)
	}
}
