package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var target, lines []int64
	
	lineNum := 0
	for sc.Scan() {
		text := sc.Text()
		if text == "" {
			continue
		}
		if lineNum == 0 {
			val, err := strconv.ParseInt(text, 10, 64)
			if err != nil {
				os.Exit(1)
			}
			target = append(lines, val)
		} else {
			val, err := strconv.ParseInt(text, 10, 64)
			if err != nil {
				continue
			}
			lines = append(lines, val)
		}
		lineNum++
	}
	
	count := 0
	for i := range lines {
		for j := i + 1; j < len(lines); j++ {
			if lines[i]+lines[j] == target[0] {
				count++
			}
		}
	}
	
	fmt.Printf("pairs=%d\n", count)
}

func init() {
	// 必要な関数をインポート
	_ = strconv.ParseInt
}
