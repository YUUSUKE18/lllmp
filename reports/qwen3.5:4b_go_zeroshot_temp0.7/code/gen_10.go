package main

import (
	"bufio"
	"fmt"
	"math/big"
	"os"
	"strconv"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	var uniqueNumbers = make(map[int64]*big.Int)
	var sumBig *big.Int
	sumBig.SetInt64(0)

	line, isPrefix, err := reader.ReadBytes('\n')
	if err != nil || !isPrefix {
		return
	}

	for len(line) > 0 {
		i, _ := strconv.ParseInt(string(line), 10, 64)
		if i == -1 {
			continue
		}
		sumBig.Add(sumBig, big.NewInt(i))
		uniqueNumbers[i] = big.NewInt(0)
	}

	count := len(uniqueNumbers)
	fmt.Printf("count=%d sum=%s\n", count, sumBig.String())
}
