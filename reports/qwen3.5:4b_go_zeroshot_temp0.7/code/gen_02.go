package main

import (
	"bufio"
	"fmt"
	"math/big"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	line, err := reader.ReadString('\n')
	if err != nil {
		os.Exit(1)
	}

	var distincts map[int64] = make(map[int64]int)
	for _, r := range line {
		if r == ',' || r == ' ' || r == '\t' || r == '\n' || r == '\r' {
			continue
		}
		val, err := new(big.Int).SetString(string(r), 10)
		if err != nil {
			continue
		}
		val64 := val.Int64()
		distincts[val64]++
	}

	count := len(distincts)
	sumBigInt := big.NewInt(0)
	for _, v := range distincts {
		sumBigInt.Add(sumBigInt, big.NewInt(v))
	}
	sum := sumBigInt.Int64()

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
