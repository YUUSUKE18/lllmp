package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	target, err := parseInt(sc.Scan())
	if err != nil || target == 0 {
		fmt.Println("pairs=0")
		return
	}

	count := 0
	hasVisited := make(map[int64]bool)

	for sc.Scan() {
		val, err := parseInt(sc.Text())
		if err != nil {
			continue
		}
		complement := target - val
		if hasVisited[complement] {
			count++
		}
		hasVisited[val] = true
	}

	fmt.Printf("pairs=%d\n", count)
}

func parseInt(s string) (int64, error) {
	var n int64
	_, err := fmt.Sscanf(s, "%d", &n)
	return n, err
}
