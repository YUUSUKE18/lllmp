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
	countStr := sc.Text()
	count, err := strconv.Atoi(countStr)
	if err != nil {
		fmt.Println("count=%d\n", count)
		return
	}
	count := 0
	sum := 0
	for _ := range strings.Fields(sc.Text()) {
		line := strings.Fields(sc.Text())
		for _, numStr := range line {
			num, err := strconv.Atoi(numStr)
			if err != nil {
				continue
			}
			count++
			sum += num
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
