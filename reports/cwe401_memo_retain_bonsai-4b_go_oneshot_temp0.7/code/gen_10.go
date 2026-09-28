package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

var memo = make(map[int]int)

func countSteps(n int) int {
	if memo[n] != 0 {
		return memo[n]
	}
	if n == 1 {
		return 0
	}
	if n%2 == 0 {
		result := countSteps(n / 2)
	} else {
		result := countSteps(3*n + 1)
	}
	memo[n] = result + 1
	return result
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	var values []int
	for _, line := range sc.Text().Split("\n", -1) {
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}
		if line == "1" {
			continue
		}
		for _, s := range line {
			if s == " " || s == "\t" {
				continue
			}
			if _, err := strconv.Atoi(s); err == nil {
				values = append(values, s)
			}
		}
	}
	total := 0
	for _, v := range values {
		if _, err := strconv.Atoi(v); err == nil {
			total += countSteps(int(v))
		}
	}
	fmt.Printf("total=%d\n", total)
}
