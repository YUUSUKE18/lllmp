import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        if (!scanner.hasNextLine()) {
            return;
        }

        // 1行目から読み取る (実際に存在する整数の個数)
        if (!scanner.hasNextLine()) {
            return;
        }
        String line1 = scanner.nextLine();
        int expectedCount = 0;
        try {
            expectedCount = Integer.parseInt(line1.trim());
        } catch (NumberFormatException e) {
            // 1行目が整数でなかった場合、処理を終了（仕様上、1行目は整数と想定されるが安全策）
            return;
        }

        long sum = 0;
        int actualCount = 0;

        // 2行目以降から整数を読み取る
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

        // 出力
        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
