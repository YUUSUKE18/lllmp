package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	cache := make(map[int64]int)

	var total int64

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}

		line = line[:len(line)-1] // 末尾の改行を削除
		if len(line) == 0 {
			continue
		}

		var n int64
		_, err := fmt.Sscanf(line, "%d", &n)
		if err != nil {
			continue
		}

		if n <= 0 {
			continue
		}

		steps := 0
		for n != 1 {
			val, ok := cache[n]
			if ok {
				n = int64(val)
				steps += val
				continue
			}

			if n%2 == 0 {
				n /= 2
			} else {
				n = 3*n + 1
			}

			cache[n] = steps + 1
			steps++
		}

		total += steps
	}

	fmt.Printf("total=%d\n", total)
}
