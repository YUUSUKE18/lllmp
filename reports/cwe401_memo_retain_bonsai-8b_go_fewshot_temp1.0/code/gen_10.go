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
		n, err := sc.ReadInt()
		if err != nil {
			if err == io.EOF {
				break
			}
			continue
		}
		if n < 0 {
			continue
		}
		if m, ok := numbers[n]; ok {
			continue
		}
		numbers[n] = m
		m := n
		for m != 1 {
			if m%2 == 0 {
				m /= 2
			} else {
				m = 3*m + 1
			}
		}
		m, ok := numbers[m]
		if ok {
			m++
		}
		numbers[m] = m
		total := 0
		for n := range numbers {
			total += numbers[n]
		}
		fmt.Printf("total=%d\n", total)
	}
}
