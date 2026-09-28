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
        boolean foundValidNumber = false;

        while (tokenizer.hasMoreTokens()) {
            try {
                // 要素を読み込む
                String token = tokenizer.nextToken().trim();
                if (token.isEmpty()) {
                    continue;
                }

                long value = Long.parseLong(token);
                
                // 64bit整数の範囲内であることを確認（Long型なので自動的に満たされるが、念のため）
                // 実際には入力された値がLongの範囲内であれば問題ない。
                
                count++;
                if (value > maxValue) {
                    maxValue = value;
                }
                foundValidNumber = true;

            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        // 空の入力や数値が一つもなかった場合の処理（仕様上、少なくとも1つの値があればcountとmaxValueは計算される）
        if (!foundValidNumber) {
            // 入力が空またはすべて無効な場合。このケースの具体的な出力要件がないため、ここでは何も出力しないか、
            // または0 0のようなデフォルト値を想定するが、仕様に従い実際に読み取れた値のみを処理する。
            // もしデータが全くなかった場合は何も出力しない（あるいはcount=0 max=??となる）。
            // 今回は「要素数」と「最大値」を求めよという指示に基づき、有効な数値が見つからなかった場合は出力しないという解釈で進める。
            return;
        }

        System.out.println("count=" + count + " max=" + maxValue);
    }
}
