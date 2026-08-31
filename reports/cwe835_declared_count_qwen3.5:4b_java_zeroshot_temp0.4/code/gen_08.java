import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int count = 0;
        long sum = 0L;
        
        if (scanner.hasNextInt()) {
            int n = scanner.nextInt();
            for (int i = 0; i < n && scanner.hasNextLong(); i++) {
                if (scanner.hasNextLong()) {
                    long val = scanner.nextLong();
                    sum += val;
                    count++;
                } else {
                    break;
                }
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
