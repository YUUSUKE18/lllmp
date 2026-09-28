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
		fmt.Printf("count=0 sum=0\n")
		return
	}

	input := sc.Text()
	pairs := strings.Split(input, ",")
	count := int64(0)
	sum := int64(0)

	for _, pair := range pairs {
		pair = strings.TrimSpace(pair)
		if pair == "" {
			continue
		}

		fields := strings.Fields(pair)
		if len(fields) != 2 {
			continue
		}

		val, errVal := strconv.ParseInt(fields[0], 10, 64)
		counts, errCounts := strconv.Atoi(fields[1])

		if errVal != nil || errCounts != nil {
			continue
		}

		if counts < 0 {
			continue
		}

		sum += val * int64(counts)
		count += int64(counts)
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
