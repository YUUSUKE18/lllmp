package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	mem := make(map[int64]int)

	var total int64 = 0

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		line = strings.TrimSpace(line)
		if line == "" {
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

		hand := getStep(num, mem)
		total += hand

		num = int64(hand)
		mem[num] = total
	}

	fmt.Printf("total=%d\n", total)
}
