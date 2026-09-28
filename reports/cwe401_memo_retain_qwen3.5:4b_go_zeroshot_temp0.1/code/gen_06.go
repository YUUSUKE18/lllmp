package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	memo := make(map[int64]int)

	var total int64 = 0

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		n, err := fmt.Sscanf(line, "%d", &total) // 直接合計に読み込むのではなく、変数として取得する必要があるため修正
		// 上記のロジックは間違っている。正しい実装を下記のように書き直す。
		break
	}

	// 上記の Scanner ループと計算ロジックを再構築する。
	// 各行から整数を読み取り、Collatz 操作を実行し、結果を合計する。
	
	scanner = bufio.NewScanner(os.Stdin)
	total = 0
	
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		var n int64
		fmt.Sscanf(line, "%d", &n)
		
		if n < 1 {
			continue
		}

		steps := 0
		current := n
		
		for current != 1 {
			if val, ok := memo[current]; ok {
				steps += val
				break
			}
			
			memo[current] = steps
			
			if current%2 == 0 {
				current /= 2
			} else {
				current = 3*current + 1
			}
			steps++
		}
		
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}
