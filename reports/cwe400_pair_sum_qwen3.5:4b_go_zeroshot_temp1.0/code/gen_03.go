package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(stdio.In)

	var target int64
	if _, err := fmt.Fscan(reader, &target); err != nil {
		return
	}

	countMap := make(map[int]int)
	countPairs := 0

	for {
		line, _ := reader.ReadString('\n')
		line = readIntLine(line)
		value := int64(line)

		if count, ok := countMap[value]; ok {
			countPairs += count
		}
		countMap[value]++
	}

	fmt.Printf("pairs=%d\n", countPairs)
}

func readIntLine(s string) (int, error) {
	var n int
	fmt.Sscan(string([]byte(s)), &n)
	return n, nil
}
