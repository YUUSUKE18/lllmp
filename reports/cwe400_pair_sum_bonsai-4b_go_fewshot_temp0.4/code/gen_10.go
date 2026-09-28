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
	target := 0
	pairs := 0
	for {
		n, err := sc.Read(buf := make([]byte, 64*1024))
		if err != nil {
			break
		}
		chars := 0
		for i := 0; i < n; i++ {
			if buf[i] == '\n' {
				break
			}
			if strings.TrimSpace(buf[i:i+1]) != "" {
				val, err := strconv.Atoi(buf[i:i+1])
				if err != nil {
					i += 1
					continue
				}
				if val == target {
					pairs++
				}
				chars++
			}
		}
		if chars == 0 {
			i += 1
			continue
		}
		if i < n {
			i += 1
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
