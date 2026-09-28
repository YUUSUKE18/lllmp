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
		parts := strings.Fields(pair)
		if len(parts) != 2 {
			continue
		}

		valStr, ok1 := strconv.ParseInt(parts[0], 10, 64)
		countStr, ok2 := strconv.ParseInt(parts[1], 10, 64)

		if !ok1 || !ok2 || valStr < 0 || countStr < 0 {
			continue
		}

		val := valStr
		cnt := countStr
		count += cnt
		sum += val * cnt
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
