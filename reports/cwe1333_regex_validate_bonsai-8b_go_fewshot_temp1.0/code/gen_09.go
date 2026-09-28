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
	valid := 0
	for {
		n, err := sc.Read([]byte(64*1024))
		if err != nil {
			break
		}
		// 空行を無視
		if n == 0 {
			continue
		}
		// プレーンテキスト only
		if !strings.TrimSpace(string(n)) {
			continue
		}
		// カンマ区切りの整数列
		fields := strings.Fields(string(n))
		if len(fields) < 1 {
			continue
		}
		for _, f := range fields {
			if !strconv.Atoi(f) {
				continue
			}
		}
		valid++
	}
	fmt.Printf("valid=%d\n", valid)
}
