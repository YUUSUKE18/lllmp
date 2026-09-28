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
                    // 値 (value) は無視し、回数 (count) を使用
                    int count = Integer.parseInt(kv[1].trim());
                    
                    if (count > 0) {
                        totalCount += count;
                        // 問題文の例では、要素の値自体は与えられていないため、
                        // 「値:回数」の「値」を要素の値として扱う必要があります。
                        // 仕様を再確認すると、「7:3,2:2」は 7,7,7,2,2 という整数列を表す、とあります。
                        // これは「値:回数」の「値」がその繰り返し回数分だけ列に加算されることを意味します。
                        // 例: 7:3 -> 7が3回加算される (7, 7, 7)
                        // 2:2 -> 2が2回加算される (2, 2)
                        
                        long value = Long.parseLong(kv[0].trim());
                        totalSum += value * count;
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
