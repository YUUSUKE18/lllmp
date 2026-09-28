package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	cache := make(map[int64]int)

	var total int64
	scanner := bufio.NewScanner(reader)

	for scanner.Scan() {
		line, _ := reader.ReadString('\n')
		if line == "" || line[0] != ' ' && line[0] != '\t' {
			continue
		}
		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		if num == 1 {
			total += 0
			continue
		}

		if val, ok := cache[num]; ok {
			total += val
			continue
		}

		step := 0
		curr := num
		for curr != 1 {
			if curr%2 == 0 {
				curr = curr / 2
			} else {
				curr = 3*curr + 1
			}
			step++
		}

		cache[num] = step
		total += step
	}

	fmt.Printf("total=%d\n", total)
}
