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
	var maxValue int64 = -1 // 64bit整数を扱うためint64を使用。初期値は最小値を想定して-1とするか、最初の要素で上書きする設計にする。

	for scanner.Scan() {
		line := scanner.Text()
		// カンマ区切りの整数列として処理
		fields := strings.Split(line, ",")
		
		currentCount := 0
		currentMax := int64(-1) // 最小値を想定して初期化

		for _, field := range fields {
			trimmedField := strings.TrimSpace(field)
			if trimmedField == "" {
				continue
			}

			n, err := strconv.ParseInt(trimmedField, 10, 64)
			if err != nil {
				// 整数として解釈できない要素は無視
				continue
			}

			currentCount++
			if n > currentMax {
				currentMax = n
			}
		}
        
        // ここでは、入力全体が1行で与えられることを想定し、その行から集計する。
        // もし複数の行がある場合は、それらをすべて集計する必要があるが、例の形式に従い、ここでは単一の入力として処理を続ける。
        // 課題の記述「標準入力から、カンマ区切りの整数列を受け取ります」を厳密に解釈すると、入力全体が1つのデータストリームである。
        // 例題の構造から、入力はスペースや改行で区切られた複数の数値が与えられると解釈し、それらをすべて集計する。

		if currentCount > 0 {
			// 全ての要素を集計していくため、ここでは最終的な結果を保持するのではなく、総和を計算する必要がある。
            // しかし、求められているのは「要素数」と「最大値」なので、入力全体を走査して集計する。
            // 標準入力が複数の行に分かれている場合、それらをすべて結合して処理するのが自然。

			if currentCount > count {
				count = currentCount
				maxValue = currentMax
			} else if currentCount == count {
                if currentMax > maxValue {
                    maxValue = currentMax
                }
            }
		}
	}

    // 再度、標準入力全体を読み込み、よりシンプルな方法で処理する（例1, 2, 3の構造に合わせるため）
    // 標準入力全体を一度に読み込む方が、ストリーム処理よりも意図が明確になることが多い。

    data, _ := os.ReadFile(os.Stdin.Name()) // ファイルとして読み込むのではなく、直接stdinから読み取る方法に戻す
    
    // 再度、標準入力をすべて読み込み直して、最もシンプルに解く。
    inputData, err := os.ReadFile("/dev/stdin")
    if err != nil {
        // エラー処理（通常は無視されるが念のため）
        return
    }

    content := string(inputData)
    
    // 全ての行を結合してカンマ区切りの整数列として扱う
    allFields := strings.FieldsFunc(content, func(r rune) bool {
        return r == ',' || r == '\n' || r == '\r'
    })

	finalCount := 0
	var finalMax int64 = -1

	for _, field := range allFields {
		trimmedField := strings.TrimSpace(field)
		if trimmedField == "" {
			continue
		}

		n, err := strconv.ParseInt(trimmedField, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		finalCount++
		if n > finalMax {
			finalMax = n
		}
	}

	fmt.Printf("count=%d max=%d\n", finalCount, finalMax)
}
