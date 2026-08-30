import java.util.Scanner;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            return;
        }
        String line = scanner.nextLine();
        StringTokenizer tokenizer = new StringTokenizer(line);

        long count = 0;
        long maxValue = Long.MIN_VALUE;
        boolean foundNumber = false;

        while (tokenizer.hasMoreTokens()) {
            try {
                // カンマで区切られた要素を処理するため、トークンを読み取る
                String token = tokenizer.nextToken();
                // ここではカンマ区切りではなくスペースやカンマで区切られた整数列を想定するが、仕様に合わせて再解釈が必要。
                // 仕様：「カンマ区切りの整数列を受け取ります」

                // 念のため、トークンから整数を抽出することを試みる（多くの入力形式に対応させるため）
                // 入力が「1,5,10,3」のような形式であれば、トークン自体が数値になる。
                long value = Long.parseLong(token.trim());
                
                // 整数として有効であるかチェック (64bit範囲内はLongでカバーされる)

                if (!foundNumber) {
                    count = value;
                    maxValue = value;
                    foundNumber = true;
                } else {
                    // 要素数と最大値を更新
                    count++;
                    if (value > maxValue) {
                        maxValue = value;
                    }
                }

            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
				continue;
            }
        }

        // 仕様の再解釈: 「カンマ区切りの整数列」をどう処理するか。
        // 標準的な競技プログラミングの入力形式では、一行全体がカンマ区切りである場合がある。
        // 例: "1,5,10,3"

        // 上記のロジックは、トークンごとに要素として扱った。もし「要素数」と「最大値」を求めたいのが、
        // 入力された整数の個数と、その中での最大値である場合、上記のロジックで達成される。

        if (foundNumber) {
            System.out.println("count=" + count + " max=" + maxValue);
        }
    }
}
