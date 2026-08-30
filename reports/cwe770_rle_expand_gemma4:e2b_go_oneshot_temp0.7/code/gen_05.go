package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	var input string
	if _, err := fmt.Scan(&input); err != nil {
		// 標準入力から一行全体を読み込むため、ここでは標準入力全体を読み込む処理を再考する必要があります。
		// 課題の例に合わせて、標準入力から与えられた文字列全体を処理するように実装します。
		// 実際には、本問の入力形式は「値:回数,値:回数,...」の文字列全体が1行として与えられると解釈します。
		// 例: 7:3,2:2
		// fmt.Scan(&input) は最初のトークン（7:3）しか読み込まない可能性があるため、
		// bufio.Readerを使って一行全体を読み込む方が安全です。
		
		// 標準入力全体を読み込む
		scanner := bufio.NewScanner(os.Stdin)
		if scanner.Scan() {
			input = scanner.Text()
		} else {
			// 入力がない場合は終了
			return
		}
	}

	// 入力文字列をカンマで分割して個々の要素（値:回数）を取得
	parts := strings.Split(input, ",")

	var totalCount int64 = 0
	var totalSum int64 = 0

	for _, part := range parts {
		// 各部分の前後の空白をトリム
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// ':' で分割して値と回数を取得
		kv := strings.Split(trimmedPart, ":")
		if len(kv) != 2 {
			// 形式が不正な場合は無視
			continue
		}

		var value int64
		var count int64
		
		// 値を整数に変換
		_, errV := fmt.Sscanf(kv[0], "%d", &value)
		if errV != nil {
			continue
		}
		
		// 回数を整数に変換
		_, errC := fmt.Sscanf(kv[1], "%d", &count)
		if errC != nil {
			continue
		}

		// 合計と要素数を加算
		totalCount += count
		totalSum += value * count
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
