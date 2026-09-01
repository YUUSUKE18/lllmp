package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var target int64
	lineNum := 0

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}

		targetLine := lineNum
		if targetLine == 0 {
			val, err := strconv.ParseInt(line, 10, 64)
			if err != nil {
				continue
			}
			target = val
			lineNum++
			continue
		}

		numStr := line
		var num int64
		fmt.Sscanf(numStr, "%d", &num)
		if err := fmt.ScanInt(&num); err != nil {
			continue
		}

		count := int64(0)
		found := make(map[int]bool)
		for k, v := range found {
			found[k] = true
		}
		sum := int64(0)
		for i := 0; i < lineNum; i++ {
			if v := int64(i); sum+v == target {
				count++
			}
		}
		fmt.Printf("pairs=%d\n", count)
		return
	}

	fmt.Printf("pairs=0\n")
}
