import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.isEmpty()) {
            System.out.println("count=0 max=0");
            return;
        }

        // カンマで分割してトークンを処理
        String[] tokens = line.split(",");

        long count = 0;
        long max = Long.MIN_VALUE;

        for (String token : tokens) {
            // 前後の空白を無視し、整数として解釈可能かチェック
            if (!token.trim().isEmpty()) {
                try {
                    long value = Long.parseLong(token.trim());
                    count++;
                    if (value > max) {
                        max = value;
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する
                    continue;
                }
            }
        }

        // 最後に、要素が0個の場合や全ての要素が非数値だった場合のケースを考慮してmaxを調整
        if (count == 0) {
            max = 0; // 要素が0個なら最大値は0とする（あるいは仕様により-infinityなどを想定するが、ここでは0を採用）
        } else if (max == Long.MIN_VALUE) {
             // すべての有効な数値が負の値の場合など、min_valueで初期化された場合の安全策。
             // ここでは問題文の制約（64bit範囲）に基づき、実際に読み取った値の中で最大値を保持する。
             // 負の数を含む場合も正しく扱われるように、最初の有効な値をmaxとして扱う。
             // 初期化をLong.MIN_VALUEから変更し、count > 0ならmin_valueで初期化された状態でも正しく機能するように調整する必要はない。
             // ただし、もし入力が全て負の数であれば max はその中で最大となる。
        }


        System.out.println("count=" + count + " max=" + max);
    }
}
