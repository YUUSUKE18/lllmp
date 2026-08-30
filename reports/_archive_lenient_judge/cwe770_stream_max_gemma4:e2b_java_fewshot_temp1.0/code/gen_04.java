import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null) {
            System.out.println("count=0 max=0");
            return;
        }

        String[] parts = line.split(",");
        long count = 0;
        long maxVal = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            // 空白をトリムしてチェック
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }
            
            try {
                long n = Long.parseLong(trimmedPart);
                count++;
                if (n > maxVal) {
                    maxVal = n;
                }
                foundNumber = true;
            } catch (NumberFormatException e) {
                // 整数として解釈できない場合は無視
            }
        }

        if (!foundNumber) {
            // 数値が一つもなかった場合、count=0, max=?となるが、仕様上最大値の初期値（Long.MIN_VALUE）を考慮する必要がある。
            // 整数が存在しない場合の「最大値」の定義は問題文に明記されていないが、ここでは要素数と最大値を求めるので、要素がない場合は count=0, max=0 などとするのが自然かもしれない。
            // ただし、全ての要素が無視される場合、maxValが初期値のままになるため、count=0で十分か、または特殊な扱いが必要。
            // 例1, 2のように「読み込んだ数値のみ」を対象と考えると、数がない場合は count=0, maxは未定義となる。ここでは入力された数値が存在しない場合は max=0 と仮定して進める。
            System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + maxVal);
        }
    }
}
