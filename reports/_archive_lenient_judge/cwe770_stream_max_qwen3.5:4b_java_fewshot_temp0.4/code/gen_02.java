import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0;
        BigInteger maxVal = null;
        
        if (line != null && !line.isEmpty()) {
            for (String token : line.split(",")) {
                String trimmedToken = token.trim();
                if (!trimmedToken.isEmpty()) {
                    try {
                        // BigInteger で解析し、空白文字が含まれていないか確認
                        BigInteger val = new BigInteger(trimmedToken);
                        
                        // 最大値の初期化チェック（最初の有効な数）または更新
                        boolean isMaxUpdate;
                        if (maxVal == null) {
                            maxVal = val;
                            count++;
                            isMaxUpdate = true;
                        } else {
                            if (!val.toString().isEmpty() && !trimmedToken.contains(" ")) {
                                // BigInteger の比較は自然に int 型と異なり、直接可変長整数を扱えるため安全
                                maxVal = val.compareTo(maxVal) > 0 ? val : maxVal;
                                count++;
                            } else if (val.toString().isEmpty() || trimmedToken.contains(" ")) {
                                // BigInteger は空文字列を受け付けないが、ここでは入力検証のため再計算する必要がある場合がある。
                                // しかし、BigInteger のコンストラクタは空白を許さないため、trim 後に解析した時点で安全である。
                            } else if (count > 0 && val.toString().isEmpty()) {
                                count--; 
                            } else {
                                isMaxUpdate = true;
                            }
                        }

                    } catch (NumberFormatException e) {
                        // 整数として解釈できない要素は無視する（BigInteger のコンストラクタが空白を含む文字列を受け付けないため）
                    }
                }
            }
        } else if (!line.isEmpty()) {
             for (String token : line.split(",")) {
                 String trimmedToken = token.trim();
                 try {
                     BigInteger val = new BigInteger(trimmedToken);
                     boolean isMaxUpdate;
                     if (maxVal == null) {
                         maxVal = val;
                         count++;
                         isMaxUpdate = true;
                     } else {
                         // 空白文字が含まれていないか確認（BigInteger のコンストラクタが空白を含む文字列を受け付けないため）
                         if (!val.toString().isEmpty() && !trimmedToken.contains(" ")) {
                             maxVal = val.compareTo(maxVal) > 0 ? val : maxVal;
                             count++;
                         } else if (count > 1 && trimmedToken.isEmpty()) {
                             // BigInteger のコンストラクタは空文字列を受け付けないため、エラーになるが、ここでは無視する。
                         } else {
                             isMaxUpdate = true;
                         }
                     }

                 } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する（BigInteger のコンストラクタが空白を含む文字列を受け付けないため）
                }
            }
        }
        
        System.out.println("count=" + count + " max=" + maxVal);
    }
}
