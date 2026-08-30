import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 行の前後の空白を無視する（trimは行全体に対して行う）
            String trimmedLine = line.trim();

            // 1. 空行の判定
            if (trimmedLine.isEmpty()) {
                continue;
            }

            // 2. 数字とカンマ以外を含む行の判定
            // 正規表現を使って、数字とカンマ以外の文字が含まれていないかチェックする
            // 許容されるのは数字(0-9)とカンマ(,)のみ
            boolean containsOnlyDigitsAndCommas = true;
            for (int i = 0; i < trimmedLine.length(); i++) {
                char c = trimmedLine.charAt(i);
                if (!((c >= '0' && c <= '9') || c == ',')) {
                    containsOnlyDigitsAndCommas = false;
                    break;
                }
            }

            if (!containsOnlyDigitsAndCommas) {
                continue;
            }

            // 3. 妥当性の判定 (1個以上の数字列がカンマで区切られているか)
            // 末尾のカンマは許容される
            
            // 行が空文字列でないことを確認済み
            
            // 数字列が少なくとも1つ存在するかどうかを判定する
            // カンマで分割し、空でない要素が1つ以上あればOKとする。
            // ただし、末尾のカンマが続く場合も考慮する必要がある。

            // 行の末尾がカンマで終わる場合 (例: "1,2,3," または "1,2,3")
            // 末尾のカンマを削除して、カンマで分割する
            String content = trimmedLine;
            if (content.endsWith(",")) {
                content = content.substring(0, content.length() - 1);
            }

            // カンマで分割
            String[] parts = content.split(",");
            
            // 妥当であるためには、分割された要素の中に少なくとも1つの数字列が存在する必要がある。
            // 空の要素が混在しても、数字列が存在すればOK。
            // ただし、仕様は「1 個以上の数字列がカンマで区切られて並んでいること」なので、
            // 区切り文字で区切られた要素がすべて数字列であるか、または少なくとも1つの数字列が含まれていることを確認する。
            
            boolean hasAtLeastOneNumber = false;
            for (String part : parts) {
                if (!part.isEmpty() && part.matches("\\d+")) {
                    hasAtLeastOneNumber = true;
                    break;
                }
            }
            
            // 最後の行が完全にカンマのみの場合 (例: "," または ",," のようなケース) は、
            // 上記の処理で parts が空でない要素を持たないため、hasAtLeastOneNumber は false になる。
            // したがって、数字列が1つ以上存在するかどうかを判定する。
            
            if (hasAtLeastOneNumber) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
        scanner.close();
    }
}
