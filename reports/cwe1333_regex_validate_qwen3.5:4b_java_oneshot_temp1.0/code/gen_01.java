import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            boolean isValid = false;
            // 空白を除去して処理用の文字列を作成
            String trimmedLine = line.trim();
            
            if (trimmedLine.isEmpty()) {
                continue; // 空行は妥当ではないが、入力として処理済みとみなす（条件「空行...は妥当ではありません」よりカウントしない）
            }

            // StringTokenizer でカンマ区切りに分解し、空白を区切り文字にも含めるように設定
            StringTokenizer st = new StringTokenizer(trimmedLine, ",");
            
            try {
                int count = 0;
                while (st.hasMoreTokens()) {
                    String token = st.nextToken();
                    // 各トークンが純粋な整数であるかチェック（符号付きなしの数字は許容、または符号あり）
                    // 「数字列」として妥当と判断するため、文字数だけある場合は有効
                    count++;
                }
                
                if (count > 0) {
                    isValid = true;
                }
            } catch (Exception e) {
                // Token が空でない場合の例外などを処理せず、デフォルトで invalid とする必要があるが
                // StringTokenizer は空白区切りではないので、トークンが空になることは少ない
                // ただし、条件「数字とカンマ以外を含む行は妥当ではありません」を満たすかチェック
                if (isValid) {
                    // 上記のループだけで「数字と非文字列が含まれている」と判定するのは難しい。
                    // より厳密な判定：トークンのすべてが整数であること。
                    // StringTokenizer は空白を区切り文字に指定していないため、トークン内に空白が含まれている可能性がある。
                    // 「カンマ区切りの整数列」なので、トークン自体は整数のみであるべき。
                } else {
                    isValid = false;
                }
            }

            // トークンが1つ以上あるか、かつトークンのすべてが整数かどうかを判定する再確認
            if (isValid) {
                try {
                    // 再度完全に検証：カンマで分割し、各部分の整数値として解析できるか試す
                    int[] parts = trimmedLine.split(",");
                    for (int i = 0; i < parts.length; i++) {
                        // 空白を含むトークンチェック
                        String part = parts[i].trim();
                        if (part.isEmpty()) {
                            isValid = false;
                            break;
                        }
                        // 整数として解析可能か
                        try {
                            Integer.parseInt(part);
                        } catch (NumberFormatException e) {
                            isValid = false;
                            break;
                        }
                    }
                } catch (Exception e) {
                    isValid = false;
                }
            }

            if (isValid) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
    }
}
