package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	cache := make(map[int64]int) // 計算結果をキャッシュするマップ

	total := 0
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" { // 空行は無視
			continue
		}

		var n int64
		_, err := fmt.Sscanf(line, "%d", &n)
		if err != nil || n <= 0 { // 整数として解釈できない行や正の整数でないものは無視
			continue
		}

		steps := 0
		for n != 1 {
			if val, ok := cache[n]; ok {
				steps += val
				break
			}
			cache[n] = steps // 現在のステップ数をキャッシュ (まだ完結していない場合でも)

			if n%2 == 0 {
				n /= 2
			} else {
				n = 3*n + 1
			}
			steps++
		}

		cache[n] = steps // 1 に到達した場合、ステップ数をキャッシュ (steps は n=1 への累積なので注意が必要)
		total += steps
	}

	if err := scanner.Err(); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}

	fmt.Printf("total=%d\n", total)
}
