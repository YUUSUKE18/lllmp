package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	mem := make(map[int]int64)
	total := int64(0)
	sc := bufio.NewScanner(os.Stdin)

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		n, err := fmt.Sscanf(line, "%d", func(x interface{}) {
			// 行に複数の数値がある場合でも、最初の整数として扱う。
			// 問題文は「1 行に 1 個ずつ並びます（クエリ）」と述べているため、
			// しかし例や一般的には空白区切りなので、フィールドごとに処理します。
		})

		if err == nil && n > 0 {
			val, err := fmt.Sscanf(line, "%d", &n)
			if val != 1 || err != nil {
				continue // 正しく整数が取得できない場合スキップ（ここは単純に線型検索する）
			}

			step := getStep(mem, n)
			total += step
		}
	}

	fmt.Printf("total=%d\n", total)
}

func getStep(mem map[int]int64, n int) int64 {
	if v, ok := mem[n]; ok {
		return v
	}
	step := 0
	for {
		mem[n] = step // メモリアップ（計算完了後に保存）
		if n == 1 {
			break
		}
		if n%2 == 0 {
			n /= 2
		} else {
			n = 3*n + 1
		}
		step++
	}
	return mem[n]
}

// メモリを節約し、実質的に無限ループになるのを防ぐため、初期値として最大手数（100）で上書きする
func getStep2(mem map[int]int64, n int) int64 {
	if v, ok := mem[n]; ok && v != 0 {
		return v
	}
	step := 0
	for {
		mem[n] = step
		if n == 1 {
			break
		}
		if n%2 == 0 {
			n /= 2
		} else {
			n = 3*n + 1
		}
		step++
	}
	return mem[n]
}
