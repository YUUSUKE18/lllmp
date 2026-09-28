package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var count int
	var sum int64 = 0
	actualCount := 0

	// 1行目を読み取り、実際に読み取れた整数個数を格納する
	if scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			// 空行の場合は続行
		} else {
			// 1行目の値は「続く整数の個数」として読み込むが、
			// 実際に読み取れる数と一致しない可能性があるため、ここでは一時的に保持する
			// ただし、仕様では「実際に読み取れた整数だけを対象」とあるため、
			// 1行目の値は単なる期待値として扱う。
			// 実際の読み取りは2行目以降から行う。
			
			// 1行目の値を count として初期設定する。
			// これは「続く整数の個数」という指示に従うが、後に読み取る数で上書きされる可能性があるため、
			// 最終的に読み取れた個数を採用する。
			
			// 読み取れる個数を格納する変数を初期化する。
			// 読み取りロジック内で実際に読み取った数を数える。
		}
	}

	// 2行目以降を読み取り、整数を処理する
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // 空行は無視
		}

		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}

		// 実際に読み取れた整数を対象とする
		sum += num
		actualCount++
	}

	// 1行目から読み取った値を count として採用する。
	// ただし、読み取れた個数が1行目の値と一致しない場合でも、
	// 出力フォーマットは「実際に読み取れた個数」を使うべきか？
	// 仕様：「count=<実際に読み取れた個数> sum=<合計> という 1 行を出力」
	// したがって、actualCount を使用する。
	
	// 1行目の読み取り結果は、実際に読み取れた数とは異なる可能性があるが、
	// 最終出力は「実際に読み取れた個数」に基づくと解釈する。
	
	// 1行目の読み取り（countの初期値として）は無視し、
	// 実際に読み取れた個数と合計を出力する。
	
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
