package main

import (
	"bufio"
	"fmt"
	"os"
)

// memo is a map to store the number of steps for a given starting number.
var memo map[int64]int64 = make(map[int64]int64)

func countSteps(n int64) int64 {
	if n == 1 {
		return 0
	}
	if val, ok := memo[n]; ok {
		return val
	}

	steps := 0
	nextN := n
	for nextN != 1 {
		steps++
		if nextN % 2 == 0 {
			nextN = nextN / 2
		} else {
			nextN = 3*nextN + 1
		}
	}
	memo[n] = int64(steps)
	return steps
}

func main() {
	var total int64 = 0
	sc := bufio.NewScanner(os.Stdin)

	for sc.Scan() {
		line, _ := sc.Text(), readErr(sc)
		if err == nil && line != "" {
			n, parseErr := strconv.ParseInt(line, 10, 64)
			if parseErr != nil || n <= 0 {
				continue
			}

			steps := countSteps(n)
			total += steps
		}
	}

	fmt.Printf("total=%d\n", total)
}

func readErr(sc *bufio.Scanner) error {
	return sc.Err()
}

func main2() {} // Placeholder to avoid duplicate declaration errors in some editors if copy-pasted incorrectly, but removed for clean output below.

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo map[int64]int64 = make(map[int64]int64)

func countSteps(n int64) int64 {
	if n == 1 {
		return 0
	}
	if val, ok := memo[n]; ok {
		return val
	}

	steps := 0
	nextN := n
	for nextN != 1 {
		steps++
		if nextN % 2 == 0 {
			nextN = nextN / 2
		} else {
			nextN = 3*nextN + 1
		}
	}
	memo[n] = steps
	return steps
}

func main() {
	var total int64 = 0
	sc := bufio.NewScanner(os.Stdin)

	for sc.Scan() {
		line, _ := sc.Text(), readErr(sc)
		if err == nil && line != "" {
			n, parseErr := strconv.ParseInt(line, 10, 64)
			if parseErr != nil || n <= 0 {
				continue
			}

			steps := countSteps(n)
			total += steps
		}
	}

	fmt.Printf("total=%d\n", total)
}

func readErr(sc *bufio.Scanner) error {
	return sc.Err()
}
