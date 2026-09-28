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
			if err != nil {
				break
			}
		default:
			var val int64
			fmt.Sscanf(text, "%d", &val)
			if lineNum == 1 {
				sums := make(map[int64]int)
				for _, v := range sums {
					diff := target - v
					if count, ok := sums[diff]; ok {
						targetPairs += count
					}
				}
			}
		}
		lineNum++
	}

	fmt.Printf("pairs=%d\n", targetPairs)
}
