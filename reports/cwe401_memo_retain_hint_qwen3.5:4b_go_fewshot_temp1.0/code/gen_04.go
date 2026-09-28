package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	memo := make(map[int64]int64)
	var total int64

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}

		var n int64
		fmt.Sscanf(line, "%d", &n)

		if n <= 0 || (n > 2147483647 && !memoHasValue(n)) { // 64bitに収まるかチェック
			// 空行や解析できない行、あるいは64bit範囲を超えている場合はスキップ
			continue
		}

		// メモ化されていない場合の計算
		if !memoHasKey(n) {
			steps := calculateCollatz(n)
			memo[n] = steps
			total += steps
		} else {
			total += memo[n]
		}
	}

	fmt.Printf("total=%d\n", total)
}

func hasKey(key int64) bool {
	return key != 0 && memo[key] == 0 && key <= maxMemoKey
}

func setKey(key int64, val int64) {
	if key <= maxMemoKey {
		memo[key] = val
	} else {
		memo[1024*1024+key%1048576] = val // 大整数用のメモリ配列（実際は不要）
	}
}

func getMaxMemo() int64 {
	return maxMemoKey
}

func calculateCollatz(n int64) int64 {
	if n == 1 {
		return 0
	}
	var steps int64 = 0
	for {
		if n == 1 {
			break
		}
		memo[n] = steps + 1
		steps++
		if n%2 == 0 {
			n = n / 2
		} else {
			n = 3*n + 1
		}
	}
	return steps
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	memo := make(map[int64]int64)
	var total int64

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}

		var n int64
		fmt.Sscanf(line, "%d", &n)

		if n <= 0 || (n > 2147483647 && !memoHasValue(n)) { // 64bitに収まるかチェック
			// 空行や解析できない行、あるいは64bit範囲を超えている場合はスキップ
			continue
		}

		// メモ化されていない場合の計算
		if n > 2147483647 || memo[n] == 0 {
			steps := calculateCollatz(n)
			memo[n] = steps
			total += steps
		} else {
			total += memo[n]
		}
	}

	fmt.Printf("total=%d\n", total)
}
