import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        if (!scanner.hasNextLine()) {
            return;
        }

        // 1行目: 続く整数の個数
        if (!scanner.hasNextLine()) {
            return;
        }
        String line1 = scanner.nextLine();
        int expectedCount;
        try {
            expectedCount = Integer.parseInt(line1.trim());
        } catch (NumberFormatException e) {
            // 1行目が整数でない場合は処理を終了（仕様上、ここでは想定されないが堅牢性のため）
            return;
        }

        long sum = 0;
        int actualCount = 0;

        // 2行目以降を読み取り、整数を処理
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty()) {
                continue; // 空行は無視
            }

            try {
                // 整数として解釈を試みる
                long number = Long.parseLong(line);
                sum += number;
                actualCount++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        // 最終的な結果を出力
        System.out.println("count=" + actualCount + " sum=" + sum);

        scanner.close();
    }
}
