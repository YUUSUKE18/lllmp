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
		fmt.Println("pairs=0")
		return
	}

	var targetVal int64
	n, err := fmt.Sscanf(target, "%d", &targetVal)
	if n != 1 || err != nil {
		fmt.Println("pairs=0")
		return
	}

	type entry struct {
		val   int64
		index int
	}

	var entries []entry
	lineNum := 0
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}

		line = line
		skipEmpty := true
		for _, ch := range line {
			if ch == '\r' || ch == ' ' || ch == '\t' || ch == '\n' {
				continue
			} else {
				skipEmpty = false
				break
			}
		}

		if skipEmpty {
			continue
		}

		var val int64
		_, err := fmt.Sscanf(line, "%d", &val)
		if err != nil || val < 0 {
			continue
		}

		lineNum++
		if lineNum == 1 {
			continue
		}

		entries = append(entries, entry{val: val, index: lineNum})
	}

	n := len(entries)
	pairCount := 0

	for i := 0; i < n; i++ {
		complement := targetVal - entries[i].val
		foundIndex := -1

		for j := 0; j < i; j++ {
			if entries[j].val == complement {
				foundIndex = j
				break
			}
		}

		if foundIndex != -1 {
			pairCount++
		}
	}

	fmt.Printf("pairs=%d\n", pairCount)
}
