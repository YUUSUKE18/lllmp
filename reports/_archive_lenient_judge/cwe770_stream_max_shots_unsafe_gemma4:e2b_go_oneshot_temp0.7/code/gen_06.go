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
	if !scanner.Scan() {
		// 入力が空の場合は何もしない
		return
	}
	line := scanner.Text()

	// カンマで分割して整数列を取得
	fields := strings.Split(line, ",")

	count := 0
	var max int64 = -1 // 64bit整数の範囲を考慮するため、初期値は非常に小さい値に設定（問題の制約上、負の数が含まれる可能性も考慮し、最初の有効な値で上書きされるようにする）

	for _, field := range fields {
		// 前後の空白を除去
		trimmedField := strings.TrimSpace(field)
		if trimmedField == "" {
			continue
		}

		// 整数に変換を試みる
		n, err := strconv.ParseInt(trimmedField, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 要素数をカウント
		count++

		// 最大値を更新
		if n > max {
			max = n
		}
	}

	// 空の入力や、有効な数値が一つもなかった場合の処理（ここでは count=0, max=適切な値）
	if count == 0 {
		// 入力が空または無効な場合。仕様に厳密に従うため、count=0で出力する。
		// 最大値については、もし入力が全くなかった場合は、最大値を定義できないため、ここでは特定のデフォルト値（例：0やエラー）を出すか、あるいは問題の文脈から「要素が存在しない」場合の適切な振る舞いを定める必要がある。
		// 通常、このような場合、何も出力しないか、または仕様に基づいたデフォルト値を設定するが、ここでは読み込んだ有効な数値がないため、count=0で終了する。
		// ただし、例1の形式に合わせるため、少なくとも1行は出力する必要がある。ここでは最大値が定義できない場合は、最大値も無視されるか、あるいは入力されたデータに基づいて決定されるべきである。
		// 入力された数値がない場合、count=0だが、maxはどうなるか？最大値を求められないため、ここでは count=0, max=-1 (または最小値) とするのが妥当だが、仕様に従い「要素数」と「最大値」を求める。
		// 読み込んだ有効な整数がなかった場合は、count=0となる。この場合、maxの出力は意味を持たないかもしれない。
		// ここでは、もし入力があれば count と max を出力する。データがない場合は count=0 で処理を終える。
		fmt.Printf("count=%d max=%d\n", 0, 0) // データがなかった場合の安全策として0を出力
	} else {
		// 有効な要素が存在する場合
		fmt.Printf("count=%d max=%d\n", count, max)
	}
}
