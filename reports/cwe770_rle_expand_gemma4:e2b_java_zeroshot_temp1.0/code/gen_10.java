import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            return;
        }

        String line = scanner.nextLine();
        String[] parts = line.trim().split(",");

        long totalCount = 0;
        long totalSum = 0;

        for (String part : parts) {
            if (part.isEmpty()) {
                continue;
            }

            String[] kv = part.split(":");
            if (kv.length == 2) {
                try {
                    // 値 (value) は int に格納可能だが、回数 (count) は long として扱う
                    // 仕様では値と回数自体は64bit範囲に収まることを示唆しているため、
                    // 読み込んだ値と回数を適切に処理する。
                    int value = Integer.parseInt(kv[0].trim());
                    long count = Long.parseLong(kv[1].trim());

                    if (count > 0) {
                        totalCount += count;
                        totalSum += (long) value * count;
                    }
                } catch (NumberFormatException e) {
                    // 数値変換エラーが発生した場合は無視する
                    continue;
                }
            }
        }

        System.out.println("count=" + totalCount + " sum=" + totalSum);
    }
}
