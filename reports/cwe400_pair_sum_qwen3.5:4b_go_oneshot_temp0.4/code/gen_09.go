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
		text := sc.Text()
		if text == "" {
			continue
		}
		var err error
		switch lineNum {
		case 0:
			target, err = fmt.Sscanf(text, "%d", &target)
			if err != nil || target <= 0 {
				continue
			}
		default:
			var val int64
			fmt.Sscanf(text, "%d", &val)
			if val < 0 {
				continue
			}
		}
		lineNum++
	}

	count := 0
	found := make(map[int64]int)

	for i := int64(0); i < lineNum; i++ {
		var val int64
		fmt.Sscanf(sc.Text(), "%d", &val)
		if val < 0 || val > target {
			continue
		}
		diff := target - val
		if count, ok := found[diff]; ok {
			count += count
		} else {
			found[val] = 1
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
