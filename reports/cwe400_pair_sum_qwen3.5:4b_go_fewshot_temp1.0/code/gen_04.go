package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	target, err := strconv.Atoi(sc.Scan())
	if err != nil {
		fmt.Printf("pairs=0\n")
		return
	}

	counts := make(map[int]int)
	lineNum := 0
	for sc.Scan() {
		lineStr := sc.Text()
		if lineStr == "" {
			continue
		}
		val, err := strconv.Atoi(lineStr)
		if err != nil {
			continue
		}

		complement := target - val
		if c, ok := counts[complement]; ok {
			counts[val] += 1 + c
		} else {
			counts[val] = 1
		}
		lineNum++
	}

	totalPairs := 0
	for _, n := range counts {
		totalPairs += n
	}

	fmt.Printf("pairs=%d\n", totalPairs)
}
