import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
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

            // 末尾のカンマを許容しつつ、カンマ区切りの整数列として妥当かを判定する
            // 妥当な行は、数字とカンマのみで構成され、少なくとも1つの数字が含まれている必要がある。
            
            // 末尾のカンマを取り除く（末尾のカンマは許容されるため、ここでは一旦そのまま扱う）
            // ただし、仕様は「1 個以上の数字列がカンマで区切られて並んでいること」を求めている。
            // 末尾のカンマがあっても、数字が1つ以上あればOKとする。
            
            // 処理を簡略化するため、カンマで分割し、空でない要素があるかを確認する。
            // 末尾のカンマがあっても、split(",")の結果に含まれる要素をチェックする。
            
            // 末尾のカンマを考慮して分割する。
            // 例: "1,2,3," -> ["1", "2", "3", ""]
            String[] parts = line.split(",");
            
            boolean isValid = false;
            int count = 0;
            
            for (String part : parts) {
                String trimmedPart = part.trim();
                if (!trimmedPart.isEmpty()) {
                    // 数字列であるかチェック
                    try {
                        Integer.parseInt(trimmedPart);
                        count++;
                    } catch (NumberFormatException e) {
                        // 数字以外のものが含まれていたら妥当ではない
                        isValid = false;
                        break;
                    }
                }
            }
            
            // 1個以上の数字列がカンマで区切られて並んでいること
            if (count >= 1) {
                // 数字とカンマ以外を含む行は妥当ではない、という制約を考慮する。
                // 上記のループで数字以外の文字が含まれていれば、それは不正な行と見なされるべき。
                // ただし、split(",")で得られた各要素が数字のみで構成されているかを確認する必要がある。
                
                // より厳密に、行全体が「数字とカンマのみ」で構成され、かつ「1個以上の数字」を含むかを確認する。
                
                // 行全体を再チェック: 数字とカンマ以外が含まれていないか？
                boolean containsOnlyDigitsAndCommas = true;
                for (int i = 0; i < line.length(); i++) {
                    char c = line.charAt(i);
                    if (!((c == '-' || (c >= '0' && c <= '9') || c == ','))) {
                        containsOnlyDigitsAndCommas = false;
                        break;
                    }
                }
                
                if (containsOnlyDigitsAndCommas) {
                    // 1個以上の数字列がカンマで区切られているか？
                    // これは、空でない要素の数が1以上であれば満たされる。
                    if (count >= 1) {
                        validLines++;
                    }
                }
            }
        }

        System.out.println("valid=" + validLines);
    }
}
