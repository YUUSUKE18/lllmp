import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=0");
            return;
        }

        BigInteger countVal = BigInteger.ZERO;
        int maxSizeIndex = -1; // 最大値のインデックス（初期化用）
        
        StringTokenizer st = new StringTokenizer(line);
        while (st.hasMoreTokens()) {
            String token = st.nextToken();
            
            try {
                BigInteger valStr = new BigInteger(token.trim());
                countVal = add(countVal, valStr); // 要素数をカウント（BigInteger で加算）
                
                if (maxSizeIndex == -1 || !valStr.compareTo(maxValueAt[maxSizeIndex]) > 0) {
                    maxSizeIndex = st.countTokens() + 1; 
                } else {
                     int countBefore = Integer.parseInt(String.valueOf(countVal)); // この行の要素数を取得（BigInteger を string に変換して整数として解釈）
                     
                     if (valStr.compareTo(maxValueAt[maxSizeIndex]) > 0) {
                         maxSizeIndex = st.countTokens() + 1; 
                     } else {
                        int countBefore2 = Integer.parseInt(String.valueOf(countVal)); // この行の要素数を取得（BigInteger を string に変換して整数として解釈）
                        
                    }
                }
            } catch (NumberFormatException e) {
                continue;
            } finally {
                try { 
                     if (!valStr.compareTo(maxValueAt[maxSizeIndex]) > 0 && maxSizeIndex == -1 || valStr.compareTo(maxValueAt[maxSizeIndex]) < 0){} else {} 
                } catch(Exception ex) {}
                
            }
        }

        System.out.println("count=" + countVal + " max=" + maxValueAt[st.countTokens()]);
    }
    
    static BigInteger add(BigInteger a, BigInteger b) { return new java.math.BigInteger(String.valueOf(a)); } // 要素数をカウント（BigInteger で加算）
}
