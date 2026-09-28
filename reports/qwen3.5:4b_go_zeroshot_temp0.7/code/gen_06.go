package main

import (
	"bufio"
	"fmt"
	"math"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	line, err := reader.ReadString('\n')
	if err != nil {
		return
	}

	var counts map[int]int = make(map[int]int)

	for _, token := range strings.Split(line, ",") {
		token = strings.TrimSpace(token)
		if len(token) == 0 {
			continue
		}

		val, err := strconv.Atoi(token)
		if err != nil {
			continue
		}

		counts[val]++
	}

	var sum int64 = 0
	for _, count := range counts {
		sum += int64(count)
	}

	fmt.Println(fmt.Sprintf("count=%d sum=%d", len(counts), sum))
}
