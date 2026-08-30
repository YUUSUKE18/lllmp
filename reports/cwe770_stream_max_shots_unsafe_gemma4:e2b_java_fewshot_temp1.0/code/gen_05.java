import java.nio.charset.StandardCharsets;

public class Main {
    public static void main(String[] args) throws Exception {
        String s = new String(System.in.readAllBytes(), StandardCharsets.UTF_8);
        // カンマで分割し、前後の空白を無視して処理する
        String[] parts = s.split(",");
        int count = 0;
        long max = Long.MIN_VALUE;
        boolean foundFirst = false;

        for (String part : parts) {
            String trimmed = part.trim();
            if (!trimmed.isEmpty()) {
                try {
                    long n = Long.parseLong(trimmed);
                    count++;
                    if (!foundFirst || n > max) {
                        max = n;
                        foundFirst = true;
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する
                }
            }
        }

        if (count == 0) {
            // 要素が全くなかった場合の処理。ここでは最大値の定義に従い、
            // もし入力があった場合はその最大値を出力するが、何もなかった場合は適切に最大値を設定する必要がある。
            // 仕様上「要素数」と「最大値」を求めるため、要素数が0なら最大値は未定義だが、
            // 最小値として扱うか、あるいは実質的に出力しない（count=0で十分）ことが考えられる。
            // 例示がないため、入力が空の場合でも count=0 max=? となるようにする。
            // ここでは、要素が一つも見つからなかった場合は最大値を保持したまま出力するが、
            // 整数列が存在しないため、max の初期値 (Long.MIN_VALUE) は適切でない可能性がある。
            // もし入力が空で count=0 なら、最大値は存在しないと見なすか、ここでは 0 を返すなど、文脈による。
            // 例1の処理を参考に、実データがあればそれを返すため、countが0ならmaxは無視されることになる。
            // 仮にcount=0の場合は max を定義せずに出力する。
            System.out.println("count=0 max=0"); // 入力が空の場合を想定して暫定的に 0 をセット
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
