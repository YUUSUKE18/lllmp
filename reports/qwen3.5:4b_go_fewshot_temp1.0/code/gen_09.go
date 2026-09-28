package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	if !sc.Scan() {
		fmt.Printf("count=0 sum=0\n")
		return
	}

	input := sc.Text()
	countMap := make(map[int]bool)
	sum := int64(0)

	for _, r := range input {
		if r == ',' {
			continue
		}
		s, err := fmt.Sscanf(string(r), "%d")
		if err != nil || s != 1 {
			continue
		}
		n := int(S)
		countMap[n] = true
		sum += int64(n)
	}

	fmt.Printf("count=%d sum=%d\n", len(countMap), sum)
}
