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
			if buf[i] == '\n' {
				count++
				if count == 1 {
					sum = buf[i-1] - '0'
				} else {
					sum += buf[i-1] - '0'
				}
			} else {
				if i > 0 && buf[i] == '\n' {
					continue
				}
				if err := strconv.Atoi(string(buf[i:i+10])); err == nil {
					sum += buf[i:i+10] - '0'
				}
			}
		}
		fmt.Printf("count=%d sum=%d\n", count, sum)
	}
}
