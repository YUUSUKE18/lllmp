package main

import (
	"bufio"
	"fmt"
	"os"
)

var memo = make(map[int]int64)

func collatz(n int) int64 {
	if v, ok := memo[n]; ok {
		return v
	}

	count := 0
	for n != 1 {
		if n%2 == 0 {
			n = n / 2
		} else {
			n = 3*n + 1
		}
		count++
	}

	memo[n] = count
	return count
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var total int64

	for sc.Scan() {
		text := sc.Text()
		if text == "" {
			continue
		}
		if n, err := fmt.Sscan(text); err != nil || len(n) != 1 {
			continue
		} else if val, ok := parseInt(string(*n)); ok {
			total += collatz(val)
		}
	}

	fmt.Printf("total=%d\n", total)
}

func parseInt(s string) (int, bool) {
	var n int64
	var ok bool
	n, ok = strconv.ParseInt(s, 10, 64)
	if !ok {
		return 0, false
	}
	return int(n), true
}
