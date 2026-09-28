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
            // ただし、末尾のカンマが許容されるため、単純なsplit()だけでは末尾のカンマの扱いが複雑になる。
            
            // 末尾のカンマを削除して処理を単純化する
            String processedLine = trimmedLine;
            if (processedLine.endsWith(",")) {
                processedLine = processedLine.substring(0, processedLine.length() - 1);
            }

            // カンマで分割
            String[] parts = processedLine.split(",");
            
            // 妥当性の判定: 1個以上の数字列がカンマで区切られていること。
            // これは、分割された配列の要素数が1以上であり、かつ、その要素がすべて数字列であることを意味する。
            // 既に上記で数字とカンマ以外が含まれていないことを確認済み。
            // したがって、要素数が1以上であれば妥当である。
            
            if (parts.length > 0) {
                // さらに、各部分が空でない（つまり、連続するカンマや先頭/末尾のカンマが原因で空要素が生成されないようにする）ことを確認する。
                // 仕様：「1 個以上の数字列がカンマで区切られて並んでいる」
                // 例: "1,2,3" -> ["1", "2", "3"] (長さ3) -> 妥当
                // 例: "," -> ["", ""] (長さ2) -> 妥当ではない（空の数字列ではない）
                // 例: "1," -> "1" -> ["1"] (長さ1) -> 妥当
                // 例: "," -> "" -> [""] (長さ1) -> 妥当ではない
                
                // 厳密に「数字列」のみを数える必要がある。
                int actualNumberCount = 0;
                for (String part : parts) {
                    // partが空でなく、かつ数字のみで構成されているかを確認する（既に全体で数字とカンマのみなので、空でないことを確認すれば十分）
                    if (!part.isEmpty()) {
                        // 数字列であることの確認（既に全体で数字とカンマのみなので、partが数字のみであればOK）
                        boolean isNumeric = true;
                        for (char c : part.toCharArray()) {
                            if (!Character.isDigit(c)) {
                                isNumeric = false;
                                break;
                            }
                        }
                        if (isNumeric) {
                            actualNumberCount++;
                        }
                    }
                }
                
                if (actualNumberCount >= 1) {
                    validCount++;
                }
            }
        }

        System.out.println("valid=" + validCount);
        scanner.close();
    }
}
