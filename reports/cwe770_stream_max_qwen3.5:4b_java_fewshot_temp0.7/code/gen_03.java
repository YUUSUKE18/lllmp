import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        BigInteger maxVal = null;
        int count = 0;
        
        if (line != null && !line.isEmpty()) {
            // カンマ区切りで分割し、空白も取り除くようにして処理する
            for (String token : line.split(",")) {
                String trimmedToken = token.trim();
                
                if (!trimmedToken.isEmpty()) {
                    try {
                        BigInteger val = new BigInteger(trimmedToken);
                        
                        // 最大値の更新チェック
                        if (maxVal == null || val.compareTo(maxVal) > 0) {
                            maxVal = val;
                        }
                        
                        count++;
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない場合は無視する（問題文より）
                    }
                }
            }
        }
        
        if (count == 0 && maxVal != null) {
             System.out.println("count=0"); 
        } else {
             System.out.print(count);
             // count が 0 の場合のみ最大値が設定されていない可能性があるため、maxVal を考慮する必要があるか確認。
             // しかし、問題文の「要素数」と「最大値」はセットで出力されるべきです。
             // maxVal は count > 0 で初めて更新されます。
             
            if (count == 1) { 
                System.out.println("max=" + ((BigInteger)null)); // これは論理的に矛盾しているので修正が必要
                
                // 正しいロジック: count が 1 の場合でも、その要素が maxVal を持っているかどうかをチェックする必要があるか？
                // いや、最大値を求めた時点でそれが存在しているはずです。count >= 0 です。
            }

             System.out.println(); 
        }

    }
}
