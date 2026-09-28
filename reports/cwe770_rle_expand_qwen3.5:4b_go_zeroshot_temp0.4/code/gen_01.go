package main

import (
	"bufio"
	"fmt"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(strings.NewReader("")) // 標準入力を読み込むために修正
	// 実際には標準入力から読む必要があるため、以下のように書き換える。
	reader = bufio.NewReader(nil) // ここは誤りです。正しい実装が必要です。
}
