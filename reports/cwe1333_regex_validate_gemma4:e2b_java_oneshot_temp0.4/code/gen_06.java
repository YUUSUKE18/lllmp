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

            // 末尾のカンマを許容しつつ、カンマ区切りの整数列として妥当かを判定する
            // 妥当な行は「1 個以上の数字列がカンマで区切られて並んでいる」こと。
            // これは、カンマで区切られた要素がすべて整数である、という条件を満たせば良い。
            // 末尾のカンマは許容される。

            // 1. 末尾のカンマを取り除く（もしあれば）
            String content = trimmedLine;
            if (content.endsWith(",")) {
                content = content.substring(0, content.length() - 1);
            }

            // 2. カンマで分割して、すべてが整数であることを確認する
            String[] parts = content.split(",");
            boolean isValid = true;

            // 1個以上の数字列がカンマで区切られているかを確認する
            // parts.length >= 1 であれば、少なくとも1つの要素がある。
            // ただし、空の要素が連続して存在しないように注意が必要。
            // 仕様：「1 個以上の数字列がカンマで区切られて並んでいる」

            // partsが空でないことを確認し、かつ、各要素が数字であることを確認する
            // 空行や数字とカンマ以外を含む行は妥当ではない。
            // これは、splitの結果、空の要素が生成されないこと、およびすべての要素が整数であることを意味する。

            if (parts.length == 0) {
                // これはtrimmedLineが空だった場合（既にチェック済み）または、
                // カンマのみだった場合（例: "," または ","が末尾だった場合）に発生する可能性があるが、
                // 厳密には「1個以上の数字列」が条件。
                isValid = false;
            } else {
                for (String part : parts) {
                    // 各部分が空でないこと（連続するカンマや前後の空白が原因で空文字列になるのを防ぐ）
                    if (part.isEmpty()) {
                        // 連続するカンマや、カンマのみの行は不適格と見なす
                        isValid = false;
                        break;
                    }
                    try {
                        Integer.parseInt(part.trim());
                    } catch (NumberFormatException e) {
                        // 数字とカンマ以外を含む行は不適格
                        isValid = false;
                        break;
                    }
                }
            }

            if (isValid) {
                // 1個以上の数字列がカンマで区切られている（parts.length >= 1 かつ、空要素がない）
                // 厳密には、"1 個以上の数字列がカンマで区切られて並んでいる"を満たすには、
                // 少なくとも1つの数字列が存在する必要がある。
                // parts.length >= 1 かつ、すべての要素が有効な整数であればOK。
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
    }
}
