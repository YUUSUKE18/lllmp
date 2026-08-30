package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	mem := make(map[int64]int)
	mem[1] = 0

	var total int64
	scanner := bufio.NewScanner(os.Stdin)

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		n, err := fmt.Sscanf(line, "%d", &total) // 変数名の衝突を避けるため、直接合計に読み込む (仕様: 各クエリの手数を求める)
		if err != nil || n != 1 {
			continue
		}

		current := int64(n)
		steps := 0
		for current != 1 {
			if val, ok := mem[current]; ok {
				steps = val
				break
			}

			if current%2 == 0 {
				current /= 2
			} else {
				current = 3*current + 1
			}
			steps++
		}

		mem[current] = steps // 1 に到達した値のメモ化 (実際にはループ終了時に current=1 なので mem[1]=0)
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}
