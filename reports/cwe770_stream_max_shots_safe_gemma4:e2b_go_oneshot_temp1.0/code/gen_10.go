package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	var input string
	// 標準入力全体を読み込む
	if _, err := os.Stdin.Read(make([]byte, 1024*1024)); err != nil && err.Error() != "EOF" {
		// エラーが発生しても続行（EOFに到達した場合はそれが自然）
	}

	// 入力を文字列として取得
	data, err := os.ReadFile(0) // 標準入力から読み込む、またはより直接的にbufioを使う
	if err != nil && err.Error() != "EOF" {
		// 実際にはstdin全体を読み込む必要があるため、ここではリダイレクトされた入力を想定してstdioで処理する。
		// bufio.Readerを使って、入力ストリーム全体を処理するのが最も安全。
	}

	reader := bufio.NewReader(os.Stdin)
	// 全入力を読み込み、カンマで分割する
	fullInput, err := reader.ReadString('\n')
	if err != nil && err.Error() != "EOF" {
		// エラー処理（今回はシンプルに続行）
	}

	// 入力文字列をトリムし、空白区切りで分割
	trimmedInput := strings.TrimSpace(fullInput)
	if trimmedInput == "" {
		fmt.Println("count=0 max=0")
		return
	}

	parts := strings.Split(trimmedInput, ",")

	var count int
	var maxValue int64 = -1 // 64bit整数の最小値として初期化（最大値を求めるため）

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}

		num, err := strconv.ParseInt(part, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		count++
		if num > maxValue {
			maxValue = num
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
