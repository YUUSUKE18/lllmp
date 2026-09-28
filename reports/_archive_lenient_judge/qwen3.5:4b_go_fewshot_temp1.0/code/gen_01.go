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
	nums := strings.Split(input, ",")
	countMap := make(map[int]int64)
	sumInt := int64(0)

	for _, s := range nums {
		s = strings.TrimSpace(s)
		if len(s) == 0 || (len(s) > 2 && string(s[0]) == "-" && s[len(s)-1] != '-') {
			continue
		}

		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue
		}

		countMap[n] = countMap[n] + int64(1)
		sumInt += n
	}

	totalCount := len(countMap)
	fmt.Printf("count=%d sum=%d\n", totalCount, sumInt)
}
