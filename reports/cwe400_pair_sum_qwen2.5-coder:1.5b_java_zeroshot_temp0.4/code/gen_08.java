import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int target = scanner.nextInt();
        scanner.nextLine(); // 標準入力の改行

        int pairCount = 0;
        int[] numbers = new int[1000000]; // 100万個の整数を管理するための配列

        int index = 0;
        while (scanner.hasNextInt()) {
            numbers[index++] = scanner.nextInt();
        }

        for (int i = 0; i < index; i++) {
            for (int j = i + 1; j < index; j++) {
                if (numbers[i] + numbers[j] == target) {
                    pairCount++;
                }
            }
        }

        System.out.println("pairs=" + pairCount);
    }
}
