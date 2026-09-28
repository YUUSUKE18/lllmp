package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// 標準入力から全てのデータを読み込む
	input, err := os.ReadFile(0) // 0 は標準入力
	if err != nil {
		return
	}
	data := string(input)

	// カンマで分割して、空白を含む要素を処理する
	// strings.FieldsFunc を使って、カンマとスペースを区切り文字として扱う（ただしここではより厳密に実装する）

	// 入力全体を行ごとに処理するか、文字列全体をトークン化する方が安全だが、
	// 標準入力の読み込み方法を模倣しつつ、カンマ区切りの整数列を抽出する。
	
	// 効率的に読み込むため、os.Stdin を直接利用して行ごとに処理するアプローチを採用する。

	reader := bufio.NewReader(os.Stdin)
	var count int
	var maxValue int64 = -1 // 64bit整数を扱うため初期値を調整
	found := false

	for {
		line, err := reader.ReadString('\n')
		if err != nil && len(line) == 0 {
			break // EOF またはエラー
		}

		// 行全体を処理対象とする（カンマ区切りの整数列が一行に収まっていることを想定）
		fields := strings.Split(strings.TrimSpace(line), ",")

		for _, field := range fields {
			field = strings.TrimSpace(field)
			if field == "" {
				continue
			}

			// 整数としてパースを試みる
			val, err := strconv.ParseInt(field, 10, 64)
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
	}

	// 最終結果を出力
	if found {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	} else {
		// 要素が一つもなかった場合（空の入力のみなど）
		fmt.Println("count=0 max=-1") // 最大値が未定義の場合、-1や0などの適切なデフォルト値を設定する。ここでは-1を設定。
	}
}
