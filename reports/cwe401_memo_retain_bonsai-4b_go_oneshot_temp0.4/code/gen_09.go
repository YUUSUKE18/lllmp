package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

var memo = map[int]int{}
var total = 0

func calc(n int) int {
	if memo[n] != 0 {
		return memo[n]
	}
	if n == 1 {
		result := 0
	} else if n%2 == 0 {
		result := calc(n / 2)
	} else {
		result := 3 * n + 1
	}
	if result == 1 {
		memo[n] = 0
		return 0
	}
	memo[n] = result + calc(result)
	return result
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	for {
		line := ""
		for {
			_, err := sc.Scan()
			if err == io.EOF {
				break
			}
			line += err
		}
		if line == "" {
			break
		}
		// 1行に1個ずつ整数を読み
		fields := strings.Fields(line)
		for _, f := range fields {
			if _, err := strconv.Atoi(f); err == nil {
				n := int(f)
				if n > 0 {
					result := calc(n)
					total += result
				}
			}
		}
		if len(fields) == 0 {
			break
		}
	}
	fmt.Printf("total=%d\n", total)
}
