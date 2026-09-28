import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validLines = 0;
        String line;

        while ((line = br.readLine()) != null) {
            // 行の前後の空白を無視して処理
            String trimmedLine = line.trim();
            
            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 末尾のカンマを許容しつつ、数字とカンマ以外を含まないかチェックする
            // 妥当な形式: 1個以上の数字列がカンマで区切られている。末尾のカンマは許容。
            
            // 末尾のカンマを取り除く（末尾のカンマがあっても良いので、区切り文字として扱う）
            String processedLine = trimmedLine;
            if (processedLine.endsWith(",")) {
                processedLine = processedLine.substring(0, processedLine.length() - 1);
            }

            // カンマで分割して、空でない要素があるかチェックする
            String[] parts = processedLine.split(",");
            
            boolean isValid = true;
            if (parts.length == 0) {
                // これはtrimmedLineが空でないのにsplitの結果が空になることは通常ないが、念のため
                isValid = false;
            } else {
                for (String part : parts) {
                    // 各部分が空でなければOK
                    if (part.isEmpty()) {
                        // カンマが連続している場合 (例: "1,,2" や ",1") は、
                        // 厳密には「1個以上の数字列がカンマで区切られている」という条件を満たさない可能性がある。
                        // ただし、仕様は「1個以上の数字列がカンマで区切られて並んでいる」なので、
                        // 空の要素が連続することは許容しないと解釈する。
                        isValid = false;
                        break;
                    }
                }
            }
            
            // さらに、元の行が数字とカンマ以外を含まないかチェックする（例: "1,a,2" はNG）
            // これは、splitで得られた要素がすべて数字のみであることを確認する必要がある。
            // 仕様の「数字列がカンマで区切られている」を厳密に解釈すると、各要素は整数であるべき。
            
            if (isValid) {
                // すべての要素が整数であることを確認
                for (String part : parts) {
                    try {
                        Integer.parseInt(part.trim());
                    } catch (NumberFormatException e) {
                        isValid = false;
                        break;
                    }
                }
            }

            if (isValid) {
                validLines++;
            }
        }

        System.out.println("valid=" + validLines);
    }
}
