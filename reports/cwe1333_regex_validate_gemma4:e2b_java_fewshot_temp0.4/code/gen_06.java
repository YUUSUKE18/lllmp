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

            // 末尾のカンマを許容しつつ、カンマ区切りの整数列として妥当かを判定する
            // 末尾のカンマがあっても、カンマで区切られた要素が1つ以上存在すれば妥当とする。
            // ただし、仕様では「1 個以上の数字列がカンマで区切られて並んでいること」が妥当の定義。
            // 末尾のカンマが許容されるため、split(",")の結果が空でない要素を持つかを確認する。
            
            // 末尾のカンマを削除して分割する
            String content = trimmedLine;
            if (content.endsWith(",")) {
                content = content.substring(0, content.length() - 1);
            }
            
            // 空文字列が分割された結果に含まれる要素の数を数える
            String[] parts = content.split(",");
            
            // 妥当なのは1個以上の数字列がカンマで区切られている場合。
            // parts.length >= 1 は、カンマ区切りで少なくとも1つの要素があることを意味する。
            // ただし、元の行が空行でないことを確認済み。
            // もし元の行が "1,2," の場合、content は "1,2"，parts は ["1", "2"] で length は 2。
            // もし元の行が "1," の場合、content は "1"，parts は ["1"] で length は 1。
            // もし元の行が "," の場合、content は ""，parts は [""] で length は 1。これは空行チェックで除外されるべきだが、ここでは処理を続ける。
            
            // 厳密に「1 個以上の数字列がカンマで区切られて並んでいる」ことを確認する。
            // 空白を除去した結果、少なくとも1つの要素が存在すればOK。
            
            boolean is_valid = false;
            if (parts.length > 0) {
                // partsに含まれる要素が全て数字列であることを確認する（数字とカンマ以外を含む行は妥当ではない、という制約）
                // split(",")の結果、要素が数字列であるかを確認する。
                for (String part : parts) {
                    if (!part.trim().isEmpty()) {
                        try {
                            Integer.parseInt(part.trim());
                        } catch (NumberFormatException e) {
                            // 数字以外のものが含まれていれば妥当ではない
                            is_valid = false;
                            break;
                        }
                    }
                }
                if (is_valid) {
                    // 少なくとも1つの要素が存在すれば妥当
                    validLines++;
                }
            }
        }

        System.out.println("valid=" + validLines);
    }
}
