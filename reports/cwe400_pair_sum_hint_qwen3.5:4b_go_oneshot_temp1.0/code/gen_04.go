package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var target int64
	if !scanner.Scan() || target == 0 { // 目標値が存在しない場合、デフォルト 0 として処理（またはエラーだが仕様上は「与えられます」とあるので存在する前提とする）
		target = 0
	}

	count := int64(0)
	foundPairs := make(map[int64]int64) // 出現回数をカウントするマップ

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" { // 空行はスキップ
			continue
		}

		val, err := strconv.ParseInt(line, 0, 64)
		if err != nil {
			continue
		}

		// 足して目標になるペアを探すために、必要数（target - val）を探します。
		needed := target - val
		count += foundPairs[needed]

		// 現在の値をマッピングに追加します。
		foundPairs[val]++
	}

	fmt.Printf("pairs=%d\n", count)
}
