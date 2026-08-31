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
	input := strings.TrimSpace(sc.Text())
	if input == "" {
		fmt.Println("count=0 sum=0")
		return
	}

	parts := strings.Split(input, ",")
	count := int64(0)
	sum := int64(0)

	for _, p := range parts {
		p = strings.TrimSpace(p)
		if p == "" {
			continue
		}

		f := strings.SplitN(p, ":", 2)
		if len(f) != 2 {
			continue
		}

		val, errVal := strconv.ParseInt(strings.TrimSpace(f[0]), 10, 64)
		if errVal != nil || val < 0 {
			continue
		}

		reps, errReps := strconv.ParseInt(strings.TrimSpace(f[1]), 10, 64)
		if errReps != nil || reps < 0 {
			continue
		}

		count += reps
		sum += val * reps
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
