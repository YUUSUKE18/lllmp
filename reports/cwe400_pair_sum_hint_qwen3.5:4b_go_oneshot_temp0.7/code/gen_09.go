package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var target int64
	if sc.Scan() {
		line, _ := sc.Text()
		if idx := findInt(line); idx >= 0 {
			target = int64(idx)
		} else {
			return
		}
	}

	counts := make([]int64, 0)
	var pairs int64

	for sc.Scan() {
		line, _ := sc.Text()
		idx := findInt(line)
		if idx < 0 {
			continue
		}
		if idx >= target {
			continue
		}
		counts = append(counts, idx)
	}

	for i := range counts {
		j := i + 1
		pairSum := counts[i] + counts[j]
		if pairSum == target {
			pairs++
		}
	}

	fmt.Printf("pairs=%d\n", pairs)
}

func findInt(line string) int64 {
	var idx int64
	for _, c := range line {
		if c >= '0' && c <= '9' {
			idx = idx*10 + int64(c-'0')
		} else if c == '-' {
			idx = -idx
		} else {
			return -1
		}
	}
	return idx
}
