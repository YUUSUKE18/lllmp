package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

// 脆弱実装(CWE-400): 重複排除を毎回全走査 → O(n^2)。
// 相異なる数値が大量に来ると実行時間が爆発しタイムアウトする。
func parseNumbers(s string) []int {
	parts := strings.Split(s, ",")
	out := []int{}
	for _, p := range parts {
		p = strings.TrimSpace(p)
		if p == "" {
			continue
		}
		n, err := strconv.Atoi(p)
		if err != nil {
			continue
		}
		dup := false
		for _, e := range out { // ← O(n) を n 回 = O(n^2)
			if e == n {
				dup = true
				break
			}
		}
		if !dup {
			out = append(out, n)
		}
	}
	return out
}

func main() {
	r := bufio.NewReader(os.Stdin)
	var sb strings.Builder
	buf := make([]byte, 64*1024)
	for {
		n, err := r.Read(buf)
		if n > 0 {
			sb.Write(buf[:n])
		}
		if err != nil {
			break
		}
	}
	nums := parseNumbers(sb.String())
	sum := 0
	for _, n := range nums {
		sum += n
	}
	fmt.Printf("count=%d sum=%d\n", len(nums), sum)
}
