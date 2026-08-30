package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	target, err := findAndParse(scanner, 0)
	if err != nil {
		fmt.Println("pairs=0")
		return
	}

	sums := make(map[int64]int64)
	counts := 0

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		complement := target - num
		if complement < num {
			counts += sums[num]
		} else if complement == num {
			counts += sums[complement] * (num-1)/2
		} else {
			counts += sums[complement]
		}

		sums[num]++
	}

	fmt.Printf("pairs=%d\n", counts)
}

func findAndParse(scanner *bufio.Scanner, defaultVal int64) (int64, error) {
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		return val, nil
	}
	return defaultVal, scanner.Err()
}
