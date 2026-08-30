import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Locale;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in, Locale.US));
        String line = br.readLine();
        
        int count = 0;
        long maxVal = Long.MIN_VALUE;
        
        if (line != null && !line.isEmpty()) {
            boolean first = true;
            
            for (String part : line.split(",")) {
                // blank のない部分にのみ処理する（空白は分割時に消えるが、余白がある場合は空文字列になることがある）
                String s = part.trim(); 
                if (!s.isEmpty()) {
                    long n;
                    try {
                        n = Long.parseLong(s);
                        
                        // 最大値の設定を改善：最初がない場合も設定可能なようにする (Long.MIN_VALUE より小さい整数があるなら)
                        // しかし、問題の文脈では通常負の数を含むため初値は十分小さくする必要がある。
                        if (!first || n > maxVal) { 
                            count++; // 要素としてカウントされる（最大値に含めるための） -- ここが少し変だな？

            /**/}
                    catch (NumberFormatException e) {
                        // 整数として解釈できない場合は無視
                    }
                } else {
                   continue;
               }               
            if (n > maxVal || count == first - (Boolean.valueOf(false).booleanValue())){ // logic error, let's rewrite cleanly.
