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
	
	// 1行目から整数個数を読み込む
	if !sc.Scan() {
		// 入力が空の場合は終了
		fmt.Println("count=0 sum=0")
		return
	}
	
	// 1行目の値は個数だが、ここでは実際の読み取りを優先するため、
	// 1行目の値は無視し、2行目以降の読み取りに集中する。
	// ただし、仕様上「1行目に、続く整数の個数が書かれています」とあるため、
	// 1行目を個数として扱うべきだが、続く行を読み取る流れで実装する。
	// 厳密に「実際に読み取れた整数だけを対象」という指示に従い、
	// 1行目の値は個数として利用し、それ以降の行を処理する。
	
	expectedCountStr := strings.TrimSpace(sc.Text())
	expectedCount, err := strconv.Atoi(expectedCountStr)
	if err != nil {
		// 1行目が整数でない場合は、読み取りを終了するか、0として扱う。
		// ここでは、読み取りを続行するが、個数として扱わない。
		// 仕様に従い、実際に読み取れた整数のみを対象とするため、
		// 1行目を個数として利用し、それ以降を読み取る。
	}
	
	actualCount := 0
	totalSum := int64(0)
	
	// 2行目以降を読み取る
	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue // 空行は無視
		}
		
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}
		
		// 実際に読み取れた整数のみを対象とする
		actualCount++
		totalSum += n
	}
	
	// 実際に読み取れた個数と合計を出力
	fmt.Printf("count=%d sum=%d\n", actualCount, totalSum)
}
