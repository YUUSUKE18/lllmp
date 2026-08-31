package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var n int
	line, _ := sc.Scan()
	if line < 1 || !sc.Scan() {
		fmt.Println("count=0 sum=0")
		return
	}
	n, err := strconv.Atoi(sc.Text())
	if err != nil {
		fmt.Println("count=0 sum=0")
		return
	}

	sum := int64(0)
	count := 0
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
		count++
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
