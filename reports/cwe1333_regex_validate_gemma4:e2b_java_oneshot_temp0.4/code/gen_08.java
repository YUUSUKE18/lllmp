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

            // カンマ区切りの整数列として妥当か判定
            // 妥当条件: 1個以上の数字列がカンマで区切られて並んでいること。末尾のカンマは許容。
            
            // 末尾のカンマを取り除いた後の文字列をチェック
            String content = trimmedLine;
            if (content.endsWith(",")) {
                content = content.substring(0, content.length() - 1);
            }

            // カンマで分割して、空でない要素が数字のみで構成されているかチェックする
            String[] parts = content.split(",");
            
            boolean isValid = true;
            
            for (String part : parts) {
                String trimmedPart = part.trim();
                if (trimmedPart.isEmpty()) {
                    // カンマが連続している場合や、空の要素がある場合（例: "1,,2" や ",1" など）
                    // 仕様では「1 個以上の数字列がカンマで区切られて並んでいること」が重要。
                    // 連続するカンマや、数字以外の文字が含まれる場合は妥当ではない。
                    // ここでは、各要素が数字のみで構成されているかを確認する。
                    // 厳密に「数字列」のみを許容する場合、数字以外の文字が含まれていたら不妥当とする。
                    // ただし、例の制約から、カンマ区切りで数字のみが並んでいれば良いと解釈する。
                    // 空の要素は許容しない（例: "1,,2" の " " が空になる）。
                    continue; // 空の要素はスキップ（後述のチェックで全体が成立するか確認）
                }
                
                // 数字列であるか確認
                try {
                    Integer.parseInt(trimmedPart);
                } catch (NumberFormatException e) {
                    // 数字以外の文字が含まれていた場合、妥当ではない
                    isValid = false;
                    break;
                }
            }

            // 妥当な行数カウントのロジックを再評価
            // 仕様: 1 個以上の数字列がカンマで区切られて並んでいること。
            // 空行、および数字とカンマ以外を含む行は妥当ではない。
            
            // 1. 空行はスキップ済み。
            // 2. 数字とカンマ以外を含む行は、上記のループで不妥当と判定されるはず。
            // 3. 妥当な行は、少なくとも1つの数字列が存在すること。
            
            // 修正された妥当性の判定:
            // 1. 行が空でないこと。
            // 2. 行がカンマで区切られていること（少なくとも1つのカンマがあるか、または数字のみ）。
            // 3. 分割された要素がすべて整数であること。
            
            // 最もシンプルな解釈: カンマで区切られた要素がすべて整数であること。
            // 末尾のカンマは許容。
            
            boolean isTrulyValid = false;
            if (!trimmedLine.isEmpty()) {
                // 末尾のカンマを考慮して分割
                String effectiveLine = trimmedLine;
                if (effectiveLine.endsWith(",")) {
                    effectiveLine = effectiveLine.substring(0, effectiveLine.length() - 1);
                }
                
                if (!effectiveLine.isEmpty()) {
                    String[] finalParts = effectiveLine.split(",");
                    // 少なくとも1つの要素が存在し、すべてが整数であること
                    if (finalParts.length > 0) {
                        boolean allAreIntegers = true;
                        for (String part : finalParts) {
                            if (part.isEmpty()) {
                                // 連続するカンマによる空要素は許容しない（例: "1,,2" は不妥当と見なす）
                                allAreIntegers = false;
                                break;
                            }
                            try {
                                Integer.parseInt(part.trim());
                            } catch (NumberFormatException e) {
                                allAreIntegers = false;
                                break;
                            }
                        }
                        if (allAreIntegers) {
                            isTrulyValid = true;
                        }
                    }
                }
            }
            
            if (isTrulyValid) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
    }
}
