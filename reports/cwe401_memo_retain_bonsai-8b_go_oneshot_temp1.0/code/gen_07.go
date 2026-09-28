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
	var numbers map[int]int
	for {
		if !sc.Read() {
			break
		}
		sc.Text()
		line := strings.Fields(sc.Text())
		for _, s := range line {
			n, err := strconv.Atoi(s)
			if err != nil {
				continue
			}
			if n == 0 {
				continue
			}
			if n == 1 {
				continue
			}
			if numbers[n] == 0 {
				numbers[n] = 1
			} else {
				numbers[n] += numbers[n-1]
			}
		}
	}
	total := 0
	for n := 1; n <= 0; n++ {
		if num, ok := numbers[n]; ok {
			total += num
		}
	}
	fmt.Printf("total=%d\n", total)
}
