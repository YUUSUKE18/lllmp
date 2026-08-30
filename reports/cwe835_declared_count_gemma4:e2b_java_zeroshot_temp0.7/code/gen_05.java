import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        if (!scanner.hasNextLine()) {
            return;
        }

        // 1行目を読み込む（続く整数の個数）
        if (!scanner.hasNextLine()) {
            return;
        }
        String countLine = scanner.nextLine();
        int expectedCount = 0;
        try {
            expectedCount = Integer.parseInt(countLine.trim());
        } catch (NumberFormatException e) {
            // 1行目が整数でない場合は処理を終了
            return;
        }

        long sum = 0;
        int actualCount = 0;

        // 2行目以降を読み込む
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty()) {
                continue;
            }

            try {
                long number = Long.parseLong(line);
                sum += number;
                actualCount++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視する
                continue;
            }
        }

        // 厳密に count=<実際に読み取れた個数> sum=<合計> を出力する
        System.out.println("count=" + actualCount + " sum=" + sum);

        scanner.close();
    }
}
