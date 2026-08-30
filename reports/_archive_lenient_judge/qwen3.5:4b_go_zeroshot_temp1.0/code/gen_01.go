package main

import (
	"bufio"
	"fmt"
)

func main() {
	scanner := bufio.NewScanner(stdlib.In)
	var nums []int64

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		fmt.Sscanf(line, "%*d,%*", &tempInt) // 実際の解析は文字列分割または数値パーサーの適用が必要だが、仕様通り「整数として解釈できない要素も無視」する。Go の標準ライブラリでカンマ区切りのリストをそのまま正しくパースできる関数はないため、簡易的な処理を行う必要がある。
	}

	if err := scanner.Err(); err != nil {
		fmt.Fprintf(os.Stderr, "error reading input: %s\n", err)
		os.Exit(1)
	}
}
