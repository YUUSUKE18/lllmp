package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	r := bufio.NewReader(os.Stdin)
	target, err := parseInt(r)
	if err != nil {
		fmt.Printf("pairs=0\n")
		return
	}

	type entry struct {
		val int64
		idx int
	}

	var entries []entry
	count := 0

	for {
		line, err := r.ReadString('\n')
		if err != nil {
			break
		}
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}

		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		count++
		entries = append(entries, entry{val: val, idx: count})
	}

	var pairs int64
	for i := 0; i < len(entries); i++ {
		for j := i + 1; j < len(entries); j++ {
			if entries[i].val+entries[j].val == target {
				pairs++
			}
		}
	}

	fmt.Printf("pairs=%d\n", pairs)
}
