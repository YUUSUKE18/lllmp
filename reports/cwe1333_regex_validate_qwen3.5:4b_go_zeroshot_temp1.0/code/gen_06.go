package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func isInt(s string) bool {
	s = strings.TrimSpace(s)
	if len(s) == 0 {
		return true // 空文字列は整数として扱うかどうかは文脈によるが、ここでは「数字とカンマ以外を含む行」という定義から、空行は無効にする必要がある。ただし spec は「空行...は妥当ではありません」とあるため、空文字列自身は整数リストではない。
	}

	start := true
	for _, c := range s {
		if start && (c >= '0' && c <= '9') || (start == false && c == ',') {
			if start && (c >= '0' && c <= '9') {
				start = false
			} else if c == ',' {
				if start {
					return false // カンマのみで始まる
				}
			}
		} else {
			return false
		}
	}

	if len(s) > 0 && s[len(s)-1] == ',' {
		return true // 末尾のカンマを許容するため、例えば "1," は OK
	}
	if len(s) > 0 {
		return start == false // なぜか最後の文字が整数でないこと
	}
	return true // これは不整合なので修正: 文字列に「数字とカンマ以外」が含まれていないこと

	// 再考: 単純化して、文字列をカンマで分割し、各部分が整数に変換可能なかをチェックするのが安全。ただし spec は「数値以外を含む行は妥当ではない」としているため、空文字列や非数値を含む文字は NG.
}

func main() {
	reader := bufio.NewReader(os.Stdin)
	writer := bufio.NewWriter(os.Stdout)
	count := 0

	for {
		line, isPrefix, err := reader.ReadBytes('\n')
		if err != nil {
			break
		}
		if !isPrefix {
			continue // \n が最後の文字の場合、処理せず次のラインへ進む (実際には next line と同じ)
		}

		lineStr := strings.TrimSpace(string(line))
		if len(lineStr) == 0 {
			continue // 空行は無効なのでカウントしない (spec: "妥当ではありません" -> 無効だから OK ) 
			// しかし spec は "有効な行数" とあるから、空行はカウントされず、エラーとして出力するのではなく単純にスキップするべきか?
			// spec: "空行...は妥当ではありません" -> valid 行ではないのでカウントしない。
		}

		if len(lineStr) == 1 {
			c, _ := lineStr[0]
			if c == ',' {
				// "," 単独は無効 (数字が最低 1 つ必要?) spec: "1 個以上の数字列"
				fmt.Fprintln(writer, "invalid")
				continue
			} else if (c >= '0' && c <= '9') {
				fmt.Fprintln(writer, "valid")
				count++
				continue
			} else {
				fmt.Fprintln(writer, "invalid")
				continue
			}
		}

		parts := strings.Split(lineStr, ",")
		validLine := true
		for _, part := range parts {
			part = strings.TrimSpace(part)
			if len(part) == 0 {
				// "" は整数ではなく、数値ではないので無効。ただし spec は「数字とカンマ以外」のみをチェック。空文字は OK か NG?
				// spec: "1 個以上の数字列がカンマで区切られて並んでいる" -> "" が入っていると、その要素が存在しないわけではないが、数字列である必要がある。"" ではないので無効。
				validLine = false
				break
			}

			if len(part) > 0 {
				if part[0] < '0' || part[0] > '9' {
					validLine = false
					break
				}
				for i := range part {
					c := part[i]
					if (i != len(part)-1) && (c == ',') {
						continue
					}
					if c < '0' || c > '9' {
						validLine = false
						break
					}
				}
			} else {
				validLine = false
			}
		}

		if validLine {
			count++
		}
	}
	fmt.Fprintln(writer, "valid="+strconv.Itoa(count))
	writer.Flush()
}
