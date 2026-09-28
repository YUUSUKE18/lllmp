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
            // 妥当な条件: 1個以上の数字列がカンマで区切られて並んでいること。末尾のカンマは許容。
            
            // 末尾のカンマを削除して処理する
            String processedLine = trimmedLine;
            if (processedLine.endsWith(",")) {
                processedLine = processedLine.substring(0, processedLine.length() - 1);
            }

            // カンマで分割して、各要素が整数であるか、かつ空でないかを確認
            String[] parts = processedLine.split(",");
            
            // 1個以上の数字列がカンマで区切られていることを確認する
            // partsの要素数が0より大きいことが必要。
            // ただし、元の行がカンマのみ（例: ","）や数字のみ（例: "123"）の場合も考慮する必要がある。
            
            boolean isValid = false;
            if (parts.length > 0) {
                // すべての要素が数字列（カンマで区切られたもの）であるかを確認する
                boolean allAreNumbers = true;
                for (String part : parts) {
                    if (part.isEmpty()) {
                        // カンマが連続している場合 (例: "1,,2")。仕様上は「1個以上の数字列がカンマで区切られて並んでいる」
                        // のため、空の要素が複数ある場合は、それ自体が妥当な区切り方として許容されるか、あるいはNGとするか判断が必要。
                        // 「1個以上の数字列がカンマで区切られて並んでいる」
                        // 例: "1,2" -> parts=["1", "2"] (2個の数字列) -> OK
                        // 例: "1," -> processedLine="1" -> parts=["1"] (1個の数字列) -> OK (末尾のカンマは許容)
                        // 例: ",1" -> processedLine="," -> parts=["", ""] (2個の空文字列) -> NG (空の数字列は許容されない)
                        
                        // 厳密に「数字列」のみを区切りとして扱う。空文字列は数字列ではない。
                        if (part.isEmpty()) {
                            // 空文字列が一つでもあれば、それは数字列ではないため、この分割方法は不適切と見なすか、
                            // または、空文字列を無視して残りの要素が数字であるかを確認する。
                            // ここでは、空文字列が数字列として存在しないため、妥当ではないと判断する。
                            allAreNumbers = false;
                            break;
                        }
                    } else {
                        try {
                            Integer.parseInt(part);
                        } catch (NumberFormatException e) {
                            // 数字でない要素があった場合
                            allAreNumbers = false;
                            break;
                        }
                    }
                }

                // 1個以上の数字列が存在し、かつそれらがカンマで区切られていることを確認する。
                // parts.length > 0 であることと、すべての要素が有効な数字列であることを確認。
                if (allAreNumbers && parts.length >= 1) {
                    // 念のため、元の行がカンマのみで構成されていたケース（例: "," や ","と末尾のカンマ）を考慮する。
                    // trim()で空行を除外しているため、もし processedLine が空でなければ、少なくとも1つの要素がある。
                    // 例: "1" -> parts=["1"]. length=1. OK.
                    // 例: "1,2" -> parts=["1", "2"]. length=2. OK.
                    // 例: "1," -> processedLine="1" -> parts=["1"]. length=1. OK.
                    // 例: "," -> processedLine="" -> parts=[""]. length=1. allAreNumbers=false (ループ内でのチェックが重要)
                    
                    // 再評価: allAreNumbersがtrueであることと、分割結果が意味を持つことを確認する。
                    // allAreNumbersがtrueであること、つまり全ての要素が有効な整数文字列であった場合、
                    // 少なくとも1つの数字列が存在する（parts.length >= 1）ことを保証する。
                    validCount++;
                }
            }

            // 厳密な再評価に基づき、単純化する。
            // 妥当 = 1個以上の数字列がカンマで区切られている。
            // 妥当な行は、カンマで区切られた部分がすべて整数であり、かつ、少なくとも1つの非空の数字列が存在する場合。

            // 再度、よりシンプルなロジックで判定する。
            // 1. 行をカンマで分割する。
            // 2. 分割された各要素が、空でない限り整数であるか確認する。
            // 3. 少なくとも1つの非空の要素が存在するか確認する。

            String[] finalParts = trimmedLine.split(",");
            boolean isTrulyValid = false;
            
            if (finalParts.length == 0) {
                // これはtrimmedLineが空の場合だが、既にチェック済み。
                continue;
            }

            boolean hasAtLeastOneNumber = false;
            boolean allPartsAreValidNumbers = true;

            for (String part : finalParts) {
                if (part.isEmpty()) {
                    // 空の要素は、数字列ではないため、厳密にはNG。
                    // ただし、末尾のカンマが許容される場合、これは区切りとして許容されるべき。
                    // 例: "1," -> split(",") -> ["1", ""]. ここで "" は許容されるべき。
                    // 「1個以上の数字列がカンマで区切られて並んでいる」
                    // この定義に基づくと、空要素は区切りとして許容されるが、数字列ではない。
                    // したがって、空要素が混在している行は「妥当ではない」と判断するのが最も安全。
                    allPartsAreValidNumbers = false;
                    break;
                }
                try {
                    Integer.parseInt(part);
                    hasAtLeastOneNumber = true;
                } catch (NumberFormatException e) {
                    allPartsAreValidNumbers = false;
                    break;
                }
            }
            
            if (allPartsAreValidNumbers && hasAtLeastOneNumber) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
    }
}
