package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	target, err := strconv.ParseInt(sc.Text(), 10, 64)
	if err != nil || target == 0 {
		fmt.Println("pairs=0")
		return
	}

	lines, chars := 0, 0
	pairs := 0
	sums := make(map[int64]int)
	found := false
	hasTwo := false
	seen := make([]int64, 0)

	for sc.Scan() {
		lineNum := strings.TrimSpace(sc.Text())
		if lineNum == "" || !hasTwo {
			continue
		}
		val, err := strconv.ParseInt(lineNum, 10, 64)
		if err != nil {
			continue
		}

		if val > target {
			hasTwo = true
			continue
		}

		found = false
		for _, s := range seen {
			if found {
				break
			}
			if s+val == target {
				pairs++
				found = true
				break
			}
		}
		seen = append(seen, val)
	}

	fmt.Printf("pairs=%d\n", pairs)
}
