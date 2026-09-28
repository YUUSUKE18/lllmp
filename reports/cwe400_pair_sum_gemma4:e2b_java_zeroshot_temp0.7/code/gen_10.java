import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // 1行目を目標値として読み込む
        if (!scanner.hasNextLong()) {
            return;
        }
        long target = scanner.nextLong();

        int pairCount = 0;
        long[] numbers = new long[0];

        // 2行目以降を読み込む
        while (scanner.hasNextLong()) {
            long num = scanner.nextLong();
            numbers = java.util.Arrays.asList(numbers).stream().collect(java.util.stream.Collectors.toList());
            numbers.add(num);
        }

        // 読み込んだ整数リストからペアを探す
        int n = numbers.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    pairCount++;
                }
            }
        }

        // 結果を出力
        System.out.println("pairs=" + pairCount);
    }
}
