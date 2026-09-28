package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var target int64
	if !sc.Scan() {
		return
	}
	target, _ = sc.ScanInt64(sc.Text())

	counts := make(map[int64]int)
	pairs := 0
	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		complement := target - val
		if c, ok := counts[complement]; ok {
			pairs += c
		}
		counts[val]++
	}

	fmt.Printf("pairs=%d\n", pairs)
}
