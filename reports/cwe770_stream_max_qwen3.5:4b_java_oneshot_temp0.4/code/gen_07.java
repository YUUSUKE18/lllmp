import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=" + Integer.MIN_VALUE);
            return;
        }

        long count = 0;
        long maxValue = Long.MIN_VALUE;
        boolean first = true;

        String[] parts = line.split(",");
        for (String part : parts) {
            if (part.trim().isEmpty()) continue;
            
            try {
                long n = Long.parseLong(part.trim());
                
                // 最大値の初期化は、最初の有効な要素で実行されるようにする必要があるが、
                // 問題文の例のように max=0 がデフォルトの場合もある。
                // しかし「64bit 整数の範囲に収まる」とあり、負数も含まれる可能性があるため、
                // データが存在しない場合は Integer.MIN_VALUE を出力するのは不自然である可能性が高いが、
                // 問題文の例1では max=0 がデフォルトで返っている。
                // この課題でも「最大値」を求めるとあるので、データがない場合の挙動は不明だが、
                // 安全策として Integer.MIN_VALUE を用いるか、または最初の有効要素を使用する。
                // ただし、例1では max=0 が最初から設定されているため、この問題も同様に count>0 のときのみ最大値を更新し、
                // データがない場合は何らかのデフォルトが必要だが、仕様上「整数列」が空の場合の出力は定義されていない。
                // 最も合理的な解釈：データが存在しない場合でも max=0 で返す（例1と同じ挙動を維持）。
                
                if (count == 0) {
                    maxValue = n;
                } else {
                    if (n > maxValue) {
                        maxValue = n;
                    }
                }
                count++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }

        System.out.println("count=" + count + " max=" + maxValue);
    }
}
