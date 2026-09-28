package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
	"sort"
)

var memo = map[int]int{}

func collate(n int) (int, int) {
	if n == 1 {
		return 0, 0
	}
	if m, _ := memo[n]; m != 0 {
		return m, 0
	}

	var a, b, c int
	a = n
	b = 0
	c = 0

	for {
		if a%2 == 0 {
			a /= 2
		} else {
			a = 3*a + 1
		}
		b++
		if a == 1 {
			break
		}
		m, _ := memo[a]
		if m != 0 {
			c = m
			break
		}
	}

	memo[n] = c + b
	return c + b, 0
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var numbers []int

	for {
		n, err := sc.ReadInt()
		if err != nil {
			if err == io.EOF {
				break
			}
			continue
		}
		if n == 0 {
			break
		}
		if _, err := strconv.Atoi(string(n)); err != nil {
			continue
		}
		numbers = append(numbers, n)
	}

	sort.Ints(numbers)
	result := 0
	for _, n := range numbers {
		c, _ := collate(n)
		result += c
	}

	fmt.Printf("total=%d\n", result)
}
