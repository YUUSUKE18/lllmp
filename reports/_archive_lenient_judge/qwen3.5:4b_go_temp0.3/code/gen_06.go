package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil は標準入力に相当するが、Go 1.20+ では io.Reader を直接渡せるため修正が必要だが、問題文の「標準入力から」という要件を最優先。実際の実行では os.Stdin が使われるべきである。

	// Go の標準ライブラリで標準入力を取得
	scanner := bufio.NewScanner(osStdin) // 上記は変数定義ミスなので修正:
}

import (
	"os"
)

func main() {
	var numbers []int64
	line, _ := os.Stdin.ReadBytes('\n') // この方法は非推奨。正しいアプローチを使用する。

	// 再書き換え：標準入力から文字列を読み込み、整数を解析
	inputStr, err := bufio.NewReader(os.Stdin).ReadString('\0')
	if err != nil {
		return
	}

	// カンマ区切りで分割し、有効な整数のみ抽出
	var set map[int64]struct{} = make(map[int64]struct{})
	for _, s := range strings.Split(inputStr, ",") {
		s = strings.TrimSpace(s)
		if len(s) == 0 || !isInt(s) {
			continue
		}
		num, _ := strconv.ParseInt(s, 10, 64)
		set[num] = struct{}{}
	}

	count := int64(0) // set の長さ（重複を除いた個数）は map[len(set)] で取得可能だが、set は変数として定義されていない。修正:
	var uniqueNumbers []int64
	for num := range set {
		uniqueNumbers = append(uniqueNumbers, num)
	}

	count = int64(len(uniqueNumbers)) // 個数は重複を除いた整数の総数（問題文：「『重複を除いた整数』について、個数と合計を求めます」→ unique integers の count と sum）
	sum := int64(0)
	for _, num := range uniqueNumbers {
		sum += num
	}

	fmt.Printf("count=%d sum=%d\n", count, sum) // 出力形式: `count=<個数> sum=<合計>` (末尾に改行あり)
}

import "strings"
import "strconv"
