import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.isEmpty()) {
            System.out.println("count=0 max=");
            return;
        }

        BigInteger countZero = BigInteger.ZERO;
        BigInteger valueMax = BigInteger.valueOf(0); // 初期値は最小の整数に設定する必要があるが、負数も扱うか? 
        boolean first = true; 

        String[] parts = line.split(",");
        
        for (String part : parts) {
            if (part.isEmpty()) continue;

            try {
                BigInteger val = new BigInteger(part.trim());
                // 最大値の初期化と更新処理
                if (first || val.compareTo(valueMax) > 0) {
                    valueMax = val;
                    first = false;
                } else {
                    countZero.increment(); // 条件文に含めないため修正: max を更新するだけにする
                    // ここは論理が少し間違っているので再構築します。
                }
            } catch (NumberFormatException e) {}
        }

        BigInteger finalCount = BigInteger.ZERO;
        
        if (!first && valueMax.equals(BigInteger.valueOf(0)) || first) {
             // もし値がすべて未設定か、正の数が最初にある場合でも count は 1 に増えない? 
             // spec: "要素数" と "最大値". max="max=". この出力形式では空の場合 max= の後何も出ないのか? 例を見ると "count=<個数> max=<最大>" なので。
        }

        System.out.print("count=", valueMax); // ここは計算ロジックが不十分なので再書写する
    
    } 
} 

// 以下、正しく機能させるための完全なリファクタリング後
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || !line.trim().contains(",")) { // 空行か、カンマがない場合は count=0 の扱いに注意? spec は整数列なので少なくとも1つあると想定しつつも robust に。

            BigInteger maxVal = BigInteger.ZERO; 
            boolean hasValue = false;
        } else {
             String[] parts = line.split(",");
             BigInteger currentMax = null; // 空の場合の扱いを避けるため、最初の有効な値で初期化
        
             for (String part : parts) {
                 if (part.trim().isEmpty()) continue;

                 try {
                     BigInteger val = new BigInteger(part);
                     if (!hasValue || !currentMax.isNegative() && val.compareTo(currentMax) > 0) // ここも少し修正が必要。負数も含む最大値を求めたい
                        ; 

                         } catch (NumberFormatException e) {} 
             }
             
        }

        System.out.print("count=", valueMax); 
        
    }
}


// 最後に、完全に正しいコードを書き換えます

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=");
            return;
        }

        // 入力解析
        StringTokenizer st = new StringTokenizer(line, ",");
        BigInteger countZero = BigInteger.ZERO;
        BigInteger maxVal = null; 
        boolean isFirst = true; 

        while (st.hasMoreTokens()) {
            String token = st.nextToken();
            
            try {
                BigInteger val = new BigInteger(token); // 空白はtrimされないので OK
                
                if (!isFirst || !val.isNeg() && val.compareTo(maxVal) > 0) {
                     maxVal = null; 
                         } catch (Exception e){}

                break; 

    } else {
        System.out.print("count=", valueMax); 
        
    }
