package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	valid := 0
	for {
		n, err := sc.Read(buf)
		if err != nil {
			break
		}
		// フォルドゥーリングと行首の処理
		for i := 0; i < n; i++ {
			chars++
			if buf[i] == '\n' {
				lines++
			}
		}
		// 行の前後の空白を無視
		if strings.TrimSpace(buf[:n]) != "" {
			// ループ内で行数と文字数を計算する必要があるため、行数と文字数を保持する
			// ここでは行数と文字数を計算する部分を追加
			// 以下は示例として、行数と文字数を記録する処理を追加
			// 注意：実際のコードでは行数と文字数を各行に分割して処理する必要があります
		}
	}
	fmt.Printf("valid=%d\n", valid)
}
