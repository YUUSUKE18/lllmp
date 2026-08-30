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
		fmt.Println("count=0 sum=0")
		return
	}

	line := sc.Text()
	pairs := make(map[int]int)
	sum := int64(0)

	for _, token := range strings.Fields(line) {
		n, err := strconv.Atoi(token)
		if err != nil {
			continue
		}
		count := pairs[n] + 1
		pairs[n] = count
		sum += int64(n * count)
	}

	totalCount := len(pairs)
	fmt.Printf("count=%d sum=%d\n", totalCount, sum)
}
