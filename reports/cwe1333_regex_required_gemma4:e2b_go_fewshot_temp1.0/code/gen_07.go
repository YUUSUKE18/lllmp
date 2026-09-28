package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	
	// 1行ずつ読み、妥当な行数をカウントする
	validLines := 0
	
	// 行ごとに処理するため、一度に全てを読み込むのではなく、行ごとに処理する
	for scanner.Scan() {
		line := scanner.Text()
		
		// 行の前後の空白を無視する（strings.TrimSpaceで処理）
		trimmedLine := strings.TrimSpace(line)
		
		// 正規表現による判定
		// 妥当な行の条件:
		// 1. 1個以上の数字列がカンマで区切られている
		// 2. 末尾のカンマは許容される (例: "1,2," は有効)
		// 3. 数字とカンマ以外の文字を含まない (空行を除く)
		
		// 正規表現: 
		// ^              : 行の先頭
		// [\d,]+         : 1つ以上の数字またはカンマのシーケンス
		// (?:,|$)        : カンマまたは行末
		// $              : 行の末尾
		
		// よりシンプルに、数字とカンマのみで構成され、カンマが含まれる、または数字のみの行を考える
		// 課題の意図を「カンマで区切られた整数列」の妥当性に絞る。
		
		// 行をカンマで分割し、各要素が整数（または空文字列）であるかを確認する方が実用的。
		// 正規表現を用いるという制約があるので、行全体が「数字とカンマのみ」で構成されているか、かつ「数字が含まれている」ことを確認する。
		
		// 妥当な行の定義を「カンマ区切りで1つ以上の数値が含まれている」と解釈する。
		// 空行は妥当ではない。
		if trimmedLine == "" {
			continue // 空行は妥当ではない
		}

		// 厳密なパターンマッチング: 数字とカンマのみで構成され、少なくとも1つの数字が含まれているか。
		// 例: "1,2,3", "1," はOK。",," はNG。 "a,1" はNG。
		
		// 1. 数字とカンマ以外の文字が含まれていないかチェック (数字とカンマのみ)
		if !regexp.MustCompile(`^[0-9,]*$`).MatchString(trimmedLine) {
			continue // 数字とカンマ以外の文字が含まれている場合は妥当ではない
		}
		
		// 2. 少なくとも1つの数字が含まれているかチェック (カンマのみの行や空行でなければOK)
		// カンマのみの行 (" , , ") は妥当ではないと解釈する（1個以上の数字列が並んでいる必要があるため）。
		if strings.Contains(trimmedLine, "0") || strings.Contains(trimmedLine, "1") || strings.Contains(trimmedLine, "2") || strings.Contains(trimmedLine, "3") || strings.Contains(trimmedLine, "4") || strings.Contains(trimmedLine, "5") || strings.Contains(trimmedLine, "6") || strings.Contains(trimmedLine, "7") || strings.Contains(trimmedLine, "8") || strings.Contains(trimmedLine, "9") {
			// 数字が含まれていれば、それは少なくとも1個の数値列が存在する（カンマ区切りで）と見なす。
			validLines++
		} else if strings.Contains(trimmedLine, ",") {
			// 数字が含まれておらずカンマしかない場合（例: "," や ",,"）
			// これは「1個以上の数字列」が並んでいるという条件を満たさないため、妥当ではない。
			// したがって、このケースは validLines を増やさない。
		}
	}
	
	if err := scanner.Err(); err != nil {
		// エラー処理（ここでは出力しないが、通常は考慮する）
	}
	
	// 厳密に「1 個以上の数字列がカンマで区切られて並んでいる」ことを判定する。
	// 妥当な行の定義を「カンマで区切られた要素の中に、少なくとも1つの数字が含まれている」と解釈し直す。
	// 例: "1," -> 1個の数字列
	// 例: ",," -> 0個の数字列（空の要素）
	
	// 正規表現で各要素が数字であることを確認する方が、より意図に沿っている。
	// 例: "1,2," -> "1"と"2"が数字であることを確認する。
	
	// 最終的な判定ロジックを再構成する。
	validLines = 0
	for scanner.Scan() {
		line := scanner.Text()
		trimmedLine := strings.TrimSpace(line)
		
		if trimmedLine == "" {
			continue // 空行は妥当ではない
		}

		// カンマで分割し、各要素がすべて有効な整数であるかチェックする
		parts := strings.Split(trimmedLine, ",")
		isValid := true
		
		// 1個以上の数字列が並んでいるか、かつそれらが整数であるかを確認する。
		// 末尾のカンマは許容されるため、Splitの結果の要素を個別にチェックする。
		
		if len(parts) == 0 {
			// これはtrimmedLineが空でないのにSplitが空になることはないはずだが念のため
			continue
		}
		
		// 全ての要素が空文字列または数字のみで構成されているかチェックし、かつ、
		// 少なくとも1つの数字が存在することを確認する。
		hasNumber := false
		for _, part := range parts {
			partTrimmed := strings.TrimSpace(part)
			if partTrimmed != "" {
				// 各要素が整数であるかチェック
				if _, err := fmt.Sscanf(partTrimmed, "%d", &hasNumber); err == nil {
					// 数字としてパースできた場合、その要素は妥当
					// 厳密には、部分が全て数字（カンマで区切られた値）であることを検証したい。
				} else {
					// 数字ではない文字が含まれている
					isValid = false
					break
				}
			}
		}

		if !isValid {
			continue
		}

		// 妥当な行の条件: 1個以上の数字列がカンマで区切られている。
		// これは、空の要素を含まず、かつ少なくとも1つの要素が存在すれば満たされる。
		
		// 最終的に、カンマで区切られていて、かつ要素の中に数字が含まれていればOKとする。
		// 提示された例題の制約に基づき、行全体が「カンマ区切りの整数列」であると解釈する。
		
		// 正規表現による「カンマ区切りの整数列」の厳密な定義:
		// ^(\d+(?:,\d+)*)(?:,)?$  <- これは複雑すぎる。
		
		// 課題文の要求に従い、「数字とカンマ以外を含まず、カンマで区切られた構造」をチェックする。
		// 1個以上の数字が含まれていればOKとする。
		
		hasAnyDigit := false
		for _, part := range parts {
			if strings.TrimSpace(part) != "" {
				if strings.ContainsAny(part, "0123456789") {
					hasAnyDigit = true
				} else {
					// 数字とカンマ以外が含まれた（この時点で不適格）
					isValid = false
					break
				}
			}
		}
		
		if isValid && hasAnyDigit {
			validLines++
		}
	}


	fmt.Printf("valid=%d\n", validLines)
}
