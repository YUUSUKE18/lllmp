package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	input, err := os.ReadFile(0)
	if err != nil {
		return
	}
	data := string(input)

	var totalCount int64 = 0
	var totalSum int64 = 0

	// カンマで区切って各要素を処理
	parts := strings.Split(data, ",")

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}

		// ":" で分割
		kv := strings.Split(part, ":")
		if len(kv) != 2 {
			continue // 形式が不正な場合は無視
		}

		// 値と回数をパース
		valueStr := strings.TrimSpace(kv[0])
		countStr := strings.TrimSpace(kv[1])

		value, err := fmt.Sscanf(valueStr, "%d", &totalCount)
		if err != nil || value != 1 {
			continue // 値が整数でない場合は無視
		}

		count, err := fmt.Sscanf(countStr, "%d", &totalSum)
		if err != nil || count != 1 {
			continue // 回数が整数でない場合は無視
		}

		// 実際には、値:回数 の形式で、値が '値'、回数が '回数' である。
		// 課題の例: 7:3,2:2 は 7,7,7,2,2 という整数列を表す。
		// これは「値:回数」のペアが、その「値」を「回数」だけ繰り返すことを意味する。

		// 修正：入力全体を再解釈する
		// 7:3,2:2 -> (7, 3), (2, 2)
		// 7:3 は 値=7, 回数=3
		// 2:2 は 値=2, 回数=2
		
		// 読み込み方を修正する。入力全体をスペース区切りで処理する方が自然かもしれないが、
		// 例に従いカンマ区切りで処理する。

		// 7:3,2:2 の場合、各ペアが (値, 回数) の組
		
		// 再度、入力全体を処理し直す。
		// 7:3,2:2 の場合、strings.Split(data, ",") は ["7:3", "2:2"] になる。
		
		// 7:3 から値=7, 回数=3 を抽出
		var val int
		var cnt int
		_, err = fmt.Sscanf(part, "%d:%d", &val, &cnt)
		if err == nil {
			// 値が 'val' で 'cnt' 回繰り返される
			totalCount += int64(cnt)
			totalSum += int64(val) * int64(cnt)
		}
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
