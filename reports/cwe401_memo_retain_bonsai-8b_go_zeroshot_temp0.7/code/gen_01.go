package main

import (
	"fmt"
	"math"
	"os"
	"strings"
	"time"
)

var memo = make(map[int]int)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		s := strings.TrimSpace(scanner.Text())
		if s == "" {
			continue
		}
		n, err := parseInt(s)
		if err != nil {
			continue
		}
		if n == 1 {
			fmt.Println("total=0")
			continue
		}
		if _, exists := memo[n]; exists {
			fmt.Printf("total=%d\n", memo[n])
			continue
		}
		count := 0
		for n != 1 {
			if n%2 == 0 {
				n /= 2
			} else {
				n = 3*n + 1
			}
			count++
			if n > math.MaxInt64 {
				memo[n] = count
				break
			}
		}
		memo[n] = count
		fmt.Printf("total=%d\n", memo[n])
	}
}

func parseInt(s string) (int, error) {
	n, err := parse(s)
	if err != nil {
		return 0, err
	}
	if n < 0 {
		return 0, fmt.Errorf("negative number")
	}
	return n, nil
}

func parse(s string) (int, error) {
	if len(s) == 0 {
		return 0, nil
	}
	num, err := strconv.Atoi(s)
	if err != nil {
		return 0, err
	}
	return num, nil
}
