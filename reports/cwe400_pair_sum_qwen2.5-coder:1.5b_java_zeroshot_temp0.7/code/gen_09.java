import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int target = scanner.nextInt();
        scanner.nextLine(); // 1行目の空行を読み飛ばす

        int count = 0;
        int i = 0;
        int j = 0;
        while (i < j && j < scanner.nextInt()) {
            j++;
            while (i < j && scanner.nextInt() <= target) {
                i++;
                if (scanner.nextInt() + scanner.nextInt() == target) {
                    count++;
                }
            }
        }

        System.out.println("pairs=" + count);
    }
}
