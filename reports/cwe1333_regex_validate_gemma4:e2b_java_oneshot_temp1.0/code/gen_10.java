import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;

        while ((line = br.readLine()) != null) {
            // 行の前後の空白を無視
            String trimmedLine = line.trim();
            
            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // カンマ区切りの整数列として妥当かを判定
            // 1. 数字とカンマ以外を含まないか
            // 2. 1個以上の数字列がカンマで区切られているか（末尾のカンマは許容）
            
            // 妥当性の判定ロジック:
            // 1. 行全体が数字とカンマのみで構成されているか確認
            // 2. 区切り文字がカンマであり、少なくとも1つの数字が含まれているか確認
            
            boolean isValid = true;
            if (!trimmedLine.isEmpty()) {
                // 末尾のカンマを考慮し、カンマで分割を試みる
                String[] parts = trimmedLine.split(",");
                
                // partsが空でないこと、そしてその中の要素が全て数字（または空文字列、末尾のカンマによる）かを確認する
                
                // 末尾のカンマを許容するため、行を処理する前に末尾のカンマを調整するか、
                // または分割された部分を厳密にチェックする必要がある。

                // 仕様: 1個以上の数字列がカンマで区切られて並んでいること。末尾のカンマは許容。
                
                // 厳密に「数字とカンマ以外を含む行は妥当ではない」という制約を適用する。
                // これは、行全体が数字とカンマのみで構成されている必要があることを意味する。
                
                for (int i = 0; i < trimmedLine.length(); i++) {
                    char c = trimmedLine.charAt(i);
                    if (!((c == ',' || Character.isDigit(c))) && c != ' ') { // 空白も無視するルールを考慮しつつ、数字とカンマ以外は不可
                        // ただし、行の前後の空白は無視する。trim()で処理済み。
                        // 読み込んだ文字が数字かカンマ以外なら不妥当。
                        isValid = false;
                        break;
                    }
                }
                
                // カンマ区切りの条件：1個以上の数字列が区切られているか
                // 末尾のカンマは許容される。
                // 例: "1,2,3," -> 3つの数字列が区切られている。
                
                // 複数の数字列が存在するかを確認するために、カンマで分割し、空でない要素があるか確認する。
                // 末尾のカンマは許容されるため、末尾のカンマが続く場合は、それが数字列の後に続くことを意味する。
                
                // trimmedLine が空でない場合、少なくとも1つの数字が含まれている必要がある。
                boolean containsDigit = false;
                for (char c : trimmedLine.toCharArray()) {
                    if (Character.isDigit(c)) {
                        containsDigit = true;
                        break;
                    }
                }
                
                if (containsDigit) {
                    // 少なくとも1つの数字が含まれており、かつ、数字とカンマのみで構成されている場合、妥当とする。
                    // カンマ区切りの形式が満たされているかを確認する。
                    // 複数の区切りがあるか？ (これは、カンマが少なくとも1つ含まれていて、数字が続いていることを示唆する)
                    
                    // 妥当性の定義を再解釈: "1個以上の数字列がカンマで区切られて並んでいること"
                    // これは、少なくとも1つのカンマが存在し、かつその前後が数字で構成されている必要がある。
                    
                    // シンプルに、数字とカンマのみで構成されており、かつ数字が含まれていればOKとする。
                    // 例: "1" は妥当？ -> 仕様では「カンマで区切られて並んでいる」ことを要求しているため、カンマがないものは不妥当かもしれない。
                    // 妥当な例: "1,2" (2つの数字列)
                    // 妥当な例: "1,2," (3つの区切り、末尾カンマ許容)
                    
                    // 少なくとも1つのカンマが存在し、それが数字を区切っていることをチェックする。
                    if (trimmedLine.indexOf(',') != -1) {
                        // 末尾のカンマを考慮して、カンマで分割した結果、少なくとも1つの非空の要素が存在するかを調べる。
                        // 末尾のカンマがある場合、split(",")は最後の空文字列を生成する。
                        
                        // "1,2," -> ["1", "2", ""]
                        // 少なくとも1つの数字列が意味を持つことを確認する。
                        boolean hasValidPart = false;
                        for(String part : parts) {
                            if (!part.isEmpty() && part.matches("\\d+")) {
                                hasValidPart = true;
                                break;
                            }
                        }
                        if (hasValidPart) {
                             validCount++;
                        }
                    } else if (containsDigit) {
                        // カンマがない場合でも、1つの数字列のみなら「1個以上」の区切りが成立しない可能性がある。
                        // しかし、「1個以上の数字列がカンマで区切られて並んでいる」という文言は、カンマの存在を前提としている。
                        // 厳密に「カンマで区切られている」ことを要求するなら、カンマが必須。
                        // 例: "123" -> 1つの数字列。区切りがない。 -> 不妥当とする。
                        // 例: "1,2" -> 2つの数字列。区切りあり。 -> 妥当。
                        
                        // 結論: カンマが存在しないものは不妥当とする。
                    }
                }
            }
        }

        System.out.println("valid=" + validCount);
    }
}
