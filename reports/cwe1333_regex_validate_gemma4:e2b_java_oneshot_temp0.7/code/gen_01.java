import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;

        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 末尾のカンマを無視して、カンマで区切られた数字列が存在するか確認する
            // 妥当な形式: 1個以上の数字列がカンマで区切られている。末尾のカンマは許容。
            // これは、カンマで区切られた要素がすべて整数である、という条件を満たせば良い。
            
            // 末尾のカンマを削除してチェックする
            String content = trimmedLine;
            if (content.endsWith(",")) {
                content = content.substring(0, content.length() - 1);
            }

            if (content.isEmpty()) {
                // カンマのみ、または空行（既にチェック済みだが念のため）
                continue;
            }

            String[] parts = content.split(",");
            boolean isValid = true;

            for (String part : parts) {
                String trimmedPart = part.trim();
                if (trimmedPart.isEmpty()) {
                    // カンマが連続している場合 (例: ",," または ",1,,2") のチェックが必要
                    // カンマの後に数字が続かない、またはカンマのみで区切られている場合を考慮する。
                    // 仕様：「1個以上の数字列がカンマで区切られて並んでいる」
                    // 空の要素が複数並ぶことは、"1,,2" のようなケースで発生する可能性がある。
                    // しかし、"1,2" は妥当。末尾のカンマは許容される。
                    // 厳密に「数字列」のみをチェックする。
                    continue; // 空の要素は無視する（"1,,2" のようなケースでカンマの連続を許容する）
                }

                try {
                    Integer.parseInt(trimmedPart);
                } catch (NumberFormatException e) {
                    // 数字とカンマ以外を含む場合は妥当ではない
                    isValid = false;
                    break;
                }
            }

            if (isValid) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
    }
}
