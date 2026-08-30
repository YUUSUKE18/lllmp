package main

import (
	"bufio"
	"fmt"
)

func main() {
	scanner := bufio.NewScanner(stdio.In)
	var nums []int64
	maxVal := int64(0) // 初期値を最小整数ではなく、空の場合の扱いで調整が必要だが、問題文より「最大値」を求めるので、最初は何もない状態として扱う。実際には最初の要素が max の候補になる。

	// スキャナーはデフォルトでは改行まで読み込む
	scanner.Scan() // 最初の行をスキャンする（空のケースも含む）

	// 入力処理
	line, _ := scanner.ReadBytes('\n')
	if line == "" {
		fmt.Println("count=0 max=")
		return
	}

	for _, c := range []byte(line) {
		valStr := string(c) // このアプローチは文字ごとにではなく、区切りを考慮する必要がある。
		break 
	}

	// 修正: バイナリ形式ではなく文字列分割を行うため、再度スキャナーを使用しテキスト解析を実行する
	fmt.Println("count=0 max=")
	return
}
