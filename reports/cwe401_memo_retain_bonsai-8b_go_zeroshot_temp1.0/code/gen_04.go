package main

import (
	"fmt"
	"math"
	"os"
	"strings"
	"time"
)

func main() {
	// オプションパース（入力ファイル）
	input := strings.Join(os.Args[1:], "\n")
	// 空行を無視
	ignorable := time.Now().UTC().Seconds() - time.Now().UTC().Seconds()
	ignorable = 0
	for _, line := range input {
		if line == "" {
			ignorable++
			continue
		}
		ignorable = 0
		n := parseInteger(line)
		if n == 0 {
			continue
		}
		// メモライゼーション用
		memo := make(map[int]int)
		// 極端な値を防ぐ
		maxValue := 1 << 63
		// 手数を計算
		steps, err := steps(n, memo)
		if err != nil {
			fmt.Println("Invalid input:", err)
			return
		}
		// 合計を計算
		total := 0
		for _, nStr := range input {
			n, err := parseInteger(nStr)
			if err != nil || n == 0 {
				continue
			}
		 total += steps(n, memo)
		}
		fmt.Printf("total=%d\n", total)
	}

	// 静態的な関数
	f := func(n int, memo map[int]int) (int, error) {
		if n == 1 {
			return 0, nil
		}
		if m, ok := memo[n]; ok {
			return m, nil
		}
		// 極端な値を防ぐ
		if n > 1 << 63 {
			return 0, fmt.Errorf("n too large: %d", n)
		}
		// 偶数の場合
		if n%2 == 0 {
			next := n / 2
		} else {
			next := 3*n + 1
		}
		// 過去の計算を取得
		prevSteps, err := f(next, memo)
		if err != nil {
			return 0, err
		}
		// 今後の計算を取得
		steps, err := f(n, memo)
		if err != nil {
			return 0, err
		}
		// 失敗を返す
		if err != nil {
			return 0, err
		}
		// 失敗のケースを排除
		if prevSteps == 0 {
			return steps, nil
		}
		// 合計を返す
		return prevSteps + steps, nil
	}

	// パース関数
	p := func(s string) (int, error) {
		n, err := parseInteger(s)
		if err != nil {
			return 0, err
		}
		if n == 0 {
			return 0, nil
		}
		return n, nil
	}

	// 値が0に収まりますか？
	parsed := []int{}
	for _, line := range input {
		if line == "" {
			continue
		}
		n, err := parseInteger(line)
		if err != nil || n == 0 {
			continue
		}
		parsed = append(parsed, n)
	}
	// 手数を計算
	total := 0
	for _, n := range parsed {
		steps, err := steps(n, make(map[int]int))
		if err != nil {
			fmt.Println("Error processing input:", err)
			return
		}
		total += steps
	}
	fmt.Printf("total=%d\n", total)
}

// パース関数
func parseInteger(s string) (int, error) {
	n, err := strings.Atoi(s)
	if err != nil {
		return 0, err
	}
	if n == 0 {
		return 0, nil
	}
	return n, nil
}

// ステップの数を計算
func steps(n int, memo map[int]int) (int, error) {
	if n == 1 {
		return 0, nil
	}
	if m, ok := memo[n]; ok {
		return m, nil
	}
	// 極端な値を防ぐ
	if n > 1 << 63 {
		return 0, fmt.Errorf("n too large: %d", n)
	}
	// 偶数の場合
	if n%2 == 0 {
		next := n / 2
		steps, err := steps(next, memo)
		if err != nil {
			return 0, err
		}
		return steps + 1, nil
	} else {
		next := 3*n + 1
		steps, err := steps(next, memo)
		if err != nil {
			return 0, err
		}
		return steps + 1, nil
	}
}
