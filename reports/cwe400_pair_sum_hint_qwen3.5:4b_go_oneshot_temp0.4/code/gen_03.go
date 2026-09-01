package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	target, err := strconv.ParseInt(sc.Text(), 10, 64)
	if err != nil || sc.Scan() == 0 {
		fmt.Printf("pairs=0\n")
		return
	}

	count := 0
	found := make(map[int64]bool)

	for i := 2; ; i++ {
		lineNum := i - 1
		if !sc.Scan() {
			break
		}
		text := sc.Text()
		if text == "" {
			continue
		}
		n, err := strconv.ParseInt(text, 10, 64)
		if err != nil {
			continue
		}

		for complement := range found {
			sum := n + complement
			if sum == target {
				count++
			}
		}

		found[n] = true
	}

	fmt.Printf("pairs=%d\n", count)
}
