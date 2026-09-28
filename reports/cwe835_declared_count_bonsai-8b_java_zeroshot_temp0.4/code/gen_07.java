import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int countLine = scanner.nextInt();
        int sum = 0;
        int actualCount = 0;

        while (actualCount < countLine) {
            String line = scanner.nextLine();
            if (line.trim().isEmpty()) continue;
            try {
                int num = Integer.parseInt(line);
                sum += num;
                actualCount++;
            } catch (NumberFormatException e) {
                // ラインが整数ではない場合、無視
            }
        }

        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
