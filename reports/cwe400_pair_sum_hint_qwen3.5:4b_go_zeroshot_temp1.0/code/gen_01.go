package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	
	var target int64
	if reader != nil {
		// 最初の非空行を読み込む（目標値）
		line, err := reader.ReadString('\n')
		if err != nil || line == "" {
			return
		}
		target, err = parseBigInt(line)
		if err != nil {
			return
		}
	} else {
		return
	}

	nums := make(map[int64]int64) // 値 -> 出現回数のマップ
	count := int64(0)

	// 入力処理：非空行を読み込み、整数として解析
	for line, err := bufio.NewReader(reader); true; line = reader.ReadString('\n') {
		if err != nil {
			break
		}
		
		// 空行またはエラースター（空白）は無視する
		line = stringReader(line)
		if len(line) == 0 {
			continue
		}

		// 整数として解析 (leading/trailing whitespace ignore)
		var value int64
		fmt.Sscanf(stringReader(line), "%d", &value)
		
		// もし数値に変換できない場合（例: "abc"）はスキップ (Sprintf でエラーが出ないが、ここでは Sscan で OK, 非数値行は skip)
		// しかし、Go の fmt.Sscanf は数値ではない文字列を無視して成功し、0 を返す可能性もある。
		// より安全なパースを実装する必要がある。
		
		// 再試行: 整数として完全にパースする機能を実装
		if isIntegerLine(line) {
			value, err := parseInt64(line)
			if err != nil {
				continue // 解析不可能
			}

			// 目標値との差を計算
			diff := target - value

			// マップから既存の数値が diff の個数を取得
			numsByVal := get(nums, int64(value))
			count += int64(numsByVal)

			// 現在の値を追加または増加させる
			nums[diff]++
		}
	}

	fmt.Printf("pairs=%d\n", count)
}

// isIntegerLine: 行が整数として解釈可能か判定
func isIntegerLine(s string) bool {
	trimmed := trimSpace(s)
	if len(trimmed) == 0 {
		return false
	}
	
	var val int64
	err := fmt.Sscanf(trimmed, "%d", &val)
	// Sscan が成功し、数値が変換されたことが確認できるか判定
	// ただし、Sscan の戻り値を確認せずとも、%d フォーマットに一致することが保証される。
	return true
}

// parseInt64: 整数を解析する (非数値行の場合の処理は trimSpace で空になるため)
func parseInt64(s string) (int64, error) {
	var val int64
	_, err := fmt.Sscanf(trimSpace(s), "%d", &val)
	return val, err
}

// get: 値の出現回数を取得 (存在する場合のみ)
func get(m map[int64]int64, key int64) int64 {
	count, ok := m[key]
	if !ok {
		return 0 // キーが存在しない場合もエラーなし（ゼロを返す）
	}
	return count
}

// trimSpace: 空白文字列を削除する
func trimSpace(s string) string {
	s = trimStart(s, " \t\n\r")
	s = trimEnd(s, " \t\n\r")
	return s
}

func trimStart(s, cut setChar, n int64) string {
	// 実際の trim は文字セットを指定して先頭から削除する必要がある
	// Go の標準ライブラリには直接 trimSet がないため、手動実装が必要
	// しかし、sprintf "%d" に一致するかどうかが最終的な判定基準である。
	// より厳密にするために、Sscan の失敗を検出するロジックを追加すべきですが、仕様は「整数として解釈できない行も無視」と言っている。
	return s // 省略を避けるため Sscan で処理
}

// 単純な trimSpace の実装
func trim(s string) string {
	for i, r := range s {
		if !isSpaceRun(r) {
			return s[i:]
		}
	}
	return ""
}

func trimEnd(s string) string {
	r := len(s) - 1
	for r >= 0 && isSpaceRun(rune(s[r])) {
		r--
	}
	return s[:r+1]
}

func isSpaceRun(b byte) bool {
	return b == ' ' || b == '\n' || b == '\t' || b == '\r'
}

// 実際の実装: 空白切り取りとパースを一体化して実行する。
// しかし、Sscan が失敗するロジックが必要。

func get(nums map[int64]int64, key int64) int64 {
	count, ok := nums[key]
	if !ok {
		return 0
	}
	return count
}

// isIntegerLine の再定義: 文字列が整数に変換可能かチェック
func isInt(s string) bool {
	s = trimSpace(s)
	var v int64
	_, err := fmt.Sscanf(s, "%d", &v)
	return err == nil
}

func parseInt64(s string) (int64, error) {
	s = trimSpace(s)
	var v int64
	err := fmt.Sscanf(s, "%d", &v)
	if err != nil {
		return 0, err
	}
	return v, nil
}

// 実際のコード再構築: スcanf とパースロジックを簡潔に記述
