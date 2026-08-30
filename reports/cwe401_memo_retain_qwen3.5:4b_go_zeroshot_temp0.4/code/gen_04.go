package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	var memo = make(map[int64]int64)
	total := int64(0)

	reader := bufio.NewReader(os.Stdin)
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}

		line = line[:len(line)-1] // 末尾の改行を削除
		if len(line) == 0 || line == " " {
			continue
		}

		var n int64
		fmt.Sscanf(line, "%d", &n)
		if fmt.Scanf("%d", &n) != 1 {
			continue
		}

		if n == 1 {
			total += 0
			continue
		}

		if val, ok := memo[n]; ok {
			total += val
			continue
		}

		count := 0
		curr := n
		for curr != 1 {
			if curr%2 == 0 {
				curr = curr / 2
			} else {
				curr = 3*curr + 1
			}
			count++
		}

		memo[n] = int64(count)
		total += count
	}

	fmt.Printf("total=%d\n", total)
}
