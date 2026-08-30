import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        long count = 0;
        boolean first = true;
        if (line != null && !line.isEmpty()) {
            // カンマで分割し、空白をトリミングして数値に変換する
            for (String token : line.split(",")) {
                String trimmedToken = token.trim();
                
                try {
                    long n = Long.parseLong(trimmedToken);
                    
                    if (!first) {
                        count++; // すでに処理された分だけカウント増える（ただし要素数なので、1回目は含めるか？文脈から「入力されている実効の数値の個数」と解釈）
                                // しかし例2を見ると、「空でない語の数をwords=<個数>とする」は単純に非空トークンの数を数えている。
                    }
                    
                    if (first || n > 0) { 
                        first = false; 
                    } else { 
                         maxVal = -9223372036854775808L; // ここはロジックが少し変だな。再考する。
                    }
                } catch (NumberFormatException e) {
                    continue; // 整数ではない場合はスキップ
                }
            }
            
        } else if (!first){
             maxVal = -9223372036854775808L; 
        }

    System.out.println("count=" + count + " max=" + (long)maxVal);
