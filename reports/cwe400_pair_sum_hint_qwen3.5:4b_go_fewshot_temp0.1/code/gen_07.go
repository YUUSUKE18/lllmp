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

	var sum int64
	sum = 0
	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		sum += val
	}

	fmt.Printf("pairs=%d\n", sum)
}
