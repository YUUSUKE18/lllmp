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
	input := sc.Text()
	
	if input == "" {
		fmt.Println("count=0 sum=0")
		return
	}

	count, total := int64(0), int64(0)
	tokens := strings.Split(strings.TrimSpace(input), ",")

	for _, token := range tokens {
		token = strings.TrimSpace(token)
		if len(token) == 0 {
			continue
		}
		
		parts := strings.SplitN(token, ":", 2)
		if len(parts) != 2 {
			continue
		}

		keyStr := strings.TrimSpace(parts[0])
		valStr := strings.TrimSpace(parts[1])

		if keyStr == "" || valStr == "" {
			continue
		}

		value, err := strconv.ParseInt(keyStr, 10, 64)
		if err != nil {
			continue
		}

		repeatCount, err := strconv.ParseInt(valStr, 10, 64)
		if err != nil {
			continue
		}

		if repeatCount < 0 {
			continue
		}

		count += repeatCount
		total += value * repeatCount
	}

	fmt.Printf("count=%d sum=%d\n", count, total)
}
