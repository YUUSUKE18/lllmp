package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
	"runtime"
	"sync"
)

var (
	memo = make(map[int]int)
	once  = sync.Once
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var numbers []string
	for {
		if !sc.Scan() {
			break
		}
		numbers = append(numbers, sc.Text())
	}

	total := 0
	for _, numStr := range numbers {
		num, err := strconv.Atoi(numStr)
		if err != nil {
			continue
		}
		if num == 1 {
			total += 0
			continue
		}
		if n, ok := memo[num]; ok {
			total += n
			continue
		}
		n := num
		count := 0
		for n != 1 {
			if n%2 == 0 {
				n /= 2
			} else {
				n = 3*n + 1
			}
			count++
		}
		memo[num] = count
		total += count
	}

	fmt.Printf("total=%d\n", total)
}
