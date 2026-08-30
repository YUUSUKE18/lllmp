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

	parts := strings.Split(strings.TrimSpace(data), ",")
	var count int64 = 0
	var sum int64 = 0

	for _, part := range parts {
		if part == "" {
			continue
		}
		kv := strings.Split(part, ":")
		if len(kv) != 2 {
			continue
		}

		var value int64
		var countVal int64
		_, errV := fmt.Sscanf(kv[0], "%d", &value)
		_, errC := fmt.Sscanf(kv[1], "%d", &countVal)

		if errV == nil && errC == nil {
			// 値:回数 の形式で読み込むため、値と回数をそれぞれ扱う
			// 仕様では「値:回数」がカンマ区切りで並んでいるため、
			// 7:3,2:2 の場合、(7,3), (2,2) のペアを処理する。
			// 実際には、各ペアが「値:回数」を表す。
			// 例: "7:3" -> 値=7, 回数=3
			// 例: "2:2" -> 値=2, 回数=2

			// 読み込み方が少し複雑になるため、再評価する。
			// 入力例: 7:3,2:2
			// parts は ["7:3", "2:2"]
			
			// part = "7:3" の場合
			valStr := strings.Split(part, ":")[0]
			countStr := strings.Split(part, ":")[1]
			
			var valInt int64
			var countInt int64
			
			_, errVal := fmt.Sscanf(valStr, "%d", &valInt)
			_, errCount := fmt.Sscanf(countStr, "%d", &countInt)

			if errVal == nil && errCount == nil {
				// 読み込んだ値と回数を加算する
				count += countInt
				sum += valInt * countInt
			}
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
