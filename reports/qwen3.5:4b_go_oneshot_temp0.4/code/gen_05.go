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
	input := sc.Text()
	pairs := make(map[int]int64)
	for _, s := range strings.Split(input, ",") {
		s = strings.TrimSpace(s)
		if len(s) == 0 {
			continue
		}
		n, err := strconv.Atoi(s)
		if err != nil {
			continue
		}
		pairs[n]++
	}
	var sum int64
	for _, count := range pairs {
		sum += int64(count)
	}
	fmt.Printf("count=%d sum=%d\n", len(pairs), sum)
}
