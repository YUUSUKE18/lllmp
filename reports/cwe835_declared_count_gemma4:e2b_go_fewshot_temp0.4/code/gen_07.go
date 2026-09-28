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
	
	// 1行目: 読み取れた整数の個数
	if !sc.Scan() {
		// 入力が空の場合
		fmt.Println("count=0 sum=0")
		return
	}
	
	// 1行目の値を整数として取得
	expectedCountStr := strings.TrimSpace(sc.Text())
	expectedCount, err := strconv.Atoi(expectedCountStr)
	if err != nil {
		// 1行目が整数でない場合は、読み取れた数を0として扱うか、エラー処理を行うが、
		// 仕様に基づき、読み取れた整数のみを対象とするため、ここでは読み取れた数に基づいて処理を続ける。
		// ただし、この問題では「実際に読み取れた整数だけを対象」とあるため、1行目の値はあくまで期待値として扱う。
		// 読み取れた整数が0個の場合、count=0 sum=0となる。
		fmt.Println("count=0 sum=0")
		return
	}

	// 2行目以降の整数を読み込む
	actualCount := 0
	sum := int64(0)
	
	// 2行目以降の行を読み込む
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
		sum += n
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
