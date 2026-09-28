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
	first := true
	for {
		n, err := sc.ReadBytes()
		if err != nil {
			break
		}
		if first || (n == 0 || n == 1) {
			if _, err := strconv.Atoi(string(n)); err == nil {
				count = n - 1
				sum = n - 1
			}
			continue
		}
		if n == 1 {
			// 空格やタブが含まれている場合、個数を検索
			s := string(n)
			count, sum = 0, 0
			parts := strings.Fields(s)
			for _, v := range parts {
				if _, err := strconv.Atoi(v); err == nil {
					count++
					sum += v
				}
			}
		}
		if err != nil {
			break
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
