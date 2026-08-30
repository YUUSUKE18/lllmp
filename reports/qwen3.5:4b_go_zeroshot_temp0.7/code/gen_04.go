package main

import (
	"bufio"
	"fmt"
	"math/big"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	var tokens []string
	line, err := reader.ReadString('\n')
	if err != nil {
		return
	}
	parts := strings.Split(line, ",")
	m := make(map[int64]int)
	for _, part := range parts {
		part = strings.TrimSpace(part)
		if len(part) == 0 {
			continue
		}
		n, err := strconv.ParseInt(part, 10, 64)
		if err != nil {
			continue
		}
		m[n]++
	}

	var sum int64 = 0
	for _, v := range m {
		sum += int64(v)
	}

	fmt.Printf("count=%d sum=%d\n", len(m), sum)
}
