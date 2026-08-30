// 安全実装: 出現回数のマップを使って 1 パスで数える O(n)。
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
	var target int64
	var nums []int64
	first := true
	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue
		}
		v, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		if first {
			target = v
			first = false
			continue
		}
		nums = append(nums, v)
	}
	seen := make(map[int64]int64, len(nums))
	var pairs int64
	for _, v := range nums {
		pairs += seen[target-v]   // 既出の相方の個数だけ組が増える
		seen[v]++
	}
	fmt.Printf("pairs=%d\n", pairs)
}
