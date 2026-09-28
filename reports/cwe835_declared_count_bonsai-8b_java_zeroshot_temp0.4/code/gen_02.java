import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int count = 0;
        long sum = 0;
        while (scanner.hasNext()) {
            try {
                int num = scanner.nextInt();
                count++;
                sum += num;
            } catch (Exception e) {
                // Ignore invalid lines
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
