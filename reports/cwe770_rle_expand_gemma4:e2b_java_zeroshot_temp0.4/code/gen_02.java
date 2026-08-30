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
            if (part.trim().isEmpty()) {
                continue;
            }

            String[] kv = part.split(":");
            if (kv.length == 2) {
                try {
                    // 値 (value) は int または long に格納可能だが、回数 (count) は long になる可能性があるため、
                    // ここでは値と回数を分けて処理する。
                    // 仕様では値:回数 の形式なので、値は int/long、回数は long
                    long value = Long.parseLong(kv[0].trim());
                    long count = Long.parseLong(kv[1].trim());

                    if (count >= 0) {
                        totalCount += count;
                        totalSum += value * count;
                    }
                } catch (NumberFormatException e) {
                    // 数値変換に失敗した場合は無視する（仕様上、形式が正しくない要素は無視する）
                }
            }
        }

        System.out.println("count=" + totalCount + " sum=" + totalSum);
        scanner.close();
    }
}
