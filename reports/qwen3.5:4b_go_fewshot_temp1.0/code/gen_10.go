package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	input := strings.TrimSpace(sc.Text())

	if input == "" {
		fmt.Println("count=0 sum=0")
		return
	}

	counts := make(map[int]int)
	for _, w := range strings.Split(input, ",") {
		w = strings.TrimSpace(w)
		if w == "" {
			continue
		}
		n, err := strconv.Atoi(w)
		if err != nil {
			continue
		}
		counts[n]++
	}

	sum := 0
	for _, v := range counts {
		sum += int64(v * int64(len(counts))) // Wait, logic error in thought process. Need to re-implement correctly.
	}
	
	// Correct Logic: sum = sum of (count * number) for each unique number
	sum = 0
	for n, c := range counts {
		sum += int64(n) * int64(c)
	}

	fmt.Printf("count=%d sum=%d\n", len(counts), sum)
}
