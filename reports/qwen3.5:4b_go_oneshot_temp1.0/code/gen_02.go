package main

import (
	"bufio"
	"fmt"
	"math/big"
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

	content := sc.Text()
	parts := strings.Split(content, ",")
	countMap := make(map[int]bool)
	sumBig := big.NewInt(0)

	for _, p := range parts {
		s := strings.TrimSpace(p)
		if len(s) == 0 {
			continue
		}
		n, err := strconv.Atoi(s)
		if err != nil {
			continue
		}
		countMap[n] = true
		sumBig.Add(sumBig, big.NewInt(int64(n)))
	}

	totalCount := len(countMap)
	sumInt := sumBig.Int64()

	fmt.Printf("count=%d sum=%d\n", totalCount, sumInt)
}
