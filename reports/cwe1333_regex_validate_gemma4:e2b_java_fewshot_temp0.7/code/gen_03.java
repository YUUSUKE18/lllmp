import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
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

            // 末尾のカンマを考慮して、カンマで分割する
            // 例: "1,2,3," -> ["1", "2", "3", ""]
            String[] parts = trimmedLine.split(",");
            
            // 妥当性の判定: 1個以上の数字列がカンマで区切られて並んでいること。
            // partsの長さが1以上であれば、少なくとも1つの要素（数字列または空文字列）が存在する。
            // 厳密には、「1個以上の数字列がカンマで区切られて並んでいる」ため、
            // 空文字列が含まれていても、数字列が1つ以上存在すれば良い。
            
            boolean isValid = false;
            int numberCount = 0;
            
            for (String part : parts) {
                String trimmedPart = part.trim();
                if (!trimmedPart.isEmpty()) {
                    try {
                        // 数字列であるか確認
                        Integer.parseInt(trimmedPart);
                        numberCount++;
                    } catch (NumberFormatException e) {
                        // 数字以外の文字が含まれていた場合、妥当ではない
                        isValid = false;
                        break;
                    }
                }
            }
            
            // 妥当な行は、少なくとも1個以上の数字列を含み、かつ、
            // 元の行がカンマ区切りで構成されている（ただし、末尾のカンマは許容）
            // 課題の定義：「1 個以上の数字列がカンマで区切られて並んでいることです。」
            // 空行、および数字とカンマ以外を含む行は妥当ではありません。
            // 末尾のカンマは許容します。
            
            // 1. 少なくとも1つの数字列が存在すること
            // 2. 数字とカンマ以外を含まないこと（上記ループでチェック済み）
            
            if (numberCount >= 1) {
                // さらに、元の行がカンマで区切られている構造を持っていることを保証する。
                // 厳密には、split(",")の結果が、数字列とカンマのみで構成されている必要がある。
                // ここでは、数字列が1つ以上存在し、その他の文字が含まれていなければOKとする。
                // 「数字とカンマ以外を含む行は妥当ではない」という制約を重視する。
                
                // もし、入力行全体を解析し、数字とカンマ以外が混入していなければ妥当と見なす。
                // 厳密に「カンマ区切りの整数列」を想定し、数字以外の文字がないかを確認する。
                
                // 最初のチェックで数字以外の文字が含まれていなければOKとする。
                if (isValid) {
                    validLines++;
                }
            }
        }

        System.out.println("valid=" + validLines);
    }
}
