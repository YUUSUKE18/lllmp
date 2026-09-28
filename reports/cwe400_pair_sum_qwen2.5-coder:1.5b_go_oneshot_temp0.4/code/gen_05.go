package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	target, err := strconv.Atoi(sc.Text())
	if err != nil {
		fmt.Println("invalid target")
		return
	}
	sc.Scan()
	count := 0
	seen := make(map[int]bool)
	for sc.Scan() {
		n, err := strconv.Atoi(sc.Text())
		if err != nil {
			continue
		}
		if seen[n] {
			count++
		}
		seen[n] = true
	}
	fmt.Printf("pairs=%d\n", count)
}
