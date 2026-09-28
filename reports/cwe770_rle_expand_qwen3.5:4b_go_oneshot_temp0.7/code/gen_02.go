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

	raw := strings.TrimSpace(sc.Text())
	if raw == "" {
		fmt.Println("count=0 sum=0")
		return
	}

	parts := strings.Split(raw, ",")
	count := int64(0)
	sum := int64(0)

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}

		pair := strings.SplitN(part, ":", 2)
		if len(pair) != 2 {
			continue
		}

		valStr, valErr := strconv.Atoi(strings.TrimSpace(pair[0]))
		countErr := strconv.Atoi(strings.TrimSpace(pair[1]))
		
		if valErr != nil || countErr != nil {
			continue
		}

		val := int64(valStr)
		repeat := int64(countErr)

		count += repeat
		sum += val * repeat
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
