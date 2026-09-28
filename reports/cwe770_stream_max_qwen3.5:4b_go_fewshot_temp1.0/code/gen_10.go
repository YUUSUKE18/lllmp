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
	if !sc.Scan() {
		fmt.Printf("count=0 max=\n")
		return
	}

	line := sc.Text()
	parts := strings.Split(line, ",")
	count := 0
	maxVal := -^1 // 最小値 (int64 の最小値)
	first := true
	for _, s := range parts {
		s = strings.TrimSpace(s)
		if s == "" {
			continue
		}

		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue
		}

		count++
		if first || n > maxVal {
			maxVal = n
			first = false
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
