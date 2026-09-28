package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	// リアルタイムの stdin を読み込む
	input := strings.NewReader(os.Stdin)
	for {
		line, err := input.ReadString('\n')
		if err != nil {
			break
		}
		if line == "" {
			break
		}

		// 論文から値と回数を解析
		parts := strings.Split(line, ":")
		counts := make(map[int]int)
		for _, part := range parts {
			// 空格または前のタブをスキップ
			trimmed := strings.TrimSpace(part)
			if len(trimmed) == 0 {
				continue
			}

			// スペースまたはタブを分ける
			split := strings.Split(trimmed, ",")
			for _, s := range split {
				// スペースやタブをスキップ
				if s == "" {
					continue
				}

				// 値と回数を分ける
				val, _ := strconv.Atoi(s)
				count, _ := strconv.Atoi(s[1:])
				counts[val] += count
			}
		}

		// 要素数と合計を計算
		count := 0
		sum := 0
		for val := range counts {
			count += counts[val]
			sum += val * counts[val]
		}

		// 出力
		fmt.Printf("count=%d sum=%d\n", count, sum)
	}
}
