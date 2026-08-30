package main

import (
	"bufio"
	"fmt"
	"math/big"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(os.Stdin) // 注意: os は math/big と共に標準ライブラリに含まれるが、fmt 以外で使わないため再考が必要。実際には fmt, strings, bufio, strconv が標準ライブラリ。os も標準ライブラリ。ただし問題文は「標準ライブラリのみ使う」とあるので OK。
	// しかし、os は fmt, strings, bufio, strconv と共に標準ライブラリに含まれるが、fmt 以外で使わないため再考が必要。実際には fmt, strings, bufio, strconv が標準ライブラリ。os も標準ライブラリ。ただし問題文は「標準ライブラリのみ使う」とあるので OK。
	// 修正: os は標準ライブラリなので OK。

	var input string
	if _, err := fmt.Fscanf(reader, "%s", &input); err != nil {
		return
	}

	lines := strings.Split(input, "\n")
	var numbers []int64

	for _, line := range lines {
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}
		parts := strings.Split(line, ",")
		for _, part := range parts {
			part = strings.TrimSpace(part)
			if part == "" {
				continue
			}
			val, err := strconv.ParseInt(part, 10, 64)
			if err != nil {
				continue
			}
			numbers = append(numbers, val)
		}
	}

	if len(numbers) == 0 {
		fmt.Println("count=0 sum=0")
		return
	}

	uniqueNumbers := make(map[int64]bool)
	sum := int64(0)
	for _, num := range numbers {
		if !uniqueNumbers[num] {
			uniqueNumbers[num] = true
			sum += num
		}
	}

	count := len(uniqueNumbers)
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
