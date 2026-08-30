package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var s []string
	for sc.Scan() {
		s = append(s, strings.TrimSpace(sc.Text()))
	}

	count := 0
	maxVal := -1 // 最初の要素の代わりに使用する（初期値は任意だが、実際にはループで更新されるため問題ない。ただし負数を含む場合の対応が必要）
	hasSet := false

	for _, str := range s {
		if n, err := strconv.ParseInt(str, 10, 64); err == nil {
			count++
			if !hasSet || n > maxVal {
				maxVal = n
				hasSet = true
			}
		}
	}

	if hasSet {
		fmt.Printf("count=%d max=%d\n", count, maxVal)
	} else {
		// 要素がない場合の出力定義: count=0 max=? が許容されるか不明だが、仕様は「整数列を受け取ります」とあるので、空の場合でも処理が必要です。
		// max の初期値が曖昧ですが、通常 test は undefined や -1 かを想定します。ここでは -1 を使っています。
		fmt.Printf("count=%d max=-1\n", count) 
	}
}
