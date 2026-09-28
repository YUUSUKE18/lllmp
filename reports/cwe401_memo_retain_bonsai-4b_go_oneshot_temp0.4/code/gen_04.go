```go
package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo = make(map[int]int)

func step(n int) int {
	if n == 1 {
		return 0
	}
	if memo[n] != 0 {
		return memo[n]
	}
	if n%2 == 0 {
		result := step(n / 2)
		memo[n] = result + 1
		return memo[n]
	}
	result := step(3*n + 1)
	memo[n] = result + 1
	return memo[n]
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	var total 0
	for _, line := range sc.Text().Split('\n', -1) {
		line = line.strip()
		if line == "" {
			continue
		}
		// インテグルを分割
		fields := strings.Fields(line)
		for _, f := range fields {
			if f == "" {
				continue
			}
			n, err := strconv.Atoi(f)
			if err != nil {
				continue
			}
			// 1 に到達するまでの手数を計算
			// 1 は 0 となるため、n が1の場合はスキップ
			// 1に至るまでの手数を計算
			// 1は0
			// nは1なら0
			// 他の場合：step(n)を繰り返し
			// これは1の処理を含む
			// 1は0
			// 2は1
			// 3は4
			// 4は2
			// 5は16
			// 16は8
			// 8は4
			// 4は2
			// 2は1
			// 1は0
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			// 3n+1は3n+1
			//
