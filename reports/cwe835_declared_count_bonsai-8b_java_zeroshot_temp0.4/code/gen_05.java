import java.util.Scanner;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> numbers = new ArrayList<>();
        int countLine = scanner.nextInt();
        int count = 0;
        int sum = 0;
        while (count < countLine && scanner.hasNextInt()) {
            int num = scanner.nextInt();
            numbers.add(num);
            count++;
            sum += num;
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
