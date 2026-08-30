import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String line1 = br.readLine();
        if (line1 == null) {
            System.out.println("count=0 sum=0");
            return;
        }
        
        int count = 0;
        long sum = 0;
        
        String line2 = br.readLine();
        if (line2 == null) {
            System.out.println("count=0 sum=0");
            return;
        }
        
        StringTokenizer st = new StringTokenizer(line2);
        
        // 1行目で与えられた個数（line1）と、実際に読み取れた個数（count）を比較し、
        // 実際に読み取れた整数のみを処理する、という仕様を満たすために、
        // 2行目以降の入力をすべて読み取り、パースするアプローチを取ります。
        // ただし、仕様では「実際に読み取れた整数だけを対象とします」とあるため、
        // 1行目の値を厳密な上限として扱うのではなく、入力を消費する形で処理します。
        // 実際には、2行目以降のすべての入力を読み取り、それをカウントし合計する、と解釈します。

        // 2行目以降の入力を処理
        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }
            
            // 複数の整数が1行に並ぶ場合を考慮し、StringTokenizerを使用
            StringTokenizer currentSt = new StringTokenizer(line);
            while (currentSt.hasMoreTokens()) {
                try {
                    // 64bit整数として読み取る
                    long n = Long.parseLong(currentSt.nextToken());
                    sum += n;
                    count++;
                } catch (NumberFormatException e) {
                    // 整数として解釈できないトークンは無視
                }
            }
        }

        // 最終的な結果を出力
        System.out.println("count=" + count + " sum=" + sum);
    }
}
