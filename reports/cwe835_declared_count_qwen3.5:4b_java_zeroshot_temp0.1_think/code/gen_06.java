import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        // 標準入力の 1 行目（整数の個数）を読み取り、無視する
        if (sc.hasNextLine()) {
            sc.nextLine();
        }

        long count = 0;
        long sum = 0;

        // 2 行目以降を読み取る
        while (sc.hasNextLine()) {
            String line = sc.nextLine();
            String trimmed = line.trim();

            // 空行は無視
            if (trimmed.isEmpty()) {
                continue;
            }

            try {
                long val = Long.parseLong(trimmed);
                count++;
                sum += val;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
