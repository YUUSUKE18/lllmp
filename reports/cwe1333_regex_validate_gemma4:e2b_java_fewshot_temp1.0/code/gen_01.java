import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validLines = 0;
        String line;

        while ((line = br.readLine()) != null) {
            // 行の前後の空白を無視するため、trim()を使用する
            String trimmedLine = line.trim();

            // 1. 空行は妥当ではない
            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではないため何もしない
                continue;
            }

            // 2. 数字とカンマ以外を含む行は妥当ではない
            boolean containsInvalidChar = false;
            for (int i = 0; i < trimmedLine.length(); i++) {
                char c = trimmedLine.charAt(i);
                if (!Character.isDigit(c) && c != ',') {
                    containsInvalidChar = true;
                    break;
                }
            }
            if (containsInvalidChar) {
                continue;
            }

            // 3. カンマ区切りの整数列として妥当であるか判定
            // 末尾のカンマは許容される
            if (trimmedLine.endsWith(",")) {
                // 末尾がカンマのみの場合（例: "," または ",,"）
                // これは空の数字列が区切られていると見なされる可能性があるため、
                // 厳密に「1個以上の数字列がカンマで区切られている」ことを確認する必要がある。
                // ただし、仕様では「1個以上の数字列がカンマで区切られて並んでいる」が条件。
                // 末尾カンマが許容されるため、カンマで区切られた数字列が一つ以上存在すればOKとする。
                
                // カンマで分割してみて、空でない要素が1つ以上あれば妥当と判断する。
                String[] parts = trimmedLine.split(",");
                int count = 0;
                for (String part : parts) {
                    if (!part.trim().isEmpty()) {
                        count++;
                    }
                }
                if (count >= 1) {
                    validLines++;
                } else {
                    // 末尾がカンマのみで、内容が数字列を持たない場合（例: "," や ",," の場合）
                    // このケースは、数字列が0個であるため不妥当。
                    // 例: "," -> parts=["", ""], count=0. 不妥当。
                    // 例: ",," -> parts=["", "", ""], count=0. 不妥当。
                    // ただし、行全体が空でないことは既にチェック済み。
                    // 末尾カンマのみの行は、空でない数字列がないため、不妥当とする。
                    continue; 
                }

            } else {
                // 末尾にカンマがない場合
                String[] parts = trimmedLine.split(",");
                int count = 0;
                for (String part : parts) {
                    if (!part.trim().isEmpty()) {
                        count++;
                    }
                }
                if (count >= 1) {
                    validLines++;
                }
            }
        }

        System.out.println("valid=" + validLines);
    }
}
