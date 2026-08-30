package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// 標準入力から一行読み込む
	input, err := os.ReadFile(0) // os.ReadFile(0) は標準入力全体を読み込むことを意図しているが、ここでは一般的な方法としてos.Stdinを使用する。
	if err != nil {
		// 実際にはコマンドラインからの入力待ちなので、bufio.Readerを使うのが適切
		// ここでは標準的な競技プログラミングのI/Oパターンに従い、一行読み込みを試みる
	}

	reader := bufio.NewReader(os.Stdin)
	line, err := reader.ReadString('\n')
	if err != nil && err.Error() != "EOF" {
		// エラーが発生した場合（EOF以外）、処理を終了
		return
	}

	// 入力行から空白を除去し、カンマで分割する
	line = strings.TrimSpace(line)
	if line == "" {
		// 入力が空の場合は何もしない
		return
	}

	parts := strings.Split(line, ",")

	var count int
	var maxValue int64 = -1 // 64bit整数として、初期値は非常に小さい値に設定（入力要素が全て正の数でない可能性を考慮）

	// 各要素を処理する
	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue // 空の要素は無視
		}

		// 整数としてパースを試みる
		val, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// 要素数をカウント
		count++

		// 最大値を更新
		if val > maxValue {
			maxValue = val
		}
	}

	// 結果を出力
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
