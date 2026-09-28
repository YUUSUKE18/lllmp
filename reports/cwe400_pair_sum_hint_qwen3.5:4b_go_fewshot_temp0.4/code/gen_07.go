package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	target, err := reader.ReadString('\n')
	if err != nil {
		return
	}
	target = strings.TrimSpace(target)
	var targetVal int64
	fmt.Sscanf(target, "%d", &targetVal)

	var values []int64
	scanner := bufio.NewScanner(reader)
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		values = append(values, val)
	}

	count := 0
	for i := 0; i < len(values); i++ {
		for j := i + 1; j < len(values); j++ {
			if values[i]+values[j] == targetVal {
				count++
			}
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
