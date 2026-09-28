package main

import (
	"bufio"
	"fmt"
	"math/big"
)

func main() {
	scanner := bufio.NewScanner(stdin)
	targetStr := scanner.Scan()
	if !targetStr {
		return
	}

	target, ok := new(big.Int).SetString(targetStr, 10)
	if !ok {
		return
	}

	var counts map[int]int = make(map[int]int)
	var n int64 = 0

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		valStr, err := new(big.Int).SetString(line, 10)
		if err != nil {
			continue
		}

		n++
		counts[int64(n)] = valInt(valStr)
	}

	ans := int64(0)
	for i := int64(1); i < n; i++ {
		for j := i + 1; j <= n; j++ {
			if counts[i] != nil && counts[j] != nil {
				sum := addBigInt(counts[i], counts[j])
				if sum.Cmp(target) == 0 {
					ans++
				}
			}
		}
	}

	fmt.Printf("pairs=%d\n", ans)
}

func valInt(val *big.Int) int64 {
	return val.Int64()
}

func addBigInt(a, b *big.Int) *big.Int {
	c := new(big.Int)
	c.Add(a, b)
	return c
}
