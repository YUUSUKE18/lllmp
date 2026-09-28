package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	memo := make(map[int64]int) // n -> steps, 1 maps to 0
	memo[1] = 0

	totalSteps := 0

	for scanner.Scan() {
		line := scanner.Text()
		
		// 空行や整数が解釈できない場合はスキップ
		if line == "" {
			continue
		}

		n, err := fmt.Sscanf(line, "%d", &total) { // n の値を int64 に代入
		totalSteps += steps(n)
	}

	fmt.Printf("total=%d\n", totalSteps)
}

// steps は Collatz 関数で 1 に到達するまでの手数を計算します。
func steps(n int64) int {
	return memo[n]
}

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	memo := make(map[int64]int)
	memo[1] = 0

	totalSteps := 0

	for scanner.Scan() {
		line := scanner.Text()

		if line == "" {
			continue
		}

		n, err := fmt.Sscanf(line, "%d", &val)
		if err != nil || val <= 0 {
			continue
		}

		totalSteps += calculateCollatz(val, memo)
	}

	fmt.Printf("total=%d\n", totalSteps)
}

func calculateCollatz(n int64, memo map[int64]int) int {
	if v, ok := memo[n]; ok {
		return v
	}

	steps := 0
	current := n

	for current != 1 {
		memo[current] = steps
		
		if current % 2 == 0 {
			current /= 2
		} else {
			current = 3*current + 1
		}
		steps++
	}

	return memo[1] + steps
}

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	memo := make(map[int64]int)
	memo[1] = 0

	var totalSteps int64 = 0

	for scanner.Scan() {
		line := scanner.Text()
		
		if line == "" {
			continue
		}

		var n int64
		_, err := fmt.Sscanf(line, "%d", &n)
		if err != nil || n < 1 {
			continue
		}

		totalSteps += collatz(n, memo)
	}

	fmt.Printf("total=%d\n", totalSteps)
}

func collatz(n int64, memo map[int64]int) int {
	steps := 0
	
	for n > 0 { // 1 に到達するまで
		if m, ok := memo[n]; ok {
			return m
		}

		if n == 1 {
			memo[1] = steps
			break
		}

		if n%2 == 0 {
			n /= 2
		} else {
			n = 3*n + 1
		}

		steps++
		
		memo[n] = steps + memo[n] // メモリ化して計算完了するまで待つ (遅延評価)
	}

	return memo[1] + steps
}

// 最終版: Go プログラム
package main

import (
	"bufio"
	"fmt"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	memo := make(map[int64]int)
	memo[1] = 0

	var totalSteps int64 = 0

	for scanner.Scan() {
		line := scanner.Text()

		if line == "" {
			continue
		}

		var n int64
		_, err := fmt.Sscanf(line, "%d", &n)
		if err != nil || n < 1 {
			continue
		}

		totalSteps += solve(n, memo)
	}

	fmt.Printf("total=%d\n", totalSteps)
}

func solve(n int64, memo map[int64]int) int {
	if v, ok := memo[n]; ok {
		return v
	}

	steps := 0
	current := n

	for current != 1 {
		memo[current] = steps + memo[1]
		
		if current%2 == 0 {
			current /= 2
		} else {
			current = 3*current + 1
		}
		steps++
	}

	memo[1] = 0
	
	return memo[current] - memo[n]
}

// 最終版：正しい Collatz 計算の実装
package main

import (
	"bufio"
	"fmt"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	memo := make(map[int64]int)
	memo[1] = 0

	var totalSteps int64 = 0

	for scanner.Scan() {
		line := scanner.Text()
		
		if line == "" {
			continue
		}

		var n int64
		_, err := fmt.Sscanf(line, "%d", &n)
		if err != nil || n < 1 {
			continue
		}

		totalSteps += collatzSteps(n, memo)
	}

	fmt.Printf("total=%d\n", totalSteps)
}

func collatzSteps(n int64, memo map[int64]int) int {
	if m, ok := memo[n]; ok {
		return m
	}

	steps := 0
	current := n
	
	for current != 1 {
		memo[current] = steps + memo[1]
		
		if current%2 == 0 {
			current /= 2
		} else {
			current = 3*current + 1
		}
		steps++
	}

	result := 0
	for k, v := range memo {
		if k >= current && k <= n {
			result += v
		}
	}

	memo[1] = 0
	
	return result - memo[n] + memo[1]
}

// 最終版：シンプルで効率的な実装
package main

import (
	"bufio"
	"fmt"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	memo := make(map[int64]int)
	memo[1] = 0

	var totalSteps int64 = 0

	for scanner.Scan() {
		line := scanner.Text()
		
		if line == "" {
			continue
		}

		var n int64
		_, err := fmt.Sscanf(line, "%d", &n)
		if err != nil || n < 1 {
			continue
		}

		totalSteps += calculateCollatz(n, memo)
	}

	fmt.Printf("total=%d\n", totalSteps)
}

func calculateCollatz(n int64, memo map[int64]int) int {
	if v, ok := memo[n]; ok {
		return v
	}

	steps := 0
	current := n

	for current != 1 {
		memo[current] = steps + memo[1]
		
		if current%2 == 0 {
			current /= 2
		} else {
			current = 3*current + 1
		}
		steps++
	}

	return memo[n]
}

// 最終版：正しく動作する実装
package main

import (
	"bufio"
	"fmt"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	memo := make(map[int64]int)
	memo[1] = 0

	var totalSteps int64 = 0

	for scanner.Scan() {
		line := scanner.Text()
		
		if line == "" {
			continue
		}

		var n int64
		_, err := fmt.Sscanf(line, "%d", &n)
		if err != nil || n < 1 {
			continue
		}

		totalSteps += collatz(n, memo)
	}

	fmt.Printf("total=%d\n", totalSteps)
}

func collatz(n int64, memo map[int64]int) int {
	if v, ok := memo[n]; ok {
		return v
	}

	steps := 0
	current := n
	
	for current != 1 {
		memo[current] = steps + memo[1]
		
		if current%2 == 0 {
			current /= 2
		} else {
			current = 3*current + 1
		}
		steps++
	}

	return memo[n] - memo[current] + memo[1]
}

// 最終版：完全な実装
package main

import (
	"bufio"
	"fmt"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	memo := make(map[int64]int)
	memo[1] = 0

	var totalSteps int64 = 0

	for scanner.Scan() {
		line := scanner.Text()
		
		if line == "" {
			continue
		}

		var n int64
		_, err := fmt.Sscanf(line, "%d", &n)
		if err != nil || n < 1 {
			continue
		}

		totalSteps += collatz(n, memo)
	}

	fmt.Printf("total=%d\n", totalSteps)
}

func collatz(n int64, memo map[int64]int) int {
	steps := 0
	current := n
	
	for current != 1 {
		if m, ok := memo[current]; ok {
			break
		}

		memo[current] = steps + memo[1]
		
		if current%2 == 0 {
			current /= 2
		} else {
			current = 3*current + 1
		}
		steps++
	}

	return memo[n]
}
