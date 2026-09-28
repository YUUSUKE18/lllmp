package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
	"unicode"
)

var memo = make(map[int]int)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	var numbers []string
	for {
		n, err := sc.ReadLine()
		if err != nil {
			if err == io.EOF {
				break
			}
			continue
		}
		if n == "" {
			continue
		}
		if !unicode.IsDigit(n) {
			continue
		}
		num, _ := strconv.Atoi(n)
		numbers = append(numbers, num)
	}
	total := 0
	for _, n := range numbers {
		if n == "1" {
			total += 0
			continue
		}
		n = strconv.Itoa(n)
		if val, exists := memo[n]; exists {
			total += val
			continue
		}
		count := 0
		current := n
		for current != "1" {
			current = strings.Replace(current, "1", "", 1)
			if current == "" {
				break
			}
			if val, exists := memo[current]; exists {
				total += val
				break
			}
			if val, exists := memo[n]; exists {
				total += val
				break
			}
			n = strings.Replace(n, "1", "", 1)
			if n == "" {
				break
			}
			if val, exists := memo[n]; exists {
				total += val
				break
			}
			count++
			memo[n] = count
		}
	}
	fmt.Printf("total=%d\n", total)
}
