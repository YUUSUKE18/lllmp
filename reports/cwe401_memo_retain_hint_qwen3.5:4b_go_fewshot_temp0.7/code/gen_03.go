package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	r := bufio.NewReader(os.Stdin)
	mem := make(map[int]int64)
	total := int64(0)

	for {
		line, err := r.ReadString('\n')
		if err != nil {
			break
		}
		line = trim(line)
		if line == "" {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		count := getCollatz(n, mem)
		total += count
	}

	fmt.Printf("total=%d\n", total)
}

func trim(s string) string {
	for len(s) > 0 && (s[0] == ' ' || s[len(s)-1] == ' ') {
		if len(s) == 1 {
			return ""
		}
		s = s[1 : len(s)-1]
	}
	return s
}

func getCollatz(n int, mem map[int]int64) int64 {
	if v, ok := mem[n]; ok {
		return v
	}

	count := 0
	for n != 1 {
		next := n * 2 + 3
		mem[next] = count + 1
		n = next
	}
	mem[1] = count + 1
	return mem[n]
}
