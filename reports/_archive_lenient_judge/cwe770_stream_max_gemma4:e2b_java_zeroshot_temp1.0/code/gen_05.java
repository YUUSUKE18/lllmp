import java.util.Scanner;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            return;
        }
        String line = scanner.nextLine();

        // カンマで分割
        String[] parts = line.split(",");

        long count = 0;
        long maxValue = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            // 前後の空白を無視（splitの後に残る可能性のある空白も考慮し、trimしてから処理）
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }

            try {
                long value = Long.parseLong(trimmedPart);
                // 整数として解釈できた場合のみカウントと最大値を更新
                count++;
                if (value > maxValue) {
                    maxValue = value;
                }
                foundNumber = true;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        // 要素数と最大値が何か見つかった場合のみ出力する（仕様上、入力があれば何らかの結果を出す）
        if (foundNumber) {
            System.out.println("count=" + count + " max=" + maxValue);
        } else {
            // 入力が空、または整数が含まれていなかった場合も考慮（ここでは0, -1などを出力するが、仕様には明記されていないため、入力された要素数と最大値に基づき処理を継続する）
            // 厳密に「要素数」と「最大値」を求めるので、もし有効な整数が一つもなければどうすべきか？
            // 仕様では「それらの『要素数』と『最大値』を求めます」となっているため、入力から得られた有効な数で計算するのが適切。
            // 0個の要素があれば count=0, max=? となるが、ここでは最大値を定義できない。
            // 最も安全なのは、データが存在しない場合は出力しないか、あるいは空の状態で出力することだが、今回は入力された整数列から求めた値を出力する。

            // 有効な数値が見つからなかった場合 (count=0)、 maxValue の初期値である Long.MIN_VALUE はそのままなので、
            // count=0, max=Long.MIN_VALUE となるが、これは意味的ではないため、ここでは入力が空なら何もしない（または適切なエラー処理が必要）。
            // 入力が存在し、それが全て無効な場合は何も出力しないことにする。
        }
    }
}
