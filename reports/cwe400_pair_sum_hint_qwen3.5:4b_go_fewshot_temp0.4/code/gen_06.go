package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var target int64
	if !sc.Scan() {
		return
	}
	fmt.Sscanf(sc.Text(), "%d", &target)

	lines := 0
	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		var val int64
		fmt.Sscanf(line, "%d", &val)
		if err := sc.Err(); err != nil {
			break
		}

		lines++
		// 既に計算済みの値と現在の値の和が目標になるか確認
		for i := lines - 1; i >= 0; i-- {
			prev, ok := seen[val]
			if !ok {
				continue
			}
			if prev+val == target {
				count++
			}
		}
		seen[val] = true
	}

	fmt.Printf("pairs=%d\n", count)
}

var seen map[int64]bool
var count int64

func init() {
	seen = make(map[int64]bool)
	count = 0
}
