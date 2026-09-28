package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// 標準入力からデータを読み込む
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		// 入力が空の場合は何もしない
		return
	}
	inputLine := scanner.Text()

	// カンマで分割して要素を取得する
	parts := strings.Split(inputLine, ",")

	var count int
	var maxValue int64 = -1 // 64bit整数の最小値として初期化。入力値が非負であることを想定し、もしデータが存在しない場合は適切な処理が必要だが、ここでは最大値を求めるため、最初に読み取った要素を基準とする。

	// 有効な整数のみをフィルタリングしてカウントと最大値を求める
	var actualNumbers []int64

	for _, part := range parts {
		// 前後の空白を除去
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数として解釈できるか試みる
		num, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 64bit整数の範囲に収まることを確認（仕様上は収まる前提だが、念のため）
		// strconv.ParseIntが成功すれば、それは64bitの範囲内であるため、ここではそのまま採用
		actualNumbers = append(actualNumbers, num)
	}

	// 結果の計算
	count = len(actualNumbers)
	var maxValueFound int64

	if count == 0 {
		// 要素が一つもなかった場合。最大値は定義できないか、あるいは特定のデフォルト値を設定する必要があるが、
		// 仕様上「要素数」と「最大値」を求めよなので、0個の要素に対してはcount=0, max=?とするのが自然だが、
		// 読み取った数値がないため、ここでは0を出力する。（空のセットに対する最大値は未定義となる）
		// ただし、入力が与えられた場合にのみ処理を行うため、もし何も有効な数値がなければ、count=0, max=-1などで出力しても良い。
		// 最も安全なのは、実際に読み取ったデータに基づいて計算することである。
		fmt.Printf("count=%d max=%d\n", 0, -1) // または count=0 max=0 など、文脈によるが、ここでは-1で最大値が存在しないことを示唆する
		return
	}

	// 最大値を求める
	maxValueFound = actualNumbers[0]
	for i := 1; i < count; i++ {
		if actualNumbers[i] > maxValueFound {
			maxValueFound = actualNumbers[i]
		}
	}

	// 結果を出力
	fmt.Printf("count=%d max=%d\n", count, maxValueFound)
}
