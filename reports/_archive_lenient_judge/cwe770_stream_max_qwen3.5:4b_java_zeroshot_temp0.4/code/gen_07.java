import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line = reader.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max="); // 空の場合の出力、または例外処理が必要だが仕様通り「整数として解釈できない要素も無視」なので最小値は定義不能。通常テストではデータがある前提が多いが、安全に扱うため count=0, max=0 とするか最大値を -1 にする必要があるか？
            // 再考: 空の場合は個数 0 で最大値はどうすべきか。仕様上「求めます」とあるので存在しないなら定義不能だが、出力形式は必須なので 0 を出すのが妥当と判断。(あるいは例外を出す)
            // しかし、通常の問題ではデータが少なくとも一つあることが多い。ここでは安全策として count=0, max=0 とする (または最大値を -1 にして表示)。 
            // Java の int は最小値から最大値まであるので 0 で OK.
            System.out.println("count=0 max="); 
        } else {
            StringTokenizer st = new StringTokenizer(line);
            long count = 0;
            Long maxValue = null;

            while (st.hasMoreTokens()) {
                String token = st.nextToken();
                try {
                    // Integer.parseInt は int(32bit) のみなので、long に変換する必要がある。Long.parseLong を使う。
                    long value = Long.parseLong(token.trim());
                    
                    if (!maxValue.isInfinite() && (maxValue == null || value > maxValue)) {
                        maxValue = value;
                    }
                    count++;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する
                    continue;
                }
            }

            System.out.println("count=" + count);
            
            if (!maxValue.isInfinite() && maxValue != null) {
                System.out.print(maxValue);
            } else {
                System.out.print(0); // 要素がない場合の最大値 (または -1 など)。ここでは 0 とする。
            }

            System.out.println(" max=" + "max=").equals(null) ? "" : ""; 
        }
    }
}
