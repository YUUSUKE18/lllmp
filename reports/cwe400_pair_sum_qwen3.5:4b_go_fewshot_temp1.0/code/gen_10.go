package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var target int64
	var pairsFound int64

	if sc.Scan() {
		line, err := strconv.ParseInt(sc.Text(), 10, 64)
		if err == nil && line >= 0 {
			target = line
		} else if err != nil {
			fmt.Fprintln(os.Stderr, "Error: Cannot parse target")
			return
		}
	}

	numbers := []int64{}
	for sc.Scan() {
		line := sc.Text()
		if trimmed := strings.TrimSpace(line); trimmed == "" {
			continue
		}
		v, err := strconv.ParseInt(trimmed, 10, 64)
		if err != nil {
			continue
		}
		numbers = append(numbers, v)
	}

	counts := map[int64]int64{}
	for _, n := range numbers {
		diff := target - n
		if count, ok := counts[diff]; ok {
			pairsFound += count
		}
		counts[n]++
	}

	fmt.Printf("pairs=%d\n", pairsFound)
}
