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

	input := sc.Text()
	pairs := strings.Split(input, ",")
	var count int64
	var sum int64
	for _, pairStr := range pairs {
		pairStr = strings.TrimSpace(pairStr)
		if pairStr == "" {
			continue
		}
		items := strings.Split(pairStr, ":")
		if len(items) != 2 {
			continue
		}
		valStr, countErr1 := strconv.Atoi(strings.TrimSpace(items[0]))
		histStr, countErr2 := strconv.Atoi(strings.TrimSpace(items[1]))

		if countErr1 != nil || countErr2 != nil {
			continue
		}

		val := int64(valStr)
		hist := int64(histStr)

		sum += val * hist
		count += hist
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
