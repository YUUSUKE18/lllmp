package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	total := 0

	for {
		query, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		query = strings.TrimSpace(query)

		if query == "" {
			continue
		}

		num, err := strconv.Atoi(query)
		if err != nil {
			continue
		}

		if num == 1 {
			total += 0
			continue
		}

		count := 0
		memo := make(map[int]int)
		memo[num] = count

		for num != 1 {
			count++
			if num%2 == 0 {
				num /= 2
			} else {
				num = 3*num + 1
			}
			if memo[num] != 0 {
				count += memo[num]
				break
			}
			memo[num] = count
		}

		total += count
	}

	fmt.Printf("total=%d\n", total)
}
