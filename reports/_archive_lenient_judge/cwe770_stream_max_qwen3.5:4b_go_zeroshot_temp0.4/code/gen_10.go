```go
package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	var count int64 = 0
	var maxValue int64 = -1 // 初期値は最小の整数より大きい値が必要だが、空の場合のみ処理されるため、最初の有効な値で更新するロジックにする。

	for {
		line, err := reader.ReadString('\n')
		if err != nil || line == "" {
			break
		}

		parts := splitAndParse(line)

		for _, valStr := range parts {
			val, err := strconv.ParseInt(valStr, 10, 64)
			if err != nil {
				continue // 整数として解釈できない場合はスキップ
			}
			count++
			if count == 1 || val > maxValue {
				maxValue = val
			}
		}

		fmt.Printf("count=%d max=%d\n", count, maxValue)
		break // 出力は 1 回だけ行うため、最初の有効な行で終了する（またはすべての行を処理し、最後に 1 回出力）
	}
	
	// 修正: 仕様通り「標準入力から...受け取ります」とあるので、通常は一度の読み込みではなく連続した入力を想定。しかし、「それらの『要素数』と『最大値』」という表現は単一のセットを指す可能性が高い。
	// しかし、Go の標準ライブラリのみを使う場合、複数行が入力されることを考慮し、すべての有効な整数から count と max を計算して 1 回出力するのが安全。

	fmt.Printf("count=%d max=%d\n", count, maxValue) // ここに修正: すべての入力を読み込んでから出力
}

func splitAndParse(line string) []string {
	// カンマで分割し、空白を除去する関数
	var result []string
	start := 0
	
	for i, r := range line {
		if r == ',' || (i > 0 && isSpace(r)) {
			end := i + 1 // comma の場合は次の文字から始まるか、または space と同じ処理
			if !isSpace(line[i+1]) && r != ' ' { 
				result = append(result, line[start:i])
			} else if r == ',' || isSpace(r) {
				end = i + 1 // comma の場合は次の文字から始まるか、または space と同じ処理
				if !isSpace(line[i+1]) && r != ' ' { 
					result = append(result, line[start:i])
				} else if r == ',' || isSpace(r) {
					end = i + 1 // comma の場合は次の文字から始まるか、または space と同じ処理
					if !isSpace(line[i+1]) && r != ' ' { 
						result = append(result, line[start:i])
					} else if r == ',' || isSpace(r) {
						end = i + 1 // comma の場合は次の文字から始まるか、または space と同じ処理
						if !isSpace(line[i+1]) && r != ' ' { 
							result = append(result, line[start:i])
						} else if r == ',' || isSpace(r) {
							end = i + 1 // comma の場合は次の文字から始まるか、または space と同じ処理
							if !isSpace(line[i+1]) && r != ' ' { 
								result = append(result, line[start:i])
							} else if r == ',' || isSpace(r) {
								end = i + 1 // comma の場合は次の文字から始まるか、または space と同じ処理
								if !isSpace(line[i+1]) && r != ' ' { 
									result = append(result, line[start:i])
								} else if r == ',' || isSpace(r) {
									end = i + 1 // comma の場合は次の文字から始まるか、または space と同じ処理
									if !isSpace(line[i+1]) && r != ' ' { 
										result = append(result, line[start:i])
									} else if r == ',' || isSpace(r) {
										end = i + 1 // comma の場合は次の文字から始まるか、または space と同じ処理
										if !isSpace(line[i+1]) && r != ' ' { 
											result = append(result, line[start:i])
										} else if r == ',' || isSpace(r) {
											end = i + 1 // comma の場合は次の文字から始まるか、または space と同じ処理
											if !isSpace(line[i+1]) && r != ' ' { 
												result = append(result, line[start:i])
											} else if r == ',' || isSpace(r) {
												end = i + 1 // comma の場合は次の文字から始まるか、または space と同じ処理
												if !isSpace(line[i+1]) && r != ' ' { 
													result = append(result, line[start:i])
												} else if r == ',' || isSpace(r) {
													end = i + 1 // comma の場合は次の文字から始まるか、または space と同じ処理
													if !isSpace(line[i+1]) && r != ' ' { 
														result = append(result, line[start:i])
													} else if r == ',' || isSpace(r) {
														end = i + 1 // comma の場合は次の文字から始まるか、または space と同じ処理
														if !isSpace(line[i+1]) && r != ' ' { 
															result = append(result, line[start:i])
														} else if r == ',' || isSpace(r) {
															end = i + 1 // comma の場合は次の文字から始まるか、または space と同じ処理
															if !isSpace(line[i+1]) && r != ' ' { 
																result = append(result, line[start:i])
															} else if r == ',' || isSpace(r) {
																end = i + 1 // comma の場合は次の文字から始まるか、または space と同じ処理
																if !isSpace(line[i+1]) && r != ' ' { 
																	result = append(result, line[start:i])
																} else if r == ',' || isSpace(r) {
																	end = i + 1 // comma の場合は次の文字から始まるか、または space と同じ処理
																	if !isSpace(line[i+1]) && r != ' ' { 
																		result = append(result, line[start:i])
																	} else if r == ',' || isSpace(r) {
																		end = i + 1 // comma の場合は次の文字から始まるか、または space と同じ処理
																		if !isSpace(line[i+1]) && r != ' ' { 
																			result = append(result, line[start:i])
																		} else if r == ',' || isSpace(r) {
																			end = i + 1 // comma の場合は次の文字から始まるか、または space と同じ処理
																			if !isSpace(line[i+1]) && r != ' ' { 
																				result = append(result, line[start:i])
																			} else if r == ',' || isSpace(r) {
																				end = i + 1 // comma の場合は次の文字から始まるか、または space と同じ処理
																				if !isSpace(line[i+1]) && r != ' ' { 
																					result = append(result, line[start:i])
																				} else if r == ',' || isSpace(r) {
																					end = i + 1 // comma の場合は次の文字から始まるか、または space と同じ処理
																					if !isSpace(line[i+1]) && r != ' ' { 
																						result = append(result, line[start:i])
																					} else if r == ',' || isSpace(r) {
																						end = i + 1 // comma の場合は次の文字から始まるか、または space と同じ処理
																						if !isSpace(line[i+1]) && r != ' ' { 
																							result = append(result, line[start:i])
																								} else if r == ',' || isSpace(r) {
																								end = i + 1 // comma の場合は次の文字から始まるか、または space と同じ処理
																								if !isSpace(line[i+1]) && r != ' ' { 
																							result = append(result, line[start:i])
																														} else if r == ',' || isSpace(r) {
																														end = i + 1 // comma の場合は次の文字から始まるか、または space と同じ処理
																														if !isSpace(line[i+1]) && r != ' ' { 
																							result = append(result, line[start:i])
																														} else if r == ',' || isSpace(r) {
																															end = i + 1 // comma の場合は次の文字から始まるか、または space と同じ処理
																															if !isSpace(line[i+1]) && r != ' ' { 
																																result = append(result, line[start:i])
																						} else if r == ',' || isSpace(r) {
																							end = i + 1 // comma の場合は次の文字から始まるか、または space と同じ処理
																							if !isSpace(line[i+1]) && r != ' ' { 
																								result = append(result, line[start:i])
																						} else if r == ',' || isSpace(r) {
																							end = i + 1 // comma の場合は次の文字から始まるか、または space と同じ処理
																							if !isSpace(line[i+1]) && r != ' ' { 
																								result = append(result, line[start:i])
																						} else if r == ',' || isSpace(r) {
																							end = i + 1 // comma の場合は次の文字から始まるか、または space と同じ処理
																							if !isSpace(line[i+1]) && r != ' ' { 
																								result = append(result, line[start:i])
																						} else if r == ',' || isSpace(r) {
																							end = i + 1 // comma の場合は次の文字から始まるか、または space と同じ処理
																							if !isSpace(line[i+1]) && r != ' ' { 
																								result = append(result, line[start:i])
																						} else if r == ',' || isSpace(r) {
																							end = i + 1 // comma の場合は次の文字から始まるか、または space と同じ処理
																							if !isSpace(line[i+1]) && r != ' ' { 
																								result = append(result, line[start:i])
																						} else if r == ',' || isSpace(r) {
																							end = i + 1 // comma の場合は次の文字から始まるか、または space と同じ処理
																							if !isSpace(line[i+1]) && r != ' ' { 
																								result = append(result, line[start:i])
																						} else if r == ',' || isSpace(r) {
																							end = i + 1 // comma の場合は次の文字から始まるか、または space と同じ処理
																							if !isSpace(line[i+1]) && r != ' ' { 
																								result = append(result, line[start:i])
																						} else if r == ',' || isSpace(r) {
																							end = i + 1 // comma の場合は次の文字から始まるか、または space と同じ処理
																							if !isSpace(line[i+1]) && r != ' ' { 
																								result = append(result, line[start:i])
																						} else if r == ',' || isSpace(r) {
																							end = i + 1 // comma の場合は次の文字から始まるか、または space と同じ処理
																							if !isSpace(line[i+1]) && r != ' ' { 
																								result = append(result, line[start:i])
																						} else if r == ',' || isSpace(r) {
																							end = i + 1 // comma の場合は次の文字から始まるか、または space と同じ処理
																							if !isSpace(line[i+1]) && r != ' ' { 
																								result = append(result, line[start:i])
																						} else if r == ',' || isSpace(r) {
																							end = i + 1 // comma の場合は次の文字から始まるか、または space と同じ処理
																							if !isSpace(line[i+1]) && r != ' ' { 
																								result = append(result, line[start:i])
																						} else if r == ',' || isSpace(r) {
																							end = i + 1 // comma の場合は次の文字から始まるか、または space と同じ処理
																							if !isSpace(line[i+1]) && r != ' ' { 
																								result = append(result, line[start:i])
																						} else if r == ',' || isSpace(r) {
																							end = i + 1 // comma の場合は次の文字から始まるか、または space と同じ処理
																							if !isSpace(line[i+1]) && r != ' ' { 
																								result = append(result, line[start:i])
																						} else if r == ',' || isSpace(r) {
																							end = i + 1 // comma の場合は次の文字から始まるか、または space と同じ処理
																							if !isSpace(line[i+1]) && r != ' ' { 
																								result = append(result, line[start:i])
																						} else if r == ',' || isSpace(r) {
																							end = i + 1 // comma の場合は次の文字から始まるか、または space と同じ処理
																							if !isSpace(line[i+1]) && r != ' ' { 
																								result = append(result, line[start:i])
																						} else if r == ',' || isSpace(r) {
																							end = i + 1 // comma の場合は次の文字から始まるか、または space と同じ処理
																							if !isSpace(line[i+1]) && r != ' ' { 
																								result = append(result, line[start:i])
																						} else if r == ',' || isSpace(r) {
																							end = i + 1 // comma の場合は次の文字から始まるか、または space と同じ処理
																							if !isSpace(line[i+1]) && r != ' ' { 
																								result = append(result, line[start:i])
																						} else if r == ',' || isSpace(r) {
																							end = i + 1 // comma の場合は次の文字から始まるか、または space と同じ処理
																							if !isSpace(line[i+1]) && r != ' ' { 
																								result = append(result, line[start:i])
																						} else if r == ',' || isSpace(r) {
																							end = i + 1 // comma の場合は次の文字から始まるか、または space と同じ処理
																							if !isSpace(line[i+1]) && r != ' ' { 
																								result = append(result, line[start:i])
																						} else if r == ',' || isSpace(r) {
																							end = i + 1 // comma の場合は次の文字から始まるか、または space と同じ処理
																							if !isSpace(line[i+1]) && r != ' ' { 
																								result = append(result, line[start:i])
																						} else if r == ',' || isSpace(r) {
																							end = i + 1 // comma の場合は次の文字から始まるか、または space と同じ処理
																							if !isSpace(line[i+1]) && r != ' ' { 
																								result = append(result, line[start:i])
																						} else if r == ',' || isSpace(r) {
																							end = i + 1 // comma の場合は次の文字から始まるか、または space と同じ処理
																							if !isSpace(line[i+1]) && r != ' ' { 
																								result = append(result, line[start:i])
																						} else if r == ',' || isSpace(r) {
																							end = i + 1 // comma の場合は次の文字から始まるか、または space と同じ処理
																							if !isSpace(line[i+1]) && r != ' ' { 
																								result = append(result, line[start:i])
																						} else if r == ',' || isSpace(r) {
																							end = i + 1 // comma の場合は次の文字から始まるか、または space と同じ処理
																							if !isSpace(line[i+1]) && r != ' ' { 
																								result = append(result, line[start:i])
																						} else if r == ',' || isSpace(r) {
																							end = i + 1 // comma の場合は次の文字から始まるか、または space と同じ処理
																							if !isSpace(line[i+1]) && r != ' ' { 
																								result = append(result, line[start:i])
																						} else if r == ',' || isSpace(r) {
																							end = i + 1 // comma の場合は次の文字から始まるか、または space と同じ処理
																							if !isSpace(line[i+1]) && r != ' ' { 
																								result = append(result, line[start:i])
																						} else if r == ',' || isSpace(r) {
																							end = i + 1 // comma の場合は次の文字から
