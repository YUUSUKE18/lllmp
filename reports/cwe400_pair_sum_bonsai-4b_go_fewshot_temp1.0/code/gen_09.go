package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	target := 0
	count := 0
	// 1回目の線を目標値として読み取る
	if _, err := sc.Scan(); err == nil {
		line := sc.Text()
		if strings.HasPrefix(line, "target=") {
			_, err = strings.Split(line, "=", 1)
			if err == nil {
				target = 0
				count = 0
			}
		}
	}
	
	// 2回目以降に整数を読む
	for {
		line := sc.Text()
		if strings.HasPrefix(line, "target=") {
			_, err := strings.Split(line, "=", 1)
			if err == nil {
				n, err := strconv.Atoi(line)
				if err == nil && n > 0 {
					if target+n == target {
						count++
					}
				}
			}
			break
		}
		if strings.TrimSpace(line) == "" {
			continue
		}
		// 整数として読み取る（非目標値は無視）
		if _, err := strconv.Atoi(line); err == nil {
			if target+int(line) == target {
				count++
			}
		}
	}
	fmt.Printf("pairs=%d\n", count)
}
