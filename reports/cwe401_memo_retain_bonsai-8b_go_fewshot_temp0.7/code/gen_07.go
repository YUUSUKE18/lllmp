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
		if n == 1 {
			fmt.Printf("total=0\n")
			return
		}
		if m, ok := numbers[n]; ok {
			fmt.Printf("total=%d\n", total)
			return
		}
		numbers[n] = m + 1
		m = n / 2
		if m%2 == 0 {
			m = m / 2
		} else {
			m = 3*m + 1
		}
		if m == 1 {
			fmt.Printf("total=%d\n", total)
			return
		}
		total++
	}
	fmt.Printf("total=%d\n", total)
}
