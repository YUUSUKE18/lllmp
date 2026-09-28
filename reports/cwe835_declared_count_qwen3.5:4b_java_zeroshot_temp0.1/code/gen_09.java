import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNext()) return;
        
        int countLine = scanner.nextInt();
        long sum = 0;
        int actualCount = 0;
        
        while (scanner.hasNextInt()) {
            int value = scanner.nextInt();
            sum += value;
            actualCount++;
        }
        
        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
