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
	input, err1 := sc.Scan()
	if err1 != nil || len(input) == 0 {
		fmt.Printf("count=0 sum=0\n")
		return
	}

	expectedCount, err := strconv.Atoi(strings.TrimSpace(string(input)))
	sum := int64(0)
	count := 0

	for sc.Scan() {
		line := strings.TrimSpace(string(sc.Text()))
		if line == "" {
			continue
		}

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		sum += n
		count++
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
