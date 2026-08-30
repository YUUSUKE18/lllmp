import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;

        while ((line = br.readLine()) != null) {
            // 行の前後の空白を無視して処理
            String trimmedLine = line.trim();

            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // カンマ区切りの整数列として妥当かを判定
            // 妥当とは、1個以上の数字列がカンマで区切られて並んでいること。
            // 末尾のカンマは許容する。

            // 行をカンマで分割してみる
            // 末尾のカンマがあっても、split("\\s*,")を使うと、空の要素が生成される可能性があるため、
            // より厳密に正規表現で検証するか、分割結果をチェックする。

            // 仕様の解釈：「1 個以上の数字列がカンマで区切られて並んでいる」
            // 例: "1,2,3" -> 3つの数字列
            // 例: "1,2," -> 2つの数字列（1と2）、末尾のカンマは許容。
            // 例: "," -> 0個の数字列（空の区切り）
            // 例: "abc" -> 数字列ではないため不妥当。

            // カンマ区切りの文字列を解析し、すべての要素が整数であることを確認する。
            // 末尾のカンマは許容されるが、それ以外の文字は許容されない。

            boolean isValid = false;
            if (trimmedLine.endsWith(",")) {
                // 末尾がカンマの場合、カンマで区切られた部分をチェックする
                String content = trimmedLine.substring(0, trimmedLine.length() - 1);
                if (!content.isEmpty()) {
                    // 内容が空でない場合、カンマで区切られているか確認
                    // 少なくとも1つのカンマが含まれているか、数字が存在するか
                    if (content.contains(",")) {
                        // 複数の要素が存在する場合（例: "1,2,"）
                        String[] parts = content.split(",");
                        boolean hasDigits = false;
                        for (String part : parts) {
                            String p = part.trim();
                            if (!p.isEmpty()) {
                                try {
                                    Integer.parseInt(p);
                                    hasDigits = true;
                                } catch (NumberFormatException e) {
                                    // 数字以外が含まれていた場合は不妥当
                                    isValid = false;
                                    break;
                                }
                            }
                        }
                        if (hasDigits) {
                             // 少なくとも1つの有効な数字列が存在した
                            isValid = true;
                        }
                    } else if (content.matches("-?\\d+") && !content.isEmpty()) {
                        // カンマがなく、単一の数字列の場合も妥当とするか？
                        // 仕様：「1 個以上の数字列がカンマで区切られて並んでいる」
                        // これは「カンマ区切り」であることを示唆しているため、カンマが存在しないものは除外する。
                        // ただし、末尾カンマの許容を考慮すると、"1" (末尾カンマなし) は不妥当と解釈するのが自然。
                        // 例: "1" は「1個の数字列」であり、「カンマで区切られて並んでいる」とは言えない。
                        isValid = false; // カンマ区切りとして成立させるため、ここでは除外
                    }
                }
            } else {
                // 末尾にカンマがない場合
                String[] parts = trimmedLine.split(",");
                
                // 1個以上の数字列がカンマで区切られているか
                if (parts.length > 0) {
                    boolean allValid = true;
                    for (String part : parts) {
                        String p = part.trim();
                        if (p.isEmpty()) {
                            // 空の要素（連続するカンマなど）は許容しない
                            allValid = false;
                            break;
                        }
                        try {
                            Integer.parseInt(p);
                        } catch (NumberFormatException e) {
                            // 数字以外が含まれていた場合は不妥当
                            allValid = false;
                            break;
                        }
                    }
                    
                    if (allValid) {
                        // 1個以上の数字列が有効にパースされた
                        isValid = true;
                    }
                }
            }

            // 非常に厳密に「カンマで区切られた整数列」を要求する場合、
            // 以下の条件が最もシンプルで一般的な解釈に近い。
            // 1. 空行は不妥当。
            // 2. カンマと数字以外の文字のみで構成されているか。
            // 3. 少なくとも1つのカンマが含まれているか（または、カンマで区切られた複数の要素が存在するか）。
            
            // 上記の複雑なロジックを簡略化し、最も一般的な「カンマ区切りで、すべて整数で構成され、少なくとも1つの要素が存在する」を検証する。
            // 仕様に従い、"カンマで区切られて並んでいる"ことに焦点を当てる。
            
            // 再評価: "妥当とは、1 個以上の数字列がカンマで区切られて並んでいることです。末尾のカンマは許容します。"
            // これは、カンマが少なくとも1つ存在し、その間に数字がパースできることを意味する。

            boolean finalIsValid = false;
            if (!trimmedLine.isEmpty()) {
                // 末尾のカンマを無視して、カンマで分割してみる。
                // "1,2," -> split -> ["1", "2", ""]
                // "1,2" -> split -> ["1", "2"]
                
                // 末尾カンマの許容を考慮し、末尾のカンマを取り除いて処理する
                String effectiveLine = trimmedLine;
                if (effectiveLine.endsWith(",")) {
                    effectiveLine = effectiveLine.substring(0, effectiveLine.length() - 1);
                }

                if (!effectiveLine.isEmpty()) {
                    // カンマで分割し、空要素がないか、すべて整数かをチェック
                    String[] parts = effectiveLine.split(",");
                    
                    // 少なくとも1つの要素があるか、またはカンマの存在を確認する
                    if (parts.length > 0) {
                        boolean allIntegers = true;
                        for (String part : parts) {
                            if (part.isEmpty()) {
                                // 連続するカンマ（例: ",,"）は許容しない
                                allIntegers = false;
                                break;
                            }
                            try {
                                Integer.parseInt(part.trim());
                            } catch (NumberFormatException e) {
                                allIntegers = false;
                                break;
                            }
                        }
                        
                        if (allIntegers) {
                            // 1個以上の数字列がカンマで区切られている（少なくとも1つの数字列がある）
                            finalIsValid = true;
                        }
                    }
                }
            }
            
            if (finalIsValid) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
    }
}
