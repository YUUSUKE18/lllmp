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
	
	// 1行目を読み込み、整数として個数を取得
	if !sc.Scan() {
		// 入力が空の場合
		fmt.Println("count=0 sum=0")
		return
	}
	
	// 1行目の値を整数としてパース
	countStr := strings.TrimSpace(sc.Text())
	count, err := strconv.Atoi(countStr)
	if err != nil {
		// 1行目が整数でない場合は、読み取れた整数を0として扱うか、エラー処理を行うが、
		// 仕様に基づき、読み取れた整数のみを対象とするため、ここでは0として初期化し、以降の処理に影響を与えないようにする。
		// ただし、ここでは仕様に従い、読み取れた整数のみを対象とするため、countの初期値として読み取った値を採用する。
		// 厳密には「実際に読み取れた整数だけ」を対象とするため、countの役割を一旦保留し、後続の処理で実際に読み取れた数を数える。
	}
	
	actualCount := 0
	sum := int64(0)
	
	// 2行目以降を読み込み、整数を処理
	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue // 空行は無視
		}

		// 行数制限（count）が与えられていても、実際に読み取れたものだけを対象とする
		if actualCount >= count {
			break
		}

		// 整数としてパースを試みる
		n, err := strconv.ParseInt(line, 10, 64)
		if err == nil {
			actualCount++
			sum += n
		}
		// 整数として解釈できない行は無視する
	}

	// 最終結果を出力
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
