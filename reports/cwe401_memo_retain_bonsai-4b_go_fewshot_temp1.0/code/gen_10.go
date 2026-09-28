package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

var memo = make(map[int]int)
var total = 0

func processQuery(n int) int {
	if memo[n] != nil {
		return memo[n]
	}
	if n == 1 {
		memo[1] = 0
		return 0
	}
	if n%2 == 0 {
		memo[n] = n / 2
		return processQuery(n / 2)
	} else {
		memo[n] = 3*n + 1
		return 1 + processQuery(3*n + 1)
	}
}

func main() {
	sc := bufio.NewReader(os.Stdin)
	for {
		n, err := sc.Read(os.Stdin)
		if err != nil {
			break
		}
		if n == 0 {
			break
		}
		// 頔列を分割して整数を抽出
		values := strings.Fields(n)
		for _, s := range values {
			if strings.TrimSpace(s) != "" {
				k, err := strconv.Atoi(s)
				if err != nil {
					continue
				}
				if k > 0 {
					memo[k] = memo[k] + processQuery(k)
				}
			}
		}
		// すべてのクエリの手数を総計
		// 空行も無視
		for _, s := range strings.Fields(sc.Text()) {
			if strings.TrimSpace(s) != "" {
				k, err := strconv.Atoi(s)
				if err != nil {
					continue
				}
				if k > 0 {
					memo[k] = memo[k] + processQuery(k)
				}
			}
		}
		total += processQuery(1)
	}
	fmt.Printf("total=%d\n", total)
}
