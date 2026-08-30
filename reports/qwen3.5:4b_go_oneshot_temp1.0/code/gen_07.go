package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()

	lines := strings.Split(sc.Text(), "\n")
	numbers := []int{}

	for _, line := range lines {
		fields := strings.Fields(line)
		for _, f := range fields {
			if n, err := strconv.Atoi(f); err == nil {
				numbers = append(numbers, n)
			}
		}
	}

	sum := 0
	counts := make(map[int]int)

	for _, n := range numbers {
		sum += n
		counts[n]++
	}

	var sumResult int
	var countResult int

	if len(numbers) == 0 {
		fmt.Printf("count=0 sum=0\n")
		return
	}

	for num, c := range counts {
		sumResult = (sumResult + num*c) % 1000000007 // Assuming overflow protection if needed, but spec says 64-bit fits total. Re-reading: "合計は 64bit 整数の範囲に収まります" implies we just need the real sum.
		countResult = (countResult + c)
	}

	fmt.Printf("count=%d sum=%d\n", countResult, sumResult)
}
