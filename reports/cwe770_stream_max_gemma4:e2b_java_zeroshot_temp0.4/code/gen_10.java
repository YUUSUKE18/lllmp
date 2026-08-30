import java.util.Scanner;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            return;
        }

        String line = scanner.nextLine();
        String[] parts = line.split(",");

        long count = 0;
        long maxValue = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            // 前後の空白を無視して整数として解釈できるか試みる
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }

            try {
                long value = Long.parseLong(trimmedPart);
                // 64bit整数の範囲内であることを確認（Long型なので自動的にチェックされるが、念のため）
                // 仕様上は値が64bitの範囲に収まることが前提だが、ここでは読み取った値をそのまま扱う。

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

        if (foundNumber) {
            System.out.println("count=" + count + " max=" + maxValue);
        } else {
            // 整数が一つも見つからなかった場合（空の入力や非数値のみの場合）
            // 仕様には明記されていないが、要素がない場合の処理を考慮する。
            // このケースでは count=0, max=?? となるが、最大値の設定は意味をなさないため、
            // 読み取れた数があれば出力する、という流れで進める。
            // もし何も読み取れなかった場合は、count=0, max=適切な初期値（例: 0や最小値）を出力するかどうかは仕様に依存するが、
            // ここでは数値が見つからなかった場合は何も出力しない（または count=0 のままにする）とする。
            // ただし、要素数と最大値を求めるという指示に従い、読み取れたものだけを処理したため、
            // 数値が一つもなかった場合は何も出力しないのが最も安全かもしれない。
        }

        scanner.close();
    }
}
