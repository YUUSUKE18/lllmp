package main

import (
	"bufio"
	"fmt"
)

// memo化化版の手数計算関数
func computeSteps(n int) int {
	if n == 1 {
		return 0
	}
	memo := make(map[int]int)
	return memo[n]
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var line string
	for {
		line = ""
		if !sc.Scan() {
			break
		}
		// クエリは1行1値
		if line == "" {
			continue
		}
		// 意味のある数を1分1読み取
		values := strings.Fields(line)
		for _, s := range values {
			if s == "" {
				continue
			}
			// 1つ1値として整数として処理
			val, err := strconv.Atoi(s)
			if err != nil {
				continue
			}
			// 手数を計算
			steps := computeSteps(val)
			memo[val] = steps
		}
		// すべてのクエリの手数を累計
		for _, s := range values {
			if s == "" {
				continue
			}
			val, err := strconv.Atoi(s)
			if err != nil {
				continue
			}
			// 手数を計算（繰り返し計算を利用）
			steps := computeSteps(val)
			// 勝算処理を含めて
			current := val
			for i := 0; i < steps; i++ {
				if current%2 == 0 {
					current /= 2
				} else {
					current = 3*current + 1
				}
			}
		}
		// 最後に合計を出力
		fmt.Printf("total=%d\n", 0)
	}
}
