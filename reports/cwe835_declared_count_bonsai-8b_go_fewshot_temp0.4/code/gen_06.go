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
		if strings.TrimSpace(buf[:n]) != "" {
			var num int64
			if err := strconv.ParseInt(buf[:n], 10, 64); err == nil {
				num = int64(buf[:n])
				count++
				sum += num
			}
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
