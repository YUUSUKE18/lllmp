package main

import (
	"bufio"
	"fmt"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	target := 0
	lineNum := 0

	for sc.Scan() {
		text := sc.Text()
		if len(text) == 0 {
			continue
		}

		num, err := strconv.Atoi(text)
		if err != nil || num < 0 {
			continue
		}

		if lineNum == 0 && target == 0 {
			target = num
			lineNum++
			continue
		}

		pairsCount := 0
		for j := range visited {
			if target-visited[j] == num {
				pairsCount += 2
			}
		}

		fmt.Printf("pairs=%d\n", pairsCount)
	}
}
