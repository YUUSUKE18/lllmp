import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue; // 空行は無視

            boolean isValid = false;
            
            try {
                // 最初の文字が数字かチェック
                char firstChar = line.charAt(0);
                if (!Character.isDigit(firstChar)) {
                    throw new IllegalArgumentException("Invalid start");
                }
                
                List<String> parts = new ArrayList<>();
                int lastIndex = 0;
                
                // カンマで分割する前に、数字とカンマ以外の存在を確認するため、全てカラムとして処理
                for (int i = 1; i < line.length(); i++) {
                    char c = line.charAt(i);
                    if (c == ',') {
                        parts.add(line.substring(lastIndex, i));
                        lastIndex = i + 1; // カンマ後から始まる
                    } else if (!Character.isDigit(c)) {
                        // データ部分に数字以外の文字があった場合 → 無効
                        throw new IllegalArgumentException("Non-digit character in number part");
                    }
                }
                // 最後の分をセットに入れる
                parts.add(line.substring(lastIndex));
                
                // 各部分が数字であるか再確認（整数としてパースできるか）
                for (String part : parts) {
                    if (part.isEmpty()) continue;
                    try {
                        Integer.parseInt(part); // 数値に変換可能かチェック
                    } catch (NumberFormatException e) {
                        throw new IllegalArgumentException("Non-numeric value");
                    }
                }
                
                isValid = true;
            } catch (Exception e) {
                // 不具合がある場合は無効とみなす
                System.out.println("Invalid row: " + line);
            }

            // 有効な場合のみカウントする
            // ただし、上記の try-catch ブロック内では例外が発生する場合に
            // 「数値とカンマ以外を含む行は妥当ではありません」という仕様に対応する必要があります。
            
            if (isValid) {
                validCount++;
            } else {
                // 無効な行の場合、出力も行う（ただし問題文の「数字とカンマ以外を含む行」を判定する）
                System.out.println("Invalid row: " + line);
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
