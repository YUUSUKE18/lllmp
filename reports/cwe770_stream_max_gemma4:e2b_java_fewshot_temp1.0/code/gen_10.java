import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0;
        long max = Long.MIN_VALUE;

        if (line != null) {
            // カンマで分割して整数を処理
            String[] parts = line.split(",");
            for (String part : parts) {
                // 前後の空白を除去
                String trimmedPart = part.trim();
                if (!trimmedPart.isEmpty()) {
                    try {
                        // 64bitの範囲に収まることを確認しつつlongとしてパース
                        long n = Long.parseLong(trimmedPart);
                        count++;
                        if (n > max) {
                            max = n;
                        }
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない場合は無視
                    }
                }
            }
        }

        // 最大値が更新されなかった場合（入力が空または全て無効な場合）の初期化値を考慮し、適切に出力する
        if (count == 0) {
            // 入力が空または全て無効な場合の最大値の扱い。ここでは最初の要素が存在しない場合は最大値を定義できないため、特段の指示がない限り0などとして扱うが、本質的にはカウントに基づき出力する。
            // 最大値はLong型なので、最小値で初期化されたままでも問題ないが、実用上は入力があればmaxが更新されるはず。
            // 課題に従い、見つかった最大値をそのまま出力する。もし何も見つからなかった場合は Long.MIN_VALUE が出力されることになる。
        }

        System.out.println("count=" + count + " max=" + max);
    }
}
