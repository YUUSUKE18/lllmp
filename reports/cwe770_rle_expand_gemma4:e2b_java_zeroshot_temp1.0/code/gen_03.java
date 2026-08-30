import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            return;
        }

        String line = scanner.nextLine();
        String[] parts = line.split(",");

        long totalCount = 0;
        long totalSum = 0;

        for (String part : parts) {
            String[] keyValue = part.trim().split(":");
            if (keyValue.length == 2) {
                try {
                    // 値（値）は無視し、回数（回数）をパース
                    int count = Integer.parseInt(keyValue[1].trim());
                    if (count >= 0) {
                        totalCount += count;
                        // 問題の記述では「7:3,2:2 は 7,7,7,2,2 という整数列を表します」とあるため、
                        // 値は回数を表すため、その値が重複して加算されるべきか、
                        // それとも値自体を考慮すべきか、仕様を再確認します。
                        // 例: 7:3 -> 7が3回出現する。つまり 7, 7, 7。合計 21。
                        // 例: 2:2 -> 2が2回出現する。つまり 2, 2。合計 4。
                        // 整数列の合計: 7+7+7+2+2 = 25。
                        // 仕様: 「その整数列について、『要素数』と『合計』を求めます。」
                        // 7:3,2:2 -> 7,7,7,2,2 (要素数 5, 合計 25)
                        // したがって、各ペア (値:回数) は、値が回数だけ繰り返されることを意味する。

                        int value = Integer.parseInt(keyValue[0].trim());
                        for (int i = 0; i < count; i++) {
                            totalSum += value;
                        }
                    }
                } catch (NumberFormatException e) {
                    // 数値変換エラーは無視（仕様上、このケースは通常発生しないと想定されるが安全のため）
                }
            }
        }

        System.out.println("count=" + totalCount + " sum=" + totalSum);
        scanner.close();
    }
}
