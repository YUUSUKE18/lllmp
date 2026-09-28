package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)

	var target int64
	line, err := reader.ReadString('\n')
	if err != nil || line == "" {
		return
	}
	fmt.Sscanf(line, "%d", &target)

	counts := make(map[int64]int)
	found := make(map[int64]bool)

	var pairs int64

	scanner := bufio.NewScanner(reader)
	for scanner.Scan() {
		line = scanner.Text()
		if line == "" || (len(line) > 0 && line[0] == '#') {
			continue
		}

		var val int64
		fmt.Sscanf(line, "%d", &val)
		if err := scanner.Err(); err != nil {
			break
		}

		if complement := target - val; found[complement] {
			pairs += found[complement]
		}
		found[val]++
		counts[val] = counts[val] + 1 // Not strictly needed for logic but kept for clarity if extended
	}

	fmt.Printf("pairs=%d\n", pairs)
}
