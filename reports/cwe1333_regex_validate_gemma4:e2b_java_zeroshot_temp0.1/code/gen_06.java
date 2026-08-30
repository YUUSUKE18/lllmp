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
            // 正規表現を使って、数字とカンマのみで構成されているかを確認する
            // ^[0-9,]*$ : 行の先頭から末尾まで、数字(0-9)またはカンマ(,)のみで構成されている
            if (!trimmedLine.matches("[0-9,]*")) {
                continue;
            }

            // 3. 妥当性の判定
            // 妥当とは、「1 個以上の数字列がカンマで区切られて並んでいること」
            // これは、少なくとも1つの数字が含まれている必要があることを意味する。
            // ただし、仕様の「1 個以上の数字列がカンマで区切られて並んでいる」を厳密に解釈する。
            // 少なくとも1つの数字が含まれていれば、それは「1 個以上の数字列」と見なせる。
            
            // 数字が一つも含まれていない場合（例: "," や ",," など）は妥当ではない。
            // 少なくとも1つの数字が含まれているかを確認する。
            boolean containsDigit = false;
            for (int i = 0; i < trimmedLine.length(); i++) {
                char c = trimmedLine.charAt(i);
                if (Character.isDigit(c)) {
                    containsDigit = true;
                    break;
                }
            }

            if (containsDigit) {
                // 妥当な行としてカウント
                validCount++;
            }
        }

        // 結果の出力
        System.out.println("valid=" + validCount);
        scanner.close();
    }
}
