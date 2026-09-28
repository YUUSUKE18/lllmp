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
	if sc.Scan() {
		line := sc.Text()
		parts := strings.Split(line, ",")
		count := 0
		maxValue := int64(-1) // 64bit整数として扱うため初期値を調整

		for _, part := range parts {
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart == "" {
				continue
			}
			n, err := strconv.ParseInt(trimmedPart, 10, 64)
			if err != nil {
				// 整数として解釈できない要素は無視
				continue
			}

			count++
			if n > maxValue {
				maxValue = n
			}
		}

		// すべての整数が正常に読み取れた場合のみ結果を出力する（空入力や全て無効な入力の場合も、少なくとも count=0 max=-1 で出力される）
		if count > 0 {
			fmt.Printf("count=%d max=%d\n", count, maxValue)
		} else if len(parts) > 0 && strings.TrimSpace(line) != "" {
            // 入力が空でなかったが、有効な整数が一つもなかった場合 (例えば "a,b" のように全て無効だった場合)
            // このケースでは count=0 max=-1 または適切な初期値を出力する。ここでは数えられた要素数と最大値をそのまま出力する。
            // 仕様上は「整数として解釈できない要素も無視」されるため、countが0になることが多い。
            // 厳密に「要素数」と「最大値」を求めるため、有効な数が一つもない場合は count=0, max の定義に従う。
			fmt.Printf("count=%d max=%d\n", 0, -1) // 有効な数値が0個の場合のデフォルト値を設定
		} else {
            // 入力が完全に空だった場合 (Scan()で何も読み込まれなかった、または空行だった場合)
            fmt.Printf("count=0 max=-1\n") // 最小値の設定はコンテキストによるが、ここでは安全策として-1とする。
        }

	} else {
        // 標準入力が空の場合
		fmt.Printf("count=0 max=-1\n")
	}
}
