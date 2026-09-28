package main

import (
	"bufio"
	"fmt"
	"io"
)

func main() {
	reader := bufio.NewReader(io.LimitReader(nil, 1024*1024))
	var target int64
	if _, err := fmt.Fscan(reader, &target); err != nil {
		return
	}

	values := []int64{}
	lineNum := 1

	for reader.IsPeek(0) || reader.Error() == io.EOF {
		line, isPrefix, err := reader.ReadBytes('\n')
		if err != nil && err != io.EOF {
			break
		}

		if !isPrefix {
			continue
		}

		var val int64
		found, skipLine := fmt.Sscanf(string(line), "%d", &val)
		if found == 1 && !skipLine {
			values = append(values, val)
		}
	}

	count := int64(0)
	for i := 0; i < len(values); i++ {
		foundPairs := false
		for j := i + 1; j < len(values); j++ {
			if values[i]+values[j] == target {
				count++
				foundPairs = true
				break
			}
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
