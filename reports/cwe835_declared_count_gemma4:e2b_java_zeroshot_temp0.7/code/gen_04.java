import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // 1行目から続く整数の個数を読み込む
        if (!scanner.hasNextLine()) {
            // 入力が空の場合は終了
            return;
        }
        String line1 = scanner.nextLine();
        int expectedCount = 0;
        try {
            expectedCount = Integer.parseInt(line1.trim());
        } catch (NumberFormatException e) {
            // 1行目が整数でない場合は処理を終了（仕様上、1行目は整数と想定されるが安全のため）
            return;
        }

        long sum = 0;
        int actualCount = 0;

        // 2行目以降の入力を読み取り、整数として処理する
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty()) {
                // 空行は無視
                continue;
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

        // 実際に読み取れた個数と合計を出力する
        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
