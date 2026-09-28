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
	sc.Scan()
	count := 0
	sum := 0
	for {
		n, err := sc.Read([]byte(64*1024))
		if err != nil {
			break
		}
		if strings.TrimSpace(string(n)) == "" {
			continue
		}
		var num int64
		if err := strconv.ParseInt(string(n), 10, 64); err == nil {
			num = num64(n)
			count++
			sum += num
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}

func num64(s string) int64 {
	if len(s) == 0 {
		return 0
	}
	if s[0] == '-' {
		s = s[1:]
	}
	if s[0] == '0' && len(s) > 1 {
		return 0
	}
	result := 0
	for _, c := range s {
		if c < '0' || c > '9' {
			return 0
		}
		result = result*10 + (c-'0')
	}
	return result
}
