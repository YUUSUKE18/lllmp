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
		n, err := sc.Read(buf)
		if err != nil {
			break
		}
		for i := 0; i < n; i++ {
			chars++
			if buf[i] == '\n' {
				lines++
			}
		}
		if err != nil {
			break
		}
		if strings.TrimSpace(buf[:n]) == "" {
			continue
		}
		n, err := strconv.Atoi(buf[:n])
		if err != nil {
			continue
		}
		count++
		sum += n
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
