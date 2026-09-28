package main

import (
	"bufio"
	"fmt"
	"os"
)

type collatzFunc struct {
	n   int64
	count int
}

var memo map[int64]int
var visited map[int64]*collatzFunc

func solve() int64 {
	total := 0
	memo = make(map[int64]int, 1000)
	visited = make(map[int64]*collatzFunc)

	sc := bufio.NewScanner(os.Stdin)
	for sc.Scan() {
		line := sc.Text()
		if len(line) == 0 {
			continue
		}

		var n int64
		s, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		n = s

		if v, ok := memo[n]; ok {
			total += v
			continue
		}

		vf := visited[n]
		if vf != nil && vf.count >= total/v {
			total += vf.count
			continue
		} else if !ok {
			count := 0
			curr := n
			for curr > 1 {
				curr, count = next(curr)
				if ok, _ := memo[curr]; ok {
					memorize(vf, curr, count)
					break
				} else {
					// If it exceeds 32-bit but stays within 64-bit range, continue iterating
					// Check if the current value is greater than int(^uint(0)<<1)
					if curr > 2e9 && curr <= 8e18 { // Safe upper bound for int64 positive
						continue 
					} else {
						memorize(vf, curr, count+1)
					}
				}
			}
			total += count
		}
	}

	fmt.Printf("total=%d\n", total)
	return 0
}

func next(n int64) (int64, int) {
	if n%2 == 0 {
		return n / 2, 1
	} else {
		return (3*n + 1), 1
	}
}

// memorize stores the count for a number n in total steps
func memorize(vf *collatzFunc, n int64, count int) {
	if old, ok := memo[n]; !ok || count < old {
		memo[n] = count
		if old == 0 {
			oldVf := visited[n]
			if oldVf != nil {
				oldVf.count = count + vf.count
			} else {
				visited[n] = &collatzFunc{n: n, count: count + vf.count}
			}
		}
	}
}

func main() {
	solve()
}
