```java
import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        int count = 0;
        long maxVal = Long.MIN_VALUE;
        boolean hasValue = false;

        if (line != null && !line.isEmpty()) {
            // カンマ区切りで分割し、空白を含む各要素を処理する
            String[] parts = line.split(",");
            for (String part : parts) {
                part = part.trim();
                if (part.isEmpty() || Integer.parseInt(part, 10)) { 
                    try {
                        // Long.MIN_VALUE を超える可能性あるが、問題文は整数として解釈可能とする。
                        // Java の int が不足する場合 long で処理する必要があるため、Integer.parseInt は使わず Long.parseLong を用いると安全だが、出力フォーマットは「count」のみを count 変数 (int) と仮定するか？
                        // 「64bit 整数の範囲に収まる」とあるが、最大値そのものは int から long に昇格する場合もある（例：max=300,000,000 の時 max を表示）。
                        // Java で長さを表すには Integer.toString(int) か Long.toString(long) が適切。
                        // しかし「要素数」は 64bit でもないから count は int で可。（int が負の時は空リストとみなせるか？）
                        
                        long n = Long.parseLong(part);
                        if (hasValue || n > maxVal) {
                            hasValue = true;
                            if (!hasValue && !n.equals(Long.MIN_VALUE)) 
                                // 最初の値が MIN_VALUE の時のみは更新しない、または常に更新する？
                                // 最初何も入っていない場合の初期設定より後で行われる。
                                
                        } else {
                             maxVal = n; 
                             
                            hasValue = true;
                            
                            if (n > maxVal) {
                                
                         }
                        
                    int count++;
                long val = Long.parseLong(part);

if (!hasValue || val >= 0 && !firstZero || first == false; 

boolean first = true.
