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
            // 正規表現を使って、数字とカンマ以外の文字が含まれていないかチェックする
            // 許容されるのは数字(0-9)とカンマ(,)のみ
            if (!trimmedLine.matches("[0-9,]*")) {
                continue;
            }

            // 3. 妥当性の判定
            // 妥当とは、1個以上の数字列がカンマで区切られて並んでいること。
            // 末尾のカンマは許容される。
            
            // 行が空でないことが保証されているため、カンマの有無で判定する。
            // 少なくとも1つの数字が含まれている必要がある。
            boolean containsDigit = false;
            for (char c : trimmedLine.toCharArray()) {
                if (Character.isDigit(c)) {
                    containsDigit = true;
                    break;
                }
            }

            if (containsDigit) {
                // 数字が含まれていれば、カンマ区切りとして妥当であると見なす。
                // (例: "1,2,3", "1,2,", "1")
                validCount++;
            }
        }

        // 結果の出力
        System.out.println("valid=" + validCount);
        scanner.close();
    }
}
