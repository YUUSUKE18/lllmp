import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNext()) return;
        
        int declaredCount = 0;
        try {
            declaredCount = scanner.nextInt();
        } catch (Exception e) {
            return;
        }

        long sum = 0;
        int readCount = 0;

        while (scanner.hasNextLong()) {
            try {
                long value = scanner.nextLong();
                sum += value;
                readCount++;
            } catch (Exception e) {
                break;
            }
        }

        System.out.println("count=" + readCount + " sum=" + sum);
    }
}
