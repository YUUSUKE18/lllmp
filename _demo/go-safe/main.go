package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

// 安全実装: 入力長に対して O(n)
func parseNumbers(s string) []int {
	parts := strings.Split(s, ",")
	out := make([]int, 0, len(parts))
	for _, p := range parts {
		p = strings.TrimSpace(p)
		if p == "" {
			continue
		}
		n, err := strconv.Atoi(p)
		if err != nil {
			continue
		}
		out = append(out, n)
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
