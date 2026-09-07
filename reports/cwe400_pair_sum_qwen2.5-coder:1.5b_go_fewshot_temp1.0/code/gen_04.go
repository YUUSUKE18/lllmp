package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan() // 目標値
	target, err := strconv.Atoi(sc.Text())
	if err != nil {
		fmt.Println("Invalid target value")
		return
	}

	var pairs int
	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		num, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		if num+target == target {
			pairs++
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
