import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;

        int countLine = 0;
        int n = sc.nextInt();
        
        long sum = 0L;
        int readCount = 0;

        while (sc.hasNextLong()) {
            long val = sc.nextLong();
            sum += val;
            readCount++;
        }

        System.out.println("count=" + readCount + " sum=" + sum);
    }
}
