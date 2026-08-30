package main

import (
	"bufio"
	"fmt"
	"math/big"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(strings.NewReader(""))
	line, err := reader.ReadString('\n')
	if line == "" || err != nil {
		fmt.Println("count=0 sum=0")
		return
	}

	parts := strings.Fields(line)
	counts := make(map[int]int)

	for _, part := range parts {
		val, err := strconv.Atoi(part)
		if err != nil {
			continue
		}
		counts[val]++
	}

	totalSum := new(big.Int).SetInt64(0)
	if len(counts) == 0 {
		fmt.Println("count=0 sum=0")
		return
	}

	for num, cnt := range counts {
		sumBig := big.NewInt(0)
		sumBig.Mul(num, big.NewInt(int64(cnt)))
		totalSum.Add(totalSum, sumBig)
	}

	fmt.Println(fmt.Sprintf("count=%d sum=%s", len(counts), totalSum.String()))
}
