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
	countStr, _ := sc.Text()
	count, _ := strconv.Atoi(countStr)
	max := 0
	first := true
	for {
		n, err := sc.Read(buf)
		if err != nil {
			break
		}
		for i := 0; i < n; i++ {
			if buf[i] == '\n' {
				break
			}
			s, _ := strings.Fields(buf[:i+1])
			if len(s) == 0 {
				continue
			}
			num, err := strconv.Atoi(s[0])
			if err != nil {
				continue
			}
			if first || num > max {
				max = num
				first = false
			}
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, max)
}
