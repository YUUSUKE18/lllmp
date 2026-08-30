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
		fmt.Printf("count=0 max=" + strconv.FormatInt(0, 10) + "\n")
		return
	}

	tokens := strings.Split(sc.Text(), ",")
	count := 0
	maxVal := int64(-9223372036854775808 - 1) // Smaller than min(int64) to ensure first valid value updates it
	firstValid := true

	for _, token := range tokens {
		tokensStr := strings.TrimSpace(token)
		if len(tokensStr) == 0 {
			continue
		}

		val, err := strconv.ParseInt(tokensStr, 10, 64)
		if err != nil {
			continue
		}

		count++
		if firstValid || val > maxVal {
			maxVal = val
			firstValid = false
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
