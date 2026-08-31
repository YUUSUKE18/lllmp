import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextInt()) return;
        
        int countLine = scanner.nextInt();
        long sum = 0;
        int actualCount = 0;
        
        while (scanner.hasNextLong()) {
            try {
                long value = scanner.nextLong();
                sum += value;
                actualCount++;
            } catch (Exception e) {
                break;
            }
        }
        
        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
