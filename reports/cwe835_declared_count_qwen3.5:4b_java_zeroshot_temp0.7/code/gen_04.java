import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int count = 0;
        long sum = 0;

        if (scanner.hasNextInt()) {
            int expectedCount = scanner.nextInt();
            // 次の行を expectedCount 回読み取るが、実際に存在する整数だけ処理する
            while (count < expectedCount && scanner.hasNextLong()) {
                long value = scanner.nextLong();
                sum += value;
                count++;
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
