package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	target := 0
	lineNum := 0

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}

		if lineNum == 0 {
			var err error
			target, err = strconv.ParseInt(line, 10, 64)
			if err != nil {
				fmt.Fprintln(os.Stderr, "目標値の解析に失敗しました")
				os.Exit(1)
			}
			lineNum++
			continue
		}

		var n int64
		_, err := fmt.Sscanf(line, "%d", &n)
		if err != nil {
			continue
		}

		counts := make(map[int64]int)
		for i, v := range counts {
			complement := target - v
			if complement > 0 && counts[complement] > 0 {
				count += counts[complement]
			}
		}
		fmt.Printf("pairs=%d\n", count)
	}
}
