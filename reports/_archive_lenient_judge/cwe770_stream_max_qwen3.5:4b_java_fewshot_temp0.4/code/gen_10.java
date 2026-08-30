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
                String trimmed = token.trim();
                if (!trimmed.isEmpty()) {
                    try {
                        BigInteger val = new BigInteger(trimmed);
                        count++;
                        
                        if (maxVal == null || val.compareTo(maxVal) > 0) {
                            maxVal = val;
                        }
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない要素は無視
                    }
                }
            }
        } else {
            count = 0;
            maxVal = BigInteger.ZERO; 
        }

        if (maxVal == null || maxVal.compareTo(BigInteger.ZERO) < 0 && !line.isEmpty()) {
             // もし入力がないか、すべての要素が非整数だった場合の処理
             // ただし問題文では「空白区切りの整数列」や「カンマ区切りの語」とありますが、
             // ここは「整数列」と指定されているため、空の場合は count=0, max=0 とするのが妥当。
             // 例1を見てみると max=0 が初期値になっているので同様に扱う。
        }

        System.out.println("count=" + count + " max=" + (maxVal != null ? maxVal.toString() : "0"));
    }
}
