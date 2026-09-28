import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=" + Long.MIN_VALUE); // デフォルト値を調整する必要があるか、あるいは空の場合の定義？例1はmax=0. 今回は初期化なしだが安全のためにLong.MAX_VALUEにしたりMIN_VALUEにすると良いが、問題文では「最大値」を求めるので最小整数ならMAX値に近い状態になる。例2のような単純な場合もある。
        } else {
            long max = Long.MIN_VALUE; // 64bit の下限から始める
            int count = 0;
            String[] parts = line.split(",");

            for (String p : parts) {
                if (!p.trim().isEmpty()) {
                    try {
                        long val = Long.parseLong(p.trim());
                        max = Math.max(max, val);
                        count++;
                    } catch (NumberFormatException e) {
                        // 数式として解析できない場合はスキップする（問題文通り）
                    }
                } else {
                     continue;
                }
            }

            System.out.println("count=" + count + " max=" + max);
        }
    }
}
