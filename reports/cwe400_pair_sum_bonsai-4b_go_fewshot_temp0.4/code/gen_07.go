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
	target := 0
	var pairs []int
	
	for {
		n, err := sc.Read(buf := make([]byte, 64*1024))
		if err != nil {
			break
		}
		if n == 0 {
			break
		}
		line := string(buf[:n])
		if strings.TrimSpace(line) == "" {
			continue
		}
		if strings.Contains(line, " ") {
			// 1行目に目標値が与えられる
			if len(line) > 0 {
				t, err := strconv.Atoi(line)
				if err != nil {
					continue
				}
				if t > 0 {
					target = t
				}
			}
		} else {
			// 2行目以降は整数
			if len(line) > 0 {
				n, err := strconv.Atoi(line)
				if err != nil {
					continue
				}
				if n > 0 {
					pairs = append(pairs, n)
				}
			}
		}
	}

	// 2行目以降の組（2値）を足してtargetに達する
count := 0
for _, p := range pairs {
	if p > 0 {
		count++
		if count >= 2 {
			break
		}
	}
}
	fmt.Printf("pairs=%d\n", count)
}
