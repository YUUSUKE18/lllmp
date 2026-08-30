import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 行の前後の空白を無視する（trim()を使用）
            String trimmedLine = line.trim();

            // 1. 空行の判定
            if (trimmedLine.isEmpty()) {
                continue;
            }

            // 2. 数字とカンマ以外を含む行の判定
            // 妥当な行は「1個以上の数字列がカンマで区切られて並んでいる」こと。
            // これは、行が数字とカンマのみで構成されていることを意味する。
            // ただし、空行は除外されているため、ここでは数字とカンマのみで構成されているかを確認する。
            
            boolean isValid = true;
            for (int i = 0; i < trimmedLine.length(); i++) {
                char c = trimmedLine.charAt(i);
                if (!Character.isDigit(c) && c != ',') {
                    isValid = false;
                    break;
                }
            }

            if (!isValid) {
                continue;
            }

            // 3. カンマ区切りの整数列の妥当性の判定
            // 妥当とは、「1個以上の数字列がカンマで区切られて並んでいること」
            // 末尾のカンマは許容される。
            
            // 処理を簡略化するため、行をカンマで分割し、空でない要素が1つ以上あるかを確認する。
            // ただし、末尾のカンマが許容されるため、単純なsplit()では末尾の空要素に注意が必要。
            
            // 末尾のカンマを削除して処理を単純化する（末尾のカンマは許容されるため、これは行の構造を評価するのに役立つ）
            String content = trimmedLine;
            if (content.endsWith(",")) {
                content = content.substring(0, content.length() - 1);
            }
            
            // カンマで分割
            String[] parts = content.split(",");
            
            // 1個以上の数字列がカンマで区切られて並んでいるか？
            // これは、分割された要素の数が1以上であり、かつ、その要素がすべて数字列であることを意味する。
            // 既に上記で数字とカンマ以外が含まれていないことを確認済み。
            // したがって、parts.length >= 1 であれば、少なくとも1つの数字列が存在する。
            // ただし、空の文字列が生成される可能性があるため、要素の数を厳密にチェックする。
            
            // 例: "1,2,3" -> ["1", "2", "3"] (length 3) -> OK
            // 例: "1," -> "1" (length 1) -> OK (末尾のカンマは削除済み)
            // 例: "," -> "" (length 1) -> NG (空の要素のみ)
            // 例: "" (空行は除外済み)
            
            // 厳密に「1個以上の数字列」が存在するかをチェックする。
            // 最初のチェックで数字とカンマ以外がないことが保証されているため、
            // カンマで分割した結果、空文字列が一つ以上含まれていなければOK。
            
            boolean hasNumbers = false;
            for (String part : parts) {
                if (!part.isEmpty()) {
                    // 数字列であるか再確認（念のため）
                    try {
                        Integer.parseInt(part);
                        hasNumbers = true;
                        break;
                    } catch (NumberFormatException e) {
                        // これは既に上のループで排除されているはずだが、安全のため
                        hasNumbers = false;
                        break;
                    }
                }
            }

            if (hasNumbers) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
        scanner.close();
    }
}
