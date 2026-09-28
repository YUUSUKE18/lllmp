import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;

        while ((line = br.readLine()) != null) {
            // 行の前後の空白を無視して、カンマ区切りの整数列を判定する
            String trimmedLine = line.trim();

            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 末尾のカンマを許容しつつ、カンマで区切られた数字列が存在するかをチェックする
            // 妥当な行は「1個以上の数字列がカンマで区切られて並んでいる」こと。
            // これは、カンマで区切られた要素が少なくとも1つ存在し、その要素がすべて整数である必要があることを意味する。

            // 末尾のカンマを削除して、カンマで分割する
            String content = trimmedLine;
            if (content.endsWith(",")) {
                content = content.substring(0, content.length() - 1);
            }

            // カンマで分割
            String[] parts = content.split(",");

            boolean isValid = false;
            if (parts.length > 0) {
                // 1個以上の数字列がカンマで区切られて並んでいるか？
                // partsの要素が空でないことを確認する
                for (String part : parts) {
                    if (!part.trim().isEmpty()) {
                        // 各部分が整数であることを確認する（仕様上は「数字列」とあるため、ここでは整数としてパース可能かを確認する）
                        try {
                            Integer.parseInt(part.trim());
                            isValid = true;
                            break; // 1つでも有効な数字列があればOK
                        } catch (NumberFormatException e) {
                            // 数字列ではない場合はスキップ（ただし、仕様上は数字列のみを期待しているため、厳密には全ての要素が整数であるべきだが、
                            // 「1 個以上の数字列がカンマで区切られて並んでいる」という表現を「カンマで区切られた要素の中に、少なくとも1つの有効な整数が含まれている」と解釈する）
                        }
                    }
                }
            }

            if (isValid) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
    }
}
