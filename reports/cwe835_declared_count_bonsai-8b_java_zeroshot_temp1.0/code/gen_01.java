import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int count = 0;
        long sum = 0;
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty()) continue;
            try {
                int num = Integer.parseInt(line);
                count++;
                sum += num;
            } catch (NumberFormatException e) {
                // リアルの数値を解析できず、無視
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
