import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        if (!scanner.hasNextLine()) {
            return;
        }

        // 1行目を読み取る（続く整数の個数）
        if (!scanner.hasNextLine()) {
            return;
        }
        String line1 = scanner.nextLine();
        int expectedCount = 0;
        try {
            expectedCount = Integer.parseInt(line1.trim());
        } catch (NumberFormatException e) {
            // 1行目が整数でなかった場合、処理を終了
            return;
        }

        long sum = 0;
        int actualCount = 0;

        // 2行目以降を読み取る
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();

            if (line.isEmpty()) {
                continue; // 空行は無視
            }

            try {
                // 整数として解釈を試みる
                long number = Long.parseLong(line);
                
                // 読み取れた整数を対象とする
                sum += number;
                actualCount++;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        // 厳密に count=<実際に読み取れた個数> sum=<合計> を出力
        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
