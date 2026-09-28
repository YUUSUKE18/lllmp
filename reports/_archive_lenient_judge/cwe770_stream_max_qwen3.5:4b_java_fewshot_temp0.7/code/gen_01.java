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
            // カンマで分割し、空白を除去して処理する
            for (String part : line.split(",")) {
                String trimmed = part.trim();
                if (!trimmed.isEmpty()) {
                    try {
                        BigInteger val = new BigInteger(trimmed);
                        count++;
                        
                        if (maxVal == null || val.compareTo(maxVal) > 0) {
                            maxVal = val;
                        }
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない要素は無視する
                    }
                } else {
                    continue;
                }
            }
        }

        if (maxVal == null && count > 0) {
            maxVal = BigInteger.ZERO;
        }
        
        System.out.println("count=" + count + " max=" + ((maxVal != null ? maxVal.toString() : "null")));
    }
}
