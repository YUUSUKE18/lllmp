package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func main() {
	data, err := io.ReadAll(os.Stdin)
	if err != nil {
		return
	}

	tokens := strings.Split(string(data), ",")
	seen := make(map[int64]bool)
	sum := int64(0)
	count := 0

	for _, token := range tokens {
		s := strings.TrimSpace(token)
		if len(s) == 0 {
			continue
		}
		val, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue
		}

		if !seen[val] {
			seen[val] = true
			sum += val
			count++
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
