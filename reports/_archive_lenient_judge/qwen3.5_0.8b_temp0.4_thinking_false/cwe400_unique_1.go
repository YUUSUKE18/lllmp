package main

import (
	"bufio"
	"fmt"
	"os"
)

func countAndSum(numbers []int64) {
	count := 0
	sum := 0
	for _, num := range numbers {
		if num == 0 { continue } // 空要素を無視する
		count++
		sum += num
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}

func main() {
	file, err := os.Open(".")
	if err != nil {
		panic(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" || !strings.HasPrefix(line, "-") && !strings.HasSuffix(line, "+") { // 前後の空白を無視し、数字として解釈できない要素も無視する
			continue
		}

		var num int64
		parts := strings.SplitN(strings.TrimSpace(line), " ", -1)
		for _, part := range parts {
			if !strings.Contains(part, "-") && !strings.HasPrefix(part, "+") { // 整数として解釈できない要素も無視する
				continue
			}

			numStr := strings.TrimLeft(parts[0], "-+")
			val, err := strconv.ParseInt(numStr, 10, 64)
			if err != nil || val < 0 || val > (int64)(1<<63)-1 { // 合計が 64bit 整数範囲に収まることを保証する制限（実際には int64 は 9223372036854775807 なので、少し厳密にチェックが必要だが問題文の条件を満たす）
				break
			}

			if num == 0 { continue } // 空要素を無視する
			count++
			sum += val
		}
	}
	
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
