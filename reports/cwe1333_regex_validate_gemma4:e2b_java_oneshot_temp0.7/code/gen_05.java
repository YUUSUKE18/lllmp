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

            // カンマで区切られた整数列として妥当か判定する
            // 妥当とは、1個以上の数字列がカンマで区切られて並んでいること。
            // 末尾のカンマは許容する。

            // 1. 末尾のカンマを取り除く（末尾のカンマは許容されるため、全体をチェックする）
            String content = trimmedLine;
            
            // 末尾のカンマがある場合、それを削除してチェックし、元の行が数字とカンマのみで構成されているかを確認する必要がある。
            // 仕様：「妥当とは、1 個以上の数字列がカンマで区切られて並んでいることです。末尾のカンマは許容します。」
            // 「空行、および数字とカンマ以外を含む行は妥当ではありません。」
            
            // 以下のロジックで、行が「数字とカンマのみ」で構成され、かつ「少なくとも1つの数字」が含まれているかを厳密にチェックする。
            
            // 1. 行全体が数字とカンマのみで構成されているかチェック
            boolean containsOnlyDigitsAndCommas = true;
            for (int i = 0; i < trimmedLine.length(); i++) {
                char c = trimmedLine.charAt(i);
                if (!Character.isDigit(c) && c != ',') {
                    containsOnlyDigitsAndCommas = false;
                    break;
                }
            }

            if (!containsOnlyDigitsAndCommas) {
                continue; // 数字とカンマ以外を含む行は妥当ではない
            }
            
            // 2. 1個以上の数字列がカンマで区切られているかチェック（つまり、数字が少なくとも1つ含まれているか）
            // 数字列が1つ以上存在すれば、カンマで区切られていると見なす。
            boolean containsAtLeastOneDigit = false;
            for (int i = 0; i < trimmedLine.length(); i++) {
                if (Character.isDigit(trimmedLine.charAt(i))) {
                    containsAtLeastOneDigit = true;
                    break;
                }
            }

            if (containsAtLeastOneDigit) {
                // 数字が含まれており、数字とカンマのみで構成されているため、妥当
                validCount++;
            } else {
                // 数字を含まない（例: "," や ",," など、数字列が0個の場合）
                // ただし、空行は先に除外済み。残るのはカンマのみの行。
                // 仕様：「1 個以上の数字列がカンマで区切られて並んでいること」
                // 数字列が0個の場合は妥当ではない。
            }
        }

        System.out.println("valid=" + validCount);
    }
}
