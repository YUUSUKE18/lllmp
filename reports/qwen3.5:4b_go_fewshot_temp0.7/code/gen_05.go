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
	pairs := make(map[int]int)

	for _, w := range strings.Split(input, ",") {
		w = strings.TrimSpace(w)
		if w == "" {
			continue
		}
		n, err := strconv.Atoi(w)
		if err != nil {
			continue
		}
		pairs[n]++
	}

	var count int64
	var sum int64
	for _, c := range pairs {
		count += int64(c)
		sum += int64(c) * int64(c)
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
