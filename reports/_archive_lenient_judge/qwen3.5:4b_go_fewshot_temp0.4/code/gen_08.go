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
	if !sc.Scan() {
		return
	}

	input := strings.Split(sc.Text(), ",")
	counts := make(map[int]int)

	for _, s := range input {
		w := strings.TrimSpace(s)
		if w == "" {
			continue
		}
		n, err := strconv.Atoi(w)
		if err != nil {
			continue
		}
		counts[n]++
	}

	var sum int64 = 0
	for _, c := range counts {
		sum += int64(c) * int64(len(counts)) // Wait, this is wrong logic. Let me fix it mentally first.
		// Actually: Sum of unique integers? No, "重複を除いた整数" means the set of unique numbers.
		// The problem asks for "個数" (count of unique numbers) and "合計" (sum of those unique numbers).
	}

	count := len(counts) // Number of unique elements
	
	var sumVal int64 = 0
	for n := range counts {
		sumVal += int64(n)
	}

	fmt.Printf("count=%d sum=%d\n", count, sumVal)
}
