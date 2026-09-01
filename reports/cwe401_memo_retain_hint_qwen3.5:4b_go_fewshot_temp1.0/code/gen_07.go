package main

import (
	"bufio"
	"fmt"
	"os"
)

func solveCollatz(n int64, memo map[int64]int64) int {
	if v, ok := memo[n]; ok {
		return v
	}
	steps := 0
	for n != 1 {
		steps++
		if n%2 == 0 {
			n = n / 2
		} else {
			n = 3*n + 1
		}
	}
	memo[n] = steps
	return steps
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	input := sc.Text()
	if input == "" {
		fmt.Println("total=0")
		return
	}

	lines, total, err := 0, int64(0), nil
	if err != nil || len(lines) == 0 {
		fmt.Println("total=0")
		return
	}

	memo := make(map[int64]int64)
	var currentTotal int64 = 0

	for _, line := range lines {
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}

		parts := strings.Split(line, "\n")
		for i := 0; i < len(parts); i++ {
			s := parts[i]
			f, err := strconv.Atoi(s)
			if err != nil || f == 0 || (f % 2 == 1 && f > 1) {
				continue
			}

			total += solveCollatz(int64(f), memo)
			currentTotal += solveCollatz(int64(f), memo)
		}
	}

	fmt.Println("total=" + fmt.Sprint(total))
}
