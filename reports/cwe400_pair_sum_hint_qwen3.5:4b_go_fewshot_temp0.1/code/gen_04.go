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
		fmt.Println("pairs=0")
		return
	}
	target, _ = sc.Scan().Int64()

	counts := make(map[int64]int)
	pairs := 0
	sum := int64(0)

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		needed := target - val
		if needed < val {
			continue
		}

		if c, ok := counts[needed]; ok {
			pairs += c
		}
		counts[val]++
	}

	fmt.Printf("pairs=%d\n", pairs)
}
