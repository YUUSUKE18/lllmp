package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// 標準入力から一行を読み込む
	input, err := os.ReadFile(0) // os.Stdin を直接読み込むための一般的な方法 (または bufio.Reader を使う)
	if err != nil {
		// 実際には os.Stdin を使って標準入力から読み込む必要があるため、bufio.Scanner または fmt.Scan を使う方が一般的だが、ここではReadFileで入力を受け取ったと仮定して処理を進める。
		// 標準的な競技プログラミングのセットアップでは、bufio.Reader を使って行単位で読むのが安全。
		// 今回は仕様に合わせて標準入力から読み込むことを想定し、それに応じた処理を行う。
	}

	// より堅牢な標準入力の読み込み方法を採用する
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		// 入力が空の場合
		fmt.Println("count=0 sum=0")
		return
	}

	line := scanner.Text()

	// カンマで分割して整数列を取得する
	parts := strings.Split(line, ",")

	// 重複を除いた整数を格納するためのマップと合計用の変数を初期化
	seen := make(map[int]bool)
	var sum int64 = 0

	for _, part := range parts {
		// 前後の空白を削除
		trimmedPart := strings.TrimSpace(part)

		if trimmedPart == "" {
			continue // 空の要素は無視
		}

		// 整数としてパースを試みる
		num, err := strconv.Atoi(trimmedPart)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// 重複チェックと合計の計算
		if !seen[num] {
			seen[num] = true
			sum += int64(num)
		}
	}

	// 結果を出力
	count := len(seen)
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
