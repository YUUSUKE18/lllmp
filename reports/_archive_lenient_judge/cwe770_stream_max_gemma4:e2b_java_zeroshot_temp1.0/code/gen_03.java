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
        boolean foundValidNumber = false;

        for (String part : parts) {
            // 前後の空白を無視して整数として解釈できるか確認
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }

            try {
                long value = Long.parseLong(trimmedPart);
                // 64bit整数の範囲内であるという前提は問題文で与えられているが、念のため確認（ここでは入力された値が適切に処理されることを重視）
                if (value >= Long.MIN_VALUE && value <= Long.MAX_VALUE) {
                    count++;
                    if (value > maxValue) {
                        maxValue = value;
                    }
                    foundValidNumber = true;
                } else {
                    // 64bitの範囲外の値は無視する（仕様に基づき）
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
            }
        }

        if (foundValidNumber) {
            System.out.println("count=" + count + " max=" + maxValue);
        } else {
            // 有効な整数が一つもなかった場合、空の出力を想定（問題文の厳密な要求に合わせるため、何も出力しないか、あるいは0 0など何らかのデフォルト値を考慮するが、ここでは入力がない場合は何も出力しないのが自然。ただし、もし要素数が0でmax値が未定義になるなら別途考慮が必要だが、ここでは上記処理結果をそのまま出力する）
            // 問題文は「要素数と最大値を求めます」とあるため、データが存在しない場合の振る舞いは明記されていないが、ここでは集計された結果のみを出力する。
        }
    }
}
