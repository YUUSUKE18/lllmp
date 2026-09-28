package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var cache = make(map[int]int64)

func nextCollatz(n int) int64 {
	if n == 1 {
		return 0
	}
	
	// メモ化がある場合は利用する
	if result, ok := cache[n]; ok {
		return result
	}

	steps := 0
	cur := n
	
	for cur != 1 {
		if cur%2 == 0 {
			cur = cur / 2
		} else {
			cur = 3*cur + 1
		}
		
		steps++
		
		// 途中の値をキャッシュする (メモリ制限対策のため、キャッシュサイズに注意が必要だが、一般的 Collatz の値は数十万以下で収まるケースが多い。問題文が「64bit 整数の範囲」だと述べているので全キャッシュとする)
		cache[cur] = steps
	}
	
	totalSteps := cache[n]
	return totalSteps
}

func main() {
	var sc *bufio.Scanner
	sc = bufio.NewScanner(os.Stdin)
	
	totalSteps := int64(0)
	
	for sc.Scan() {
		line := sc.Text()
		
		// 空行や解析エラーはスキップ
		if line == "" {
			continue
		}
		
		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		
		// n が負の整数の場合は処理を無効にする (問題文「1 以上の整数」だが、空行を除く場合だけなら正の整数と仮定しうるが、-1 を除く整数として入力された場合も考慮し、0 から開始する)
		if n == -1 {
			continue 
		}

		steps := nextCollatz(n)
		totalSteps += steps
	}
	
	fmt.Printf("total=%d\n", totalSteps)
}
