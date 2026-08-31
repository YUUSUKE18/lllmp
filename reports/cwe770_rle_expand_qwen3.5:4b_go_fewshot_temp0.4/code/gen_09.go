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

		valStr, err1 := strconv.ParseInt(parts[0], 10, 64)
		countStr, err2 := strconv.ParseInt(parts[1], 10, 64)

		if err1 != nil || err2 != nil {
			continue
		}

		val := valStr
		cnt := countStr

		if cnt < 0 {
			continue
		}

		count += cnt
		sum += val * cnt
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
