import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNext()) return;
        
        int countInput = scanner.nextInt(); // 読み取れる整数の数を指定
        long sum = 0;
        int actualCount = 0;
        
        while (scanner.hasNextInt()) {
            int val = scanner.nextInt();
            sum += val;
            actualCount++;
        }
        
        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
